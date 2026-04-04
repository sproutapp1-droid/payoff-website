import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getDictionary, hasLocale } from '../../dictionaries';
import SnowballClient from './client';

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const c = (dict.calculator as any)?.snowball || {};

  return {
    title: c.metaTitle || 'Free Debt Snowball Calculator — See Your Payoff Date | Payoff',
    description:
      c.metaDesc ||
      'Calculate your debt-free date with the snowball method. Enter your debts, see a month-by-month payoff plan, and compare with avalanche — 100% free, no signup.',
    keywords: [
      'debt snowball calculator',
      'snowball method calculator',
      'debt payoff calculator',
      'debt snowball',
      'pay off debt',
      'smallest balance first',
      'debt free date calculator',
    ],
    openGraph: {
      title: c.metaTitle || 'Free Debt Snowball Calculator | Payoff',
      description:
        c.metaDesc ||
        'Calculate your debt-free date with the snowball method. See your payoff plan instantly — free, no signup.',
      url: `${SITE_URL}/${lang}/calculator/snowball`,
      siteName: 'Payoff: Smart Debt Planner',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: c.metaTitle || 'Free Debt Snowball Calculator | Payoff',
      description:
        c.metaDesc ||
        'See exactly when you\'ll be debt-free with the snowball method. Free calculator, no signup required.',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/calculator/snowball`,
    },
  };
}

export default async function SnowballPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return null;
  const dict = await getDictionary(lang);
  const c = (dict.calculator as any)?.snowball || {};

  const faqs = c.faqs || [
    {
      q: 'What is the debt snowball method?',
      a: 'The debt snowball method is a debt payoff strategy where you list all your debts from smallest balance to largest, then put every spare penny toward the smallest debt first. Once it\'s paid off, you roll that payment into the next-smallest debt — building momentum like a snowball rolling downhill.',
    },
    {
      q: 'Is the snowball method better than the avalanche method?',
      a: 'It depends on your goals. The snowball method is better for motivation — you see debts disappear faster, which keeps you going. The avalanche method saves more money on interest. Many people succeed with snowball because the psychological wins matter more than the math.',
    },
    {
      q: 'How does the snowball calculator work?',
      a: 'Enter your debts (name, balance, APR, and minimum payment), plus any extra monthly payment you can afford. The calculator sorts your debts from smallest to largest balance, simulates month-by-month payments, and shows your debt-free date, total interest, and a comparison with the avalanche method.',
    },
    {
      q: 'Do I need to sign up to use this calculator?',
      a: 'No. This calculator is 100% free with no signup required. All calculations happen in your browser — your financial data never leaves your device.',
    },
    {
      q: 'How much extra should I pay each month?',
      a: 'Any extra helps! Even $25-50 per month can shave months or years off your debt. Use the slider to experiment — the results update in real time so you can see the impact instantly.',
    },
    {
      q: 'What if my minimum payment doesn\'t cover the interest?',
      a: 'The calculator will detect this (called negative amortization) and show a warning. It automatically adjusts the payment so the debt can still be paid off, but you should contact your lender to discuss your options.',
    },
  ];

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Debt Snowball Calculator',
    description: 'Free debt snowball calculator — see your payoff date, total interest, and month-by-month breakdown.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}/${lang}/calculator/snowball`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SnowballClient faqs={faqs} />
    </>
  );
}
