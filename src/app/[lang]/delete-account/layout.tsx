import { localizedPageMetadata } from '@/lib/page-metadata';

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) => localizedPageMetadata(lang, 'delete-account', 'Delete Your Payoff Account', 'Request permanent deletion of your Payoff account and associated data.', true));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
