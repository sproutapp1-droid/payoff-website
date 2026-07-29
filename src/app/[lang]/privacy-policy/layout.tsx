import { localizedPageMetadata } from '@/lib/page-metadata';

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) => localizedPageMetadata(lang, 'privacy-policy', 'Payoff Privacy Policy', 'Read how Payoff handles app, website, account, analytics, and support data.'));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
