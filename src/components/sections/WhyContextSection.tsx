"use client";

import { motion } from "framer-motion";
import { Chip, Figure, Section, SpecCard } from "@/components/brand";
import SectionHeader from "@/components/brand/SectionHeader";
import { EASE, FadeUp, FigureReveal, RevealText, Stagger, VIEWPORT } from "@/components/motion/primitives";
import ContextSovereigntyFlow from "./ContextSovereigntyFlow";
import { useReducedMotionSafe } from "./iso/kit";

/* ── data ─────────────────────────────────────────────────────── */

const PILLARS = [
  {
    accent: "#A16207",
    kicker: "The Technical Case",
    title: "Switch models freely. Keep your context sovereign.",
    body: "Every model swap normally resets your agent's memory. Alchemyst decouples what your organization knows from whichever model reasons over it, so institutional context stays continuous across every upgrade or multi-model setup.",
    chips: [
      "Model-agnostic",
      "Context sovereignty",
      "Zero migration cost",
      "Multi-model routing",
      "Sub-300ms retrieval",
    ],
  },
  {
    accent: "#B45309",
    kicker: "The Business Case",
    title: "Operationalize intelligence that runs your day-to-day.",
    body: "This isn't a smarter chatbot. It's a context layer that turns what your organization knows into agents that run sales, support, ops, and research at scale: every decision traceable, every agent on the same source of truth.",
    chips: [
      "Run ops, not just answers",
      "One source of truth",
      "Every decision auditable",
      "Scales without FDE teams",
    ],
  },
];

/* ── component ────────────────────────────────────────────────── */

export default function WhyContextSection() {
  const reduce = useReducedMotionSafe();

  return (
    <Section id="why-context" tone="sand" aria-labelledby="why-context-heading" className="overflow-hidden">
      <SectionHeader
        eyebrow="Why context"
        id="why-context-heading"
        title={
          <>
            The model is replaceable.
            <br />
            Your <span className="text-[#B45309]">institutional context</span>{" "}isn&apos;t.
          </>
        }
        lead="Models are commoditizing fast. Durable advantage comes from a context layer that operationalizes your business intelligence and stays yours no matter which model you run it on."
      />

      {/* ── Bento grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-20 md:mb-28">
        {/* Pull-quote card, spans 2 rows on desktop */}
        <FadeUp standalone className="lg:col-span-6 lg:row-span-2 flex">
          <SpecCard as="blockquote" className="flex w-full flex-col p-10 lg:p-12">
            <div className="flex flex-1 flex-col justify-center">
            <motion.span
              aria-hidden
              className="block font-serif text-[112px] leading-[0.7] text-[#E4C090] select-none"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            >
              &ldquo;
            </motion.span>

            <RevealText
              as="p"
              stagger={0.018}
              delay={0.15}
              className="mt-8 text-[1.375rem] sm:text-[1.625rem] lg:text-[1.75rem] font-bold text-[#4A3B33] leading-[1.35] tracking-[-0.02em]"
            >
              Models will keep changing. Your{" "}
              <span className="text-[#B45309]">institutional context</span> is the asset that
              compounds, so it should belong to you, not to whichever model you happen to run today.
            </RevealText>
            </div>

            <div className="mt-12 flex items-center justify-between gap-6 border-t border-[#F1E9DA] pt-6">
              <a href="/thesis" className="link-brand font-mono text-[12px] font-semibold uppercase tracking-[0.12em]">
                Read the Context Thesis &rarr;
              </a>
            </div>
          </SpecCard>
        </FadeUp>

        {/* Pillar cards */}
        {PILLARS.map((p, i) => (
          <FadeUp standalone key={p.kicker} delay={0.08 * (i + 1)} className="lg:col-span-6 flex">
            <SpecCard className="w-full overflow-hidden p-8 lg:p-10">
              <motion.div
                aria-hidden
                className="absolute left-0 top-0 h-[2px] w-full origin-left"
                style={{ backgroundColor: p.accent }}
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.1, ease: EASE, delay: 0.25 + i * 0.1 }}
              />
              <div className="flex h-full flex-col">
                <span
                  className="mb-4 inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: p.accent }}
                >
                  <span aria-hidden className="h-[6px] w-[6px]" style={{ backgroundColor: p.accent }} />
                  {p.kicker}
                </span>
                <h3 className="mb-3 text-[1.3125rem] font-bold leading-snug tracking-[-0.015em] text-[#4A3B33]">
                  {p.title}
                </h3>
                <p className="mb-7 flex-grow text-[0.9375rem] leading-[1.7] text-[#57534E]">{p.body}</p>
                <Stagger as="ul" stagger={0.05} delay={0.3} className="mt-auto flex flex-wrap gap-2">
                  {p.chips.map((chip) => (
                    <FadeUp as="li" key={chip} distance={8}>
                      <Chip>{chip}</Chip>
                    </FadeUp>
                  ))}
                </Stagger>
              </div>
            </SpecCard>
          </FadeUp>
        ))}
      </div>

      {/* ── Full-width flow diagram ────────────────────────── */}
      <FigureReveal>
        <Figure>
          <ContextSovereigntyFlow />
        </Figure>
      </FigureReveal>
    </Section>
  );
}
