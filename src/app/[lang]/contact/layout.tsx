import { localizedPageMetadata } from '@/lib/page-metadata';

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) => localizedPageMetadata(lang, 'contact', 'Contact Payoff', 'Contact the Payoff team about app support, privacy, account questions, or content corrections.'));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
