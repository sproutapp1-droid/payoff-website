import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About the Payoff Editorial Team',
  description: 'Learn who creates Payoff debt education, how our articles are researched, and the limits of our general financial information.',
  alternates: { canonical: '/blog/about' },
};

export default function AboutEditorialTeamPage() {
  return (
    <main className="pt-32 pb-20 px-4">
      <article className="prose max-w-3xl mx-auto">
        <p className="text-sm font-bold uppercase tracking-wider text-secondary">About our content</p>
        <h1>About the Payoff Editorial Team</h1>
        <p className="lead">
          The Payoff Editorial Team creates practical education about debt payoff methods, calculators, budgeting routines, and the emotional side of managing debt.
        </p>

        <h2>What we do</h2>
        <p>
          We turn payoff calculations and consumer information into plain-English steps. Our goal is to help readers understand their options, prepare better questions, and build a plan they can maintain. Articles are written for education and are not individual financial, legal, tax, credit, or mental-health advice.
        </p>

        <h2>How we research</h2>
        <p>
          We prefer primary sources such as government consumer agencies, regulators, official lender terms, and peer-reviewed research. We label examples as examples, avoid invented statistics, and include important limitations when a calculation depends on assumptions.
        </p>

        <h2>What we do not claim</h2>
        <p>
          We do not claim that one method is right for everyone. We do not invent professional credentials, user outcomes, ratings, or endorsements. Product features and app links may be commercial, but they do not change our commitment to explain tradeoffs clearly.
        </p>

        <h2>Corrections and questions</h2>
        <p>
          If you find a factual error or unclear explanation, please <Link href="/en/contact">contact us</Link>. Read our <Link href="/blog/editorial-policy">editorial policy</Link> for the full process.
        </p>
      </article>
    </main>
  );
}
