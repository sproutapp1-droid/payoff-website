'use client';

import Link from 'next/link';
import CalculatorPageComponent from '@/components/calculator/CalculatorPage';
import { useDict } from '@/components/i18n/LocaleProvider';

interface HighestBalanceClientProps {
  faqs: { q: string; a: string }[];
}

export default function HighestBalanceClient({ faqs }: HighestBalanceClientProps) {
  const { locale } = useDict();
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const seoContent = (
    <>
      <h2>How the Highest Balance Method Works</h2>
      <p>
        The highest balance method is a straightforward debt payoff strategy: you target your
        <strong> largest debt first</strong>, regardless of interest rate. You pay the minimum
        on every other debt and direct all extra money toward the one with the biggest balance.
        Once it&apos;s eliminated, you roll that entire payment into the next-largest debt.
      </p>
      <p>
        This approach appeals to people who feel overwhelmed by a single dominant debt. By
        attacking the elephant in the room head-on, you reduce your total outstanding balance
        as aggressively as possible — which can improve your debt-to-income ratio and give you
        a powerful sense of progress.
      </p>

      <h3>When to Use the Highest Balance Method</h3>
      <p>
        The highest balance method makes the most sense in specific scenarios:
      </p>
      <ul>
        <li><strong>Your largest debt also has a high interest rate</strong> — in this case, highest balance and avalanche align, giving you both the psychological and mathematical advantage.</li>
        <li><strong>You need to improve your debt-to-income ratio</strong> — if you&apos;re planning to apply for a mortgage or loan, reducing your largest balance quickly can help your application.</li>
        <li><strong>One debt dominates your portfolio</strong> — if 70%+ of your debt is a single account, targeting it first makes intuitive sense and reduces your overall risk exposure.</li>
        <li><strong>You find large balances stressful</strong> — some people lose sleep over a large number. Eliminating your biggest debt first provides emotional relief, even if it takes longer to see the first payoff.</li>
      </ul>
      <p>
        If none of these scenarios apply, you may be better served by the{' '}
        <Link href={`${prefix}/calculator/snowball`}>snowball method</Link> (for quick wins) or
        the <Link href={`${prefix}/calculator/avalanche`}>avalanche method</Link> (for maximum
        interest savings).
      </p>

      <h3>Highest Balance vs Snowball vs Avalanche</h3>
      <p>
        The <Link href={`${prefix}/calculator/snowball`}>debt snowball</Link> targets the
        smallest balance first — you get frequent wins that keep you motivated. The{' '}
        <Link href={`${prefix}/calculator/avalanche`}>debt avalanche</Link> targets the highest
        interest rate first — you save the most money on interest over time. The highest balance
        method targets the largest balance first — you eliminate your biggest financial burden
        as quickly as possible.
      </p>
      <p>
        In terms of total interest paid, the highest balance method typically falls between
        snowball and avalanche. It can save more than snowball (especially if large debts also
        carry high rates) but usually costs more than a pure avalanche approach. The real
        advantage is psychological — removing your largest debt feels like a massive weight
        off your shoulders.
      </p>
      <p>
        For a balanced approach that blends interest savings with quick wins, consider the{' '}
        <Link href={`${prefix}/calculator/hybrid`}>hybrid method</Link>, which uses a weighted
        score of both interest rate and balance.
      </p>
      <p>
        Not sure which strategy is right for you?{' '}
        <Link href={`${prefix}/`}>Try the Payoff app</Link> — it includes a 60-second strategy
        quiz that recommends the best method for your personality and debt profile.
      </p>
    </>
  );

  return (
    <CalculatorPageComponent
      method="highest_balance"
      faqs={faqs}
      seoContent={seoContent}
    />
  );
}
