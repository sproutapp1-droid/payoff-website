'use client';

import { useState, useCallback } from 'react';
import { Plus, Trash2, Sparkles, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CURRENCIES } from '@/lib/debt-calculator';
import type { WebDebt, CurrencyCode } from '@/lib/debt-calculator';

interface DebtInputFormProps {
  debts: WebDebt[];
  extraPayment: number;
  onDebtsChange: (debts: WebDebt[]) => void;
  onExtraPaymentChange: (amount: number) => void;
  currency: CurrencyCode;
  onCurrencyChange: (code: CurrencyCode) => void;
  dict: Record<string, string>;
  currencySymbol?: string;
  hideExtraPayment?: boolean;
}

const SAMPLE_DEBTS: Omit<WebDebt, 'id'>[] = [
  { name: 'Credit Card', balance: 5000, apr: 19.99, minimumPayment: 150 },
  { name: 'Car Loan', balance: 12000, apr: 6.5, minimumPayment: 280 },
  { name: 'Student Loan', balance: 25000, apr: 4.5, minimumPayment: 300 },
];

let nextId = 1;
function genId() {
  return `debt-${nextId++}-${Date.now()}`;
}

export function createEmptyDebt(): WebDebt {
  return { id: genId(), name: '', balance: 0, apr: 0, minimumPayment: 0 };
}

export function createSampleDebts(): WebDebt[] {
  return SAMPLE_DEBTS.map((d) => ({ ...d, id: genId() }));
}

export default function DebtInputForm({
  debts,
  extraPayment,
  onDebtsChange,
  onExtraPaymentChange,
  currency,
  onCurrencyChange,
  dict,
  currencySymbol = '$',
  hideExtraPayment = false,
}: DebtInputFormProps) {
  const [sliderValue, setSliderValue] = useState(extraPayment);

  const updateDebt = useCallback(
    (id: string, field: keyof WebDebt, value: string | number) => {
      onDebtsChange(
        debts.map((d) =>
          d.id === id
            ? {
                ...d,
                [field]:
                  field === 'name'
                    ? value
                    : Math.max(0, Number(value) || 0),
              }
            : d,
        ),
      );
    },
    [debts, onDebtsChange],
  );

  const addDebt = useCallback(() => {
    if (debts.length >= 10) return;
    onDebtsChange([...debts, createEmptyDebt()]);
  }, [debts, onDebtsChange]);

  const removeDebt = useCallback(
    (id: string) => {
      if (debts.length <= 1) return;
      onDebtsChange(debts.filter((d) => d.id !== id));
    },
    [debts, onDebtsChange],
  );

  const loadSample = useCallback(() => {
    onDebtsChange(createSampleDebts());
  }, [onDebtsChange]);

  const clearAll = useCallback(() => {
    onDebtsChange([createEmptyDebt()]);
    setSliderValue(0);
    onExtraPaymentChange(0);
  }, [onDebtsChange, onExtraPaymentChange]);

  const handleSlider = (val: number) => {
    setSliderValue(val);
    onExtraPaymentChange(val);
  };

  const handleExtraInput = (val: string) => {
    const n = Math.max(0, Number(val) || 0);
    setSliderValue(n > 1000 ? 1000 : n);
    onExtraPaymentChange(n);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">
          {dict.yourDebts || 'Your debts'}
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-red-500 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {dict.clearAll || 'Clear all'}
          </button>
          <button
            onClick={loadSample}
            className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            {dict.loadExample || 'Load example'}
          </button>
        </div>
      </div>

      {/* Currency selector */}
      <div className="flex items-center gap-2">
        <label className="text-xs font-semibold text-gray-500">
          {dict.currency || 'Currency'}
        </label>
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
          className="rounded-xl border-2 border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 bg-gray-50/50 focus:border-primary focus:outline-none transition-colors cursor-pointer"
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Debt rows */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {debts.map((debt, index) => (
            <motion.div
              key={debt.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Debt number pill */}
              <div className="absolute -top-2.5 left-4 bg-primary text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                {index + 1}
              </div>

              {/* Remove button */}
              {debts.length > 1 && (
                <button
                  onClick={() => removeDebt(debt.id)}
                  className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label={dict.removeDebt || 'Remove debt'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                {/* Debt name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    {dict.debtName || 'Debt name'}
                  </label>
                  <input
                    type="text"
                    value={debt.name}
                    onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                    placeholder={dict.debtNamePlaceholder || 'e.g. Credit Card, Car Loan...'}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors bg-gray-50/50"
                  />
                </div>

                {/* Balance */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    {dict.balance || 'Balance'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      {currencySymbol}
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={debt.balance || ''}
                      onChange={(e) => updateDebt(debt.id, 'balance', e.target.value)}
                      placeholder="0"
                      className="w-full rounded-xl border-2 border-gray-200 pl-8 pr-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors bg-gray-50/50"
                    />
                  </div>
                </div>

                {/* APR */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    {dict.apr || 'Interest rate (APR %)'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="99"
                      step="0.1"
                      value={debt.apr || ''}
                      onChange={(e) => updateDebt(debt.id, 'apr', e.target.value)}
                      placeholder="0"
                      className="w-full rounded-xl border-2 border-gray-200 px-4 pr-8 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors bg-gray-50/50"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      %
                    </span>
                  </div>
                </div>

                {/* Minimum payment */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    {dict.minimumPayment || 'Minimum monthly payment'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      {currencySymbol}
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={debt.minimumPayment || ''}
                      onChange={(e) => updateDebt(debt.id, 'minimumPayment', e.target.value)}
                      placeholder="0"
                      className="w-full rounded-xl border-2 border-gray-200 pl-8 pr-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors bg-gray-50/50"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add debt button */}
      {debts.length < 10 && (
        <button
          onClick={addDebt}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 py-3.5 text-sm font-semibold text-gray-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
        >
          <Plus className="w-4 h-4" />
          {dict.addDebt || 'Add another debt'}
        </button>
      )}

      {/* Extra monthly payment */}
      {!hideExtraPayment && (
        <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl p-5 space-y-3">
          <label className="block text-sm font-bold text-gray-900">
            {dict.extraPayment || 'Extra monthly payment'}
          </label>
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0 w-28">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                {currencySymbol}
              </span>
              <input
                type="number"
                min="0"
                step="25"
                value={extraPayment || ''}
                onChange={(e) => handleExtraInput(e.target.value)}
                placeholder="0"
                className="w-full rounded-xl border-2 border-gray-200 pl-8 pr-3 py-2.5 text-sm font-semibold focus:border-primary focus:outline-none transition-colors bg-white"
              />
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="25"
              value={sliderValue}
              onChange={(e) => handleSlider(Number(e.target.value))}
              className="flex-1 h-2 rounded-full appearance-none bg-gray-200 accent-primary cursor-pointer"
            />
          </div>
          <p className="text-xs text-gray-500">
            {dict.extraPaymentHint || 'Any amount above your total minimum payments, applied to the target debt each month.'}
          </p>
        </div>
      )}
    </div>
  );
}
