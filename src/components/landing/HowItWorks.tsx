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
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-primary/5 rounded-3xl py-16 px-6 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
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
