"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useReducedMotionSafe } from "./iso/kit";

export interface CountUpMetricProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  sub: string;
  /** "light" (paper) or "dark" (charcoal chapter). */
  tone?: "light" | "dark";
}

/** A proof metric: large serif numeral that counts up once when it enters
 *  the viewport, a serif label and a mono sub-label. SSR renders the final
 *  value so crawlers and no-JS readers see the real number. */
export default function CountUpMetric({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
  sub,
  tone = "light",
}: CountUpMetricProps) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    if (reduce) {
      setDisplay(null);
      return;
    }
    if (!inView) {
      setDisplay(0);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => setDisplay(v),
      onComplete: () => setDisplay(null),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  const shown = (display ?? value).toFixed(decimals);
  const dark = tone === "dark";

  return (
    <div ref={ref} className="h-full flex flex-col">
      <div
        className={`font-bold text-[clamp(2.5rem,4.5vw,3.75rem)] leading-none tracking-[-0.03em] tabular-nums mb-5 ${
          dark ? "text-[#F5F5F4]" : "text-[#4A3B33]"
        }`}
        aria-label={`${prefix}${value.toFixed(decimals)}${suffix}`}
      >
        <span aria-hidden className={dark ? "text-[#E4C090]" : "text-[#B45309]"}>{prefix}</span>
        <span aria-hidden>{shown}</span>
        <span aria-hidden className={dark ? "text-[#E4C090]" : "text-[#B45309]"}>{suffix}</span>
      </div>
      <div className={`text-[15px] font-bold leading-snug mb-2 ${dark ? "text-[#E7E5E4]" : "text-[#4A3B33]"}`}>
        {label}
      </div>
      <div className={`font-mono text-[10.5px] uppercase tracking-[0.14em] leading-relaxed ${dark ? "text-[#A8A29E]" : "text-[#78716C]"}`}>
        {sub}
      </div>
    </div>
  );
}
