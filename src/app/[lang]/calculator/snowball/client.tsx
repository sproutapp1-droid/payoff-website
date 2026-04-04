'use client';

import Link from 'next/link';
import CalculatorPageComponent from '@/components/calculator/CalculatorPage';
import { useDict } from '@/components/i18n/LocaleProvider';

interface SnowballClientProps {
  faqs: { q: string; a: string }[];
}

export default function SnowballClient({ faqs }: SnowballClientProps) {
  const { locale } = useDict();
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const seoContent = (
    <>
      <h2>How the Debt Snowball Method Works</h2>
      <p>
        The debt snowball method is one of the most popular debt payoff strategies, popularised by
        Dave Ramsey. The concept is simple: you line up all your debts from <strong>smallest balance
        to largest</strong>, pay minimums on everything except the smallest, and throw every spare
        penny at that smallest debt until it&apos;s gone.
      </p>
      <p>
        Once the smallest debt is paid off, you take its entire payment and add it to the minimum
        payment of the next-smallest debt. This creates a &ldquo;snowball&rdquo; effect — your payment
        to each successive debt gets larger and larger, accelerating your progress.
      </p>

      <h3>Step-by-Step: Using the Snowball Method</h3>
      <ol>
        <li><strong>List all your debts</strong> — credit cards, car loans, student loans, medical bills, personal loans.</li>
        <li><strong>Sort by balance</strong>, smallest to largest. Ignore interest rates.</li>
        <li><strong>Pay minimums</strong> on every debt except the smallest.</li>
        <li><strong>Put all extra money</strong> toward the smallest debt.</li>
        <li><strong>When it&apos;s gone</strong>, roll that payment into the next debt.</li>
        <li><strong>Repeat</strong> until you&apos;re debt-free.</li>
      </ol>

      <h3>Why the Snowball Method Works</h3>
      <p>
        Research from the Harvard Business Review shows that people who focus on small, achievable
        wins are significantly more likely to stick with their debt payoff plan. The snowball method
        leverages this psychology — every time you eliminate a debt, you get a motivational boost that
        keeps you going.
      </p>
      <p>
        While the <Link href={`${prefix}/calculator/avalanche`}>avalanche method</Link> saves more
        on interest mathematically, the snowball method has a higher real-world success rate because
        people actually follow through.
      </p>

      <h3>Snowball vs Avalanche: Which Should You Choose?</h3>
      <p>
        The <Link href={`${prefix}/calculator/avalanche`}>debt avalanche method</Link> targets the
        highest interest rate first, saving you the most money. The snowball targets the smallest
        balance first, giving you the fastest wins. If motivation is your challenge, go snowball. If
        you&apos;re disciplined and want to minimise interest, go avalanche.
      </p>
      <p>
        Not sure? <Link href={`${prefix}/`}>Try the Payoff app</Link> — it includes a 60-second
        strategy quiz that recommends the best method for your personality and debt profile.
      </p>
    </>
  );

  return (
    <CalculatorPageComponent
      method="snowball"
      faqs={faqs}
      seoContent={seoContent}
    />
  );
}
