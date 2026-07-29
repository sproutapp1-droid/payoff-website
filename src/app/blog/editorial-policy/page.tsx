import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Editorial Policy and Content Standards',
  description: 'How Payoff plans, writes, sources, reviews, updates, and corrects debt education and calculator content.',
  alternates: { canonical: '/blog/editorial-policy' },
};

export default function EditorialPolicyPage() {
  return (
    <main className="pt-32 pb-20 px-4">
      <article className="prose max-w-3xl mx-auto">
        <p className="text-sm font-bold uppercase tracking-wider text-secondary">Content standards</p>
        <h1>Editorial policy</h1>
        <p className="lead">Our content should be useful, accurate, understandable, and honest about what it cannot decide for a reader.</p>

        <h2>Planning and search intent</h2>
        <p>
          Each article should answer one clear reader question. We review existing pages before creating a new one so closely related articles support each other instead of competing for the same search intent.
        </p>

        <h2>Sources and calculations</h2>
        <ul>
          <li>Material factual claims should use current primary or authoritative sources.</li>
          <li>Worked examples must be labelled and must not be presented as guaranteed outcomes.</li>
          <li>Calculators must explain their major assumptions and direct readers to lender information for exact account results.</li>
          <li>Statistics must include a source and relevant date or be removed.</li>
        </ul>

        <h2>Financial safety</h2>
        <p>
          We protect essential costs and required minimum payments in our general guidance. Topics involving arrears, hardship, legal liability, tax, credit reporting, financial abuse, or mental health include a clear limitation and direct readers toward qualified local support when appropriate.
        </p>

        <h2>Commercial independence</h2>
        <p>
          Payoff publishes and promotes its own app. We identify product calls to action clearly. We do not accept payment for editorial rankings and do not fabricate comparisons, reviews, or user results.
        </p>

        <h2>Updates and corrections</h2>
        <p>
          Articles show their publication and update dates. Material corrections should be made promptly. Readers can report an issue through our <Link href="/en/contact">contact page</Link>.
        </p>

        <p>Last reviewed: 29 July 2026.</p>
      </article>
    </main>
  );
}
