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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Green blob top-right */}
        <div className="absolute -top-28 -right-36 w-[450px] h-[450px] rounded-full bg-primary opacity-[0.20] blur-[110px]" />
        {/* Coral blob bottom-left */}
        <div className="absolute -bottom-32 -left-28 w-[380px] h-[380px] rounded-full bg-secondary opacity-[0.22] blur-[100px]" />
        {/* Floating shapes */}
        <div className="absolute top-16 left-[10%] w-14 h-14 rounded-full border border-accent/30 animate-float" style={{ animationDelay: '0.3s' }} />
        <div className="absolute bottom-12 right-[8%] w-10 h-10 rounded-full bg-primary/25 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[50%] right-[15%] w-8 h-8 rounded-full border border-secondary/25 animate-float" style={{ animationDelay: '1.6s' }} />
        {/* Sparkle dots */}
        <div className="absolute top-20 right-[30%] w-2 h-2 rounded-full bg-accent/30 animate-pulse" />
        <div className="absolute bottom-24 left-[25%] w-1.5 h-1.5 rounded-full bg-primary/25 animate-pulse" style={{ animationDelay: '0.7s' }} />
        <div className="absolute top-[40%] left-[5%] w-2 h-2 rounded-full bg-secondary/15 animate-pulse" style={{ animationDelay: '1.3s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
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
