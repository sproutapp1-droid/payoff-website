import { localizedPageMetadata } from '@/lib/page-metadata';

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) => localizedPageMetadata(lang, 'support', 'Payoff App Support and FAQs', 'Get help with the Payoff debt planner app, account access, strategies, privacy, and common questions.'));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
