"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-foreground mb-12">
          Loved by thousands getting out of debt
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    size={18}
                    className="text-accent fill-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="italic text-gray-700 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2">
                <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
