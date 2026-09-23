"use client";

import { motion } from "framer-motion";

type Logo = { name: string; node: React.ReactNode };

const LOGOS: Logo[] = [
  {
    name: "Veranda Learning",
    node: (
      <svg height="24" viewBox="0 0 155 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Veranda Learning">
        <text x="0" y="18" fontFamily="var(--font-merriweather), Georgia, serif" fontSize="16" fontWeight="600" fill="currentColor" letterSpacing="-0.5">Veranda Learning</text>
      </svg>
    ),
  },
  {
    name: "Unacademy",
    node: (
      <svg height="24" viewBox="0 0 140 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Unacademy">
        <text x="0" y="19" fontFamily="var(--font-merriweather), Georgia, serif" fontSize="18" fontWeight="700" fill="currentColor" letterSpacing="-0.5">Unacademy</text>
      </svg>
    ),
  },
  {
    name: "Great Learning",
    node: (
      <svg height="24" viewBox="0 0 135 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Great Learning">
        <text x="0" y="17" fontFamily="var(--font-merriweather), Georgia, serif" fontSize="15" fontWeight="700" fill="currentColor" letterSpacing="-0.3">Great Learning</text>
      </svg>
    ),
  },
  {
    name: "Anarock",
    node: (
      <svg height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Anarock">
        <text x="0" y="18" fontFamily="var(--font-merriweather), Georgia, serif" fontSize="16" fontWeight="800" fill="currentColor" letterSpacing="0.5">ANAROCK</text>
      </svg>
    ),
  },
  {
    name: "CIEL HR",
    node: (
      <svg height="24" viewBox="0 0 110 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CIEL HR">
        <text x="0" y="18" fontFamily="var(--font-merriweather), Georgia, serif" fontSize="17" fontWeight="700" fill="currentColor" letterSpacing="1">CIEL</text>
        <text x="58" y="18" fontFamily="var(--font-merriweather), Georgia, serif" fontSize="17" fontWeight="400" fill="currentColor" letterSpacing="1">HR</text>
      </svg>
    ),
  },
  {
    name: "Motilal Oswal",
    node: (
      <svg height="24" viewBox="0 0 125 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Motilal Oswal">
        <text x="0" y="17" fontFamily="var(--font-merriweather), Georgia, serif" fontSize="14" fontWeight="700" fill="currentColor" letterSpacing="-0.3">Motilal Oswal</text>
      </svg>
    ),
  },
  {
    name: "Y Combinator",
    node: (
      <svg height="24" viewBox="0 0 150 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Y Combinator">
        <rect x="0" y="0" width="24" height="24" fill="currentColor" />
        <text x="12" y="18" textAnchor="middle" fontFamily="var(--font-merriweather), Georgia, serif" fontSize="14" fontWeight="800" fill="#FFF">Y</text>
        <text x="32" y="17" fontFamily="var(--font-merriweather), Georgia, serif" fontSize="14" fontWeight="600" fill="currentColor" letterSpacing="-0.3">Combinator</text>
      </svg>
    ),
  },
  {
    name: "Antler",
    node: (
      <svg height="24" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Antler">
        <text x="0" y="18" fontFamily="var(--font-merriweather), Georgia, serif" fontSize="16" fontWeight="700" fill="currentColor" letterSpacing="0.5">ANTLER</text>
      </svg>
    ),
  },
  {
    name: "Razorpay",
    node: (
      <svg height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Razorpay">
        <text x="0" y="17" fontFamily="var(--font-merriweather), Georgia, serif" fontSize="15" fontWeight="700" fill="currentColor" letterSpacing="-0.3">Razorpay</text>
      </svg>
    ),
  },
  {
    name: "Swiggy",
    node: (
      <svg height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Swiggy">
        <text x="0" y="17" fontFamily="var(--font-merriweather), Georgia, serif" fontSize="15" fontWeight="700" fill="currentColor" letterSpacing="-0.3">Swiggy</text>
      </svg>
    ),
  },
];

export default function LogoBar() {
  const doubled = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section
      aria-label="Trusted by"
      className="w-full bg-[#F8F4EE] py-20 relative overflow-hidden border-t border-[#E4D9BC]"
    >
      <div className="max-w-[1200px] mx-auto mb-12 px-6 lg:px-8 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#A8A29E] font-medium">
          Trusted by teams at
        </span>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ ease: "linear", duration: 28, repeat: Infinity }}
          className="flex items-center gap-20 w-max px-10"
        >
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              aria-hidden={i >= LOGOS.length ? true : undefined}
              className="flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-300 text-[#78716C] hover:text-[#4A3B33] cursor-default"
            >
              {logo.node}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
