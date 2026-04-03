"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Heart } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "No Bank Access Needed",
    description:
      "Your financial data stays on your device. No bank logins, no syncing, no risk. Just add your debts and go.",
  },
  {
    icon: Zap,
    title: "Pay Off Debt Faster",
    description:
      "People who follow a structured payoff plan eliminate debt 2\u20133 years faster than those paying minimums alone.",
  },
  {
    icon: Heart,
    title: "Designed for Your Feelings",
    description:
      "Focus Mode hides scary numbers. Milestone celebrations keep you motivated. This app understands financial anxiety.",
  },
];

export default function BenefitsGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition"
          >
            <div className="bg-primary/10 rounded-xl p-3 w-fit">
              <benefit.icon size={26} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mt-5">
              {benefit.title}
            </h3>
            <p className="text-gray-600 mt-3 leading-relaxed">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
