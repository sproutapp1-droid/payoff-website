import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getDictionary, hasLocale } from '../../dictionaries';
import HybridClient from './client';

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const c = (dict.calculator as any)?.hybrid || {};

  return {
    title: c.metaTitle || 'Free Debt Hybrid Calculator — Balance Wins & Savings | Payoff',
    description:
      c.metaDesc ||
      'The hybrid method blends snowball motivation with avalanche savings. See your payoff plan with our free calculator — no signup required.',
    keywords: [
      'debt hybrid method',
      'hybrid debt payoff',
      'snowball avalanche hybrid',
      'best debt strategy',
      'balanced debt payoff',
    ],
    openGraph: {
      title: c.metaTitle || 'Free Debt Hybrid Calculator | Payoff',
      description:
        c.metaDesc ||
        'The hybrid method blends snowball motivation with avalanche savings. See your payoff plan — free, no signup.',
      url: `${SITE_URL}/${lang}/calculator/hybrid`,
      siteName: 'Payoff: Smart Debt Planner',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: c.metaTitle || 'Free Debt Hybrid Calculator | Payoff',
      description:
        c.metaDesc ||
        'Blend snowball motivation with avalanche savings. Free hybrid debt calculator, no signup required.',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/calculator/hybrid`,
    },
  };
}

export default async function HybridPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return null;
  const dict = await getDictionary(lang);
  const c = (dict.calculator as any)?.hybrid || {};

  const faqs = c.faqs || [
    {
      q: 'What is the debt hybrid method?',
      a: 'The hybrid method is a debt payoff strategy that combines elements of both the snowball and avalanche methods. It uses a weighted score — 60% interest rate and 40% balance — to decide which debt to target first. This gives you a balance between quick wins and interest savings.',
    },
    {
      q: 'How does the hybrid scoring work?',
      a: 'Each debt receives a composite score based on 60% of its interest rate ranking and 40% of its balance ranking. Debts with high interest rates AND low balances rise to the top, while debts that score poorly on both measures are tackled last. This means you naturally get some quick wins while still prioritising expensive debt.',
    },
    {
      q: 'Is the hybrid method better than snowball or avalanche?',
      a: 'It depends on your situation. If your debts have a mix of high-rate and low-balance characteristics, the hybrid method can be a great middle ground. You won\'t save quite as much interest as pure avalanche, but you\'ll get faster wins than avalanche alone. It\'s ideal for people who want a balanced approach.',
    },
    {
      q: 'Who should use the hybrid method?',
      a: 'The hybrid method is perfect for people who can\'t decide between snowball and avalanche, or who have a diverse debt portfolio with varying rates and balances. It\'s also great if you want some motivational quick wins without completely ignoring interest costs.',
    },
    {
      q: 'Do I need to sign up to use this calculator?',
      a: 'No. This calculator is 100% free with no signup required. All calculations happen in your browser — your financial data never leaves your device.',
    },
    {
      q: 'How does the hybrid method compare in real numbers?',
      a: 'In most cases, the hybrid method saves 70-90% of the interest that a pure avalanche approach would save, while eliminating your first debt almost as quickly as the snowball method. The exact numbers depend on your specific debt profile — use the calculator above to see your personalised comparison.',
    },
  ];

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Debt Hybrid Calculator',
    description: 'Free debt hybrid calculator — blend snowball motivation with avalanche savings to find your optimal payoff plan.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}/${lang}/calculator/hybrid`,
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
      { '@type': 'ListItem', position: 3, name: 'Hybrid Calculator', item: `${SITE_URL}/${lang}/calculator/hybrid` },
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
      <HybridClient faqs={faqs} />
    </>
  );
}
