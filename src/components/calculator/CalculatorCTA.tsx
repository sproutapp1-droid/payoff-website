'use client';

import { Sparkles } from 'lucide-react';
import DownloadButtons from '@/components/landing/DownloadButtons';

interface CalculatorCTAProps {
  dict: Record<string, string>;
  locale: string;
  variant?: 'inline' | 'full';
}

export default function CalculatorCTA({ dict, variant = 'full' }: CalculatorCTAProps) {
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
        <DownloadButtons variant="inline" className="flex-shrink-0" />
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

        <div className="pt-2">
          <DownloadButtons variant="light" />
        </div>
      </div>
    </div>
  );
}
