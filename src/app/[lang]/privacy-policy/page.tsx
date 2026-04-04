'use client';

import { useState, useEffect } from 'react';
import { useDict } from '@/components/i18n/LocaleProvider';
import { LOCALES, LOCALE_NATIVE_NAMES } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

const loaders: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
  en: () => import('../dictionaries/en.json'),
  es: () => import('../dictionaries/es.json'),
  pt: () => import('../dictionaries/pt.json'),
  fr: () => import('../dictionaries/fr.json'),
  de: () => import('../dictionaries/de.json'),
  ja: () => import('../dictionaries/ja.json'),
  ko: () => import('../dictionaries/ko.json'),
  zh: () => import('../dictionaries/zh.json'),
  it: () => import('../dictionaries/it.json'),
};

export default function PrivacyPolicyPage() {
  const { locale, dict } = useDict();
  const [selectedLocale, setSelectedLocale] = useState(locale);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pp, setPp] = useState<any>(dict.privacyPolicy || {});

  useEffect(() => {
    if (selectedLocale === locale) {
      setPp(dict.privacyPolicy || {});
      return;
    }
    loaders[selectedLocale]?.().then((mod) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d = mod.default as any;
      setPp(d.privacyPolicy || {});
    });
  }, [selectedLocale, locale, dict]);

  const sections = pp.sections || [];

  return (
    <main className="relative pt-32 pb-20 px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-32 w-[350px] h-[350px] rounded-full bg-secondary opacity-[0.04] blur-[110px]" />
        <div className="absolute -bottom-28 -left-24 w-[300px] h-[300px] rounded-full bg-accent opacity-[0.05] blur-[100px]" />
        <div className="absolute top-[30%] right-[10%] w-1.5 h-1.5 rounded-full bg-secondary/15 animate-pulse" />
        <div className="absolute top-[60%] left-[8%] w-2 h-2 rounded-full bg-accent/15 animate-pulse" style={{ animationDelay: '0.8s' }} />
      </div>

      <div className="relative z-10 prose max-w-3xl mx-auto">
        {/* Language dropdown */}
        <div className="flex items-center justify-between mb-8 not-prose">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{pp.title || 'Privacy Policy'}</h1>
          <div className="flex items-center gap-2">
            <label htmlFor="pp-lang" className="text-sm text-gray-500 font-medium">
              {pp.languageLabel || 'Language'}:
            </label>
            <select
              id="pp-lang"
              value={selectedLocale}
              onChange={(e) => setSelectedLocale(e.target.value)}
              className="bg-white border border-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
            >
              {LOCALES.map((loc) => (
                <option key={loc} value={loc}>
                  {LOCALE_NATIVE_NAMES[loc as Locale]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p><em>{pp.lastUpdated || 'Last updated: 3 April 2026'}</em></p>
        <p>{pp.intro}</p>

        {sections.map((section: {
          title: string;
          content?: string;
          intro?: string;
          items?: string[];
          subsections?: { title: string; items: string[] }[];
        }, i: number) => (
          <div key={i}>
            <h2>{section.title}</h2>
            {section.content && <p>{section.content}</p>}
            {section.intro && <p>{section.intro}</p>}
            {section.subsections && section.subsections.map((sub, j: number) => (
              <div key={j}>
                <h3>{sub.title}</h3>
                <ul>
                  {sub.items.map((item: string, k: number) => (
                    <li key={k}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
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
