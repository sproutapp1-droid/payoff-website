import Link from "next/link";
import { WaitlistForm } from "@/components/landing/WaitlistForm";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Calculator", href: "/calculator" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Delete Account", href: "/delete-account" },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      {/* Pre-footer CTA banner */}
      <section className="bg-gradient-to-r from-primary to-primary/90 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Start your debt-free journey today
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Join the waitlist and be first to try Payoff. No bank access. No commitment.
          </p>
          <WaitlistForm variant="banner" />
        </div>
      </section>

      {/* Footer proper */}
      <div className="bg-gray-900 text-gray-400 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
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
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            &copy; 2026 Payoff. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
