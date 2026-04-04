'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface CalculatorCTAProps {
  dict: Record<string, string>;
  locale: string;
  variant?: 'inline' | 'full';
}

export default function CalculatorCTA({ dict, locale, variant = 'full' }: CalculatorCTAProps) {
  const prefix = locale === 'en' ? '' : `/${locale}`;

  if (variant === 'inline') {
    return (
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900">
            {dict.ctaInlineTitle || 'Want AI coaching on your exact situation?'}
          </p>
          <p className="text-xs text-gray-600 mt-0.5">
            {dict.ctaInlineDesc || 'The Payoff app gives you personalised advice based on your real debt data.'}
          </p>
        </div>
        {/* TODO: Replace /#waitlist with actual app download link at launch */}
        <Link
          href={`${prefix}/#waitlist`}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors flex-shrink-0"
        >
          {dict.ctaInlineButton || 'Join Waitlist'}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 sm:p-10 text-white">
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-accent/10 blur-2xl" />

      <div className="relative z-10 max-w-xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          {dict.ctaBadge || 'Free to start'}
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold">
          {dict.ctaTitle || 'Want the full experience?'}
        </h3>

        <p className="text-white/80 text-sm sm:text-base">
          {dict.ctaDesc || 'AI coaching, 7 strategies, what-if scenarios, savings planner, partner mode, and more — all in one app.'}
        </p>

        <div className="flex flex-wrap justify-center gap-2 text-xs text-white/70">
          {(dict.ctaFeatures || 'AI Coach,7 Strategies,What-If Scenarios,Focus Mode,Partner Hub')
            .split(',')
            .map((f) => (
              <span
                key={f}
                className="bg-white/10 rounded-full px-3 py-1"
              >
                {f.trim()}
              </span>
            ))}
        </div>

        {/* TODO: Replace /#waitlist with actual app download link at launch */}
        <Link
          href={`${prefix}/#waitlist`}
          className="inline-flex items-center gap-2 bg-white text-primary font-bold text-sm sm:text-base px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors mt-2"
        >
          {dict.ctaButton || 'Join the Waitlist'}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
