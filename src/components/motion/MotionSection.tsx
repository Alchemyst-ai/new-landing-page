"use client";

// MotionSection — a scroll-aware <section> shell that exposes a Framer Motion
// `useScroll` progress value to its children via render props, so diagrams and
// chapter reveals can react to the section's own scroll position (data-flow
// animations, narrative sequencing, etc.) without each client component
// re-implementing the IntersectionObserver/scroll math.
//
// Server components can import this freely; the "use client" boundary is here.
// The <section> element itself is rendered with semantic HTML, so SEO/AEO is
// unaffected — only the children that opt into `scrollYProgress` animate.

import * as React from "react";
import {
  motion,
  useScroll,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollEdge = "start" | "center" | "end";

export interface MotionSectionProps {
  /** Render prop receiving the section's scroll progress (0 → 1). */
  children?:
    | React.ReactNode
    | ((progress: MotionValue<number>) => React.ReactNode);
  /** Scroll offset pair. Defaults to ["start end", "end start"] so progress
   *  spans the full scroll-through. */
  offset?: [`${ScrollEdge} ${ScrollEdge}`, `${ScrollEdge} ${ScrollEdge}`];
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  "aria-labelledby"?: string;
}

export default function MotionSection({
  children,
  offset = ["start end", "end start"],
  className,
  style,
  id,
  ...aria
}: MotionSectionProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // When reduced motion is requested, collapse the offset so the progress
    // jumps straight through — effectively disabling scroll-driven choreography.
    offset: reduce ? ["start start", "start start"] : offset,
  });

  return (
    <motion.section
      ref={ref}
      className={cn(className)}
      style={style}
      id={id}
      {...aria}
    >
      {typeof children === "function" ? children(scrollYProgress) : children}
    </motion.section>
  );
}
