import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/constants';
import { LOCALES } from '@/lib/i18n';

const STATIC_PAGES = [
  '',
  '/privacy-policy',
  '/terms',
  '/support',
  '/contact',
  '/delete-account',
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

      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' || page.startsWith('/calculator') ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page.startsWith('/calculator') ? 0.9 : 0.7,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  // Blog index (English only)
  entries.push({
    url: `${SITE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  // Blog posts (English only)
  const posts = getAllPosts();
  for (const post of posts) {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return entries;
}
