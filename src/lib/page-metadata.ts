import type { Metadata } from 'next';
import { LOCALES } from '@/lib/i18n';
import { SITE_URL } from '@/lib/constants';

export function localizedPageMetadata(
  lang: string,
  path: string,
  title: string,
  description: string,
  noIndex = false,
): Metadata {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = `${SITE_URL}/${locale}/${path}`;
  }
  languages['x-default'] = `${SITE_URL}/en/${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/${path}`,
      languages,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
