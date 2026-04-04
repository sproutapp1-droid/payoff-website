'use client';

import Link from 'next/link';
import { Snowflake, TrendingDown, ArrowRight, Shield, Calculator, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDict } from '@/components/i18n/LocaleProvider';

interface CalculatorHubClientProps {
  faqs: { q: string; a: string }[];
}

export default function CalculatorHubClient({ faqs }: CalculatorHubClientProps) {
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
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-16">
          <Shield className="w-3.5 h-3.5" />
          {c.privacyNote || 'Your data stays in your browser. We never see your numbers.'}
        </div>

        {/* How it works section */}
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
            How Our Debt Calculators Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Enter your debts', desc: 'Add your balances, interest rates, and minimum payments. Works with credit cards, student loans, car loans, medical debt — any type.' },
              { step: '2', title: 'Set your extra budget', desc: 'Tell us how much extra you can pay each month. Even £25 makes a difference — the calculator shows you exactly how much.' },
              { step: '3', title: 'See your payoff plan', desc: 'Get your debt-free date, total interest cost, month-by-month breakdown, and a comparison between snowball and avalanche.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-center"
              >
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* App CTA — clear call to action */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 sm:p-10 text-white mb-16">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-accent/10 blur-2xl" />

          <div className="relative z-10 max-w-xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Free to start
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Ready to actually pay off your debt?
            </h2>

            <p className="text-white/80 text-sm sm:text-base">
              These calculators show you the plan. The Payoff app helps you follow through — with AI coaching, payment tracking, milestone celebrations, and a strategy quiz that matches your personality.
            </p>

            <div className="flex flex-wrap justify-center gap-2 text-xs text-white/70">
              {['AI Coach', '7 Strategies', 'Payment Tracking', 'Focus Mode', 'Partner Hub'].map((f) => (
                <span key={f} className="bg-white/10 rounded-full px-3 py-1">{f}</span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href={`${prefix}/`}
                className="inline-flex items-center gap-2 bg-white text-primary font-bold text-sm sm:text-base px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors"
              >
                Download Payoff — It&apos;s Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-white/60 pt-1">
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> No bank access needed</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> iOS &amp; Android</span>
            </div>
          </div>
        </div>

        {/* Snowball vs Avalanche comparison content */}
        <div className="max-w-3xl mx-auto prose prose-gray prose-headings:font-extrabold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary prose-a:no-underline hover:prose-a:underline mb-16">
          <h2>Snowball vs Avalanche: Which Debt Payoff Method Is Right for You?</h2>
          <p>
            The two most popular debt payoff strategies are the <Link href={`${prefix}/calculator/snowball`}>debt snowball method</Link> and
            the <Link href={`${prefix}/calculator/avalanche`}>debt avalanche method</Link>. Both work — but they suit different personalities.
          </p>

          <h3>The Debt Snowball Method</h3>
          <p>
            You pay off debts from <strong>smallest balance to largest</strong>, regardless of interest rate.
            When the smallest debt is gone, you roll its payment into the next one. The momentum builds like a snowball rolling downhill.
          </p>
          <p>
            <strong>Best for:</strong> People who need quick wins to stay motivated. Research from the Harvard Business Review
            shows that focusing on small, achievable goals significantly increases follow-through rates.
          </p>

          <h3>The Debt Avalanche Method</h3>
          <p>
            You pay off debts from <strong>highest interest rate to lowest</strong>. This saves the most money
            mathematically because you eliminate the most expensive debt first.
          </p>
          <p>
            <strong>Best for:</strong> People who are disciplined and motivated by saving money on interest,
            even if the first payoff takes longer.
          </p>

          <h3>Not Sure? Try Both</h3>
          <p>
            Use our free calculators to run your debts through both methods. The results page automatically compares
            the two — showing how much time and interest you&apos;d save with each. Many people are surprised by how small
            the difference is (or isn&apos;t).
          </p>
          <p>
            If you want a personalised recommendation, the <Link href={`${prefix}/`}>Payoff app</Link> includes
            a 60-second strategy quiz that matches you with the best method based on your personality, stress levels, and debt profile.
          </p>
        </div>

        {/* FAQ */}
        {faqs.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden group"
                >
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                    <span className="text-sm font-semibold text-gray-900 pr-4">{faq.q}</span>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
