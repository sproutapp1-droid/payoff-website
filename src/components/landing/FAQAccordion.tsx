"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Coral blob top-left */}
        <div className="absolute -top-28 -left-36 w-[400px] h-[400px] rounded-full bg-secondary opacity-[0.20] blur-[110px]" />
        {/* Green blob bottom-right */}
        <div className="absolute -bottom-32 -right-28 w-[350px] h-[350px] rounded-full bg-primary opacity-[0.18] blur-[100px]" />
        {/* Sparkle dots */}
        <div className="absolute top-20 right-[18%] w-2 h-2 rounded-full bg-secondary/15 animate-pulse" />
        <div className="absolute bottom-24 left-[22%] w-1.5 h-1.5 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: '0.6s' }} />
        <div className="absolute top-[50%] left-[8%] w-2 h-2 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: '1.2s' }} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-foreground mb-12">
          Frequently asked questions
        </h2>

        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-5 text-left group"
                aria-expanded={openIndex === i}
              >
                <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors pr-4">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-gray-400"
                >
                  <ChevronDown size={20} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-gray-600 leading-relaxed text-sm">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
