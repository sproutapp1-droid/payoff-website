"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { WaitlistForm } from "./WaitlistForm";

const trustPills = [
  "No bank access",
  "9 languages",
  "Free to start",
  "iOS & Android",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0.3, 0.7], [0, 180]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 py-20"
    >
      {/* Decorative blobs */}
      <div className="blob w-[400px] h-[400px] bg-secondary top-[-100px] right-[-100px]" />
      <div className="blob w-[350px] h-[350px] bg-accent bottom-[-80px] left-[-80px]" />

      {/* Desktop: DEBT / FREE text flanking phone */}
      <div className="hidden lg:flex items-center justify-center gap-8 w-full max-w-7xl">
        <span className="text-[160px] font-extrabold text-primary opacity-10 select-none leading-none">
          DEBT
        </span>

        {/* Phone mockup with 3D flip */}
        <div className="flip-scene shrink-0">
          <motion.div className="flip-card relative w-[280px] h-[580px]" style={{ rotateY }}>
            {/* Front face */}
            <div className="flip-face phone-frame">
              <Image
                src="/screenshots/en/1.jpeg"
                alt="Payoff app dashboard showing debt progress"
                width={280}
                height={580}
                priority
              />
            </div>
            {/* Back face */}
            <div className="flip-face flip-back phone-frame">
              <Image
                src="/screenshots/en/2.jpeg"
                alt="Payoff AI debt coach chat screen"
                width={280}
                height={580}
              />
            </div>
          </motion.div>
        </div>

        <span className="text-[160px] font-extrabold text-primary opacity-10 select-none leading-none">
          FREE
        </span>
      </div>

      {/* Mobile: stacked layout */}
      <div className="lg:hidden flex flex-col items-center">
        <span className="text-6xl font-extrabold text-primary opacity-10 select-none leading-none mb-6">
          DEBT FREE
        </span>

        {/* Phone mockup with 3D flip (mobile) */}
        <div className="flip-scene">
          <motion.div className="flip-card relative w-[240px] h-[500px]" style={{ rotateY }}>
            <div className="flip-face phone-frame !w-[240px] !h-[500px]">
              <Image
                src="/screenshots/en/1.jpeg"
                alt="Payoff app dashboard showing debt progress"
                width={240}
                height={500}
                priority
              />
            </div>
            <div className="flip-face flip-back phone-frame !w-[240px] !h-[500px]">
              <Image
                src="/screenshots/en/2.jpeg"
                alt="Payoff AI debt coach chat screen"
                width={240}
                height={500}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Heading and CTAs */}
      <div className="mt-12 text-center max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
          Your personal AI debt coach
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Pay off debt faster with AI coaching, 7 strategies, and a savings
          planner
        </p>

        <WaitlistForm variant="hero" className="mb-8" />

        {/* Trust pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {trustPills.map((pill) => (
            <span
              key={pill}
              className="border border-primary/20 text-primary/70 rounded-full px-4 py-1 text-sm"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
