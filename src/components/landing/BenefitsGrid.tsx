"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Heart } from "lucide-react";
import { useDict } from "@/components/i18n/LocaleProvider";

const icons = [Shield, Zap, Heart];

export default function BenefitsGrid() {
  const { dict } = useDict();
  const b = dict.benefits || {};
  const items = b.items || [];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-28 -right-36 w-[450px] h-[450px] rounded-full bg-primary opacity-[0.20] blur-[110px]" />
        <div className="absolute -bottom-32 -left-28 w-[380px] h-[380px] rounded-full bg-secondary opacity-[0.22] blur-[100px]" />
        <div className="absolute top-16 left-[10%] w-14 h-14 rounded-full border border-accent/30 animate-float" style={{ animationDelay: '0.3s' }} />
        <div className="absolute bottom-12 right-[8%] w-10 h-10 rounded-full bg-primary/25 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[50%] right-[15%] w-8 h-8 rounded-full border border-secondary/25 animate-float" style={{ animationDelay: '1.6s' }} />
        <div className="absolute top-20 right-[30%] w-2 h-2 rounded-full bg-accent/30 animate-pulse" />
        <div className="absolute bottom-24 left-[25%] w-1.5 h-1.5 rounded-full bg-primary/25 animate-pulse" style={{ animationDelay: '0.7s' }} />
        <div className="absolute top-[40%] left-[5%] w-2 h-2 rounded-full bg-secondary/15 animate-pulse" style={{ animationDelay: '1.3s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((benefit: { title: string; description: string }, index: number) => {
          const Icon = icons[index] || Shield;
          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="bg-primary/10 rounded-xl p-3 w-fit">
                <Icon size={26} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mt-5">{benefit.title}</h3>
              <p className="text-gray-600 mt-3 leading-relaxed">{benefit.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
