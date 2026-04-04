'use client';

import Link from 'next/link';
import { Snowflake, TrendingDown, ArrowRight, Shield, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDict } from '@/components/i18n/LocaleProvider';

export default function CalculatorPage() {
  const { locale, dict } = useDict();
  const c = dict.calculator || {};
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const cards = [
    {
      href: `${prefix}/calculator/snowball`,
      icon: Snowflake,
      title: c.snowballTitle || 'Debt Snowball Calculator',
      desc: c.snowballDesc || 'Pay off the smallest balance first. Build momentum with quick wins that keep you motivated.',
      color: 'from-primary/10 to-primary/5',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      badge: c.snowballBadge || 'Best for motivation',
    },
    {
      href: `${prefix}/calculator/avalanche`,
      icon: TrendingDown,
      title: c.avalancheTitle || 'Debt Avalanche Calculator',
      desc: c.avalancheDesc || 'Pay off the highest interest rate first. Save the most money mathematically.',
      color: 'from-secondary/10 to-secondary/5',
      iconBg: 'bg-secondary/10',
      iconColor: 'text-secondary',
      badge: c.avalancheBadge || 'Best for saving money',
    },
  ];

  return (
    <main className="relative pt-28 pb-20 px-4">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-36 w-[400px] h-[400px] rounded-full bg-primary opacity-[0.05] blur-[120px]" />
        <div className="absolute -bottom-28 -right-32 w-[380px] h-[380px] rounded-full bg-accent opacity-[0.07] blur-[100px]" />
        <div className="absolute top-[30%] right-[8%] w-12 h-12 rounded-full border border-accent/15 animate-float" style={{ animationDelay: '0.3s' }} />
        <div className="absolute bottom-[20%] left-[10%] w-10 h-10 rounded-full border border-primary/10 animate-float" style={{ animationDelay: '1.1s' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            {c.hubTitle || 'Free Debt Payoff Calculators'}
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            {c.hubDesc || 'See exactly when you\'ll be debt-free. Compare strategies, calculate interest savings, and build your payoff plan — 100% free, no signup required.'}
          </p>
        </div>

        {/* Calculator cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {cards.map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={card.href}
                className="group block bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-200 p-6 sm:p-8 hover:shadow-lg hover:border-gray-300 transition-all no-underline"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 ${card.iconBg} rounded-xl flex items-center justify-center`}>
                    <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                    {card.badge}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {card.title}
                </h2>

                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                  {card.desc}
                </p>

                <div className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  {c.openCalculator || 'Open calculator'}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Privacy + trust */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <Shield className="w-3.5 h-3.5" />
          {c.privacyNote || 'Your data stays in your browser. We never see your numbers.'}
        </div>
      </div>
    </main>
  );
}
