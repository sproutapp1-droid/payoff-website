'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useDict } from '@/components/i18n/LocaleProvider';

interface WaitlistFormProps {
  variant?: 'hero' | 'banner' | 'inline';
  className?: string;
}

export function WaitlistForm({ variant = 'hero', className = '' }: WaitlistFormProps) {
  const { dict } = useDict();
  const w = dict.waitlist || {};
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || w.success || "You're on the list!");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || w.errorGeneric || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage(w.errorNetwork || 'Network error. Please try again.');
    }
  };

  if (variant === 'banner') {
    return (
      <div className={className}>
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-white font-semibold justify-center"
            >
              <Check className="w-5 h-5" />
              {message}
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={w.placeholderBanner || "Enter your email"}
                required
                className="flex-1 px-5 py-3 rounded-full bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-white text-primary rounded-full px-6 py-3 font-bold text-sm hover:bg-gray-100 transition disabled:opacity-50 flex items-center gap-2"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {w.buttonShort || "Join"} <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        {status === 'error' && (
          <p className="text-red-200 text-sm mt-2 text-center">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/10 rounded-2xl p-6 text-center"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <p className="font-bold text-primary text-lg">{message}</p>
            <p className="text-gray-500 text-sm mt-1">{w.successSub || "We'll let you know when Payoff launches."}</p>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="text-sm text-gray-500 mb-3 text-center">
              {w.comingSoon || "Coming soon to iOS & Android. Join the waitlist:"}
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={w.placeholder || "your@email.com"}
                required
                className="flex-1 px-5 py-3 rounded-full border-2 border-gray-200 text-sm focus:outline-none focus:border-primary transition"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-primary text-white rounded-full px-6 py-3 font-bold text-sm hover:bg-primary/90 transition disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {w.button || "Join Waitlist"} <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
            {status === 'error' && (
              <p className="text-red-500 text-sm mt-2 text-center">{message}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
