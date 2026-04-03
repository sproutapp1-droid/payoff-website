import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageCircle, Trash2 } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with Payoff: Smart Debt Planner. Contact us, browse FAQs, or request account deletion.',
};

export default function SupportPage() {
  return (
    <main className="pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">Support</h1>
        <p className="text-lg text-gray-500 mb-12">
          We&apos;re here to help. Choose an option below or browse our FAQ.
        </p>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <a
            href="mailto:support@payoffdebtplanner.com"
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center no-underline"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
            <p className="text-sm text-gray-500">support@payoffdebtplanner.com</p>
          </a>

          <Link
            href="#faq"
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center no-underline"
          >
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Browse FAQ</h3>
            <p className="text-sm text-gray-500">Find answers to common questions</p>
          </Link>

          <Link
            href="/delete-account"
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center no-underline"
          >
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Delete Account</h3>
            <p className="text-sm text-gray-500">Permanently delete your data</p>
          </Link>
        </div>

        {/* FAQ */}
        <div id="faq">
          <h2 className="text-2xl font-extrabold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} className="bg-white rounded-xl p-5 shadow-sm group">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {item.question}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">&#9662;</span>
                </summary>
                <p className="text-gray-600 mt-3 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
