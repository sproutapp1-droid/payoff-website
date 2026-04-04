'use client';

import Link from 'next/link';
import { Snowflake, TrendingDown, ArrowRight, Shield, Calculator, Sparkles, CheckCircle, Blend, BarChart3, Banknote, CalendarClock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDict } from '@/components/i18n/LocaleProvider';

interface CalculatorHubClientProps {
  faqs: { q: string; a: string }[];
}

export default function CalculatorHubClient({ faqs }: CalculatorHubClientProps) {
  const { locale, dict } = useDict();
  const c = dict.calculator || {};
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const popularCards = [
    {
      href: `${prefix}/calculator/snowball`,
      icon: Snowflake,
      title: c.snowballTitle || 'Debt Snowball Calculator',
      desc: c.snowballDesc || 'Pay off the smallest balance first. Build momentum with quick wins that keep you motivated.',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      badge: c.snowballBadge || 'Best for motivation',
    },
    {
      href: `${prefix}/calculator/avalanche`,
      icon: TrendingDown,
      title: c.avalancheTitle || 'Debt Avalanche Calculator',
      desc: c.avalancheDesc || 'Pay off the highest interest rate first. Save the most money mathematically.',
      iconBg: 'bg-secondary/10',
      iconColor: 'text-secondary',
      badge: c.avalancheBadge || 'Best for saving money',
    },
  ];

  const moreCards = [
    {
      href: `${prefix}/calculator/hybrid`,
      icon: Blend,
      title: c.hybridTitle || 'Debt Hybrid Calculator',
      desc: c.hybridDesc || 'A smart blend of snowball and avalanche — balance quick wins with interest savings.',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      badge: c.hybridBadge || 'Best of both worlds',
    },
    {
      href: `${prefix}/calculator/cash-flow`,
      icon: Banknote,
      title: c.cashflowTitle || 'Cash Flow Index Calculator',
      desc: c.cashflowDesc || 'Free up monthly cash flow fastest by targeting debts with the highest payment-to-balance ratio.',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
      badge: c.cashflowBadge || 'Best for tight budgets',
    },
    {
      href: `${prefix}/calculator/highest-balance`,
      icon: BarChart3,
      title: c.highestBalanceTitle || 'Highest Balance Calculator',
      desc: c.highestBalanceDesc || 'Tackle your largest debt head-on. Face the biggest challenge first and everything else feels easy.',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      badge: c.highestBalanceBadge || 'Best for big debts',
    },
    {
      href: `${prefix}/calculator/deadline`,
      icon: CalendarClock,
      title: c.deadlineTitle || 'Debt-Free By Date Calculator',
      desc: c.deadlineDesc || 'Pick your target debt-free date and find out exactly how much extra you need to pay each month.',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-600',
      badge: c.deadlineBadge || 'Set your target',
    },
  ];

  const CalculatorCard = ({ card, index }: { card: typeof popularCards[0]; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Link
        href={card.href}
        className="group block bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-200 p-6 sm:p-8 hover:shadow-lg hover:border-gray-300 transition-all no-underline h-full"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-11 h-11 ${card.iconBg} rounded-xl flex items-center justify-center`}>
            <card.icon className={`w-5 h-5 ${card.iconColor}`} />
          </div>
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-full px-3 py-1">
            {card.badge}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {card.title}
        </h3>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          {card.desc}
        </p>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
          {c.openCalculator || 'Open calculator'}
          <ArrowRight className="w-4 h-4" />
        </div>
      </Link>
    </motion.div>
  );

  return (
    <main className="relative pt-28 pb-20 px-4">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-36 w-[400px] h-[400px] rounded-full bg-primary opacity-[0.05] blur-[120px]" />
        <div className="absolute -bottom-28 -right-32 w-[380px] h-[380px] rounded-full bg-accent opacity-[0.07] blur-[100px]" />
        <div className="absolute top-[30%] right-[8%] w-12 h-12 rounded-full border border-accent/15 animate-float" style={{ animationDelay: '0.3s' }} />
        <div className="absolute bottom-[20%] left-[10%] w-10 h-10 rounded-full border border-primary/10 animate-float" style={{ animationDelay: '1.1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            {c.hubTitle || 'Free Debt Payoff Calculators'}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {c.hubDesc || '6 free calculators for 6 different debt payoff strategies. Compare methods, see your debt-free date, and build a plan that fits your personality — no signup required.'}
          </p>
        </div>

        {/* Most popular */}
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Most Popular</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {popularCards.map((card, i) => (
            <CalculatorCard key={card.href} card={card} index={i} />
          ))}
        </div>

        {/* More strategies */}
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">More Strategies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {moreCards.map((card, i) => (
            <CalculatorCard key={card.href} card={card} index={i + 2} />
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
              { step: '2', title: 'Choose a strategy', desc: 'Pick from 6 methods — or try them all. Each calculator shows how that strategy orders your debts and what it costs in interest.' },
              { step: '3', title: 'See your payoff plan', desc: 'Get your debt-free date, total interest, month-by-month breakdown, and a side-by-side comparison with other methods.' },
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

        {/* App CTA */}
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

        {/* Strategy comparison content */}
        <div className="max-w-3xl mx-auto prose prose-gray prose-headings:font-extrabold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary prose-a:no-underline hover:prose-a:underline mb-16">
          <h2>Which Debt Payoff Strategy Is Right for You?</h2>
          <p>
            There&apos;s no single best way to pay off debt. The right strategy depends on your personality,
            your budget, and what keeps you motivated. Here&apos;s a quick guide to all six methods:
          </p>

          <h3>Snowball — Quick wins, big momentum</h3>
          <p>
            The <Link href={`${prefix}/calculator/snowball`}>debt snowball method</Link> pays off your smallest
            balance first. Each time you eliminate a debt, you roll that payment into the next one. Research shows
            this approach has the highest real-world success rate because the psychological wins keep you going.
          </p>

          <h3>Avalanche — Maximum interest savings</h3>
          <p>
            The <Link href={`${prefix}/calculator/avalanche`}>debt avalanche method</Link> targets your highest
            interest rate first. It&apos;s the mathematically optimal approach — you&apos;ll pay the least total
            interest. Best for disciplined savers who are motivated by numbers.
          </p>

          <h3>Hybrid — Best of both worlds</h3>
          <p>
            The <Link href={`${prefix}/calculator/hybrid`}>hybrid method</Link> uses a weighted score (60% interest
            rate, 40% balance size) to blend the benefits of both snowball and avalanche. You get some quick wins
            without sacrificing too much in interest savings.
          </p>

          <h3>Cash Flow Index — Free up cash fastest</h3>
          <p>
            The <Link href={`${prefix}/calculator/cash-flow`}>cash flow index method</Link> prioritises debts
            by their payment-to-balance ratio. By eliminating debts that consume the most cash relative to their
            size, you free up monthly breathing room faster. Ideal if you&apos;re on a tight budget.
          </p>

          <h3>Highest Balance — Face the mountain</h3>
          <p>
            The <Link href={`${prefix}/calculator/highest-balance`}>highest balance method</Link> tackles your
            biggest debt first. Once the mountain is gone, everything else feels manageable. This works well when
            one large debt is causing most of your stress.
          </p>

          <h3>Deadline — Reverse-engineer your plan</h3>
          <p>
            The <Link href={`${prefix}/calculator/deadline`}>deadline calculator</Link> flips the question: instead
            of &ldquo;when will I be debt-free?&rdquo;, you ask &ldquo;how much do I need to pay to be debt-free
            by [date]?&rdquo; Set a wedding, birthday, or retirement date and get the exact monthly payment required.
          </p>

          <h3>Not sure which to choose?</h3>
          <p>
            Try running your debts through all six calculators — it takes 30 seconds since your data carries over.
            Or download the <Link href={`${prefix}/`}>free Payoff app</Link> and take the 60-second strategy quiz
            that matches you with the best method based on your personality and debt profile.
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
