"use client";

import { motion } from "framer-motion";
import { WaitlistForm } from "./WaitlistForm";

export default function CTABanner() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 rounded-3xl px-8 py-16 sm:px-16 sm:py-20 text-center">
        {/* Decorative sparkle dots */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <span className="absolute top-6 left-[10%] w-2 h-2 bg-white/20 rounded-full" />
          <span className="absolute top-12 right-[15%] w-3 h-3 bg-white/15 rounded-full" />
          <span className="absolute bottom-10 left-[20%] w-2.5 h-2.5 bg-white/10 rounded-full" />
          <span className="absolute top-1/3 right-[8%] w-1.5 h-1.5 bg-white/25 rounded-full" />
          <span className="absolute bottom-8 right-[25%] w-2 h-2 bg-white/15 rounded-full" />
          <span className="absolute top-8 left-[40%] w-1.5 h-1.5 bg-white/20 rounded-full" />
          <span className="absolute bottom-1/3 left-[8%] w-3 h-3 bg-white/10 rounded-full" />
          <span className="absolute top-1/2 right-[35%] w-2 h-2 bg-white/15 rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ready to start your debt-free journey?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Join the waitlist and be first to try Payoff when it launches. No bank access. No commitment.
          </p>

          <WaitlistForm variant="banner" />
        </motion.div>
      </div>
    </section>
  );
}
