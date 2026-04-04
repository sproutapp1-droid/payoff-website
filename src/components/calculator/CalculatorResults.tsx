'use client';

import { Calendar, PiggyBank, Clock, TrendingDown, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { PayoffPlan } from '@/lib/debt-calculator';
import { formatCurrency, formatDate } from '@/lib/debt-calculator';
import PayoffChart from './PayoffChart';
import AmortizationTable from './AmortizationTable';

interface CalculatorResultsProps {
  plan: PayoffPlan;
  lang: string;
  dict: Record<string, string>;
  otherMethod: 'snowball' | 'avalanche';
  otherMethodPlan: PayoffPlan | null;
  locale: string;
}

export default function CalculatorResults({
  plan,
  lang,
  dict,
  otherMethod,
  otherMethodPlan,
  locale,
}: CalculatorResultsProps) {
  const fc = (n: number) => formatCurrency(n, lang);
  const fd = (d: Date) => formatDate(d, lang);

  const statCards = [
    {
      icon: Calendar,
      label: dict.debtFreeDate || 'Debt-free date',
      value: fd(plan.debtFreeDate),
      sublabel: `${plan.totalMonths} ${dict.months || 'months'}`,
      color: 'from-primary/10 to-primary/5',
      iconColor: 'text-primary',
    },
    {
      icon: PiggyBank,
      label: dict.totalInterest || 'Total interest',
      value: fc(plan.totalInterest),
      sublabel: `${fc(plan.totalPaid)} ${dict.totalPaid || 'total paid'}`,
      color: 'from-secondary/10 to-secondary/5',
      iconColor: 'text-secondary',
    },
    {
      icon: Clock,
      label: dict.timeSaved || 'Time saved',
      value: plan.monthsSaved > 0
        ? `${plan.monthsSaved} ${dict.months || 'months'}`
        : dict.noExtra || 'Add extra to save',
      sublabel: plan.totalSaved > 0
        ? `${fc(plan.totalSaved)} ${dict.interestSaved || 'interest saved'}`
        : dict.vsMinimumOnly || 'vs. minimum payments only',
      color: 'from-accent/15 to-accent/5',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-8"
    >
      {/* Negative amortization warning */}
      {plan.hasNegativeAmortization && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            {dict.negAmortWarning || 'One or more of your debts has a minimum payment that doesn\'t cover the monthly interest. The calculator has adjusted the payment to ensure the debt can be paid off.'}
          </p>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className={`relative overflow-hidden bg-gradient-to-br ${card.color} rounded-2xl p-5 border border-white/50`}
          >
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/20 blur-xl" />
            <card.icon className={`w-5 h-5 ${card.iconColor} mb-2`} />
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {card.label}
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">
              {card.value}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{card.sublabel}</p>
          </motion.div>
        ))}
      </div>

      {/* Comparison banner */}
      {otherMethodPlan && plan.totalInterest !== otherMethodPlan.totalInterest && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
        >
          <TrendingDown className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              {otherMethodPlan.totalInterest < plan.totalInterest ? (
                <>
                  {dict.switchTo || 'Switch to'}{' '}
                  <span className="font-bold text-primary">
                    {otherMethod === 'snowball'
                      ? dict.snowballMethod || 'Snowball'
                      : dict.avalancheMethod || 'Avalanche'}
                  </span>
                  {' '}{dict.toSave || 'to save'}{' '}
                  <span className="font-bold">
                    {fc(plan.totalInterest - otherMethodPlan.totalInterest)}
                  </span>{' '}
                  {dict.inInterest || 'in interest'}
                  {otherMethodPlan.totalMonths < plan.totalMonths && (
                    <>
                      {' '}{dict.and || 'and'}{' '}
                      <span className="font-bold">
                        {plan.totalMonths - otherMethodPlan.totalMonths} {dict.months || 'months'}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <>
                  {dict.currentMethodSaves || 'Your current method saves you'}{' '}
                  <span className="font-bold">
                    {fc(otherMethodPlan.totalInterest - plan.totalInterest)}
                  </span>{' '}
                  {dict.vsOther || 'vs.'}{' '}
                  {otherMethod === 'snowball'
                    ? dict.snowballMethod || 'Snowball'
                    : dict.avalancheMethod || 'Avalanche'}
                </>
              )}
            </p>
          </div>
          <a
            href={`/${locale}/calculator/${otherMethod}`}
            className="flex-shrink-0 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors"
          >
            {dict.tryMethod || 'Try'}{' '}
            {otherMethod === 'snowball'
              ? dict.snowballMethod || 'Snowball'
              : dict.avalancheMethod || 'Avalanche'}
          </a>
        </motion.div>
      )}

      {/* Payoff chart */}
      <PayoffChart plan={plan} lang={lang} dict={dict} />

      {/* Payoff order */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-900">
          {dict.payoffOrder || 'Payoff order'}
        </h3>
        <div className="space-y-2">
          {plan.debts.map((debt, i) => (
            <motion.div
              key={debt.debtId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 px-4 py-3"
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {debt.debtName || `Debt ${i + 1}`}
                </p>
                <p className="text-xs text-gray-500">
                  {fc(debt.totalPaid)} {dict.over || 'over'} {debt.months} {dict.months || 'months'}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-primary">
                  {fd(debt.payoffDate)}
                </p>
                <p className="text-xs text-gray-400">
                  {fc(debt.totalInterest)} {dict.interest || 'interest'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Amortization table */}
      <AmortizationTable plan={plan} lang={lang} dict={dict} />
    </motion.div>
  );
}
