'use client';

import Link from 'next/link';
import CalculatorPageComponent from '@/components/calculator/CalculatorPage';
import { useDict } from '@/components/i18n/LocaleProvider';

interface HybridClientProps {
  faqs: { q: string; a: string }[];
}

export default function HybridClient({ faqs }: HybridClientProps) {
  const { locale } = useDict();
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const seoContent = (
    <>
      <h2>How the Debt Hybrid Method Works</h2>
      <p>
        The debt hybrid method takes the best of both worlds: the <strong>motivational quick
        wins</strong> of the snowball method and the <strong>interest savings</strong> of the
        avalanche method. Instead of sorting purely by balance or purely by interest rate, it
        uses a weighted scoring system — <strong>60% interest rate, 40% balance</strong> — to
        decide which debt to attack first.
      </p>
      <p>
        This means a small, high-rate credit card would rank near the top (it scores well on
        both factors), while a large, low-rate mortgage would rank near the bottom. The result
        is a payoff order that feels rewarding without ignoring the maths.
      </p>

      <h3>Step-by-Step: Using the Hybrid Method</h3>
      <ol>
        <li><strong>List all your debts</strong> — credit cards, car loans, student loans, medical bills, personal loans.</li>
        <li><strong>Score each debt</strong> using 60% weight on interest rate and 40% weight on balance (the calculator does this for you).</li>
        <li><strong>Pay minimums</strong> on every debt except the one with the highest composite score.</li>
        <li><strong>Put all extra money</strong> toward the top-scored debt.</li>
        <li><strong>When it&apos;s gone</strong>, roll that payment into the next debt on the list.</li>
        <li><strong>Repeat</strong> until you&apos;re debt-free.</li>
      </ol>

      <h3>Why the Hybrid Method Is the Best of Both Worlds</h3>
      <p>
        Many people struggle to choose between the{' '}
        <Link href={`${prefix}/calculator/snowball`}>snowball method</Link> and the{' '}
        <Link href={`${prefix}/calculator/avalanche`}>avalanche method</Link>. The snowball
        gives you quick wins but can cost more in interest. The avalanche saves the most money
        but can feel slow when your highest-rate debt has a large balance.
      </p>
      <p>
        The hybrid method solves this dilemma. By weighting interest rate at 60% and balance at
        40%, it naturally prioritises debts that are both expensive and achievable. You still get
        the satisfaction of eliminating debts relatively quickly, while saving significantly more
        interest than the snowball approach alone.
      </p>
      <p>
        In practice, the hybrid method typically saves <strong>70-90% of the interest</strong> that
        a pure avalanche would save, while delivering your first payoff almost as fast as the
        snowball. It&apos;s the strategy for people who want a pragmatic, balanced approach.
      </p>

      <h3>Hybrid vs Snowball vs Avalanche</h3>
      <p>
        The <Link href={`${prefix}/calculator/snowball`}>debt snowball</Link> sorts by smallest
        balance first — great for motivation, but you may pay more interest. The{' '}
        <Link href={`${prefix}/calculator/avalanche`}>debt avalanche</Link> sorts by highest
        interest rate first — optimal for savings, but can feel slow. The hybrid blends both
        signals into a single ranking, giving you a payoff order that&apos;s neither purely
        emotional nor purely mathematical.
      </p>
      <p>
        If you have debts with widely varying rates <em>and</em> widely varying balances, the
        hybrid method often produces a noticeably different (and better-feeling) payoff order
        than either pure strategy. Try all three calculators to see which plan resonates with you.
      </p>
      <p>
        Still unsure? <Link href={`${prefix}/`}>Try the Payoff app</Link> — it includes a
        60-second strategy quiz that recommends the best method for your personality and debt profile.
      </p>
    </>
  );

  return (
    <CalculatorPageComponent
      method="hybrid"
      faqs={faqs}
      seoContent={seoContent}
    />
  );
}
