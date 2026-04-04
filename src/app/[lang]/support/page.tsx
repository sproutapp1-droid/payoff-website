'use client';

import Link from 'next/link';
import { Mail, MessageCircle, Trash2 } from 'lucide-react';
import { useDict } from '@/components/i18n/LocaleProvider';

export default function SupportPage() {
  const { locale, dict } = useDict();
  const s = dict.support || {};
  const faqItems = dict.faq?.items || [];
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <main className="relative pt-32 pb-20 px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-28 -right-36 w-[420px] h-[420px] rounded-full bg-secondary opacity-[0.06] blur-[120px]" />
        <div className="absolute -bottom-32 -left-28 w-[380px] h-[380px] rounded-full bg-accent opacity-[0.07] blur-[100px]" />
        <div className="absolute top-[20%] left-[6%] w-10 h-10 rounded-full border border-primary/12 animate-float" style={{ animationDelay: '0.4s' }} />
        <div className="absolute bottom-[25%] right-[8%] w-8 h-8 rounded-full border border-secondary/10 animate-float" style={{ animationDelay: '1.2s' }} />
        <div className="absolute top-16 left-[35%] w-2 h-2 rounded-full bg-accent/20 animate-pulse" />
        <div className="absolute bottom-20 right-[30%] w-1.5 h-1.5 rounded-full bg-secondary/15 animate-pulse" style={{ animationDelay: '0.6s' }} />
        <div className="absolute top-[50%] right-[45%] w-2 h-2 rounded-full bg-primary/12 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">{s.title || 'Support'}</h1>
        <p className="text-lg text-gray-500 mb-12">{s.subtitle || "We're here to help. Choose an option below or browse our FAQ."}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <a href="mailto:payoffdebtplanner@zohomail.eu" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center no-underline">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{s.emailUs || 'Email Us'}</h3>
            <p className="text-sm text-gray-500">payoffdebtplanner@zohomail.eu</p>
          </a>

          <Link href="#faq" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center no-underline">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{s.browseFaq || 'Browse FAQ'}</h3>
            <p className="text-sm text-gray-500">{s.browseFaqSub || 'Find answers to common questions'}</p>
          </Link>

          <Link href={`${prefix}/delete-account`} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center no-underline">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{s.deleteAccount || 'Delete Account'}</h3>
            <p className="text-sm text-gray-500">{s.deleteAccountSub || 'Permanently delete your data'}</p>
          </Link>
        </div>

        <div id="faq">
          <h2 className="text-2xl font-extrabold mb-8">{s.faqTitle || 'Frequently Asked Questions'}</h2>
          <div className="space-y-4">
            {faqItems.map((item: { question: string; answer: string }, i: number) => (
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
