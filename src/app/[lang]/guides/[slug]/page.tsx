import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllGuideSlugs, getGuideBySlug } from '@/data/guides';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import GuideClient from './client';

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: `${guide.title} | ${SITE_NAME}`,
    description: guide.description,
    keywords: guide.keywords,
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${SITE_URL}/${lang}/guides/${slug}`,
      siteName: SITE_NAME,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/guides/${slug}`,
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { lang, slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  // ── Schema: HowTo ──
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.definitionBlock,
    totalTime: 'PT10M',
    step: guide.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.text,
    })),
  };

  // ── Schema: FAQPage ──
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  // ── Schema: BreadcrumbList ──
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Payoff', item: `${SITE_URL}/${lang}` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/${lang}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.title, item: `${SITE_URL}/${lang}/guides/${slug}` },
    ],
  };

  // ── Schema: Article ──
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    datePublished: '2026-04-06',
    dateModified: '2026-04-06',
    mainEntityOfPage: `${SITE_URL}/${lang}/guides/${slug}`,
    keywords: guide.keywords.join(', '),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <GuideClient guide={guide} lang={lang} />
    </>
  );
}
