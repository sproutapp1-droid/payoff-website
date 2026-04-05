import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getDictionary, hasLocale } from '../../dictionaries';
import HighestBalanceClient from './client';

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const c = (dict.calculator as any)?.highestBalance || {};

  return {
    title: c.metaTitle || 'Free Highest Balance Debt Calculator — Tackle Your Biggest Debt | Payoff',
    description:
      c.metaDesc ||
      'Target your largest debt first with the highest balance method. See your payoff plan with our free calculator — no signup required.',
    keywords: [
      'highest balance debt method',
      'largest debt first',
      'debt payoff biggest first',
      'debt elimination strategy',
    ],
    openGraph: {
      title: c.metaTitle || 'Free Highest Balance Debt Calculator | Payoff',
      description:
        c.metaDesc ||
        'Target your largest debt first with the highest balance method. See your payoff plan — free, no signup.',
      url: `${SITE_URL}/${lang}/calculator/highest-balance`,
      siteName: 'Payoff: Smart Debt Planner',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: c.metaTitle || 'Free Highest Balance Debt Calculator | Payoff',
      description:
        c.metaDesc ||
        'Tackle your biggest debt first. Free highest balance calculator, no signup required.',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/calculator/highest-balance`,
    },
  };
}

export default async function HighestBalancePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return null;
  const dict = await getDictionary(lang);
  const c = (dict.calculator as any)?.highestBalance || {};

  const faqs = c.faqs || [
    {
      q: 'What is the highest balance debt method?',
      a: 'The highest balance method is a debt payoff strategy where you target your largest debt first, regardless of interest rate. You pay minimums on all other debts and put every spare penny toward the one with the biggest balance. Once it\'s eliminated, you move to the next-largest debt.',
    },
    {
      q: 'When should you use the highest balance method?',
      a: 'The highest balance method works best when your largest debts also happen to have high interest rates, or when you find psychological relief in eliminating your biggest financial burden first. It\'s also useful if you want to reduce your total outstanding debt as quickly as possible for credit score or loan qualification purposes.',
    },
    {
      q: 'How does highest balance compare to the snowball method?',
      a: 'The snowball method targets the smallest balance first for quick motivational wins. The highest balance method does the opposite — it tackles the largest debt first. Snowball gives you more frequent wins; highest balance gives you the satisfaction of eliminating your biggest burden early.',
    },
    {
      q: 'Is the highest balance method good for saving on interest?',
      a: 'Not necessarily. If your largest debt also has the highest interest rate, you\'ll save on interest. But if your largest debt has a low rate, you could end up paying more in total interest than with the avalanche method. Use the calculator to compare your specific numbers.',
    },
    {
      q: 'Do I need to sign up to use this calculator?',
      a: 'No. This calculator is 100% free with no signup required. All calculations happen in your browser — your financial data never leaves your device.',
    },
    {
      q: 'What if I have multiple debts with similar balances?',
      a: 'When two debts have similar balances, the calculator uses interest rate as a tiebreaker — the one with the higher APR is targeted first. This ensures you\'re still making smart choices even when balances are close.',
    },
  ];

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Highest Balance Debt Calculator',
    description: 'Free highest balance debt calculator — target your largest debt first and see your complete payoff plan.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}/${lang}/calculator/highest-balance`,
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
      { '@type': 'ListItem', position: 3, name: 'Highest Balance Calculator', item: `${SITE_URL}/${lang}/calculator/highest-balance` },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Pay Off Debt Using the Highest Balance Method',
    description: 'The highest balance method tackles your largest debt first, eliminating the biggest source of financial stress and reducing your total debt most dramatically with each payoff.',
    totalTime: 'PT5M',
    step: [
      { '@type': 'HowToStep', name: 'List all your debts', text: 'Write down every debt with its balance, APR, and minimum payment.' },
      { '@type': 'HowToStep', name: 'Sort by balance (largest first)', text: 'Arrange debts from highest balance to lowest. This method targets the elephant in the room first.' },
      { '@type': 'HowToStep', name: 'Pay minimums on all except the largest', text: 'Keep all accounts current while focusing your firepower on the biggest debt.' },
      { '@type': 'HowToStep', name: 'Direct all extra payments to the largest debt', text: 'Put every spare pound toward your biggest balance. Progress may feel slow at first, but the payoff is dramatic.' },
      { '@type': 'HowToStep', name: 'Roll payments into the next largest', text: 'When the biggest debt falls, roll that entire payment into the next-largest. Momentum builds fast from here.' },
      { '@type': 'HowToStep', name: 'Watch your total debt drop fastest', text: 'Each payoff removes a larger chunk of your total debt than any other method.' },
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
      <HighestBalanceClient faqs={faqs} />
    </>
  );
}
