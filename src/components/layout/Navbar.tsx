"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Calculator, Snowflake, TrendingDown, Blend, Banknote, BarChart3, CalendarClock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDict } from "@/components/i18n/LocaleProvider";
import DownloadButtons from "@/components/landing/DownloadButtons";

export default function Navbar() {
  const { locale, dict } = useDict();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  const prefix = locale === "en" ? "" : `/${locale}`;

  const navLinks = [
    { label: dict.nav?.features || "Features", href: `${prefix}/#features` },
    { label: dict.nav?.howItWorks || "How It Works", href: `${prefix}/#how-it-works` },
    { label: dict.nav?.pricing || "Pricing", href: `${prefix}/#pricing` },
    { label: dict.nav?.faq || "FAQ", href: `${prefix}/#faq` },
    { label: dict.nav?.blog || "Blog", href: "/blog" },
  ];

  const toolLinks = [
    { label: dict.nav?.snowballCalculator || "Snowball Calculator", href: `${prefix}/calculator/snowball`, icon: <Snowflake size={16} /> },
    { label: dict.nav?.avalancheCalculator || "Avalanche Calculator", href: `${prefix}/calculator/avalanche`, icon: <TrendingDown size={16} /> },
    { label: dict.nav?.hybridCalculator || "Hybrid Calculator", href: `${prefix}/calculator/hybrid`, icon: <Blend size={16} /> },
    { label: dict.nav?.cashFlowCalculator || "Cash Flow Calculator", href: `${prefix}/calculator/cash-flow`, icon: <Banknote size={16} /> },
    { label: dict.nav?.highestBalanceCalculator || "Highest Balance", href: `${prefix}/calculator/highest-balance`, icon: <BarChart3 size={16} /> },
    { label: dict.nav?.deadlineCalculator || "Debt-Free By Date", href: `${prefix}/calculator/deadline`, icon: <CalendarClock size={16} /> },
    { label: dict.nav?.allCalculators || "All Calculators", href: `${prefix}/calculator`, icon: <Calculator size={16} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close tools dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md bg-background/80 transition-shadow ${
        scrolled ? "shadow-sm border-b border-gray-100" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`${prefix}/`} className="flex items-center gap-1.5">
            <Image
              src="/logo.png"
              alt="Payoff logo"
              width={72}
              height={72}
              quality={100}
              unoptimized
              className="w-[42px] h-[42px]"
            />
            <span className="text-xl font-extrabold text-primary">Payoff</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Tools dropdown */}
            <div className="relative" ref={toolsRef}>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className="flex items-center gap-1 text-sm font-semibold text-foreground/70 hover:text-primary transition-colors"
              >
                {dict.nav?.tools || "Tools"}
                <ChevronDown size={14} className={`transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                  >
                    {toolLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
                        onClick={() => setToolsOpen(false)}
                      >
                        <span className="text-primary/60">{link.icon}</span>
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <DownloadButtons variant="inline" />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-gray-100 bg-background/95 backdrop-blur-md"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-semibold text-foreground/70 hover:text-primary transition-colors py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile tools section */}
              <div className="border-t border-gray-100 pt-3 mt-1">
                <span className="text-xs font-bold text-foreground/40 uppercase tracking-wider px-1">
                  {dict.nav?.tools || "Tools"}
                </span>
                <div className="flex flex-col gap-1 mt-2">
                  {toolLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2.5 text-base font-semibold text-foreground/70 hover:text-primary transition-colors py-2 px-1"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="text-primary/60">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-2" onClick={() => setMobileOpen(false)}>
                <DownloadButtons variant="inline" align="left" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
