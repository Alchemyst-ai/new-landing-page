"use client";

// SectionHeader: the editorial header used by every section. A hairline rule
// draws in, the eyebrow sits on it, the headline reveals word by word, and
// the lead paragraph fades up. "split" puts the lead in a right-hand column
// aligned to the headline's baseline (desktop); "center" and "left" stack.

import * as React from "react";
import { DrawLine, FadeUp, RevealText, Stagger } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./index";

export default function SectionHeader({
  eyebrow,
  eyebrowTone = "amber",
  title,
  lead,
  id,
  as = "h2",
  align = "split",
  rule = true,
  className,
  titleClassName,
  leadClassName,
  onMount = false,
  children,
}: {
  eyebrow?: React.ReactNode;
  eyebrowTone?: "amber" | "red";
  title: React.ReactNode;
  lead?: React.ReactNode;
  id?: string;
  as?: "h1" | "h2";
  align?: "split" | "center" | "left";
  rule?: boolean;
  className?: string;
  titleClassName?: string;
  leadClassName?: string;
  onMount?: boolean;
  children?: React.ReactNode;
}) {
  const titleCls = cn(
    as === "h1"
      ? "text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.1] tracking-[-0.035em]"
      : "text-[clamp(1.875rem,3.6vw,2.875rem)] leading-[1.14] tracking-[-0.028em]",
    "font-bold text-[color:var(--ink)] text-balance",
    titleClassName,
  );
  const leadCls = cn("text-[1.0625rem] leading-[1.75] text-[color:var(--ink-soft)]", leadClassName);

  if (align === "split") {
    return (
      <div className={cn("mb-14 md:mb-20", className)}>
        {rule && <DrawLine className="mb-7 [[data-theme=dark]_&]:bg-white/[0.1]" />}
        {eyebrow && (
          <FadeUp standalone className="mb-6">
            <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
          </FadeUp>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          <RevealText as={as} id={id} onMount={onMount} className={cn(titleCls, "lg:col-span-7")}>
            {title}
          </RevealText>
          {lead && (
            <FadeUp standalone delay={0.15} className="lg:col-span-5 lg:pb-1.5">
              <p className={leadCls}>{lead}</p>
            </FadeUp>
          )}
        </div>
        {children}
      </div>
    );
  }

  const center = align === "center";
  return (
    <Stagger onMount={onMount} className={cn("mb-14 md:mb-20", center && "text-center mx-auto max-w-3xl", className)}>
      {rule && !center && <DrawLine className="mb-7" />}
      {eyebrow && (
        <FadeUp className="mb-6">
          <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
        </FadeUp>
      )}
      <RevealText as={as} id={id} onMount={onMount} className={cn(titleCls, "mb-6", center && "mx-auto")}>
        {title}
      </RevealText>
      {lead && (
        <FadeUp>
          <p className={cn(leadCls, center ? "mx-auto max-w-2xl" : "max-w-2xl")}>{lead}</p>
        </FadeUp>
      )}
      {children}
    </Stagger>
  );
}
