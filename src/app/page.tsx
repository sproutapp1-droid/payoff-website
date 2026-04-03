import HeroSection from '@/components/landing/HeroSection';
import WhatPayoffCanDo from '@/components/landing/WhatPayoffCanDo';
import BenefitsGrid from '@/components/landing/BenefitsGrid';
import FeatureSection from '@/components/landing/FeatureSection';
import HowItWorks from '@/components/landing/HowItWorks';
import Testimonials from '@/components/landing/Testimonials';
import PricingCards from '@/components/landing/PricingCards';
import FAQAccordion from '@/components/landing/FAQAccordion';
import CTABanner from '@/components/landing/CTABanner';

const features = [
  {
    imageSrc: '/screenshots/en/2.jpeg',
    imageAlt: 'Payoff AI debt coach giving personalised advice about a $600 bonus payment',
    badge: 'AI-Powered',
    heading: 'A debt coach that actually knows your debts',
    description:
      'Payoff Coach sees your real balances, interest rates, and payment history. Ask it anything — from "Should I pay off my credit card or car loan first?" to "I got a bonus, where should it go?"',
    bullets: [
      'Personalised advice, not generic tips',
      'Knows your exact debt-free date',
      'Suggests where to put bonuses and windfalls',
      '5 free messages/month, unlimited on Premium',
    ],
    reverse: false,
  },
  {
    imageSrc: '/screenshots/en/4.jpeg',
    imageAlt: 'Payoff strategy recommendation screen showing avalanche, snowball, and hybrid methods',
    badge: 'Smart Matching',
    heading: 'Find your perfect payoff strategy',
    description:
      'Take a 60-second quiz about your money personality. Payoff recommends the best method — snowball for motivation, avalanche for savings, or one of 5 other approaches.',
    bullets: [
      '7 strategies including hybrid and cash flow index',
      'Dave Ramsey Baby Steps built in',
      'Switch anytime with one tap',
      'See exactly how much each strategy saves',
    ],
    reverse: true,
  },
  {
    imageSrc: '/screenshots/en/6.jpeg',
    imageAlt: 'Payoff what-if scenario screen with extra payment slider and balance chart',
    badge: 'Interactive',
    heading: 'See what extra payments can do',
    description:
      'Slide to explore how paying more each month speeds up your debt-free date. Watch the balance chart update in real time as you experiment with different amounts.',
    bullets: [
      'Instant debt-free date recalculation',
      'Interest savings shown in real time',
      'Compare minimums vs your plan vs aggressive',
    ],
    reverse: false,
  },
  {
    imageSrc: '/screenshots/en/3.jpeg',
    imageAlt: 'Payoff partner mode showing shared debts with split percentages between Sarah and James',
    badge: 'Household',
    heading: 'Crush debt together',
    description:
      'Share debts with your partner, split payments by percentage, and track who has contributed what. One household, one plan, zero arguments.',
    bullets: [
      'Invite partner with a simple code',
      'Split percentages per debt',
      'Shared AI coach for joint decisions',
      'Household plan covers both accounts',
    ],
    reverse: true,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Payoff: Smart Debt Planner',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'iOS, Android',
            description:
              'AI-powered debt payoff planner with 7 strategies, savings planner, and partner mode.',
            offers: [
              {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                description: 'Free plan with 2 debts and basic features',
              },
              {
                '@type': 'Offer',
                price: '5.99',
                priceCurrency: 'GBP',
                description: 'Premium monthly plan',
              },
            ],
          }),
        }}
      />

      <HeroSection />

      <WhatPayoffCanDo />

      <BenefitsGrid />

      <div className="space-y-20 py-20 px-4">
        {features.map((feature, i) => (
          <FeatureSection key={i} {...feature} />
        ))}
      </div>

      <HowItWorks />

      <Testimonials />

      <PricingCards />

      <FAQAccordion />

      <CTABanner />
    </>
  );
}
