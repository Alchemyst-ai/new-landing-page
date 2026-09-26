"use client";

// FooterWatermark: a translucent, neutral-toned "Alchemyst AI" watermark that rises into place as
// the footer scrolls in. Decorative only (aria-hidden).

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotionSafe } from "@/components/sections/iso/kit";

export default function FooterWatermark() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["45%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none relative z-0 hidden select-none overflow-hidden pb-[1.6vw] md:block">
      <motion.div
        style={reduce ? undefined : { y, opacity }}
        className="mx-auto max-w-[1400px] whitespace-nowrap px-4 text-center font-bold leading-[0.95] tracking-[-0.04em] text-[13.5vw] xl:text-[190px]"
      >
        <span
          style={{
            color: "transparent",
            // Warm stone tones from the footer's own palette (stone-600 -> stone-800), translucent over #1C1917
            backgroundImage: "linear-gradient(to bottom, rgba(87,83,78,0.5), rgba(41,37,36,0.5))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Alchemyst AI
        </span>
      </motion.div>
    </div>
  );
}
