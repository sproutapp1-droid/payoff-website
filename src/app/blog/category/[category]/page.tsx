import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock } from 'lucide-react';
import {
  BLOG_CATEGORIES,
  getCategoryBySlug,
  getPostsByCategory,
} from '@/lib/blog';
import { SITE_URL } from '@/lib/constants';

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return BLOG_CATEGORIES.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} Articles and Guides`,
    description: category.description,
    alternates: { canonical: `/blog/category/${category.slug}` },
    openGraph: {
      title: `${category.name} | Payoff Blog`,
      description: category.description,
      url: `${SITE_URL}/blog/category/${category.slug}`,
      type: 'website',
    },
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(category.name);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} articles`,
    description: category.description,
    url: `${SITE_URL}/blog/category/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <span aria-hidden="true"> / </span>
            <span>{category.name}</span>
          </nav>

          <header className="max-w-3xl mb-12">
            <p className="text-sm font-bold uppercase tracking-wider text-secondary mb-3">Topic hub</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{category.name}</h1>
            <p className="text-lg text-gray-600">{category.description}</p>
            <p className="text-sm text-gray-400 mt-3">{posts.length} practical articles</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition no-underline"
              >
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime}
                </div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition mb-2">{post.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{post.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
