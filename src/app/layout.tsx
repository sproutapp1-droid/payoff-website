import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Payoff: Smart Debt Planner — AI-Powered Debt Payoff App",
  description:
    "Pay off debt faster with AI coaching, debt snowball, debt avalanche, and 5 more strategies. Track progress, plan savings, and stay motivated. Free debt payoff app for iOS & Android.",
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
    "debt snowball calculator",
    "debt avalanche calculator",
  ],
  metadataBase: new URL("https://payoffdebtplanner.com"),
  openGraph: {
    title: "Payoff: Smart Debt Planner — AI-Powered Debt Payoff App",
    description:
      "Pay off debt faster with AI coaching, 7 strategies, and a savings planner. Free for iOS & Android.",
    url: "https://payoffdebtplanner.com",
    siteName: "Payoff: Smart Debt Planner",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payoff: Smart Debt Planner — AI-Powered Debt Payoff App",
    description:
      "Pay off debt faster with AI coaching, 7 strategies, and a savings planner. Free for iOS & Android.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
