import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getDictionary, hasLocale } from '../../dictionaries';
import AvalancheClient from './client';

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const c = (dict.calculator as any)?.avalanche || {};

  return {
    title: c.metaTitle || 'Free Debt Avalanche Calculator — Save the Most on Interest | Payoff',
    description:
      c.metaDesc ||
      'Calculate your debt-free date with the avalanche method. Target high-interest debt first, see exactly how much you\'ll save — 100% free, no signup.',
    keywords: [
      'debt avalanche calculator',
      'avalanche method calculator',
      'debt payoff calculator',
      'debt avalanche',
      'highest interest first',
      'save money on interest',
      'debt free date calculator',
    ],
    openGraph: {
      title: c.metaTitle || 'Free Debt Avalanche Calculator | Payoff',
      description:
        c.metaDesc ||
        'Calculate your debt-free date with the avalanche method. See your payoff plan instantly — free, no signup.',
      url: `${SITE_URL}/${lang}/calculator/avalanche`,
      siteName: 'Payoff: Smart Debt Planner',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: c.metaTitle || 'Free Debt Avalanche Calculator | Payoff',
      description:
        c.metaDesc ||
        'See exactly when you\'ll be debt-free with the avalanche method. Free calculator, no signup required.',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/calculator/avalanche`,
    },
  };
}

export default async function AvalanchePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return null;
  const dict = await getDictionary(lang);
  const c = (dict.calculator as any)?.avalanche || {};

  const faqs = c.faqs || [
    {
      q: 'What is the debt avalanche method?',
      a: 'The debt avalanche method is a debt payoff strategy where you list all your debts from highest interest rate to lowest, then put every spare penny toward the highest-rate debt first. Once it\'s paid off, you roll that payment into the next-highest-rate debt. This approach minimises the total interest you pay.',
    },
    {
      q: 'Is the avalanche method better than the snowball method?',
      a: 'Mathematically, yes — you\'ll pay less total interest with the avalanche method. However, the snowball method can be more motivating because you see debts disappear faster. The best method is the one you\'ll actually stick with.',
    },
    {
      q: 'How does the avalanche calculator work?',
      a: 'Enter your debts (name, balance, APR, and minimum payment), plus any extra monthly payment. The calculator sorts your debts from highest to lowest interest rate, simulates month-by-month payments, and shows your debt-free date, total interest saved, and a comparison with the snowball method.',
    },
    {
      q: 'Do I need to sign up to use this calculator?',
      a: 'No. This calculator is 100% free with no signup required. All calculations happen in your browser — your financial data never leaves your device.',
    },
    {
      q: 'How much can I save with the avalanche method?',
      a: 'It depends on the spread between your interest rates. If you have debts ranging from 5% to 25% APR, the avalanche method can save you thousands compared to paying minimums only. Use the calculator above to see your exact savings.',
    },
    {
      q: 'What if two debts have the same interest rate?',
      a: 'When two debts have the same APR, the calculator uses the smaller balance as the tiebreaker. This way you free up cash flow sooner without sacrificing any interest savings.',
    },
  ];

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Debt Avalanche Calculator',
    description: 'Free debt avalanche calculator — minimise interest, see your payoff date, and get a month-by-month breakdown.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}/${lang}/calculator/avalanche`,
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
      <AvalancheClient faqs={faqs} />
    </>
  );
}
