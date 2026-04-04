'use client';

import { useState, useMemo, useCallback } from 'react';
import { Shield, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDict } from '@/components/i18n/LocaleProvider';
import DebtInputForm, { createEmptyDebt } from './DebtInputForm';
import CalculatorResults from './CalculatorResults';
import CalculatorCTA from './CalculatorCTA';
import { generatePayoffPlan, getDefaultCurrency, getCurrencySymbol } from '@/lib/debt-calculator';
import type { WebDebt, StrategyMethod, CurrencyCode } from '@/lib/debt-calculator';

interface FAQ {
  q: string;
  a: string;
}

interface CalculatorPageProps {
  method: StrategyMethod;
  faqs: FAQ[];
  seoContent: React.ReactNode;
}

export default function CalculatorPageComponent({
  method,
  faqs,
  seoContent,
}: CalculatorPageProps) {
  const { locale, dict } = useDict();
  const c = dict.calculator || {};
  const f = c.form || {};
  const r = c.results || {};
  const m = method === 'snowball' ? c.snowball || {} : c.avalanche || {};
  const cta = c.cta || {};

  const [debts, setDebts] = useState<WebDebt[]>([createEmptyDebt()]);
  const [extraPayment, setExtraPayment] = useState(0);
  const [currency, setCurrency] = useState<CurrencyCode>(getDefaultCurrency(locale));
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const otherMethod: StrategyMethod = method === 'snowball' ? 'avalanche' : 'snowball';

  const hasValidDebts = debts.some(
    (d) => d.balance > 0 && d.minimumPayment > 0,
  );

  const plan = useMemo(() => {
    if (!hasValidDebts) return null;
    const valid = debts.filter((d) => d.balance > 0 && d.minimumPayment > 0);
    return generatePayoffPlan(valid, extraPayment, method);
  }, [debts, extraPayment, method, hasValidDebts]);

  const otherPlan = useMemo(() => {
    if (!hasValidDebts) return null;
    const valid = debts.filter((d) => d.balance > 0 && d.minimumPayment > 0);
    return generatePayoffPlan(valid, extraPayment, otherMethod);
  }, [debts, extraPayment, otherMethod, hasValidDebts]);

  const handleDebtsChange = useCallback((newDebts: WebDebt[]) => {
    setDebts(newDebts);
  }, []);

  const handleExtraChange = useCallback((amount: number) => {
    setExtraPayment(amount);
  }, []);

  const currencySymbol = getCurrencySymbol(currency);

  const handleCurrencyChange = useCallback((code: CurrencyCode) => {
    setCurrency(code);
  }, []);

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
            {m.title || `Free Debt ${method === 'snowball' ? 'Snowball' : 'Avalanche'} Calculator`}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {m.heroText || `See exactly when you'll be debt-free using the ${method} method. Add your debts below — results update instantly.`}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-3">
            <Shield className="w-3.5 h-3.5" />
            {c.privacy || 'Your data stays in your browser. We never see your numbers.'}
          </div>
        </div>

        {/* Two-column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Input column */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <DebtInputForm
                debts={debts}
                extraPayment={extraPayment}
                onDebtsChange={handleDebtsChange}
                onExtraPaymentChange={handleExtraChange}
                currency={currency}
                onCurrencyChange={handleCurrencyChange}
                dict={f}
                currencySymbol={currencySymbol}
              />
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
                  otherMethod={otherMethod}
                  otherMethodPlan={otherPlan}
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
                      {method === 'snowball' ? '\u2744\uFE0F' : '\u26A1'}
                    </span>
                  </div>
                  <p className="text-sm font-medium">
                    {c.emptyState || 'Add your debts to see your payoff plan'}
                  </p>
                  <p className="text-xs">
                    {c.emptyStateHint || 'Enter at least one debt with a balance and minimum payment.'}
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
