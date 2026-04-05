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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Payoff', item: `${SITE_URL}/${lang}` },
      { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${SITE_URL}/${lang}/calculator` },
      { '@type': 'ListItem', position: 3, name: 'Snowball Calculator', item: `${SITE_URL}/${lang}/calculator/snowball` },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Pay Off Debt Using the Snowball Method',
    description:
      'The debt snowball method pays off debts from smallest balance to largest. Each time you eliminate a debt, you roll that payment into the next one — building momentum like a snowball.',
    totalTime: 'PT5M',
    tool: [
      { '@type': 'HowToTool', name: 'Free Debt Snowball Calculator' },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'List all your debts',
        text: 'Write down every debt you owe — credit cards, personal loans, medical bills, student loans. Include the balance, APR, and minimum payment for each.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Sort by balance (smallest to largest)',
        text: 'Arrange your debts from the smallest balance to the largest. Ignore interest rates — the snowball method focuses on balance size for quick psychological wins.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Pay minimums on all debts except the smallest',
        text: 'Continue making minimum payments on every debt except the one with the smallest balance. This keeps all accounts current while focusing your extra money.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Put every spare pound or dollar toward the smallest debt',
        text: 'Direct all extra money beyond minimums to your smallest debt. Even an extra £25-50 per month can dramatically accelerate your payoff date.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Roll the payment into the next debt',
        text: 'When the smallest debt is paid off, take the entire amount you were paying on it (minimum + extra) and add it to the minimum payment of the next-smallest debt.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Repeat until debt-free',
        text: 'Continue rolling payments into the next debt on your list. Each debt you eliminate makes the next one fall faster — that\'s the snowball effect.',
      },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <SnowballClient faqs={faqs} />
    </>
  );
}
