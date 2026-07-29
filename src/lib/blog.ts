import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { SEO_ARTICLES } from '@/data/seo-articles';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  readingTime: string;
  content: string;
  faqs?: { question: string; answer: string }[];
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  readingTime: string;
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { slug: 'apps-and-tools', name: 'Apps and Tools', description: 'Choose and use debt payoff planners, trackers, and privacy-conscious tools.' },
  { slug: 'calculators', name: 'Calculators', description: 'Understand payoff dates, extra payments, interest, and month-by-month schedules.' },
  { slug: 'credit-card-debt', name: 'Credit Card Debt', description: 'Build a practical plan for one card or several high-interest balances.' },
  { slug: 'payoff-strategies', name: 'Payoff Strategies', description: 'Compare snowball, avalanche, hybrid, consolidation, and custom payoff orders.' },
  { slug: 'budgeting-and-habits', name: 'Budgeting and Habits', description: 'Create the cash flow and routines that make a debt plan sustainable.' },
  { slug: 'loans-and-life-events', name: 'Loans and Life Events', description: 'Adapt debt payments to different loans, income changes, and major life transitions.' },
  { slug: 'motivation-and-wellbeing', name: 'Motivation and Wellbeing', description: 'Make progress without shame, burnout, or avoidable financial anxiety.' },
];

const CATEGORY_OVERRIDES: Record<string, string> = {
  'ai-debt-coach-guide': 'Apps and Tools',
  'best-debt-payoff-apps-2026': 'Apps and Tools',
  'debt-payoff-planner-comparison': 'Apps and Tools',
  'debt-payoff-tracker-guide': 'Apps and Tools',
  'payoff-vs-debt-payoff-planner': 'Apps and Tools',
  'shared-debts-partner-mode': 'Apps and Tools',
  'smart-import-statement-scanning': 'Apps and Tools',
  'debt-avalanche-calculator-explained': 'Calculators',
  'debt-payoff-calculator-guide': 'Calculators',
  'debt-snowball-calculator-explained': 'Calculators',
  'how-long-to-pay-off-debt': 'Calculators',
  'what-if-scenarios-debt': 'Calculators',
  'balance-transfer-vs-consolidation-loan': 'Credit Card Debt',
  'how-to-pay-off-credit-card-debt': 'Credit Card Debt',
  'how-to-stop-using-credit-cards': 'Credit Card Debt',
  'minimum-payments-trap': 'Credit Card Debt',
  'cash-flow-index-method': 'Payoff Strategies',
  'debt-avalanche-method-guide': 'Payoff Strategies',
  'debt-consolidation-vs-snowball': 'Payoff Strategies',
  'debt-payoff-mistakes': 'Payoff Strategies',
  'debt-payoff-plan-beginners': 'Payoff Strategies',
  'debt-snowball-method-guide': 'Payoff Strategies',
  'extra-payments-save-thousands': 'Payoff Strategies',
  'high-interest-debt-first': 'Payoff Strategies',
  'seven-debt-payoff-strategies': 'Payoff Strategies',
  'snowball-vs-avalanche': 'Payoff Strategies',
  'budget-expense-tracking-debt': 'Budgeting and Habits',
  'debt-payoff-with-irregular-income': 'Budgeting and Habits',
  'debt-to-income-ratio-explained': 'Budgeting and Habits',
  'emergency-fund-vs-debt': 'Budgeting and Habits',
  'savings-after-debt': 'Budgeting and Habits',
  'debt-statistics-2026': 'Loans and Life Events',
  'student-loan-payoff-strategies': 'Loans and Life Events',
  'couples-debt-payoff': 'Motivation and Wellbeing',
  'debt-free-celebration-whats-next': 'Motivation and Wellbeing',
  'debt-free-journey-tips': 'Motivation and Wellbeing',
  'focus-mode-financial-anxiety': 'Motivation and Wellbeing',
  'stay-motivated-paying-off-debt': 'Motivation and Wellbeing',
};

function categoryFor(slug: string, fallback?: string): string {
  return CATEGORY_OVERRIDES[slug] || fallback || 'Payoff Strategies';
}

export function getAllPosts(): BlogPostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const mdxPosts = files.map((filename) => {
    const slug = filename.replace('.mdx', '');
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      updated: data.updated,
      author: data.author || 'Payoff Team',
      category: categoryFor(slug, data.category),
      tags: data.tags || [],
      image: data.image,
      readingTime: stats.text,
    };
  });

  const generatedPosts: BlogPostMeta[] = SEO_ARTICLES.map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    date: article.date,
    updated: article.updated,
    author: article.author,
    category: article.category,
    tags: article.tags,
    readingTime: readingTime(article.content).text,
  }));

  return [...mdxPosts, ...generatedPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const generated = SEO_ARTICLES.find((article) => article.slug === slug);
  if (generated) {
    return {
      ...generated,
      readingTime: readingTime(generated.content).text,
    };
  }

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated,
    author: data.author || 'Payoff Team',
    category: categoryFor(slug, data.category),
    tags: data.tags || [],
    image: data.image,
    readingTime: stats.text,
    content,
  };
}

export function getAdjacentPosts(slug: string): { prev: BlogPostMeta | null; next: BlogPostMeta | null } {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);

  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
}

export function getAllCategories(): string[] {
  return BLOG_CATEGORIES.map((category) => category.name);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  return [...new Set(posts.flatMap((p) => p.tags))];
}

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((category) => category.slug === slug);
}

export function getCategorySlug(name: string): string {
  return BLOG_CATEGORIES.find((category) => category.name === name)?.slug
    || name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
