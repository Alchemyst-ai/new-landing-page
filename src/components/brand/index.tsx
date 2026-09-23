// Brand primitives: the shared visual vocabulary of the site. Server-safe
// (no hooks) so they can be used from both server and client components.
// They echo the isometric diagram language: hairlines, corner ticks, the
// 7px amber HUD square, mono spec-sheet captions and the plate grid.

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ── Eyebrow ───────────────────────────────────────────────────────────────── */

export function Eyebrow({
  children,
  variant = "square",
  tone = "amber",
  className,
}: {
  children: React.ReactNode;
  /** "square": HUD square + mono label (default). "pill": tinted chip. */
  variant?: "square" | "pill";
  /** "red" is reserved for failure narratives (semantic drift, context rot). */
  tone?: "amber" | "red";
  className?: string;
}) {
  if (variant === "pill") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] leading-none",
          "text-[color:var(--amber)] bg-[rgba(180,83,9,0.07)] border border-[rgba(180,83,9,0.2)] rounded-[var(--radius)] px-3 py-[7px]",
          "[[data-theme=dark]_&]:bg-[rgba(228,192,144,0.08)] [[data-theme=dark]_&]:border-[rgba(228,192,144,0.22)]",
          className,
        )}
      >
        <span aria-hidden className="h-[6px] w-[6px] bg-current" />
        {children}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] leading-none",
        tone === "red" ? "text-[#991B1B]" : "text-[color:var(--amber)]",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-[7px] w-[7px]",
          tone === "red" ? "bg-[#991B1B]" : "bg-[#B45309] [[data-theme=dark]_&]:bg-[#E4C090]",
        )}
      />
      {children}
    </span>
  );
}

/* ── Section ───────────────────────────────────────────────────────────────── */

type Tone = "paper" | "sand" | "white" | "dark";
const TONES: Record<Tone, string> = {
  paper: "bg-[#FDFBF7]",
  sand: "bg-[#F8F4EE]",
  white: "bg-white",
  dark: "bg-[#1C1917] text-[#F5F5F4]",
};

export function Section({
  id,
  tone = "paper",
  grid = false,
  bordered = false,
  className,
  innerClassName,
  children,
  as = "section",
  pad = "default",
  width = "wide",
  ...rest
}: {
  id?: string;
  tone?: Tone;
  /** Radially masked plate grid backdrop. */
  grid?: boolean | "top";
  /** Hairline rule at the top edge. */
  bordered?: boolean;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  as?: "section" | "div" | "header" | "aside";
  pad?: "default" | "tight" | "none";
  width?: "wide" | "narrow" | "full";
} & Omit<React.HTMLAttributes<HTMLElement>, "children">) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      id={id}
      data-theme={tone === "dark" ? "dark" : undefined}
      className={cn(
        "relative w-full",
        TONES[tone],
        bordered && (tone === "dark" ? "border-t border-white/[0.06]" : "border-t border-[#E4D9BC]/70"),
        className,
      )}
      {...rest}
    >
      {grid && (
        <div aria-hidden className={cn("plate-grid absolute inset-0", grid === "top" && "plate-grid-top")} />
      )}
      <div
        className={cn(
          "relative mx-auto px-6 lg:px-8",
          width === "wide" && "max-w-[1200px]",
          width === "narrow" && "max-w-[800px]",
          width === "full" && "max-w-none px-0 lg:px-0",
          pad === "default" && "py-20 md:py-28",
          pad === "tight" && "py-14 md:py-20",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}

/* ── Corner ticks & SpecCard ───────────────────────────────────────────────── */

export function Ticks() {
  return (
    <>
      <span aria-hidden className="tick tick-tl" />
      <span aria-hidden className="tick tick-tr" />
      <span aria-hidden className="tick tick-bl" />
      <span aria-hidden className="tick tick-br" />
    </>
  );
}

export function SpecCard({
  children,
  className,
  ticks = true,
  interactive = true,
  tone = "light",
  as = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  ticks?: boolean;
  interactive?: boolean;
  tone?: "light" | "dark" | "sand";
  as?: "div" | "article" | "li" | "blockquote" | "aside";
} & React.HTMLAttributes<HTMLElement>) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      className={cn(
        "group relative rounded-[var(--radius)] border",
        tone === "light" && "bg-white border-[#E4D9BC] shadow-[var(--shadow-soft)]",
        tone === "sand" && "bg-[#F8F4EE] border-[#E4D9BC]",
        tone === "dark" && "bg-[#232020] border-white/[0.08]",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-[2px] hover:shadow-[var(--shadow-soft-lg)]",
        interactive && tone !== "dark" && "hover:border-[#E4C090]",
        className,
      )}
      {...rest}
    >
      {ticks && <Ticks />}
      {children}
    </Tag>
  );
}

