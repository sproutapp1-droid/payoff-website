'use client';

import Link from 'next/link';
import CalculatorPageComponent from '@/components/calculator/CalculatorPage';
import { useDict } from '@/components/i18n/LocaleProvider';

interface AvalancheClientProps {
  faqs: { q: string; a: string }[];
}

export default function AvalancheClient({ faqs }: AvalancheClientProps) {
  const { locale } = useDict();
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const seoContent = (
    <>
      <h2>How the Debt Avalanche Method Works</h2>
      <p>
        The debt avalanche method is the <strong>mathematically optimal</strong> way to pay off
        debt. You list all your debts from <strong>highest interest rate to lowest</strong>, pay
        minimums on everything except the highest-rate debt, and throw every spare penny at that
        one until it&apos;s gone.
      </p>
      <p>
        Once the highest-rate debt is eliminated, you roll its entire payment into the next-highest-rate
        debt. Because you&apos;re always attacking the most expensive debt first, you minimise the total
        interest you pay over the life of your repayment.
      </p>

      <h3>Step-by-Step: Using the Avalanche Method</h3>
      <ol>
        <li><strong>List all your debts</strong> — credit cards, car loans, student loans, medical bills, personal loans.</li>
        <li><strong>Sort by interest rate</strong>, highest to lowest. Ignore balances.</li>
        <li><strong>Pay minimums</strong> on every debt except the one with the highest APR.</li>
        <li><strong>Put all extra money</strong> toward the highest-rate debt.</li>
        <li><strong>When it&apos;s gone</strong>, roll that payment into the next-highest-rate debt.</li>
        <li><strong>Repeat</strong> until you&apos;re debt-free.</li>
      </ol>

      <h3>Why the Avalanche Method Saves You Money</h3>
      <p>
        Interest compounds. A credit card at 24% APR costs you far more per month than a car loan
        at 5%. By eliminating the highest-rate debt first, you stop the most expensive bleeding as
        quickly as possible. The result: less total interest paid, and often a faster overall payoff.
      </p>
      <p>
        The trade-off is patience. If your highest-rate debt also has the largest balance, it may
        take months before you see your first debt disappear. That&apos;s where the{' '}
        <Link href={`${prefix}/calculator/snowball`}>snowball method</Link> has an edge — it gives
        you faster psychological wins.
      </p>

      <h3>Avalanche vs Snowball: Which Should You Choose?</h3>
      <p>
        If you have a wide spread in interest rates (e.g., 5% to 25%), the avalanche method can
        save you hundreds or thousands in interest. If your rates are all similar, the difference
        is minimal and you might prefer the <Link href={`${prefix}/calculator/snowball`}>snowball method</Link>{' '}
        for its motivational benefits.
      </p>
      <p>
        Not sure? <Link href={`${prefix}/`}>Try the Payoff app</Link> — it includes a 60-second
        strategy quiz that recommends the best method for your personality and debt profile. You
        can also compare both methods side-by-side with the what-if simulator.
      </p>
    </>
  );

  return (
    <CalculatorPageComponent
      method="avalanche"
      faqs={faqs}
      seoContent={seoContent}
    />
  );
}
