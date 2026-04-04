'use client';

import Link from 'next/link';
import CalculatorPageComponent from '@/components/calculator/CalculatorPage';
import { useDict } from '@/components/i18n/LocaleProvider';

interface CashFlowClientProps {
  faqs: { q: string; a: string }[];
}

export default function CashFlowClient({ faqs }: CashFlowClientProps) {
  const { locale } = useDict();
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const seoContent = (
    <>
      <h2>How the Cash Flow Index Method Works</h2>
      <p>
        The Cash Flow Index (CFI) is a debt payoff strategy that prioritises freeing up
        the most <strong>monthly cash flow</strong> as quickly as possible. Instead of focusing on
        the smallest balance (snowball) or the highest interest rate (avalanche), it targets debts
        where your <strong>payment-to-balance ratio</strong> is the highest.
      </p>
      <p>
        The formula is simple: divide each debt&apos;s outstanding balance by its minimum monthly
        payment. The result is the Cash Flow Index. A <strong>lower CFI</strong> means the debt is
        locking up a disproportionate amount of your monthly cash relative to its size &mdash; making
        it the best candidate for early payoff.
      </p>
      <p>
        For example, a $3,000 credit card with a $150 minimum has a CFI of 20, while a $20,000
        student loan with a $200 minimum has a CFI of 100. By paying off the credit card first, you
        free up $150/month for just $3,000 &mdash; a far better cash-flow return than the student loan.
      </p>

      <h3>Step-by-Step: Using the Cash Flow Method</h3>
      <ol>
        <li><strong>List all your debts</strong> with their balances and minimum monthly payments.</li>
        <li><strong>Calculate each CFI</strong> by dividing the balance by the minimum payment.</li>
        <li><strong>Sort from lowest to highest CFI</strong> &mdash; the lowest is your first target.</li>
        <li><strong>Pay minimums</strong> on every debt except the one with the lowest CFI.</li>
        <li><strong>Throw all extra money</strong> at the lowest-CFI debt until it&apos;s eliminated.</li>
        <li><strong>Roll the freed-up payment</strong> into the next-lowest-CFI debt and repeat.</li>
      </ol>

      <h3>Why Choose Cash Flow Over Snowball or Avalanche?</h3>
      <p>
        If your budget is tight and you need <strong>breathing room fast</strong>, the cash flow
        method is often the best choice. The{' '}
        <Link href={`${prefix}/calculator/snowball`}>snowball method</Link> gives quick psychological
        wins, and the <Link href={`${prefix}/calculator/avalanche`}>avalanche method</Link> minimises
        total interest &mdash; but neither is optimised for freeing up the most monthly cash in the
        shortest time.
      </p>
      <p>
        The CFI approach is especially powerful when you have debts with high minimum payments relative
        to their balance (like short-term personal loans or high-payment credit cards). Eliminating
        these first can free up hundreds of dollars per month that you can redirect to other debts,
        an emergency fund, or essential bills.
      </p>

      <h3>Cash Flow Index vs Other Methods</h3>
      <p>
        Each debt payoff method optimises for something different. The{' '}
        <Link href={`${prefix}/calculator/snowball`}>snowball method</Link> optimises for{' '}
        <strong>motivation</strong> (smallest debts first). The{' '}
        <Link href={`${prefix}/calculator/avalanche`}>avalanche method</Link> optimises for{' '}
        <strong>total cost</strong> (highest rates first). The cash flow method optimises for{' '}
        <strong>monthly breathing room</strong> (best payment-to-balance ratio first).
      </p>
      <p>
        Many financial planners recommend starting with the CFI method when you&apos;re feeling
        financially squeezed, then switching to avalanche once you have more margin. Not sure which
        is right for you? <Link href={`${prefix}/`}>Try the Payoff app</Link> &mdash; it includes
        a 60-second strategy quiz that recommends the best method for your personality and debt profile.
      </p>
    </>
  );

  return (
    <CalculatorPageComponent
      method="cashflow"
      faqs={faqs}
      seoContent={seoContent}
    />
  );
}
