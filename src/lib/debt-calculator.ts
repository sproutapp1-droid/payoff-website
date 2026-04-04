// ============================================================
// Client-side debt payoff calculation engine
// Ported from payoff-app/lib/calculations.ts for web use
// All calculations run in the browser — no data leaves the device
// ============================================================

export type StrategyMethod = 'snowball' | 'avalanche';

export interface WebDebt {
  id: string;
  name: string;
  balance: number;
  apr: number;
  minimumPayment: number;
}

export interface MonthlyPayment {
  month: number;
  date: Date;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface DebtPayoffSchedule {
  debtId: string;
  debtName: string;
  months: number;
  payoffDate: Date;
  totalPaid: number;
  totalInterest: number;
  monthlyPayments: MonthlyPayment[];
}

export interface PayoffPlan {
  debts: DebtPayoffSchedule[];
  totalMonths: number;
  debtFreeDate: Date;
  totalPaid: number;
  totalInterest: number;
  totalSaved: number;
  monthsSaved: number;
  hasNegativeAmortization: boolean;
}

// ── Core: amortise a single debt with a fixed monthly payment ──

function amortiseSingleDebt(
  balance: number,
  apr: number,
  monthlyPayment: number,
  startMonth: number = 0,
): MonthlyPayment[] {
  const monthlyRate = apr / 100 / 12;
  const payments: MonthlyPayment[] = [];
  let remaining = balance;
  let month = startMonth;
  const MAX_MONTHS = 600;

  const firstMonthInterest = balance * monthlyRate;
  const effectivePayment = monthlyPayment > firstMonthInterest
    ? monthlyPayment
    : firstMonthInterest + Math.max(1, balance * 0.01);

  while (remaining > 0.01 && month - startMonth < MAX_MONTHS) {
    const interest = remaining * monthlyRate;
    const payment = Math.min(effectivePayment, remaining + interest);
    const principal = payment - interest;
    remaining = Math.max(0, remaining - principal);

    payments.push({
      month,
      date: addMonths(new Date(), month),
      payment: round2(payment),
      principal: round2(principal),
      interest: round2(interest),
      remainingBalance: round2(remaining),
    });

    month++;
  }

  return payments;
}

// ── Sort debts by strategy ──

function sortDebts(debts: WebDebt[], method: StrategyMethod): WebDebt[] {
  const active = debts.filter((d) => d.balance > 0);

  if (method === 'snowball') {
    return [...active].sort(
      (a, b) => a.balance - b.balance || b.apr - a.apr,
    );
  }

  // avalanche
  return [...active].sort(
    (a, b) => b.apr - a.apr || a.balance - b.balance,
  );
}

// ── Minimum-only baseline for comparison ──

function generateMinimumOnlyPlan(debts: WebDebt[]): { totalInterest: number; totalMonths: number } {
  let totalInterest = 0;
  let maxMonths = 0;

  for (const debt of debts) {
    const payments = amortiseSingleDebt(debt.balance, debt.apr, debt.minimumPayment);
    totalInterest += payments.reduce((sum, p) => sum + p.interest, 0);
    maxMonths = Math.max(maxMonths, payments.length);
  }

  return { totalInterest: round2(totalInterest), totalMonths: maxMonths };
}

// ── Generate full payoff plan ──

export function generatePayoffPlan(
  debts: WebDebt[],
  extraMonthly: number,
  method: StrategyMethod,
): PayoffPlan {
  const sorted = sortDebts(debts, method);

  if (sorted.length === 0) {
    return {
      debts: [],
      totalMonths: 0,
      debtFreeDate: new Date(),
      totalPaid: 0,
      totalInterest: 0,
      totalSaved: 0,
      monthsSaved: 0,
      hasNegativeAmortization: false,
    };
  }

  const balances = new Map<string, number>();
  const minimums = new Map<string, number>();
  const aprs = new Map<string, number>();
  const schedules = new Map<string, MonthlyPayment[]>();

  let hasNegativeAmortization = false;
  for (const debt of sorted) {
    balances.set(debt.id, debt.balance);
    const monthlyInterest = debt.balance * (debt.apr / 100 / 12);
    const effectiveMin = debt.minimumPayment > monthlyInterest
      ? debt.minimumPayment
      : monthlyInterest + Math.max(1, debt.balance * 0.01);
    if (debt.minimumPayment <= monthlyInterest) hasNegativeAmortization = true;
    minimums.set(debt.id, effectiveMin);
    aprs.set(debt.id, debt.apr);
    schedules.set(debt.id, []);
  }

  const totalMinimum = sorted.reduce((sum, d) => sum + d.minimumPayment, 0);
  const totalBudget = totalMinimum + extraMonthly;
  let month = 0;
  const MAX_MONTHS = 600;

  while (month < MAX_MONTHS) {
    const activeIds = [...balances.entries()]
      .filter(([, bal]) => bal > 0.01)
      .map(([id]) => id);

    if (activeIds.length === 0) break;

    let availableExtra = totalBudget;
    const payments = new Map<string, number>();

    for (const id of activeIds) {
      const bal = balances.get(id)!;
      const monthlyRate = aprs.get(id)! / 100 / 12;
      const interest = bal * monthlyRate;
      const min = Math.min(minimums.get(id)!, bal + interest);
      payments.set(id, min);
      availableExtra -= min;
    }

    for (const debt of sorted) {
      if (!activeIds.includes(debt.id)) {
        availableExtra += minimums.get(debt.id) ?? debt.minimumPayment;
      }
    }

    for (const debt of sorted) {
      if (availableExtra <= 0.01) break;
      if (!activeIds.includes(debt.id)) continue;

      const bal = balances.get(debt.id)!;
      const monthlyRate = aprs.get(debt.id)! / 100 / 12;
      const interest = bal * monthlyRate;
      const currentPayment = payments.get(debt.id)!;
      const maxExtra = Math.max(0, bal + interest - currentPayment);
      const extra = Math.min(availableExtra, maxExtra);

      payments.set(debt.id, currentPayment + extra);
      availableExtra -= extra;
    }

    for (const id of activeIds) {
      const bal = balances.get(id)!;
      const monthlyRate = aprs.get(id)! / 100 / 12;
      const interest = bal * monthlyRate;
      const payment = payments.get(id) || 0;
      const principal = payment - interest;
      const newBalance = Math.max(0, round2(bal - principal));

      balances.set(id, newBalance);

      schedules.get(id)!.push({
        month,
        date: addMonths(new Date(), month),
        payment: round2(payment),
        principal: round2(principal),
        interest: round2(interest),
        remainingBalance: round2(newBalance),
      });
    }

    month++;
  }

  const debtSchedules: DebtPayoffSchedule[] = sorted.map((debt) => {
    const monthlyPayments = schedules.get(debt.id) || [];
    const totalPaid = monthlyPayments.reduce((sum, p) => sum + p.payment, 0);
    const totalInterest = monthlyPayments.reduce((sum, p) => sum + p.interest, 0);

    return {
      debtId: debt.id,
      debtName: debt.name,
      months: monthlyPayments.length,
      payoffDate: monthlyPayments.length > 0
        ? monthlyPayments[monthlyPayments.length - 1].date
        : new Date(),
      totalPaid: round2(totalPaid),
      totalInterest: round2(totalInterest),
      monthlyPayments,
    };
  });

  const totalMonths = Math.max(...debtSchedules.map((d) => d.months), 0);
  const totalPaid = debtSchedules.reduce((sum, d) => sum + d.totalPaid, 0);
  const totalInterest = debtSchedules.reduce((sum, d) => sum + d.totalInterest, 0);

  const minOnlyPlan = generateMinimumOnlyPlan(sorted);
  const totalSaved = minOnlyPlan.totalInterest - totalInterest;
  const monthsSaved = minOnlyPlan.totalMonths - totalMonths;

  return {
    debts: debtSchedules,
    totalMonths,
    debtFreeDate: addMonths(new Date(), totalMonths),
    totalPaid: round2(totalPaid),
    totalInterest: round2(totalInterest),
    totalSaved: round2(Math.max(0, totalSaved)),
    monthsSaved: Math.max(0, monthsSaved),
    hasNegativeAmortization,
  };
}

// ── Helpers ──

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  const targetMonth = result.getMonth() + months;
  result.setMonth(targetMonth);
  if (result.getMonth() !== ((targetMonth % 12) + 12) % 12) {
    result.setDate(0);
  }
  return result;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// ── Currency formatting ──

const CURRENCY_MAP: Record<string, { code: string; locale: string }> = {
  en: { code: 'USD', locale: 'en-US' },
  es: { code: 'EUR', locale: 'es-ES' },
  pt: { code: 'BRL', locale: 'pt-BR' },
  fr: { code: 'EUR', locale: 'fr-FR' },
  de: { code: 'EUR', locale: 'de-DE' },
  ja: { code: 'JPY', locale: 'ja-JP' },
  ko: { code: 'KRW', locale: 'ko-KR' },
  zh: { code: 'CNY', locale: 'zh-CN' },
  it: { code: 'EUR', locale: 'it-IT' },
};

export function formatCurrency(amount: number, lang: string = 'en'): string {
  const { code, locale } = CURRENCY_MAP[lang] || CURRENCY_MAP.en;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
    minimumFractionDigits: code === 'JPY' || code === 'KRW' ? 0 : 2,
    maximumFractionDigits: code === 'JPY' || code === 'KRW' ? 0 : 2,
  }).format(amount);
}

export function formatDate(date: Date, lang: string = 'en'): string {
  const { locale } = CURRENCY_MAP[lang] || CURRENCY_MAP.en;
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(date);
}
