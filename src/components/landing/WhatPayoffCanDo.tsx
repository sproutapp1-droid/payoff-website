"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useDict } from "@/components/i18n/LocaleProvider";

export default function WhatPayoffCanDo() {
  const { dict } = useDict();
  const w = dict.whatPayoffCanDo || {};
  const items = w.items || [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="features" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-40 w-[500px] h-[500px] rounded-full bg-secondary opacity-[0.22] blur-[120px]" />
        <div className="absolute -bottom-40 -right-32 w-[400px] h-[400px] rounded-full bg-accent opacity-[0.25] blur-[100px]" />
        <div className="absolute top-24 right-[12%] w-16 h-16 rounded-full border border-secondary/30 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[60%] left-[8%] w-10 h-10 rounded-full border border-primary/30 animate-float" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-20 right-[25%] w-8 h-8 rounded-full bg-accent/30 animate-float" style={{ animationDelay: '0.6s' }} />
        <div className="absolute top-[40%] right-[5%] w-12 h-12 rounded-full border border-accent/30 animate-float" style={{ animationDelay: '1.8s' }} />
        <div className="absolute top-16 left-[20%] w-2 h-2 rounded-full bg-secondary/35 animate-pulse" />
        <div className="absolute top-[45%] right-[15%] w-1.5 h-1.5 rounded-full bg-accent/35 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-[35%] w-2 h-2 rounded-full bg-primary/25 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[20%] right-[40%] w-1.5 h-1.5 rounded-full bg-secondary/35 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
          {w.title || "What Payoff Can Do For You"}
        </h2>
        <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
          {w.subtitle || "Everything you need to crush debt and build wealth"}
        </p>
      </motion.div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {items.map((item: { number: string; title: string; content: string }, index: number) => (
          <motion.div
            key={item.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="border-b border-gray-200"
          >
            <button onClick={() => toggle(index)} className="w-full flex items-center gap-5 py-6 text-left group cursor-pointer">
              <span className="text-secondary font-extrabold text-3xl min-w-[48px]">{item.number}</span>
              <span className="text-lg md:text-xl font-bold text-foreground flex-1 group-hover:text-primary transition-colors">{item.title}</span>
              <motion.span animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={22} className="text-gray-400 group-hover:text-primary transition-colors" />
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
                  <p className="text-gray-600 leading-relaxed pb-6 pl-[68px] pr-4">{item.content}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
