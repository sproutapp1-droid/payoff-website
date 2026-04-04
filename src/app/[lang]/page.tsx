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

const featureImages = [
  { imageSrc: '/screenshots/en/2.jpeg', imageAlt: 'Payoff AI debt coach giving personalised advice', reverse: false },
  { imageSrc: '/screenshots/en/4.jpeg', imageAlt: 'Payoff strategy recommendation screen', reverse: true },
  { imageSrc: '/screenshots/en/6.jpeg', imageAlt: 'Payoff what-if scenario screen', reverse: false },
  { imageSrc: '/screenshots/en/3.jpeg', imageAlt: 'Payoff partner mode showing shared debts', reverse: true },
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
        {featureImages.map((img, i) => (
          <FeatureSection
            key={i}
            imageSrc={img.imageSrc}
            imageAlt={img.imageAlt}
            featureIndex={i}
            reverse={img.reverse}
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
