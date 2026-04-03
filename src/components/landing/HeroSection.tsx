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
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Simple Y-axis flip: 0 → 180 degrees (card flip forward)
  const rotateY = useTransform(scrollYProgress, [0.15, 0.65], [0, 180]);

  // Hero text fades out
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [0, -50]);

  // Watermark stays visible throughout
  const watermarkOpacity = 0.07;

  return (
    <div ref={scrollRef} className="relative" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Rich background — warm gradients, blobs, and floating shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large gradient blobs */}
          <div className="absolute w-[700px] h-[700px] bg-secondary rounded-full blur-[140px] opacity-[0.14] -top-[200px] -right-[200px]" />
          <div className="absolute w-[600px] h-[600px] bg-accent rounded-full blur-[130px] opacity-[0.18] -bottom-[150px] -left-[150px]" />
          <div className="absolute w-[400px] h-[400px] bg-primary rounded-full blur-[120px] opacity-[0.05] top-[25%] left-[5%]" />
          <div className="absolute w-[350px] h-[350px] bg-secondary rounded-full blur-[100px] opacity-[0.10] bottom-[15%] right-[25%]" />
          <div className="absolute w-[500px] h-[500px] bg-accent rounded-full blur-[120px] opacity-[0.10] top-[15%] right-[10%]" />

          {/* Floating decorative shapes — slow CSS animations */}
          <div className="absolute w-24 h-24 rounded-full border-2 border-secondary/15 top-[15%] left-[12%] animate-float" />
          <div className="absolute w-16 h-16 rounded-full bg-accent/10 top-[20%] right-[20%] animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute w-10 h-10 rounded-full bg-secondary/10 bottom-[25%] left-[18%] animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute w-20 h-20 rounded-full border-2 border-accent/15 bottom-[20%] right-[12%] animate-float" style={{ animationDelay: "0.5s" }} />
          <div className="absolute w-14 h-14 rounded-full bg-primary/5 top-[45%] left-[30%] animate-float" style={{ animationDelay: "1.5s" }} />

          {/* Sparkle dots */}
          <div className="absolute w-2 h-2 rounded-full bg-secondary/30 top-[10%] left-[25%] animate-pulse" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-accent/40 top-[30%] right-[35%] animate-pulse" style={{ animationDelay: "0.7s" }} />
          <div className="absolute w-2 h-2 rounded-full bg-primary/20 bottom-[30%] left-[40%] animate-pulse" style={{ animationDelay: "1.2s" }} />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-secondary/25 top-[55%] right-[18%] animate-pulse" style={{ animationDelay: "0.3s" }} />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-accent/30 bottom-[15%] right-[40%] animate-pulse" style={{ animationDelay: "1.8s" }} />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-secondary/20 top-[70%] left-[8%] animate-pulse" style={{ animationDelay: "2.2s" }} />

          {/* Subtle diagonal line pattern (top-right corner) */}
          <svg className="absolute top-0 right-0 w-[300px] h-[300px] opacity-[0.03]" viewBox="0 0 300 300">
            <line x1="50" y1="0" x2="300" y2="250" stroke="#005235" strokeWidth="1" />
            <line x1="100" y1="0" x2="300" y2="200" stroke="#005235" strokeWidth="1" />
            <line x1="150" y1="0" x2="300" y2="150" stroke="#005235" strokeWidth="1" />
            <line x1="200" y1="0" x2="300" y2="100" stroke="#005235" strokeWidth="1" />
          </svg>
        </div>

        {/* "DEBT" / "FREE" vertical text sandwiching the phone */}

        {/* ===== DESKTOP ===== */}
        <div className="hidden lg:flex w-full max-w-7xl mx-auto px-8 items-center gap-12 h-full">
          {/* Left: hero text */}
          <motion.div
            className="flex-1 z-10"
            style={{ opacity: textOpacity, y: textY }}
          >
            <h1 className="text-4xl xl:text-5xl font-extrabold text-primary mb-5 leading-tight">
              Crush debt. Build savings. Stay motivated.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              The smart debt payoff planner with AI coaching, 7 proven strategies,
              and a savings planner to help you see life after debt.
            </p>
            <WaitlistForm variant="hero" className="mb-6 max-w-md" />
            <div className="flex flex-wrap gap-2">
              {trustPills.map((pill) => (
                <span
                  key={pill}
                  className="border border-primary/20 text-primary/70 rounded-full px-3 py-1 text-xs"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: DEBT (vertical) | phone | FREE (vertical) */}
          <div className="flex-1 flex items-center justify-center gap-4" style={{ perspective: "1200px" }}>
            <span
              className="text-[80px] xl:text-[100px] font-extrabold text-primary select-none leading-[0.85] tracking-tight pointer-events-none"
              style={{ opacity: watermarkOpacity, writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              DEBT
            </span>

            <motion.div
              style={{
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-[310px] h-[640px]"
            >
              {/* Front face: Dashboard */}
              <div
                className="absolute inset-0 rounded-[44px] border-[8px] border-gray-900 overflow-hidden bg-black"
                style={{
                  backfaceVisibility: "hidden",
                  boxShadow: "0 30px 80px -15px rgba(0,0,0,0.3)",
                }}
              >
                <Image
                  src="/screenshots/en/1.jpeg"
                  alt="Payoff app dashboard showing debt-free countdown and payment progress"
                  fill
                  className="object-cover rounded-[36px]"
                  priority
                />
              </div>

              {/* Back face: AI Coach */}
              <div
                className="absolute inset-0 rounded-[44px] border-[8px] border-gray-900 overflow-hidden bg-black"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  boxShadow: "0 30px 80px -15px rgba(0,0,0,0.3)",
                }}
              >
                <Image
                  src="/screenshots/en/2.jpeg"
                  alt="Payoff AI debt coach giving personalised advice"
                  fill
                  className="object-cover rounded-[36px]"
                />
              </div>
            </motion.div>

            <span
              className="text-[80px] xl:text-[100px] font-extrabold text-primary select-none leading-[0.85] tracking-tight pointer-events-none"
              style={{ opacity: watermarkOpacity, writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              FREE
            </span>
          </div>
        </div>

        {/* ===== MOBILE ===== */}
        <div className="lg:hidden flex flex-col items-center justify-center h-full px-4">
          <span className="text-5xl sm:text-6xl font-extrabold text-primary opacity-[0.08] select-none leading-none mb-4">
            DEBT FREE
          </span>

          <div style={{ perspective: "1000px" }} className="mb-6">
            <motion.div
              style={{
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-[250px] h-[520px]"
            >
              <div
                className="absolute inset-0 rounded-[40px] border-[7px] border-gray-900 overflow-hidden bg-black"
                style={{
                  backfaceVisibility: "hidden",
                  boxShadow: "0 25px 60px -12px rgba(0,0,0,0.25)",
                }}
              >
                <Image
                  src="/screenshots/en/1.jpeg"
                  alt="Payoff app dashboard"
                  fill
                  className="object-cover rounded-[33px]"
                  priority
                />
              </div>
              <div
                className="absolute inset-0 rounded-[40px] border-[7px] border-gray-900 overflow-hidden bg-black"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  boxShadow: "0 25px 60px -12px rgba(0,0,0,0.25)",
                }}
              >
                <Image
                  src="/screenshots/en/2.jpeg"
                  alt="Payoff AI coach"
                  fill
                  className="object-cover rounded-[33px]"
                />
              </div>
            </motion.div>
          </div>

          <motion.div className="text-center max-w-sm" style={{ opacity: textOpacity }}>
            <h1 className="text-3xl font-extrabold text-primary mb-3">
              Crush debt. Build savings. Stay motivated.
            </h1>
            <p className="text-base text-gray-600 mb-5">
              The smart debt payoff planner with AI coaching and 7 proven strategies
            </p>
            <WaitlistForm variant="hero" className="mb-4" />
            <div className="flex flex-wrap justify-center gap-2">
              {trustPills.map((pill) => (
                <span
                  key={pill}
                  className="border border-primary/20 text-primary/70 rounded-full px-3 py-1 text-xs"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
