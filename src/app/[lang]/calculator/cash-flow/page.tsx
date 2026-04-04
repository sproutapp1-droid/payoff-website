import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getDictionary, hasLocale } from '../../dictionaries';
import CashFlowClient from './client';

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const c = (dict.calculator as any)?.cashflow || {};

  return {
    title: c.metaTitle || 'Free Cash Flow Index Debt Calculator \u2014 Free Up Money Faster | Payoff',
    description:
      c.metaDesc ||
      'The cash flow method targets debts that free up the most monthly cash. See your payoff plan with our free calculator \u2014 no signup required.',
    keywords: [
      'cash flow index debt payoff',
      'cash flow debt method',
      'free up cash flow debt',
      'debt payment to balance ratio',
      'cash flow index calculator',
    ],
    openGraph: {
      title: c.metaTitle || 'Free Cash Flow Index Debt Calculator | Payoff',
      description:
        c.metaDesc ||
        'The cash flow method targets debts that free up the most monthly cash. Free calculator, no signup required.',
      url: `${SITE_URL}/${lang}/calculator/cash-flow`,
      siteName: 'Payoff: Smart Debt Planner',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: c.metaTitle || 'Free Cash Flow Index Debt Calculator | Payoff',
      description:
        c.metaDesc ||
        'Free up cash faster by targeting debts with the highest payment-to-balance ratio. Free calculator, no signup.',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/calculator/cash-flow`,
    },
  };
}

export default async function CashFlowPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return null;
  const dict = await getDictionary(lang);
  const c = (dict.calculator as any)?.cashflow || {};

  const faqs = c.faqs || [
    {
      q: 'What is the Cash Flow Index method?',
      a: 'The Cash Flow Index (CFI) method ranks your debts by how much monthly cash flow each one locks up relative to its balance. You calculate it by dividing each debt\'s balance by its minimum payment. The debt with the lowest index (highest payment relative to balance) gets paid off first, freeing up the most cash the fastest.',
    },
    {
      q: 'How does the Cash Flow Index calculation work?',
      a: 'For each debt, divide the balance by the minimum payment. For example, a $5,000 debt with a $250 payment has a CFI of 20, while a $10,000 debt with a $150 payment has a CFI of 67. You target the lowest CFI first because paying it off frees up the most monthly cash relative to what you spend eliminating it.',
    },
    {
      q: 'When should I use the Cash Flow Index method?',
      a: 'The CFI method is ideal when your budget is tight and you need breathing room fast. By eliminating the debts that consume the most cash flow relative to their size, you quickly free up money that can be redirected to other debts, savings, or essential expenses.',
    },
    {
      q: 'How does Cash Flow Index compare to snowball and avalanche?',
      a: 'The snowball method targets the smallest balance for quick wins. The avalanche method targets the highest interest rate to minimise cost. The Cash Flow Index targets the best payment-to-balance ratio to maximise freed-up cash. If your priority is breathing room in your budget, CFI is often the best choice.',
    },
    {
      q: 'What is a good Cash Flow Index score?',
      a: 'A CFI below 50 means the debt is locking up a lot of cash relative to its size \u2014 these are prime targets for early payoff. A CFI above 100 means the debt is relatively cheap to carry. Most financial advisors suggest tackling debts with the lowest CFI first to maximise cash flow improvement.',
    },
    {
      q: 'Can I combine the Cash Flow Index with other methods?',
      a: 'Absolutely. Many people start with the CFI method to free up cash, then switch to the avalanche method once they have more breathing room. The Payoff app lets you compare all methods side-by-side and even recommends the best strategy based on your personality and debt profile.',
    },
  ];

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Cash Flow Index Debt Calculator',
    description: 'Free cash flow index debt calculator \u2014 see which debts to target first to free up the most monthly cash.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}/${lang}/calculator/cash-flow`,
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Payoff', item: `${SITE_URL}/${lang}` },
      { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${SITE_URL}/${lang}/calculator` },
      { '@type': 'ListItem', position: 3, name: 'Cash Flow Calculator', item: `${SITE_URL}/${lang}/calculator/cash-flow` },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CashFlowClient faqs={faqs} />
    </>
  );
}
