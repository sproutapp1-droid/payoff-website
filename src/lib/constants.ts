export const SITE_URL = 'https://payoffdebtplanner.com';
export const SITE_NAME = 'Payoff: Smart Debt Planner';

export const COLORS = {
  primary: '#005235',
  secondary: '#FF8C73',
  accent: '#FFD966',
  background: '#FFF8F4',
} as const;

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Blog', href: '/blog' },
] as const;

export const STORE_LINKS = {
  appStore: '#', // TODO: Replace with real App Store URL
  playStore: '#', // TODO: Replace with real Play Store URL
} as const;

export const PRICING = {
  free: {
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      '2 debts',
      'Snowball & Avalanche strategies',
      'Dashboard with debt-free countdown',
      '5 AI coach messages/month',
      'Payment reminders',
      'Milestone celebrations',
    ],
  },
  premium: {
    name: 'Premium',
    monthlyPrice: 5.99,
    yearlyPrice: 49.99,
    badge: 'Most Popular',
    features: [
      'Everything in Free, plus:',
      'Unlimited debts',
      'All 7 strategies + personality quiz',
      'Unlimited AI coaching',
      'What-If scenarios',
      'Focus Mode',
      'Smart Import (camera scan)',
      'Savings & investment planner',
      'CSV import & data export',
    ],
  },
  household: {
    name: 'Household',
    monthlyPrice: 9.99,
    yearlyPrice: 79.99,
    features: [
      'Everything in Premium, plus:',
      '2 accounts included',
      'Partner Mode with shared debts',
      'Split payment tracking',
      'Shared AI coach',
    ],
  },
} as const;

export const FAQ_ITEMS = [
  {
    question: 'Is Payoff really free?',
    answer: 'Yes! The free plan includes 2 debts, snowball and avalanche strategies, your dashboard, and 5 AI coach messages per month. No credit card required.',
  },
  {
    question: 'Do I need to connect my bank account?',
    answer: 'No. Payoff never asks for bank access. You manually enter your debts, which means your financial data stays completely private and secure on your device.',
  },
  {
    question: 'What makes the AI coach different from ChatGPT?',
    answer: 'Payoff Coach sees your actual debts, balances, interest rates, and payment history. It gives specific advice like "Put your bonus on Chase Sapphire to save $389 in interest" instead of generic tips.',
  },
  {
    question: 'Which payoff strategy should I use?',
    answer: 'Take our 60-second strategy quiz! Generally: choose Snowball if you need quick wins for motivation, Avalanche if you want to save the most on interest, or Hybrid for a balance of both.',
  },
  {
    question: 'Can my partner and I use it together?',
    answer: 'Yes! The Household plan lets you invite your partner, share debts, set split percentages, and even use a shared AI coach. It\'s designed for couples tackling debt as a team.',
  },
  {
    question: 'What is Focus Mode?',
    answer: 'Focus Mode hides your total balances and shows only your progress percentage and one simple next action. It\'s designed for people who feel anxious looking at large debt numbers.',
  },
  {
    question: 'Can I switch strategies later?',
    answer: 'Absolutely. You can change your payoff strategy anytime with one tap. Payoff will recalculate your entire plan instantly.',
  },
  {
    question: 'What languages are supported?',
    answer: 'Payoff is available in 9 languages: English, Spanish, Portuguese, French, German, Japanese, Korean, Chinese (Simplified), and Italian. Multi-currency support included.',
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    location: 'London, UK',
    quote: 'The AI coach told me exactly where to put my tax refund. I\'m paying off my credit card 3 months early!',
    initials: 'SM',
  },
  {
    name: 'Marcus T.',
    location: 'Austin, TX',
    quote: 'I tried every debt app out there. Payoff is the first one that doesn\'t make me feel anxious about my numbers.',
    initials: 'MT',
  },
  {
    name: 'Priya & Dev K.',
    location: 'Toronto, CA',
    quote: 'Partner mode saved our relationship. We can finally see who\'s paying what without awkward conversations.',
    initials: 'PD',
  },
  {
    name: 'James L.',
    location: 'Sydney, AU',
    quote: 'The milestone celebrations are genuinely motivating. Paid off my first card yesterday and the confetti made my day.',
    initials: 'JL',
  },
] as const;
