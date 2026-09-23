"use client";

// Reveal: reduced-motion-aware scroll-reveal wrapper (framer-motion).
// Server components can import this freely; the "use client" directive makes
// it the client boundary. Children mount normally (good for SEO and AEO) and
// animate in once on first viewport entry. Pass `once={false}` to replay on
// re-entry. Defaults follow the design system: 24px rise, 700ms, EASE.

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { useReducedMotionSafe } from "@/components/sections/iso/kit";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealTag = "div" | "span" | "section" | "article" | "li" | "p" | "header" | "footer";

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
  /** Distance to travel along the y or x axis (px). Default 24. */
  distance?: number;
  /** Travel direction. Default "up". */
  direction?: Direction;
  /** Delay before the transition starts (seconds). Default 0. */
  delay?: number;
  /** Render as a different element. Default "div". */
  as?: RevealTag;
  /** Reveal only the first time it enters the viewport. Default true. */
  once?: boolean;
  /** Amount of element visible before triggering (0 to 1). Default 0.15. */
  amount?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Reveal({
  children,
  distance = 24,
  direction = "up",
  delay = 0,
  as = "div",
  once = true,
  amount = 0.15,
  className,
  style,
}: RevealProps) {
  const reduce = useReducedMotionSafe();

  const axis: "x" | "y" = direction === "left" || direction === "right" ? "x" : "y";
  const sign = direction === "down" || direction === "right" ? -1 : 1;
  const offset = direction === "none" ? 0 : sign * distance;

  const hidden = reduce
    ? { opacity: 1 }
    : axis === "y"
      ? { opacity: 0, y: offset }
      : { opacity: 0, x: offset };

  const visible = {
    opacity: 1,
    ...(axis === "y" ? { y: 0 } : { x: 0 }),
    transition: reduce ? { duration: 0 } : { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const, delay },
  };

  const variants: Variants = { hidden, visible };
  const MotionTag = MOTION_TAGS[as];

  return (
    <MotionTag
      className={cn(className)}
      style={style}
      initial="hidden"
      variants={variants}
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}
