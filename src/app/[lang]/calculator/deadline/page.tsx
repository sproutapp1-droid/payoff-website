import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getDictionary, hasLocale } from '../../dictionaries';
import DeadlineClient from './client';

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const c = (dict.calculator as any)?.deadline || {};

  return {
    title: c.metaTitle || 'Free Debt-Free By Date Calculator \u2014 Set Your Target | Payoff',
    description:
      c.metaDesc ||
      'Pick your target debt-free date and see exactly how much extra you need to pay each month. Reverse-engineer your payoff plan \u2014 free, no signup.',
    keywords: [
      'debt free by date calculator',
      'debt payoff target date',
      'when will I be debt free',
      'how much to pay to be debt free by',
      'debt free date calculator',
    ],
    openGraph: {
      title: c.metaTitle || 'Free Debt-Free By Date Calculator | Payoff',
      description:
        c.metaDesc ||
        'Pick your target debt-free date and see how much extra to pay monthly. Free calculator, no signup.',
      url: `${SITE_URL}/${lang}/calculator/deadline`,
      siteName: 'Payoff: Smart Debt Planner',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: c.metaTitle || 'Free Debt-Free By Date Calculator | Payoff',
      description:
        c.metaDesc ||
        'Reverse-engineer your debt-free date. See exactly how much extra to pay each month. Free, no signup.',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/calculator/deadline`,
    },
  };
}

export default async function DeadlinePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return null;
  const dict = await getDictionary(lang);
  const c = (dict.calculator as any)?.deadline || {};

  const faqs = c.faqs || [
    {
      q: 'How does the debt-free by date calculator work?',
      a: 'You enter your debts and pick a target date for when you want to be completely debt-free. The calculator then reverse-engineers the math \u2014 it uses a binary search algorithm to find the exact extra monthly payment needed to hit your target. It simulates month-by-month payments and adjusts until the payoff date matches your goal.',
    },
    {
      q: 'What if my target date is too aggressive?',
      a: 'If the required extra payment is unrealistically high (for example, more than your total debt divided by the number of months), the calculator will still show you the number \u2014 but it\u2019s a signal to push your target date out. Try extending by 6\u201312 months and see how the required payment drops.',
    },
    {
      q: 'Can I adjust the target date after seeing results?',
      a: 'Yes. Simply change the month and year in the date picker and the results update instantly. This lets you experiment \u2014 see the difference between being debt-free in 2 years versus 3 years, and choose a target that fits your budget.',
    },
    {
      q: 'Is the deadline method the fastest way to become debt-free?',
      a: 'The deadline method isn\u2019t a payoff strategy like snowball or avalanche \u2014 it\u2019s a planning tool. It tells you how much you need to pay, and then uses the avalanche ordering (highest interest first) to minimise cost. For the actual payoff, you can pair your target with any strategy.',
    },
    {
      q: 'What if I can\'t afford the required extra payment?',
      a: 'That\u2019s completely normal. Use the date picker to push your target further out until the required payment fits your budget. Even a small extra payment makes a big difference over time \u2014 try our snowball or avalanche calculator to see the impact of whatever you can afford.',
    },
    {
      q: 'How accurate is this calculator?',
      a: 'The calculator uses the same compound interest math that banks use, simulated month by month. It\u2019s highly accurate for fixed-rate debts. For variable-rate debts (like credit cards), the actual result may differ slightly as rates change. All calculations happen in your browser \u2014 your data never leaves your device.',
    },
  ];

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Debt-Free By Date Calculator',
    description: 'Free debt-free by date calculator \u2014 pick your target date and see how much extra to pay monthly.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}/${lang}/calculator/deadline`,
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
      { '@type': 'ListItem', position: 3, name: 'Deadline Calculator', item: `${SITE_URL}/${lang}/calculator/deadline` },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Become Debt-Free by a Specific Date',
    description: 'The deadline method lets you pick your target debt-free date and reverse-engineers exactly how much extra you need to pay each month to hit it.',
    totalTime: 'PT5M',
    step: [
      { '@type': 'HowToStep', name: 'List all your debts', text: 'Enter every debt with its balance, APR, and minimum payment.' },
      { '@type': 'HowToStep', name: 'Choose your target debt-free date', text: 'Pick a realistic but ambitious date. Common targets: 2 years, 3 years, or a life event like a wedding or retirement.' },
      { '@type': 'HowToStep', name: 'Calculate the required monthly extra', text: 'The calculator works backwards from your target date to determine exactly how much extra you need each month.' },
      { '@type': 'HowToStep', name: 'Check if it\'s affordable', text: 'Compare the required extra payment to your disposable income. Adjust the date if needed until it feels challenging but doable.' },
      { '@type': 'HowToStep', name: 'Set up your payment plan', text: 'Allocate the extra payment using your preferred strategy (snowball, avalanche, or hybrid).' },
      { '@type': 'HowToStep', name: 'Track progress against your deadline', text: 'Monitor monthly to ensure you\'re on track. Adjust if your income or expenses change.' },
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
      <DeadlineClient faqs={faqs} />
    </>
  );
}
