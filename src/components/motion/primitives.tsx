"use client";

// Motion primitives for the editorial-cinematic scroll language.
// Every primitive animates only transform, opacity or clip-path, plays once,
// and resolves to its final state instantly for reduced-motion users (via the
// hydration-safe hook from the iso kit, never useReducedMotion directly).

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { useReducedMotionSafe } from "@/components/sections/iso/kit";
import { cn } from "@/lib/utils";

export const EASE = [0.23, 1, 0.32, 1] as const;
/** Default viewport trigger: fire once, slightly before the element is fully in. */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/* ── Stagger / FadeUp ──────────────────────────────────────────────────────── */

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

type HtmlTag = "div" | "section" | "ul" | "ol" | "li" | "span" | "p" | "article" | "header" | "dl";

const M: Record<HtmlTag, React.ElementType> = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  span: motion.span,
  p: motion.p,
  article: motion.article,
  header: motion.header,
  dl: motion.dl,
};

/** Container that staggers its <FadeUp> (or any variant-driven) children. */
export function Stagger({
  as = "div",
  className,
  children,
  stagger = 0.08,
  delay = 0,
  onMount = false,
  style,
  ...rest
}: {
  as?: HtmlTag;
  className?: string;
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  /** Animate on mount instead of on viewport entry (above-the-fold content). */
  onMount?: boolean;
  style?: React.CSSProperties;
} & Omit<React.HTMLAttributes<HTMLElement>, "style">) {
  const reduce = useReducedMotionSafe();
  const Tag = M[as];
  const variants: Variants = {
    hidden: {},
    show: {
      transition: reduce ? { duration: 0 } : { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const trigger = onMount ? { animate: "show" } : { whileInView: "show", viewport: VIEWPORT };
  return (
    <Tag className={className} style={style} initial="hidden" variants={variants} {...trigger} {...rest}>
      {children}
    </Tag>
  );
}

/** Fade + 24px rise. Standalone (own viewport trigger) or inside <Stagger>. */
export function FadeUp({
  as = "div",
  className,
  children,
  standalone = false,
  delay = 0,
  distance = 24,
  style,
  ...rest
}: {
  as?: HtmlTag;
  className?: string;
  children?: React.ReactNode;
  /** true: trigger on its own viewport entry. false: inherit from <Stagger>. */
  standalone?: boolean;
  delay?: number;
  distance?: number;
  style?: React.CSSProperties;
} & Omit<React.HTMLAttributes<HTMLElement>, "style">) {
  const reduce = useReducedMotionSafe();
  const Tag = M[as];
  const variants: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: 0 } : { duration: 0.7, ease: EASE, delay },
    },
  };
  const trigger = standalone ? { initial: "hidden", whileInView: "show", viewport: VIEWPORT } : {};
  return (
    <Tag className={className} style={style} variants={variants} {...trigger} {...rest}>
      {children}
    </Tag>
  );
}

/* ── RevealText: masked word-by-word headline reveal ───────────────────────── */

const wordVariants = (reduce: boolean): Variants => ({
  hidden: reduce ? { y: "0%" } : { y: "105%" },
  show: {
    y: "0%",
    transition: reduce ? { duration: 0 } : { duration: 0.8, ease: EASE },
  },
});

function splitWords(node: React.ReactNode, reduce: boolean, key = "w"): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  React.Children.forEach(node, (child, ci) => {
    const k = `${key}-${ci}`;
    if (typeof child === "string" || typeof child === "number") {
      // Split on ordinary whitespace only: non-breaking spaces keep their
      // words glued together (e.g. "AI&nbsp;agents").
      const parts = String(child).split(/([ \t\n\r]+)/);
      parts.forEach((part, pi) => {
        if (!part) return;
        if (/^[ \t\n\r]+$/.test(part)) {
          out.push(" ");
          return;
        }
        out.push(
          <span key={`${k}-${pi}`} className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] pr-[0.08em] -mr-[0.08em]">
            <motion.span className="inline-block will-change-transform" variants={wordVariants(reduce)}>
              {part}
            </motion.span>
          </span>,
        );
      });
      return;
    }
    if (React.isValidElement(child)) {
      const el = child as React.ReactElement<{ children?: React.ReactNode; className?: string }>;
      if (el.type === "br") {
        out.push(<br key={k} />);
        return;
      }
      // Recreate the wrapper (e.g. an italic amber <span>) around each word so
      // styling survives the split and words still wrap naturally.
      const inner = splitWords(el.props.children, reduce, k);
      out.push(
        React.cloneElement(el, { key: k }, inner),
      );
    }
  });
  return out;
}

type HeadingTag = "h1" | "h2" | "h3" | "p" | "span" | "div" | "blockquote";
const MH: Record<HeadingTag, React.ElementType> = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
  blockquote: motion.blockquote,
};

export function RevealText({
  as = "h2",
  children,
  className,
  id,
  onMount = false,
  delay = 0,
  stagger = 0.045,
  style,
}: {
  as?: HeadingTag;
  children: React.ReactNode;
  className?: string;
  id?: string;
  onMount?: boolean;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotionSafe();
  const Tag = MH[as];
  const variants: Variants = {
    hidden: {},
    show: { transition: reduce ? { duration: 0 } : { staggerChildren: stagger, delayChildren: delay } },
  };
  const trigger = onMount ? { animate: "show" } : { whileInView: "show", viewport: VIEWPORT };
  return (
    <Tag id={id} className={className} style={style} initial="hidden" variants={variants} {...trigger}>
      {splitWords(children, reduce)}
    </Tag>
  );
}

/* ── DrawLine: a hairline rule that draws in from the left ─────────────────── */

export function DrawLine({
  className,
  delay = 0,
  vertical = false,
  duration = 1.1,
  from = "start",
}: {
  className?: string;
  delay?: number;
  vertical?: boolean;
  duration?: number;
  /** Which end the line grows from. */
  from?: "start" | "end";
}) {
  const reduce = useReducedMotionSafe();
  const axis = vertical ? "scaleY" : "scaleX";
  return (
    <motion.div
      aria-hidden
      className={cn(vertical ? "w-px h-full" : "h-px w-full", "bg-[#E4D9BC]", className)}
      style={{
        transformOrigin: vertical
          ? from === "start" ? "50% 0%" : "50% 100%"
          : from === "start" ? "0% 50%" : "100% 50%",
      }}
      initial={reduce ? false : { [axis]: 0 }}
      whileInView={{ [axis]: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: reduce ? 0 : duration, ease: EASE, delay }}
    />
  );
}

/* ── Parallax: small scroll-linked vertical drift ──────────────────────────── */

export function useParallax(distance = 24): {
  ref: React.RefObject<HTMLDivElement | null>;
  y: MotionValue<number>;
} {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return { ref, y };
}

export function Parallax({
  children,
  className,
  distance = 24,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduce = useReducedMotionSafe();
  const { ref, y } = useParallax(distance);
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}

/* ── FigureReveal: clip-path wipe for diagrams ─────────────────────────────── */

export function FigureReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotionSafe();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32, clipPath: "inset(14% 0% 0% 0%)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        // Remove the clip afterwards so callouts and panels may overflow.
        transitionEnd: { clipPath: "none" },
      }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
