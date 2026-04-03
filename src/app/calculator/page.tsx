import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Debt Payoff Calculator',
  description: 'Free debt payoff calculator — compare snowball vs avalanche methods, see your debt-free date, and calculate how much interest you can save. No signup required.',
};

export default function CalculatorPage() {
  return (
    <main className="pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Calculator className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold mb-4">
          Free Debt Payoff Calculator
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Compare snowball vs avalanche, see your debt-free date, and calculate interest savings — all for free, no signup required.
        </p>
        <div className="bg-accent/20 rounded-2xl p-8 mb-8">
          <p className="text-xl font-bold text-gray-900 mb-2">Coming Soon</p>
          <p className="text-gray-600">
            Our free web calculator is being built. In the meantime, the Payoff app includes a full debt calculator with 7 strategies and what-if scenarios.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all no-underline"
        >
          Back to homepage <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
