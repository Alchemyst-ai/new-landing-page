"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

export interface CountUpMetricProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  sub: string;
}

export default function CountUpMetric({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
  sub,
}: CountUpMetricProps) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (started.current) {
            setDisplay(0);
          }
          started.current = true;
          const controls = animate(0, value, {
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setDisplay(v),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value, reduce]);

  const formatted = display.toFixed(decimals);

  return (
    <div
      ref={ref}
      className="p-8 text-center bg-white h-full flex flex-col justify-center"
    >
      <div className="font-sora font-bold text-4xl md:text-5xl tracking-tight text-[#128F8B] tabular-nums mb-3">
        {prefix}
        {formatted}
        {suffix}
      </div>
      <div className="font-sora font-semibold text-[15px] text-slate-800 leading-snug mb-2">
        {label}
      </div>
      <div className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
        {sub}
      </div>
    </div>
  );
}