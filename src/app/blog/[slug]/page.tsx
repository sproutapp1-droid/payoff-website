import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, getAdjacentPosts } from '@/lib/blog';
import { ArrowLeft, ArrowRight, Clock, Calendar, User, Tag } from 'lucide-react';
import { BlogArticle } from '@/components/blog/BlogArticle';
import { SITE_URL } from '@/lib/constants';
import DownloadButtons from '@/components/landing/DownloadButtons';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      tags: post.tags,
      url: `${SITE_URL}/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Payoff: Smart Debt Planner',
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="pt-32 pb-20 px-4">
        <article className="max-w-3xl mx-auto">
          {/* Back to blog */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition mb-8 text-sm font-medium no-underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>

          {/* Article header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-primary/10 text-primary text-sm font-bold rounded-full px-4 py-1">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-6">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 border-t border-b border-gray-100 py-4">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              {post.updated && post.updated !== post.date && (
                <span className="text-gray-400">
                  Updated{' '}
                  {new Date(post.updated).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              )}
            </div>
          </header>

          {/* Article body */}
          <BlogArticle content={post.content} />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 rounded-full px-3 py-1"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Prev/Next navigation */}
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pt-8 border-t border-gray-100">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="group flex flex-col p-5 bg-white rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-sm transition no-underline"
              >
                <span className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                  <ArrowLeft className="w-3 h-3" /> Previous article
                </span>
                <span className="font-bold text-gray-900 group-hover:text-primary transition">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group flex flex-col p-5 bg-white rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-sm transition text-right no-underline md:col-start-2"
              >
                <span className="text-xs text-gray-400 flex items-center gap-1 justify-end mb-2">
                  Next article <ArrowRight className="w-3 h-3" />
                </span>
                <span className="font-bold text-gray-900 group-hover:text-primary transition">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 mt-12 text-center text-white">
            <h3 className="font-extrabold text-2xl mb-2">Ready to put this into action?</h3>
            <p className="text-white/80 mb-5">
              Download Payoff free — AI coaching, 7 proven strategies, and a savings planner. Available on iOS &amp; Android.
            </p>
            <DownloadButtons variant="light" />
          </div>
        </article>
      </main>
    </>
  );
}
