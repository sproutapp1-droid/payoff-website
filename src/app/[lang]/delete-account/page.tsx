'use client';

import { useState } from 'react';
import { Loader2, AlertTriangle, Check } from 'lucide-react';
import { useDict } from '@/components/i18n/LocaleProvider';

export default function DeleteAccountPage() {
  const { dict } = useDict();
  const d = dict.deleteAccountPage || {};
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !confirmed) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || d.successMessage || 'Your account deletion request has been submitted.');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <main className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-24 w-[280px] h-[280px] rounded-full bg-secondary opacity-[0.03] blur-[100px]" />
          <div className="absolute -bottom-16 -left-20 w-[250px] h-[250px] rounded-full bg-accent opacity-[0.04] blur-[90px]" />
        </div>
        <div className="relative z-10 max-w-lg mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-8 h-8 text-primary" /></div>
          <h1 className="text-2xl font-extrabold mb-4">{d.successTitle || 'Request Submitted'}</h1>
          <p className="text-gray-600">{message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative pt-32 pb-20 px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-24 w-[280px] h-[280px] rounded-full bg-secondary opacity-[0.03] blur-[100px]" />
        <div className="absolute -bottom-16 -left-20 w-[250px] h-[250px] rounded-full bg-accent opacity-[0.04] blur-[90px]" />
      </div>
      <div className="relative z-10 max-w-lg mx-auto">
        <h1 className="text-3xl font-extrabold mb-4">{d.title || 'Delete Your Account'}</h1>
        <p className="text-gray-600 mb-8">{d.description || 'This will permanently delete your Payoff account and all associated data.'}</p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <strong>{d.warning || 'Before deleting:'}</strong> {d.warningText || 'If you have an active subscription, please cancel it through the App Store or Google Play Store first to avoid future charges.'}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">{d.emailLabel || 'Account email address'}</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={d.emailPlaceholder || 'your@email.com'} required className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-primary transition" />
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
            <span className="text-sm text-gray-600">{d.confirmText || 'I understand that this will permanently delete my account and all my data. This action cannot be undone.'}</span>
          </label>
          <button type="submit" disabled={!confirmed || !email || status === 'loading'} className="w-full bg-red-600 text-white rounded-xl px-6 py-3 font-bold hover:bg-red-700 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : (d.deleteButton || 'Delete My Account')}
          </button>
          {status === 'error' && <p className="text-red-500 text-sm text-center">{message}</p>}
        </form>

        <p className="text-sm text-gray-400 mt-8 text-center">
          {d.needHelp || 'Need help? Contact'} <a href="mailto:payoffdebtplanner@zohomail.eu" className="text-primary underline">payoffdebtplanner@zohomail.eu</a>
        </p>
      </div>
    </main>
  );
}
