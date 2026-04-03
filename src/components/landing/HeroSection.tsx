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
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1 (0-0.15): Phone centred, slight initial tilt
  // Phase 2 (0.15-0.45): Phone rotates on X-axis, shifts right, scales
  // Phase 3 (0.45-0.55): Content swap happens (opacity crossfade)
  // Phase 4 (0.55-0.75): Phone settles into right column position

  // X-axis rotation: 0 -> -75deg (tilting backward away from viewer)
  const rotateX = useTransform(scrollYProgress, [0.05, 0.35, 0.55, 0.75], [0, -75, -75, 0]);

  // Y-axis rotation: slight turn as it tilts
  const rotateY = useTransform(scrollYProgress, [0.05, 0.35, 0.55, 0.75], [0, 15, -15, 0]);

  // Z rotation: subtle tilt
  const rotateZ = useTransform(scrollYProgress, [0.05, 0.35, 0.55, 0.75], [0, 3, -3, 0]);

  // Move right: centred -> right column
  const x = useTransform(scrollYProgress, [0.05, 0.55, 0.75], [0, 100, 0]);

  // Scale: slightly shrink during rotation, then grow back
  const scale = useTransform(scrollYProgress, [0.05, 0.4, 0.75], [1, 0.85, 1]);

  // Front image opacity: visible -> hidden during rotation peak
  const frontOpacity = useTransform(scrollYProgress, [0.35, 0.45], [1, 0]);

  // Back image opacity: hidden -> visible during rotation peak
  const backOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);

  // Hero text fades out as you scroll
  const heroTextOpacity = useTransform(scrollYProgress, [0.05, 0.25], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0.05, 0.25], [0, -40]);

  // "DEBT" / "FREE" text fades
  const bigTextOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0.1, 0]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
      {/* Sticky container — stays in view while we scroll through 300vh */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute w-[400px] h-[400px] bg-secondary rounded-full blur-[80px] opacity-20 -top-[100px] -right-[100px] pointer-events-none" />
        <div className="absolute w-[350px] h-[350px] bg-accent rounded-full blur-[80px] opacity-20 -bottom-[80px] -left-[80px] pointer-events-none" />

        {/* Desktop layout */}
        <div className="hidden lg:flex h-full items-center justify-center px-8">
          {/* Left side: text content (fades out, then "What Payoff Can Do" section scrolls in) */}
          <motion.div
            className="flex-1 flex flex-col items-center lg:items-start max-w-xl z-10"
            style={{ opacity: heroTextOpacity, y: heroTextY }}
          >
            <h1 className="text-4xl xl:text-5xl font-extrabold text-primary mb-5 leading-tight">
              Your personal AI debt coach
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Pay off debt faster with AI coaching, 7 strategies, and a savings
              planner. Join thousands on their journey to financial freedom.
            </p>

            <WaitlistForm variant="hero" className="mb-6 w-full max-w-md" />

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

          {/* Centre/Right: Phone mockup with 3D rotation */}
          <div className="flex-1 flex items-center justify-center" style={{ perspective: "1200px" }}>
            {/* Big watermark text behind phone */}
            <motion.span
              className="absolute text-[180px] font-extrabold text-primary select-none leading-none left-[5%] pointer-events-none"
              style={{ opacity: bigTextOpacity }}
            >
              DEBT
            </motion.span>
            <motion.span
              className="absolute text-[180px] font-extrabold text-primary select-none leading-none right-[5%] pointer-events-none"
              style={{ opacity: bigTextOpacity }}
            >
              FREE
            </motion.span>

            <motion.div
              className="relative w-[300px] h-[620px] rounded-[44px] border-[8px] border-gray-900 overflow-hidden shadow-2xl bg-black z-20"
              style={{
                rotateX,
                rotateY,
                rotateZ,
                x,
                scale,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front: Dashboard */}
              <motion.div className="absolute inset-0" style={{ opacity: frontOpacity }}>
                <Image
                  src="/screenshots/en/1.jpeg"
                  alt="Payoff app dashboard showing debt-free countdown and payment progress"
                  fill
                  className="object-cover rounded-[36px]"
                  priority
                />
              </motion.div>

              {/* Back: AI Coach */}
              <motion.div className="absolute inset-0" style={{ opacity: backOpacity }}>
                <Image
                  src="/screenshots/en/2.jpeg"
                  alt="Payoff AI debt coach giving personalised advice about bonus payments"
                  fill
                  className="object-cover rounded-[36px]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Mobile layout — simpler version */}
        <div className="lg:hidden flex flex-col items-center justify-center h-full px-4 py-16">
          <span className="text-6xl font-extrabold text-primary opacity-10 select-none leading-none mb-6">
            DEBT FREE
          </span>

          <div style={{ perspective: "1000px" }} className="mb-8">
            <motion.div
              className="relative w-[260px] h-[540px] rounded-[40px] border-[7px] border-gray-900 overflow-hidden shadow-2xl bg-black"
              style={{
                rotateX,
                scale,
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div className="absolute inset-0" style={{ opacity: frontOpacity }}>
                <Image
                  src="/screenshots/en/1.jpeg"
                  alt="Payoff app dashboard"
                  fill
                  className="object-cover rounded-[33px]"
                  priority
                />
              </motion.div>
              <motion.div className="absolute inset-0" style={{ opacity: backOpacity }}>
                <Image
                  src="/screenshots/en/2.jpeg"
                  alt="Payoff AI coach"
                  fill
                  className="object-cover rounded-[33px]"
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="text-center max-w-sm"
            style={{ opacity: heroTextOpacity }}
          >
            <h1 className="text-3xl font-extrabold text-primary mb-4">
              Your personal AI debt coach
            </h1>
            <p className="text-base text-gray-600 mb-6">
              Pay off debt faster with AI coaching, 7 strategies, and a savings planner
            </p>

            <WaitlistForm variant="hero" className="mb-6" />

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
