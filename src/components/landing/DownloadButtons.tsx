"use client";

import { STORE_LINKS } from "@/lib/constants";

interface DownloadButtonsProps {
  variant?: "hero" | "banner" | "inline" | "light";
  className?: string;
  align?: "left" | "center";
}

function AppleLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.04c-.03-2.86 2.34-4.23 2.45-4.3-1.34-1.96-3.42-2.23-4.16-2.26-1.77-.18-3.46 1.04-4.36 1.04-.91 0-2.3-1.02-3.78-.99-1.94.03-3.74 1.13-4.74 2.86-2.02 3.5-.52 8.68 1.45 11.52.96 1.39 2.1 2.95 3.59 2.89 1.45-.06 1.99-.93 3.74-.93 1.74 0 2.24.93 3.77.9 1.56-.03 2.55-1.41 3.5-2.81 1.1-1.61 1.55-3.17 1.58-3.25-.04-.02-3.04-1.16-3.07-4.62zM14.18 3.62c.8-.97 1.34-2.32 1.19-3.66-1.15.05-2.55.77-3.38 1.74-.74.85-1.39 2.22-1.21 3.54 1.28.1 2.6-.65 3.4-1.62z" />
    </svg>
  );
}

function PlayLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <path
        d="M325.3 234.3 104.5 13.5l280.7 161.9-59.9 58.9z"
        fill="#0F9D58"
      />
      <path
        d="M104.5 13.5c-9.4 4.4-15.4 14.1-15.4 26.5v432c0 12.4 6 22.1 15.4 26.5l225.7-225.6L104.5 13.5z"
        fill="#FFD740"
      />
      <path
        d="M385.2 174.4 459.7 218c14.7 8.6 14.7 30.6 0 39.2l-78.7 45.6-67.5-66.4 71.7-61.9z"
        fill="#F44336"
      />
      <path
        d="M104.5 498.5 325.3 277.7l59.9 58.9L104.5 498.5z"
        fill="#2196F3"
      />
    </svg>
  );
}

export default function DownloadButtons({
  variant = "hero",
  className = "",
  align = "center",
}: DownloadButtonsProps) {
  const justify = align === "left" ? "justify-start" : "justify-center";

  // Light variant for use on dark/coloured backgrounds (white pills)
  if (variant === "light") {
    return (
      <div className={`flex flex-col sm:flex-row gap-3 ${justify} ${className}`}>
        <a
          href={STORE_LINKS.appStore}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-gray-900 rounded-2xl px-5 py-3 hover:bg-gray-100 transition no-underline"
          aria-label="Download on the App Store"
        >
          <AppleLogo />
          <span className="flex flex-col leading-tight text-left">
            <span className="text-[10px] font-medium opacity-70">Download on the</span>
            <span className="text-base font-bold tracking-tight">App Store</span>
          </span>
        </a>
        <a
          href={STORE_LINKS.playStore}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-gray-900 rounded-2xl px-5 py-3 hover:bg-gray-100 transition no-underline"
          aria-label="Get it on Google Play"
        >
          <PlayLogo />
          <span className="flex flex-col leading-tight text-left">
            <span className="text-[10px] font-medium opacity-70">Get it on</span>
            <span className="text-base font-bold tracking-tight">Google Play</span>
          </span>
        </a>
      </div>
    );
  }

  // Inline variant — compact icon-only pills (good for dense CTAs / nav)
  if (variant === "inline") {
    return (
      <div className={`flex gap-2 ${justify} ${className}`}>
        <a
          href={STORE_LINKS.appStore}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-gray-800 transition no-underline"
          aria-label="Download on the App Store"
        >
          <AppleLogo className="w-4 h-4" />
          App Store
        </a>
        <a
          href={STORE_LINKS.playStore}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-gray-800 transition no-underline"
          aria-label="Get it on Google Play"
        >
          <PlayLogo className="w-4 h-4" />
          Google Play
        </a>
      </div>
    );
  }

  // Default hero / banner — dark pill badges
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${justify} ${className}`}>
      <a
        href={STORE_LINKS.appStore}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-gray-900 text-white rounded-2xl px-5 py-3 hover:bg-gray-800 transition no-underline"
        aria-label="Download on the App Store"
      >
        <AppleLogo />
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[10px] font-medium opacity-80">Download on the</span>
          <span className="text-base font-bold tracking-tight">App Store</span>
        </span>
      </a>
      <a
        href={STORE_LINKS.playStore}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-gray-900 text-white rounded-2xl px-5 py-3 hover:bg-gray-800 transition no-underline"
        aria-label="Get it on Google Play"
      >
        <PlayLogo />
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[10px] font-medium opacity-80">Get it on</span>
          <span className="text-base font-bold tracking-tight">Google Play</span>
        </span>
      </a>
    </div>
  );
}
