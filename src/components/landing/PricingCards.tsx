"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PRICING, STORE_LINKS } from "@/lib/constants";

export default function PricingCards() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center text-foreground">
          Simple, transparent pricing
        </h2>
        <p className="text-center text-gray-600 mt-3 text-lg">
          Start free. Upgrade when you&apos;re ready.
        </p>

        {/* Toggle */}
        <div className="flex justify-center mt-8 mb-12">
          <div className="bg-gray-100 rounded-full p-1 flex">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                !isYearly
                  ? "bg-white shadow text-foreground"
                  : "text-gray-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                isYearly
                  ? "bg-white shadow text-foreground"
                  : "text-gray-500"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Free */}
          <PricingCard
            name={PRICING.free.name}
            price="$0"
            period="forever"
            features={PRICING.free.features}
            ctaLabel="Download Free"
            ctaHref={STORE_LINKS.appStore}
            ctaStyle="border-2 border-primary text-primary hover:bg-primary/5"
          />

          {/* Premium */}
          <div className="relative md:scale-105">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold rounded-full px-3 py-1 z-10">
              Most Popular
            </span>
            <PricingCard
              name={PRICING.premium.name}
              price={isYearly ? "£49.99" : "£5.99"}
              period={isYearly ? "/yr" : "/mo"}
              savingsNote={isYearly ? "save 30%" : undefined}
              trialNote={isYearly ? "7-day free trial" : undefined}
              features={PRICING.premium.features}
              ctaLabel="Start Free Trial"
              ctaHref={STORE_LINKS.appStore}
              ctaStyle="bg-primary text-white hover:bg-primary/90"
              featured
              isYearly={isYearly}
            />
          </div>

          {/* Household */}
          <PricingCard
            name={PRICING.household.name}
            price={isYearly ? "£79.99" : "£9.99"}
            period={isYearly ? "/yr" : "/mo"}
            features={PRICING.household.features}
            ctaLabel="Get Household"
            ctaHref={STORE_LINKS.appStore}
            ctaStyle="bg-secondary text-white hover:bg-secondary/90"
            isYearly={isYearly}
          />
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  name,
  price,
  period,
  savingsNote,
  trialNote,
  features,
  ctaLabel,
  ctaHref,
  ctaStyle,
  featured,
  isYearly,
}: {
  name: string;
  price: string;
  period: string;
  savingsNote?: string;
  trialNote?: string;
  features: readonly string[];
  ctaLabel: string;
  ctaHref: string;
  ctaStyle: string;
  featured?: boolean;
  isYearly?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-2xl p-8 flex flex-col ${
        featured
          ? "ring-2 ring-primary shadow-xl"
          : "shadow-sm"
      }`}
    >
      <h3 className="text-xl font-bold text-foreground">{name}</h3>

      {/* Price with crossfade */}
      <div className="mt-4 mb-1 h-12 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={price}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex items-baseline gap-1"
          >
            <span className="text-4xl font-extrabold text-foreground">
              {price}
            </span>
            <span className="text-gray-500 text-sm">{period}</span>
            {savingsNote && (
              <span className="text-xs font-semibold text-primary ml-2 bg-primary/10 rounded-full px-2 py-0.5">
                {savingsNote}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {trialNote && (
        <p className="text-sm text-primary font-medium mb-4">{trialNote}</p>
      )}
      {!trialNote && <div className="mb-4" />}

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
            <Check size={16} className="text-primary mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={ctaHref}
        className={`block text-center rounded-full px-8 py-3 font-bold text-sm transition-colors ${ctaStyle}`}
      >
        {ctaLabel}
      </a>
    </div>
  );
}
