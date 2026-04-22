"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { useDict } from "@/components/i18n/LocaleProvider";
import DownloadButtons from "@/components/landing/DownloadButtons";
import { LOCALES, LOCALE_NATIVE_NAMES } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
  const { locale, dict } = useDict();
  const pathname = usePathname();
  const router = useRouter();
  const f = dict.footer || {};

  const prefix = locale === "en" ? "" : `/${locale}`;

  const footerColumns = [
    {
      title: f.product || "Product",
      links: [
        { label: f.links?.features || "Features", href: `${prefix}/#features` },
        { label: f.links?.pricing || "Pricing", href: `${prefix}/#pricing` },
        { label: f.links?.calculator || "Calculator", href: `${prefix}/calculator` },
        { label: f.links?.faq || "FAQ", href: `${prefix}/#faq` },
      ],
    },
    {
      title: f.company || "Company",
      links: [
        { label: f.links?.blog || "Blog", href: "/blog" },
        { label: f.links?.support || "Support", href: `${prefix}/support` },
        { label: f.links?.contact || "Contact", href: `${prefix}/contact` },
      ],
    },
    {
      title: f.legal || "Legal",
      links: [
        { label: f.links?.privacyPolicy || "Privacy Policy", href: `${prefix}/privacy-policy` },
        { label: f.links?.termsOfService || "Terms of Service", href: `${prefix}/terms` },
        { label: f.links?.deleteAccount || "Delete Account", href: `${prefix}/delete-account` },
      ],
    },
  ];

  const handleLocaleChange = (newLocale: string) => {
    // Strip current locale prefix from pathname
    let path = pathname;
    for (const loc of LOCALES) {
      if (path.startsWith(`/${loc}/`) || path === `/${loc}`) {
        path = path.slice(`/${loc}`.length) || '/';
        break;
      }
    }
    const newPath = newLocale === 'en' ? path : `/${newLocale}${path}`;
    // Set cookie so proxy remembers preference
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    router.push(newPath);
  };

  return (
    <footer>
      {/* Pre-footer CTA banner */}
      <section className="bg-gradient-to-r from-primary to-primary/90 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {f.ctaTitle || "Start your debt-free journey today"}
          </h2>
          <p className="text-white/80 text-lg mb-8">
            {f.ctaSubtitle || "Download Payoff free on iOS and Android. No bank access. No commitment."}
          </p>
          <DownloadButtons variant="light" />
        </div>
      </section>

      {/* Footer proper */}
      <div className="bg-gray-900 text-gray-400 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Language switcher */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {dict.common?.language || "Language"}
              </h3>
              <select
                value={locale}
                onChange={(e) => handleLocaleChange(e.target.value)}
                className="bg-gray-800 text-gray-300 text-sm rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:border-primary w-full"
              >
                {LOCALES.map((loc) => (
                  <option key={loc} value={loc}>
                    {LOCALE_NATIVE_NAMES[loc as Locale]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            &copy; {f.copyright || "2026 Payoff. All rights reserved."}
          </div>
        </div>
      </div>
    </footer>
  );
}
