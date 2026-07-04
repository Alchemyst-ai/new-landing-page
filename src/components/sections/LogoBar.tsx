"use client";

import { motion } from "framer-motion";

type Logo = { name: string; node: React.ReactNode };

const LOGOS: Logo[] = [
  {
    name: "Veranda Learning",
    node: (
      <svg height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Veranda Learning">
        <path d="M2 4l6 16 6-16h-3l-3 9-3-9H2z" fill="currentColor" />
        <text x="20" y="19" fontFamily="'Sora', sans-serif" fontSize="17" fontWeight="600" fill="currentColor" letterSpacing="-0.5">Veranda</text>
      </svg>
    ),
  },
  {
    name: "Unacademy",
    node: (
      <svg height="24" viewBox="0 0 140 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Unacademy">
        <text x="0" y="19" fontFamily="'Sora', sans-serif" fontSize="18" fontWeight="700" fill="currentColor" letterSpacing="-0.5">Unacademy</text>
      </svg>
    ),
  },
  {
    name: "PhysicsWallah",
    node: (
      <svg height="24" viewBox="0 0 170 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PhysicsWallah">
        <rect x="0" y="2" width="20" height="20" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <text x="10" y="17" textAnchor="middle" fontFamily="'Sora', sans-serif" fontSize="10" fontWeight="800" fill="currentColor">PW</text>
        <text x="28" y="17" fontFamily="'Sora', sans-serif" fontSize="14" fontWeight="700" fill="currentColor" letterSpacing="-0.3">PhysicsWallah</text>
      </svg>
    ),
  },
  {
    name: "Y Combinator",
    node: (
      <svg height="24" viewBox="0 0 150 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Y Combinator">
        <rect x="0" y="0" width="24" height="24" fill="currentColor" />
        <text x="12" y="18" textAnchor="middle" fontFamily="'Sora', sans-serif" fontSize="14" fontWeight="800" fill="#FFF">Y</text>
        <text x="32" y="17" fontFamily="'Sora', sans-serif" fontSize="14" fontWeight="600" fill="currentColor" letterSpacing="-0.3">Combinator</text>
      </svg>
    ),
  },
  {
    name: "Entrepreneur First",
    node: (
      <svg height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Entrepreneur First">
        <text x="0" y="19" fontFamily="'Sora', sans-serif" fontSize="20" fontWeight="800" fill="currentColor" letterSpacing="-1">EF</text>
        <text x="32" y="11" fontFamily="'Sora', sans-serif" fontSize="8" fontWeight="700" fill="currentColor" letterSpacing="0.5">ENTREPRENEUR</text>
        <text x="32" y="21" fontFamily="'Sora', sans-serif" fontSize="8" fontWeight="700" fill="currentColor" letterSpacing="0.5">FIRST</text>
      </svg>
    ),
  },
  {
    name: "Microsoft",
    node: (
      <svg height="24" viewBox="0 0 130 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Microsoft">
        <rect x="0" y="2" width="9" height="9" fill="currentColor" />
        <rect x="11" y="2" width="9" height="9" fill="currentColor" />
        <rect x="0" y="13" width="9" height="9" fill="currentColor" />
        <rect x="11" y="13" width="9" height="9" fill="currentColor" />
        <text x="28" y="17" fontFamily="'Sora', sans-serif" fontSize="15" fontWeight="600" fill="currentColor" letterSpacing="-0.3">Microsoft</text>
      </svg>
    ),
  },
  {
    name: "Google",
    node: (
      <svg height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Google">
        <text x="0" y="19" fontFamily="'Sora', sans-serif" fontSize="18" fontWeight="600" fill="currentColor" letterSpacing="-0.5">Google</text>
      </svg>
    ),
  },
  {
    name: "Meta",
    node: (
      <svg height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Meta">
        <path d="M2 18c2 0 3.5-2 5-5s3-5 5-5 3.5 2 5 5 3 5 5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="32" y="19" fontFamily="'Sora', sans-serif" fontSize="18" fontWeight="700" fill="currentColor" letterSpacing="-0.5">Meta</text>
      </svg>
    ),
  },
];

export default function LogoBar() {
  const doubled = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section
      aria-label="Trusted by"
      className="w-full bg-[#FAFAFA] py-20 relative overflow-hidden border-t border-[#E5E7EB]"
    >
      <div className="max-w-[1200px] mx-auto mb-12 px-6 lg:px-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#94A3B8] font-medium">
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
              className="flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-300 text-[#64748B] hover:text-[#0F172A] cursor-default"
            >
              {logo.node}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
