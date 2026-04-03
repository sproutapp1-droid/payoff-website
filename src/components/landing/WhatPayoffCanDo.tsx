"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const items = [
  {
    number: "01",
    title: "AI-Powered Coaching",
    content:
      'Personalised advice from an AI that knows your exact debts. Ask "I got a $600 bonus \u2014 what should I do?" and get specific, actionable answers based on your real balances.',
  },
  {
    number: "02",
    title: "7 Payoff Strategies + Baby Steps",
    content:
      "Snowball, avalanche, hybrid, cash flow index, deadline, highest balance, and custom order. Plus a built-in Dave Ramsey Baby Steps guide. Take our 60-second quiz to find your match.",
  },
  {
    number: "03",
    title: "Partner & Household Mode",
    content:
      "Share debts with your partner, split payments by percentage, and track who has contributed what \u2014 all synced in real-time with a shared AI coach.",
  },
  {
    number: "04",
    title: "What-If Scenarios",
    content:
      "Slide to see how extra payments change your debt-free date. Watch the balance chart update instantly as you explore $50, $100, or $500 extra per month.",
  },
  {
    number: "05",
    title: "Life After Debt",
    content:
      "Savings goals, investment tracker with compound growth projections, and a money timeline that maps every milestone from first payment to financial freedom.",
  },
  {
    number: "06",
    title: "Milestone Celebrations",
    content:
      "Every debt paid off gets confetti, a trophy, and encouraging words. Track your payment streaks and earn badges. The journey should feel good.",
  },
];

export default function WhatPayoffCanDo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
          What Payoff Can Do For You
        </h2>
        <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
          Everything you need to crush debt and build wealth
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {items.map((item, index) => (
          <motion.div
            key={item.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="border-b border-gray-200"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center gap-5 py-6 text-left group cursor-pointer"
            >
              <span className="text-secondary font-extrabold text-3xl min-w-[48px]">
                {item.number}
              </span>
              <span className="text-lg md:text-xl font-bold text-foreground flex-1 group-hover:text-primary transition-colors">
                {item.title}
              </span>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown
                  size={22}
                  className="text-gray-400 group-hover:text-primary transition-colors"
                />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 leading-relaxed pb-6 pl-[68px] pr-4">
                    {item.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
