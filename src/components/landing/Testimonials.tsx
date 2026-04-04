"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useDict } from "@/components/i18n/LocaleProvider";

export default function Testimonials() {
  const { dict } = useDict();
  const t = dict.testimonials || {};
  const items = t.items || [];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-36 -left-32 w-[420px] h-[420px] rounded-full bg-accent opacity-[0.22] blur-[110px]" />
        <div className="absolute -bottom-28 -right-36 w-[460px] h-[460px] rounded-full bg-secondary opacity-[0.22] blur-[120px]" />
        <div className="absolute top-20 right-[10%] w-12 h-12 rounded-full border border-accent/30 animate-float" style={{ animationDelay: '0.2s' }} />
        <div className="absolute bottom-16 left-[12%] w-10 h-10 rounded-full bg-secondary/8 animate-float" style={{ animationDelay: '0.9s' }} />
        <div className="absolute top-[55%] left-[5%] w-14 h-14 rounded-full border border-primary/25 animate-float" style={{ animationDelay: '1.4s' }} />
        <div className="absolute top-12 left-[30%] w-2 h-2 rounded-full bg-accent/35 animate-pulse" />
        <div className="absolute bottom-20 right-[20%] w-1.5 h-1.5 rounded-full bg-secondary/35 animate-pulse" style={{ animationDelay: '0.8s' }} />
        <div className="absolute top-[40%] right-[40%] w-2 h-2 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: '1.1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-foreground mb-12">
          {t.title || "Loved by thousands getting out of debt"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item: { name: string; location: string; quote: string; initials: string }, i: number) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} size={18} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="italic text-gray-700 text-sm leading-relaxed flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                  {item.initials}
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
