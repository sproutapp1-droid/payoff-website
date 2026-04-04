import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LOCALES } from "@/lib/i18n";
import { SITE_URL } from "@/lib/constants";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = `${SITE_URL}/${locale}`;
  }

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: [
      "debt payoff app",
      "debt snowball",
      "debt avalanche",
      "AI debt coach",
      "debt tracker",
      "debt payoff planner",
      "debt free",
      "pay off debt",
      "debt calculator",
      "savings planner",
    ],
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: `${SITE_URL}/${lang}`,
      siteName: "Payoff: Smart Debt Planner",
      locale: lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages: alternates,
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <LocaleProvider locale={lang} dict={dict}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </LocaleProvider>
  );
}
