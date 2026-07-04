"use client";

// Reveal — reduced-motion-aware scroll-reveal wrapper (Framer Motion).
// Server components can import this freely; the "use client" directive turns
// it into the client-side boundary that owns the IntersectionObserver-driven
// motion. Children mount normally (good for SEO/AEO) and animate in once on
// first viewport entry, then re-animate on re-entry (Palantir-style chapter
// re-enforcement), unless `once` is true.
//
// Defaults are deliberately gentle: 18px rise + 12px optional x-shift, 480ms
// spring, fade 0 → 1. Compose with the parent's design intent; do not use this
// to hide primary content from crawlers — it only transforms.

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

// Restrict to HTML-only motion components (avoids the SVG/HTML union type clash
// when indexing `motion` dynamically). The common cases are covered; anything
// fancier should use MotionSection directly.
type RevealTag = "div" | "span" | "section" | "article" | "li" | "p" | "header" | "footer";

// Map of motion components. Each has its own generic, so the value type is a
// union of those generics — we type the lookup loosely and let JSX narrow it.
const MOTION_TAGS: Record<RevealTag, React.ElementType> = {
  div: motion.div,
  span: motion.span,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  p: motion.p,
  header: motion.header,
  footer: motion.footer,
};

export interface RevealProps {
  children: React.ReactNode;
  /** Distance to travel along the y or x axis (px). Default 18. */
  distance?: number;
  /** Travel direction. Default "up". */
  direction?: Direction;
  /** Delay before the spring starts (seconds). Default 0. */
  delay?: number;
  /** Render as a different element (e.g. "span" for inline reveals). Default "div". */
  as?: RevealTag;
  /** Reveal only the first time it enters the viewport. Default false (re-triggers on re-entry). */
  once?: boolean;
  /** Amount of element visible before triggering (0–1). Default 0.2. */
  amount?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Reveal({
  children,
  distance = 18,
  direction = "up",
  delay = 0,
  as = "div",
  once = false,
  amount = 0.2,
  className,
  style,
}: RevealProps) {
  const reduce = useReducedMotion();

  // Reduced motion → render the element with no transform/opacity animation.
  // We still wrap in motion so server/client markup matches, but variants are
  // identity so nothing actually transitions.
  const offsetAxis: "x" | "y" = direction === "left" || direction === "right" ? "x" : "y";
  const sign = direction === "down" || direction === "right" ? 1 : -1;
  const offset = reduce || direction === "none" ? 0 : sign * distance;

  // Build variants per branch so the computed axis key doesn't widen the
  // object type and break Framer Motion's `Variants` typing.
  const hidden =
    reduce || direction === "none"
      ? { opacity: 0 }
      : offsetAxis === "y"
        ? { opacity: 0, y: offset }
        : { opacity: 0, x: offset };

  const visible = reduce
    ? { opacity: 1, transition: { duration: 0.001 } }
    : {
        opacity: 1,
        ...(offsetAxis === "y" ? { y: 0 } : { x: 0 }),
        transition: {
          type: "spring" as const,
          stiffness: 110,
          damping: 22,
          mass: 0.9,
          delay,
        },
      };

  const variants: Variants = { hidden, visible };

  const MotionTag = MOTION_TAGS[as];

  return (
    <MotionTag
      className={cn(className)}
      style={style}
      initial="hidden"
      variants={variants}
      // Use viewport-driven animation: fires once on enter, optionally again on re-entry.
      whileInView="visible"
      viewport={{
        once,
        amount,
      }}
    >
      {children}
    </MotionTag>
  );
}
