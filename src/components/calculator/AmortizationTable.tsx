'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PayoffPlan } from '@/lib/debt-calculator';
import { formatCurrency } from '@/lib/debt-calculator';

interface AmortizationTableProps {
  plan: PayoffPlan;
  lang: string;
  dict: Record<string, string>;
  currency?: string;
}

export default function AmortizationTable({ plan, lang, dict, currency }: AmortizationTableProps) {
  const [expandedDebt, setExpandedDebt] = useState<string | null>(null);
  const fc = (n: number) => formatCurrency(n, lang, currency);

  const toggle = (id: string) => {
    setExpandedDebt(expandedDebt === id ? null : id);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-900">
        {dict.monthlyBreakdown || 'Monthly breakdown'}
      </h3>

      <div className="space-y-2">
        {plan.debts.map((debt) => (
          <div
            key={debt.debtId}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
          >
            {/* Accordion header */}
            <button
              onClick={() => toggle(debt.debtId)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">
                  {debt.debtName || 'Debt'}
                </p>
                <p className="text-xs text-gray-500">
                  {debt.months} {dict.months || 'months'} &middot; {fc(debt.totalInterest)} {dict.interest || 'interest'}
                </p>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  expandedDebt === debt.debtId ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Accordion body */}
            <AnimatePresence>
              {expandedDebt === debt.debtId && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="py-2 text-left font-semibold text-gray-500 pr-4">
                              {dict.monthCol || 'Month'}
                            </th>
                            <th className="py-2 text-right font-semibold text-gray-500 px-2">
                              {dict.paymentCol || 'Payment'}
                            </th>
                            <th className="py-2 text-right font-semibold text-gray-500 px-2">
                              {dict.principalCol || 'Principal'}
                            </th>
                            <th className="py-2 text-right font-semibold text-gray-500 px-2">
                              {dict.interestCol || 'Interest'}
                            </th>
                            <th className="py-2 text-right font-semibold text-gray-500 pl-2">
                              {dict.balanceCol || 'Balance'}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {debt.monthlyPayments.map((p) => (
                            <tr
                              key={p.month}
                              className="border-b border-gray-100 last:border-0"
                            >
                              <td className="py-1.5 text-gray-700 pr-4">
                                {p.month + 1}
                              </td>
                              <td className="py-1.5 text-right text-gray-900 font-medium px-2">
                                {fc(p.payment)}
                              </td>
                              <td className="py-1.5 text-right text-gray-600 px-2">
                                {fc(p.principal)}
                              </td>
                              <td className="py-1.5 text-right text-gray-600 px-2">
                                {fc(p.interest)}
                              </td>
                              <td className="py-1.5 text-right text-gray-900 font-medium pl-2">
                                {fc(p.remainingBalance)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
