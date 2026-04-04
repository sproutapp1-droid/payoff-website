import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';

export const LOCALES = ['en', 'es', 'pt', 'fr', 'de', 'ja', 'ko', 'zh', 'it'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  es: 'Espanol',
  pt: 'Portugues',
  fr: 'Francais',
  de: 'Deutsch',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese',
  it: 'Italiano',
};

export const LOCALE_NATIVE_NAMES: Record<Locale, string> = {
  en: 'English',
  es: 'Espanol',
  pt: 'Portugues (BR)',
  fr: 'Francais',
  de: 'Deutsch',
  ja: '\u65E5\u672C\u8A9E',
  ko: '\uD55C\uAD6D\uC5B4',
  zh: '\u4E2D\u6587',
  it: 'Italiano',
};

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

export function getLocaleFromHeaders(acceptLanguage: string): Locale {
  try {
    const negotiator = new Negotiator({ headers: { 'accept-language': acceptLanguage } });
    const languages = negotiator.languages();
    return match(languages, LOCALES as unknown as string[], DEFAULT_LOCALE) as Locale;
  } catch {
    return DEFAULT_LOCALE;
  }
}
