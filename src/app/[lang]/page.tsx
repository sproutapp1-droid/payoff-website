import HeroSection from '@/components/landing/HeroSection';
import WhatPayoffCanDo from '@/components/landing/WhatPayoffCanDo';
import BenefitsGrid from '@/components/landing/BenefitsGrid';
import FeatureSection from '@/components/landing/FeatureSection';
import HowItWorks from '@/components/landing/HowItWorks';
import Testimonials from '@/components/landing/Testimonials';
import PricingCards from '@/components/landing/PricingCards';
import FAQAccordion from '@/components/landing/FAQAccordion';
import CTABanner from '@/components/landing/CTABanner';
import { SITE_URL } from '@/lib/constants';

const featureScreenshots = [
  { screenshotNum: 2, imageAlt: 'Payoff AI debt coach giving personalised advice', reverse: false },
  { screenshotNum: 4, imageAlt: 'Payoff strategy recommendation screen', reverse: true },
  { screenshotNum: 6, imageAlt: 'Payoff what-if scenario screen', reverse: false },
  { screenshotNum: 3, imageAlt: 'Payoff partner mode showing shared debts', reverse: true },
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
            url: SITE_URL,
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
        {featureScreenshots.map((feat, i) => (
          <FeatureSection
            key={i}
            screenshotNum={feat.screenshotNum}
            imageAlt={feat.imageAlt}
            featureIndex={i}
            reverse={feat.reverse}
          />
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
