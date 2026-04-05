import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://payoffdebtplanner.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Payoff",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.png`,
      },
      description:
        "Payoff is an AI-powered debt payoff planner app that helps people become debt-free with personalised strategies, emotional support, and smart tools.",
      email: "payoffdebtplanner@zohomail.eu",
      sameAs: [],
      foundingDate: "2026",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Payoff: Smart Debt Planner",
      publisher: { "@id": `${SITE_URL}/#organization` },
      description:
        "Free debt payoff calculators, AI coaching, and 7 payoff strategies to help you become debt-free faster.",
      inLanguage: [
        "en", "es", "pt", "fr", "de", "ja", "ko", "zh", "it",
      ],
    },
    {
      "@type": "MobileApplication",
      "@id": `${SITE_URL}/#app`,
      name: "Payoff: Smart Debt Planner",
      operatingSystem: "iOS, Android",
      applicationCategory: "FinanceApplication",
      url: SITE_URL,
      description:
        "AI-powered debt payoff planner with 7 strategies including snowball and avalanche, savings planner, partner mode, and focus mode for financial anxiety.",
      offers: [
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free plan — 2 debts, snowball & avalanche, AI coach (5 messages/month)",
        },
        {
          "@type": "Offer",
          price: "49.99",
          priceCurrency: "GBP",
          priceValidUntil: "2027-12-31",
          description: "Premium yearly — unlimited debts, all strategies, unlimited AI, savings planner",
        },
      ],
      author: { "@id": `${SITE_URL}/#organization` },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1",
        bestRating: "5",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LHEDVH14ZJ"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LHEDVH14ZJ');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-background">
        {children}
      </body>
    </html>
  );
}
