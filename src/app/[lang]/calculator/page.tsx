import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getDictionary, hasLocale } from '../dictionaries';
import CalculatorHubClient from './client';

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const c = (dict.calculator as any) || {};

  return {
    title:
      c.hubMetaTitle ||
      'Free Debt Payoff Calculators — Snowball & Avalanche | Payoff',
    description:
      c.hubMetaDesc ||
      'Calculate your debt-free date with our free snowball and avalanche calculators. Compare strategies, see month-by-month breakdowns, and build your payoff plan — no signup required.',
    keywords: [
      'debt payoff calculator',
      'debt calculator',
      'debt snowball calculator',
      'debt avalanche calculator',
      'debt free date calculator',
      'pay off debt calculator',
      'debt repayment calculator',
      'snowball vs avalanche',
    ],
    openGraph: {
      title:
        c.hubMetaTitle ||
        'Free Debt Payoff Calculators — Snowball & Avalanche | Payoff',
      description:
        c.hubMetaDesc ||
        'See exactly when you\'ll be debt-free. Compare snowball vs avalanche — free, no signup.',
      url: `${SITE_URL}/${lang}/calculator`,
      siteName: 'Payoff: Smart Debt Planner',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title:
        c.hubMetaTitle ||
        'Free Debt Payoff Calculators | Payoff',
      description:
        c.hubMetaDesc ||
        'Calculate your debt-free date with snowball and avalanche methods. Free, no signup required.',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/calculator`,
    },
  };
}

export default async function CalculatorHubPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return null;
  const dict = await getDictionary(lang);
  const c = (dict.calculator as any) || {};

  const faqs = c.hubFaqs || [
    {
      q: 'What is the difference between snowball and avalanche?',
      a: 'The snowball method pays off your smallest debt first for quick psychological wins. The avalanche method targets the highest interest rate first to save the most money. Both accelerate your payoff — the best method depends on your personality.',
    },
    {
      q: 'Are these calculators really free?',
      a: 'Yes, 100% free with no signup required. All calculations happen in your browser — your financial data never leaves your device.',
    },
    {
      q: 'How accurate are the results?',
      a: 'The calculators use the same compound interest formulas that banks use. Results are accurate assuming your balances, rates, and payments stay consistent. For variable-rate debts, re-run the calculator when your rate changes.',
    },
    {
      q: 'How much extra should I pay each month?',
      a: 'Any extra helps. Even $25-50 per month can shave months off your debt-free date. Use the slider to experiment — results update in real time so you can find the sweet spot for your budget.',
    },
    {
      q: 'Can I use these calculators for any type of debt?',
      a: 'Yes — credit cards, student loans, car loans, personal loans, medical debt, mortgages, buy-now-pay-later, and any other debt with a balance and interest rate.',
    },
    {
      q: 'What if I want to track my progress over time?',
      a: 'These web calculators give you a snapshot. For ongoing tracking with payment logging, milestone celebrations, AI coaching, and progress charts, download the free Payoff app for iOS and Android.',
    },
  ];

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Free Debt Payoff Calculators',
    description:
      'Free debt snowball and avalanche calculators — compare strategies, see your payoff date, and build your debt-free plan.',
    url: `${SITE_URL}/${lang}/calculator`,
    mainEntity: [
      {
        '@type': 'WebApplication',
        name: 'Debt Snowball Calculator',
        url: `${SITE_URL}/${lang}/calculator/snowball`,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'WebApplication',
        name: 'Debt Avalanche Calculator',
        url: `${SITE_URL}/${lang}/calculator/avalanche`,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    ],
    author: {
      '@type': 'Organization',
      name: 'Payoff: Smart Debt Planner',
      url: SITE_URL,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq: { q: string; a: string }) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Payoff',
        item: `${SITE_URL}/${lang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Calculators',
        item: `${SITE_URL}/${lang}/calculator`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CalculatorHubClient faqs={faqs} />
    </>
  );
}
