'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Shield, ChevronDown, Calendar, Target, DollarSign, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDict } from '@/components/i18n/LocaleProvider';
import DebtInputForm, { createEmptyDebt } from '@/components/calculator/DebtInputForm';
import CalculatorResults from '@/components/calculator/CalculatorResults';
import CalculatorCTA from '@/components/calculator/CalculatorCTA';
import {
  generatePayoffPlan,
  calculateDeadlinePayment,
  getDefaultCurrency,
  getCurrencySymbol,
  formatCurrency,
  formatDate,
} from '@/lib/debt-calculator';
import type { WebDebt, CurrencyCode } from '@/lib/debt-calculator';

interface DeadlineClientProps {
  faqs: { q: string; a: string }[];
}

function getMonthOptions(): { value: number; label: string }[] {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: new Date(2000, i).toLocaleString('default', { month: 'long' }),
  }));
}

function getYearOptions(): number[] {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 31 }, (_, i) => currentYear + i);
}

function monthsBetween(targetMonth: number, targetYear: number): number {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  return (targetYear - currentYear) * 12 + (targetMonth - currentMonth);
}

export default function DeadlineClient({ faqs }: DeadlineClientProps) {
  const { locale, dict } = useDict();
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const c = dict.calculator || {};
  const f = c.form || {};
  const r = c.results || {};
  const cta = c.cta || {};

  const [debts, setDebts] = useState<WebDebt[]>([createEmptyDebt()]);
  const [currency, setCurrency] = useState<CurrencyCode>(getDefaultCurrency(locale));
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Default target: 2 years from now
  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() + 2);
  const [targetMonth, setTargetMonth] = useState(defaultDate.getMonth());
  const [targetYear, setTargetYear] = useState(defaultDate.getFullYear());

  const currencySymbol = getCurrencySymbol(currency);

  const hasValidDebts = debts.some(
    (d) => d.balance > 0 && d.minimumPayment > 0,
  );

  const targetMonths = monthsBetween(targetMonth, targetYear);
  const isTargetValid = targetMonths >= 1;

  const requiredExtra = useMemo(() => {
    if (!hasValidDebts || !isTargetValid) return null;
    const valid = debts.filter((d) => d.balance > 0 && d.minimumPayment > 0);
    return calculateDeadlinePayment(valid, targetMonths);
  }, [debts, targetMonths, hasValidDebts, isTargetValid]);

  const plan = useMemo(() => {
    if (!hasValidDebts || requiredExtra === null) return null;
    const valid = debts.filter((d) => d.balance > 0 && d.minimumPayment > 0);
    return generatePayoffPlan(valid, requiredExtra, 'deadline');
  }, [debts, requiredExtra, hasValidDebts]);

  // Check if the target is achievable (required extra isn't absurdly high)
  const totalBalance = useMemo(
    () => debts.reduce((sum, d) => sum + d.balance, 0),
    [debts],
  );
  const isUnrealistic = requiredExtra !== null && requiredExtra > totalBalance * 0.5 && targetMonths < 3;

  const handleDebtsChange = useCallback((newDebts: WebDebt[]) => {
    setDebts(newDebts);
  }, []);

  const handleCurrencyChange = useCallback((code: CurrencyCode) => {
    setCurrency(code);
  }, []);

  const fc = (n: number) => formatCurrency(n, locale, currency);
  const fd = (d: Date) => formatDate(d, locale);

  const targetDate = new Date(targetYear, targetMonth);
  const targetDateFormatted = fd(targetDate);

  const seoContent = (
    <>
      <h2>How the Debt-Free By Date Calculator Works</h2>
      <p>
        Most debt calculators ask you how much extra you can pay, then tell you when you&apos;ll
        be debt-free. This calculator works <strong>in reverse</strong>. You pick your target
        debt-free date, and it tells you exactly how much extra you need to pay each month to
        hit that goal.
      </p>
      <p>
        Under the hood, the calculator uses a binary search algorithm. It tests thousands of
        possible extra payment amounts, simulating month-by-month payoffs for each one, until it
        finds the precise amount that makes your last debt hit zero in your target month. The
        payoff order follows the{' '}
        <Link href={`${prefix}/calculator/avalanche`}>avalanche method</Link> (highest interest
        rate first) to minimise total interest along the way.
      </p>

      <h3>Step-by-Step: Setting Your Debt-Free Date</h3>
      <ol>
        <li><strong>Enter all your debts</strong> &mdash; name, balance, APR, and minimum payment for each.</li>
        <li><strong>Pick your target date</strong> using the month and year selectors above.</li>
        <li><strong>See the required extra payment</strong> &mdash; how much above your minimums you need to pay monthly.</li>
        <li><strong>Adjust if needed</strong> &mdash; push the date out if the amount is too high, or pull it closer if you can afford more.</li>
        <li><strong>Review the full plan</strong> &mdash; payoff order, interest breakdown, and month-by-month schedule.</li>
      </ol>

      <h3>Is Setting a Deadline Realistic?</h3>
      <p>
        Setting a target date is one of the most effective ways to stay motivated. Research shows
        that people with specific, time-bound goals are significantly more likely to follow through
        than those with vague intentions like &ldquo;I&apos;ll pay off debt when I can.&rdquo;
      </p>
      <p>
        That said, be honest with yourself. If the required payment is more than you can comfortably
        afford, push the date out. A target you can actually hit is infinitely more valuable than an
        aggressive one you abandon after two months. Try a few different dates to find the sweet spot
        between ambitious and achievable.
      </p>

      <h3>Deadline Method vs Snowball vs Avalanche</h3>
      <p>
        The deadline calculator is a <strong>planning tool</strong>, not a competing strategy. It
        answers the question &ldquo;how much do I need to pay?&rdquo; while methods like{' '}
        <Link href={`${prefix}/calculator/snowball`}>snowball</Link> and{' '}
        <Link href={`${prefix}/calculator/avalanche`}>avalanche</Link> answer &ldquo;in what
        order should I pay?&rdquo; You can use the deadline calculator to set your budget, then
        choose any payoff strategy you like.
      </p>
      <p>
        Want help choosing the right strategy? <Link href={`${prefix}/`}>Try the Payoff app</Link>{' '}
        &mdash; it includes a 60-second personality quiz that matches you with the best method for
        your situation, plus AI coaching to keep you on track.
      </p>
    </>
  );

  return (
    <main className="relative pt-28 pb-20 px-4">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary opacity-[0.04] blur-[140px]" />
        <div className="absolute -bottom-32 -right-36 w-[450px] h-[450px] rounded-full bg-accent opacity-[0.06] blur-[120px]" />
        <div className="absolute top-[25%] right-[5%] w-14 h-14 rounded-full border border-accent/10 animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-[30%] left-[5%] w-10 h-10 rounded-full border border-primary/10 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-16 right-[20%] w-2 h-2 rounded-full bg-secondary/20 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Free Debt-Free By Date Calculator
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Pick your target debt-free date and see exactly how much extra you need to pay each month.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-3">
            <Shield className="w-3.5 h-3.5" />
            {c.privacy || 'Your data stays in your browser. We never see your numbers.'}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Input column */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              <DebtInputForm
                debts={debts}
                extraPayment={0}
                onDebtsChange={handleDebtsChange}
                onExtraPaymentChange={() => {}}
                currency={currency}
                onCurrencyChange={handleCurrencyChange}
                dict={f}
                currencySymbol={currencySymbol}
                hideExtraPayment
              />

              {/* Target date picker */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  <label className="text-sm font-bold text-gray-900">
                    Target debt-free date
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={targetMonth}
                    onChange={(e) => setTargetMonth(Number(e.target.value))}
                    className="flex-1 rounded-xl border-2 border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 bg-white focus:border-primary focus:outline-none transition-colors cursor-pointer"
                  >
                    {getMonthOptions().map((m) => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                  <select
                    value={targetYear}
                    onChange={(e) => setTargetYear(Number(e.target.value))}
                    className="w-28 rounded-xl border-2 border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 bg-white focus:border-primary focus:outline-none transition-colors cursor-pointer"
                  >
                    {getYearOptions().map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                {!isTargetValid && (
                  <p className="text-xs text-red-500 font-medium">
                    Please pick a date in the future.
                  </p>
                )}

                <p className="text-xs text-gray-500">
                  That&apos;s <strong>{targetMonths}</strong> month{targetMonths !== 1 ? 's' : ''} from now.
                  Adjust the date to see how the required payment changes.
                </p>
              </div>

              {/* Required payment result card */}
              {hasValidDebts && isTargetValid && requiredExtra !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border-2 border-primary/20 p-5 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-gray-900">
                      Required extra payment
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-primary">
                    {fc(requiredExtra)}
                    <span className="text-sm font-semibold text-gray-500">/month</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    To be debt-free by <strong>{targetDateFormatted}</strong>, pay{' '}
                    <strong>{fc(requiredExtra)}</strong> extra per month on top of your minimum payments.
                  </p>

                  {isUnrealistic && (
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mt-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800">
                        This target is very aggressive. Consider extending your deadline to find a
                        more manageable monthly payment.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Results column */}
          <div className="lg:col-span-3">
            {plan && plan.totalMonths > 0 ? (
              <div className="space-y-8">
                <CalculatorResults
                  plan={plan}
                  lang={locale}
                  dict={r}
                  otherMethod="snowball"
                  otherMethodPlan={null}
                  locale={locale}
                  currency={currency}
                />

                {/* Inline CTA */}
                <CalculatorCTA dict={cta} locale={locale} variant="inline" />
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[300px]">
                <div className="text-center text-gray-400 space-y-2">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                    <span className="text-2xl">
                      <Calendar className="w-8 h-8 text-gray-300" />
                    </span>
                  </div>
                  <p className="text-sm font-medium">
                    {c.emptyState || 'Add your debts to see your payoff plan'}
                  </p>
                  <p className="text-xs">
                    Enter at least one debt, then pick your target debt-free date.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full CTA */}
        <div className="mt-16">
          <CalculatorCTA dict={cta} locale={locale} variant="full" />
        </div>

        {/* SEO content */}
        <div className="mt-16 max-w-3xl mx-auto prose prose-gray prose-headings:font-extrabold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          {seoContent}
        </div>

        {/* FAQ */}
        {faqs.length > 0 && (
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
              {c.faqTitle || 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-semibold text-gray-900 pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                        expandedFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
