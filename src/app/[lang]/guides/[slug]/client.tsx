'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  ChevronDown,
  Calculator,
  CheckCircle2,
  Lightbulb,
  ArrowLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Guide } from '@/data/guides';
import { APP_DOWNLOAD_URL, APP_CTA_TEXT, APP_CTA_TEXT_ALT } from '@/lib/constants';

interface GuideClientProps {
  guide: Guide;
  lang: string;
}

/* ────────────────────────────────────────────
   CTA components — all reference the constants
   from lib/constants.ts for easy global swap.
   Search: APP_DOWNLOAD_URL
   ──────────────────────────────────────────── */

function HeroCTA() {
  return (
    <Link
      href={APP_DOWNLOAD_URL}
      className="inline-flex items-center gap-2 bg-primary text-white font-bold text-base px-8 py-4 rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
    >
      <Sparkles className="w-5 h-5" />
      {APP_CTA_TEXT}
      <ArrowRight className="w-5 h-5" />
    </Link>
  );
}

function MidPageCTA({ title, description }: { title: string; description: string }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 sm:p-10 text-white my-12">
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-accent/10 blur-2xl" />

      <div className="relative z-10 max-w-xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Free to start
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold">{title}</h3>
        <p className="text-white/80 text-sm sm:text-base">{description}</p>

        <div className="flex flex-wrap justify-center gap-2 text-xs text-white/70">
          {['AI Coach', '7 Strategies', 'What-If Scenarios', 'Focus Mode', 'Savings Planner'].map(
            (f) => (
              <span key={f} className="bg-white/10 rounded-full px-3 py-1">
                {f}
              </span>
            )
          )}
        </div>

        {/* ===== APP CTA — Replace APP_DOWNLOAD_URL in lib/constants.ts at launch ===== */}
        <Link
          href={APP_DOWNLOAD_URL}
          className="inline-flex items-center gap-2 bg-white text-primary font-bold text-sm sm:text-base px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors mt-2"
        >
          {APP_CTA_TEXT}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function BottomCTA() {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 mt-16 text-center text-white">
      <h3 className="font-extrabold text-2xl mb-2">Ready to create your payoff plan?</h3>
      <p className="text-white/80 mb-5 max-w-lg mx-auto">
        Payoff gives you AI coaching, 7 proven strategies, milestone celebrations, and a savings
        planner — all in one warm, supportive app.
      </p>
      {/* ===== APP CTA — Replace APP_DOWNLOAD_URL in lib/constants.ts at launch ===== */}
      <Link
        href={APP_DOWNLOAD_URL}
        className="inline-block bg-white text-primary rounded-full px-8 py-3 font-bold hover:bg-gray-100 transition no-underline"
      >
        {APP_CTA_TEXT_ALT}
      </Link>
    </div>
  );
}

/* ──────────────────────────────────────────── */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors pr-4">
          {q}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-gray-400">
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 leading-relaxed text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GuideClient({ guide, lang }: GuideClientProps) {
  const prefix = lang === 'en' ? '' : `/${lang}`;

  return (
    <main className="pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href={`${prefix}/`} className="hover:text-primary transition no-underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-600">Guides</span>
          <span>/</span>
          <span className="text-gray-600">{guide.category}</span>
        </nav>

        {/* Category pill */}
        <span className="inline-block bg-primary/10 text-primary text-sm font-bold rounded-full px-4 py-1 mb-4">
          {guide.category}
        </span>

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          {guide.title}
        </h1>

        {/* Definition block — AI-extractable */}
        <p className="text-lg text-gray-700 leading-relaxed font-medium mb-8">
          {guide.definitionBlock}
        </p>

        {/* Hero stat */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-2xl p-6 mb-8">
          <div className="text-3xl font-extrabold text-primary">{guide.heroStat.value}</div>
          <div className="text-sm font-bold text-gray-900 mt-1">{guide.heroStat.label}</div>
          <div className="text-sm text-gray-600 mt-1">{guide.heroStat.description}</div>
        </div>

        {/* ===== HERO CTA — prominent, above the fold ===== */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <HeroCTA />
          <Link
            href={`${prefix}/calculator/${guide.recommendedCalculator}`}
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline no-underline"
          >
            <Calculator className="w-4 h-4" />
            Try the free {guide.recommendedCalculator} calculator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Intro paragraphs */}
        {guide.intro.map((p, i) => (
          <p key={i} className="text-gray-700 leading-relaxed mb-4">
            {p}
          </p>
        ))}

        {/* ===== CALCULATOR CTA ===== */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 my-8">
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-900">
              See your exact payoff date right now
            </p>
            <p className="text-xs text-gray-600 mt-0.5">
              {guide.calculatorReason}
            </p>
          </div>
          <Link
            href={`${prefix}/calculator/${guide.recommendedCalculator}`}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors flex-shrink-0"
          >
            Open Calculator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Step-by-step */}
        <h2 className="text-2xl font-extrabold text-gray-900 mt-12 mb-6">
          Step-by-step plan
        </h2>

        <div className="space-y-6 mb-12">
          {guide.steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                {i + 1}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== MID-PAGE CTA — high visibility ===== */}
        <MidPageCTA
          title="Get a personalised plan in 2 minutes"
          description="The Payoff app builds your complete payoff plan with AI coaching, milestone tracking, and the strategy that matches your personality."
        />

        {/* Tips */}
        <h2 className="text-2xl font-extrabold text-gray-900 mt-12 mb-6">
          Tips for {guide.category.toLowerCase()}
        </h2>

        <div className="space-y-4 mb-12">
          {guide.tips.map((tip, i) => (
            <div key={i} className="flex gap-3 bg-accent/5 border border-accent/10 rounded-xl p-4">
              <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>

        {/* Related calculators */}
        <h2 className="text-2xl font-extrabold text-gray-900 mt-12 mb-6">
          Free calculators
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {guide.relatedCalculators.map((calc) => (
            <Link
              key={calc}
              href={`${prefix}/calculator/${calc}`}
              className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:border-primary/20 hover:shadow-sm transition no-underline group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="font-bold text-gray-900 group-hover:text-primary transition capitalize">
                  {calc} calculator
                </span>
                <span className="block text-xs text-gray-500">Free, no signup</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 ml-auto" />
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-extrabold text-gray-900 mt-12 mb-6">
          Frequently asked questions
        </h2>

        <div className="divide-y divide-gray-200 border-t border-b border-gray-200 mb-12">
          {guide.faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>

        {/* Related posts */}
        {guide.relatedPosts.length > 0 && (
          <>
            <h2 className="text-2xl font-extrabold text-gray-900 mt-12 mb-6">
              Related articles
            </h2>
            <div className="space-y-3 mb-12">
              {guide.relatedPosts.map((slug) => (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className="flex items-center gap-2 p-3 bg-white border border-gray-100 rounded-xl hover:border-primary/20 hover:shadow-sm transition no-underline group"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-medium text-gray-900 group-hover:text-primary transition text-sm capitalize">
                    {slug.replace(/-/g, ' ')}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-300 ml-auto" />
                </Link>
              ))}
            </div>
          </>
        )}

        {/* ===== BOTTOM CTA — final conversion point ===== */}
        <BottomCTA />

        {/* Back link */}
        <div className="mt-8">
          <Link
            href={`${prefix}/`}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition text-sm font-medium no-underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
