'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageCircle, Clock, Send, Loader2, Check } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-36 w-[450px] h-[450px] rounded-full bg-secondary opacity-[0.15] blur-[120px]" />
          <div className="absolute -bottom-28 -left-32 w-[400px] h-[400px] rounded-full bg-accent opacity-[0.18] blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-lg mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold mb-4">Message Sent</h1>
          <p className="text-gray-600 mb-8">
            Thanks for reaching out! We&apos;ll get back to you within 24 hours.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-white rounded-full px-8 py-3 font-bold hover:bg-primary/90 transition no-underline"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative pt-32 pb-20 px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-36 w-[500px] h-[500px] rounded-full bg-secondary opacity-[0.15] blur-[120px]" />
        <div className="absolute -bottom-28 -left-32 w-[450px] h-[450px] rounded-full bg-accent opacity-[0.18] blur-[100px]" />
        <div className="absolute top-[40%] -left-20 w-[300px] h-[300px] rounded-full bg-primary opacity-[0.05] blur-[100px]" />
        <div className="absolute top-20 left-[10%] w-14 h-14 rounded-full border-2 border-secondary/25 animate-float" />
        <div className="absolute bottom-[20%] right-[8%] w-10 h-10 rounded-full border-2 border-accent/25 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[30%] right-[15%] w-2 h-2 rounded-full bg-secondary/30 animate-pulse" />
        <div className="absolute bottom-32 left-[25%] w-1.5 h-1.5 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: '0.7s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Have a question, suggestion, or just want to say hello? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: info cards */}
          <div className="space-y-4">
            <a
              href="mailto:payoffdebtplanner@zohomail.eu"
              className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition no-underline"
            >
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Email</h3>
                <p className="text-sm text-gray-500">payoffdebtplanner@zohomail.eu</p>
              </div>
            </a>

            <Link
              href="/support"
              className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition no-underline"
            >
              <div className="w-11 h-11 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">FAQ & Support</h3>
                <p className="text-sm text-gray-500">Browse common questions</p>
              </div>
            </Link>

            <div className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm">
              <div className="w-11 h-11 bg-accent/15 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Response Time</h3>
                <p className="text-sm text-gray-500">We reply within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Right: contact form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-primary transition bg-background"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold mb-1.5">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-primary transition bg-background"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-1.5">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="What's this about?"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-primary transition bg-background"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us more..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-primary transition bg-background resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-primary text-white rounded-xl px-6 py-3 font-bold hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">Something went wrong. Please try again or email us directly.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
