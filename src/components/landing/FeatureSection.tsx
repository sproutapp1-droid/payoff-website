"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { useDict } from "@/components/i18n/LocaleProvider";

interface FeatureSectionProps {
  screenshotNum: number;
  imageAlt: string;
  featureIndex: number;
  reverse?: boolean;
}

export default function FeatureSection({
  screenshotNum,
  imageAlt,
  featureIndex,
  reverse = false,
}: FeatureSectionProps) {
  const { locale, dict } = useDict();
  const features = dict.features || [];
  const feature = features[featureIndex] || {};

  const badge = feature.badge || '';
  const heading = feature.heading || '';
  const description = feature.description || '';
  const bullets = feature.bullets || [];

  const imageSrc = `/screenshots/${locale}/${screenshotNum}.jpeg`;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div
        className={`max-w-6xl mx-auto flex flex-col ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center gap-12 lg:gap-20`}
      >
        <motion.div
          initial={{ opacity: 0, x: reverse ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative flex-shrink-0"
        >
          <div
            className="blob w-64 h-64 -top-10 -left-10"
            style={{ background: reverse ? "#FFD966" : "#FF8C73" }}
          />
          <div className="phone-frame animate-float relative z-10">
            <Image src={imageSrc} alt={imageAlt} width={280} height={580} className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reverse ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="flex-1"
        >
          <span className="inline-block bg-secondary/15 text-secondary rounded-full px-4 py-1 text-sm font-semibold mb-4">
            {badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">{heading}</h2>
          <p className="text-gray-600 text-lg mt-4 leading-relaxed">{description}</p>
          <ul className="mt-6 space-y-3">
            {bullets.map((bullet: string) => (
              <li key={bullet} className="flex items-start gap-3">
                <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
