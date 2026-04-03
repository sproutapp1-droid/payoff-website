import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getAllCategories } from '@/lib/blog';
import { Clock, ArrowRight, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog — Debt Payoff Tips, Strategies & Guides',
  description: 'Learn proven debt payoff strategies, money-saving tips, and financial freedom guides. Snowball vs avalanche, budgeting hacks, and more from the Payoff team.',
  openGraph: {
    title: 'Payoff Blog — Debt Payoff Tips & Strategies',
    description: 'Proven debt payoff strategies and financial freedom guides.',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-secondary/10 text-secondary rounded-full px-4 py-1 text-sm font-semibold mb-4">
            Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Your guide to becoming debt-free
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Strategies, tips, and real talk about paying off debt and building the life you deserve.
          </p>
        </div>

        {/* Category pills */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <span className="bg-primary text-white rounded-full px-4 py-1.5 text-sm font-semibold cursor-pointer">
              All
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="bg-gray-100 text-gray-600 rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-gray-200 transition cursor-pointer"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Posts grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Blog posts coming soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col no-underline"
              >
                {/* Card header colour band */}
                <div
                  className={`h-2 ${
                    i % 3 === 0
                      ? 'bg-primary'
                      : i % 3 === 1
                      ? 'bg-secondary'
                      : 'bg-accent'
                  }`}
                />

                <div className="p-6 flex flex-col flex-1">
                  {/* Category + reading time */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-primary/10 text-primary text-xs font-bold rounded-full px-3 py-1">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {post.readingTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-500 text-sm flex-1 mb-4">
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 text-xs text-gray-400 bg-gray-50 rounded-full px-2 py-0.5"
                      >
                        <Tag className="w-2.5 h-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read more */}
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                    Read article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
