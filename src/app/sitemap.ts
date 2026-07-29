import type { MetadataRoute } from 'next';
import { BLOG_CATEGORIES, getAllPosts } from '@/lib/blog';
import { getAllGuideSlugs } from '@/data/guides';
import { SITE_URL } from '@/lib/constants';
import { LOCALES } from '@/lib/i18n';

const SITE_UPDATED = new Date('2026-07-29');

const STATIC_PAGES = [
  '',
  '/privacy-policy',
  '/terms',
  '/support',
  '/contact',
  '/calculator',
  '/calculator/snowball',
  '/calculator/avalanche',
  '/calculator/hybrid',
  '/calculator/cash-flow',
  '/calculator/highest-balance',
  '/calculator/deadline',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Locale-prefixed static pages
  for (const page of STATIC_PAGES) {
    for (const locale of LOCALES) {
      const alternates: Record<string, string> = {};
      for (const l of LOCALES) {
        alternates[l] = `${SITE_URL}/${l}${page}`;
      }
      alternates['x-default'] = `${SITE_URL}/en${page}`;

      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: SITE_UPDATED,
        changeFrequency: page === '' || page.startsWith('/calculator') ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page.startsWith('/calculator') ? 0.9 : 0.7,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  // Programmatic guide pages (locale-prefixed)
  const guideSlugs = getAllGuideSlugs();
  for (const slug of guideSlugs) {
    for (const locale of LOCALES) {
      const alternates: Record<string, string> = {};
      for (const l of LOCALES) {
        alternates[l] = `${SITE_URL}/${l}/guides/${slug}`;
      }
      alternates['x-default'] = `${SITE_URL}/en/guides/${slug}`;

      entries.push({
        url: `${SITE_URL}/${locale}/guides/${slug}`,
        lastModified: SITE_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.85,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  // Blog index (English only)
  entries.push({
    url: `${SITE_URL}/blog`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  entries.push(
    {
      url: `${SITE_URL}/blog/about`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/blog/editorial-policy`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...BLOG_CATEGORIES.map((category) => ({
      url: `${SITE_URL}/blog/category/${category.slug}`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
  );

  // Blog posts (English only)
  const posts = getAllPosts();
  for (const post of posts) {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated || post.date),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return entries;
}
