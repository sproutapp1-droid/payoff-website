import { localizedPageMetadata } from '@/lib/page-metadata';

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) => localizedPageMetadata(lang, 'terms', 'Payoff Terms of Service', 'Read the terms that apply to the Payoff app, website, subscriptions, and related services.'));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
