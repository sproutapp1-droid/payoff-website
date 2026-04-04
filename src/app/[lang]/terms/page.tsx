'use client';

import { useDict } from '@/components/i18n/LocaleProvider';

export default function TermsPage() {
  const { dict } = useDict();
  const t = dict.terms || {};
  const sections = t.sections || [];

  return (
    <main className="relative pt-32 pb-20 px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-28 w-[320px] h-[320px] rounded-full bg-accent opacity-[0.04] blur-[100px]" />
        <div className="absolute -bottom-20 -right-32 w-[350px] h-[350px] rounded-full bg-secondary opacity-[0.04] blur-[110px]" />
        <div className="absolute top-[25%] left-[6%] w-1.5 h-1.5 rounded-full bg-primary/12 animate-pulse" />
        <div className="absolute top-[55%] right-[10%] w-2 h-2 rounded-full bg-accent/15 animate-pulse" style={{ animationDelay: '0.7s' }} />
      </div>

      <div className="relative z-10 prose max-w-3xl mx-auto">
        <h1>{t.title || 'Terms of Service'}</h1>
        <p><em>{t.lastUpdated || 'Last updated: 3 April 2026'}</em></p>
        <p>{t.intro}</p>

        {sections.map((section: { title: string; content?: string; intro?: string; items?: string[] }, i: number) => (
          <div key={i}>
            <h2>{section.title}</h2>
            {section.content && <p>{section.content}</p>}
            {section.intro && <p>{section.intro}</p>}
            {section.items && (
              <ul>
                {section.items.map((item: string, k: number) => (
                  <li key={k}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
