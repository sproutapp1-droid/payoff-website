'use client';

import Link from 'next/link';
import { Calculator, ArrowRight } from 'lucide-react';
import { useDict } from '@/components/i18n/LocaleProvider';

export default function CalculatorPage() {
  const { locale, dict } = useDict();
  const c = dict.calculator || {};
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <main className="relative pt-32 pb-20 px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-36 w-[400px] h-[400px] rounded-full bg-primary opacity-[0.05] blur-[120px]" />
        <div className="absolute -bottom-28 -right-32 w-[380px] h-[380px] rounded-full bg-accent opacity-[0.07] blur-[100px]" />
        <div className="absolute top-[30%] right-[8%] w-12 h-12 rounded-full border border-accent/15 animate-float" style={{ animationDelay: '0.3s' }} />
        <div className="absolute bottom-[20%] left-[10%] w-10 h-10 rounded-full border border-primary/10 animate-float" style={{ animationDelay: '1.1s' }} />
        <div className="absolute top-20 right-[25%] w-2 h-2 rounded-full bg-secondary/20 animate-pulse" />
        <div className="absolute bottom-32 left-[30%] w-1.5 h-1.5 rounded-full bg-accent/20 animate-pulse" style={{ animationDelay: '0.9s' }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Calculator className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold mb-4">{c.title || 'Free Debt Payoff Calculator'}</h1>
        <p className="text-lg text-gray-500 mb-8">{c.description || 'Compare snowball vs avalanche, see your debt-free date, and calculate interest savings - all for free, no signup required.'}</p>
        <div className="bg-accent/20 rounded-2xl p-8 mb-8">
          <p className="text-xl font-bold text-gray-900 mb-2">{c.comingSoon || 'Coming Soon'}</p>
          <p className="text-gray-600">{c.comingSoonText || 'Our free web calculator is being built.'}</p>
        </div>
        <Link href={`${prefix}/`} className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all no-underline">
          {c.backToHome || 'Back to homepage'} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