/* ── Buttons ───────────────────────────────────────────────────────────────── */

type BtnVariant = "primary" | "ink" | "outline" | "outline-dark" | "text";

const BTN: Record<BtnVariant, string> = {
  primary:
    "bg-[#B45309] text-white shadow-[var(--shadow-soft)] hover:bg-[#A16207] hover:shadow-[var(--shadow-soft-lg)] hover:-translate-y-px",
  ink: "bg-[#4A3B33] text-white shadow-[var(--shadow-soft)] hover:bg-[#3A2E28] hover:shadow-[var(--shadow-soft-lg)] hover:-translate-y-px",
  outline:
    "bg-white text-[#57534E] border border-[#E4D9BC] shadow-[var(--shadow-soft)] hover:text-[#4A3B33] hover:border-[#B45309]/50 hover:shadow-[var(--shadow-soft-lg)] hover:-translate-y-px",
  "outline-dark":
    "bg-white/[0.03] text-[#E7E5E4] border border-white/[0.12] hover:border-[#E4C090]/60 hover:text-white hover:-translate-y-px",
  text: "px-0 py-0 text-[color:var(--amber)] hover:text-[#A16207] [[data-theme=dark]_&]:hover:text-[#F2DABA]",
};

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={cn("transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/btn:translate-x-[3px]", className)}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function BrandButton({
  href,
  children,
  variant = "primary",
  arrow = false,
  external = false,
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: BtnVariant;
  arrow?: boolean;
  external?: boolean;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const cls = cn(
    "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] font-bold text-sm tracking-wide",
    variant !== "text" && "px-7 py-3.5",
    "transition-[transform,background-color,box-shadow,border-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:translate-y-0 active:scale-[0.985]",
    BTN[variant],
    className,
  );
  const inner = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );
  if (external || /^(https?:|mailto:)/.test(href)) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

/* ── SpecStrip: mono metrics row with hairline dividers ────────────────────── */

export function SpecStrip({
  items,
  className,
}: {
  items: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <dl
      className={cn("grid items-stretch border-y border-[#E4D9BC]/80", className)}
      style={{ gridTemplateColumns: `repeat(${items.length}, auto)` }}
    >
      {items.map((m, i) => (
        <div
          key={m.label}
          className={cn(
            "flex flex-col gap-1.5 py-4 pr-4 sm:pr-8",
            i > 0 && "pl-4 sm:pl-8 border-l border-[#E4D9BC]/80",
          )}
        >
          <dt className="order-2 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[#78716C] whitespace-nowrap">{m.label}</dt>
          <dd className="order-1 text-[0.9375rem] sm:text-[1.0625rem] whitespace-nowrap font-bold tracking-[-0.01em] text-[#4A3B33] tabular-nums">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ── Figure: frame with corner brackets around a diagram ───────────────────── */

export function Figure({
  children,
  className,
  frame = true,
}: {
  children: React.ReactNode;
  className?: string;
  frame?: boolean;
}) {
  return (
    <div className={cn("relative", frame && "p-3 sm:p-5", className)}>
      {frame && (
        <>
          <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l border-t border-[#E4C090]" />
          <span aria-hidden className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r border-t border-[#E4C090]" />
          <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b border-l border-[#E4C090]" />
          <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b border-r border-[#E4C090]" />
        </>
      )}
      {children}
    </div>
  );
}

/* ── Chip ──────────────────────────────────────────────────────────────────── */

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono text-[10.5px] tracking-[0.04em] text-[#57534E] bg-[#F8F4EE] border border-[#E4D9BC] rounded-[var(--radius)] px-2.5 py-1.5",
        "transition-colors duration-300 group-hover:bg-white group-hover:border-[#E4C090]",
        className,
      )}
    >
      {children}
    </span>
  );
}
