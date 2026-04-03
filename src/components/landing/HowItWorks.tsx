"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Add your debts",
    description:
      "Enter your balances, interest rates, and minimum payments. Or scan a statement with Smart Import \u2014 AI does the typing.",
  },
  {
    number: "2",
    title: "Pick your strategy",
    description:
      "Take the 60-second personality quiz or choose from 7 proven methods. We\u2019ll build your custom payoff plan instantly.",
  },
  {
    number: "3",
    title: "Watch debts disappear",
    description:
      "Follow your plan, log payments, and celebrate every milestone. Your AI coach is there every step of the way.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-6xl mx-auto bg-primary/5 rounded-3xl py-16 px-6 sm:px-12 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Yellow blob left */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-[500px] h-[400px] rounded-full bg-accent opacity-[0.25] blur-[120px]" />
          {/* Coral blob right */}
          <div className="absolute top-1/4 -right-32 w-[350px] h-[350px] rounded-full bg-secondary opacity-[0.22] blur-[100px]" />
          {/* Floating circles */}
          <div className="absolute top-8 left-[8%] w-12 h-12 rounded-full border border-accent/30 animate-float" style={{ animationDelay: '0.4s' }} />
          <div className="absolute bottom-10 right-[10%] w-10 h-10 rounded-full border border-secondary/25 animate-float" style={{ animationDelay: '1.1s' }} />
          <div className="absolute top-[35%] right-[5%] w-14 h-14 rounded-full bg-accent/8 animate-float" style={{ animationDelay: '0.8s' }} />
          <div className="absolute bottom-[30%] left-[5%] w-8 h-8 rounded-full border border-primary/25 animate-float" style={{ animationDelay: '1.5s' }} />
          {/* Sparkle dots */}
          <div className="absolute top-12 right-[25%] w-2 h-2 rounded-full bg-secondary/35 animate-pulse" />
          <div className="absolute bottom-16 left-[20%] w-1.5 h-1.5 rounded-full bg-accent/35 animate-pulse" style={{ animationDelay: '0.6s' }} />
          <div className="absolute top-[60%] right-[35%] w-2 h-2 rounded-full bg-primary/25 animate-pulse" style={{ animationDelay: '1.2s' }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
            Get started in 60 seconds
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Dashed connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-[72px] left-[16.67%] right-[16.67%] border-t-2 border-dashed border-secondary/30"
            aria-hidden="true"
          />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-2xl p-8 text-center shadow-sm relative z-10"
            >
              <span className="text-secondary font-extrabold text-6xl leading-none">
                {step.number}
              </span>
              <h3 className="font-bold text-xl mt-4 text-foreground">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
