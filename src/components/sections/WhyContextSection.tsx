"use client";

import { motion } from "framer-motion";
import ContextSovereigntyFlow from "./ContextSovereigntyFlow";

/* ── data ─────────────────────────────────────────────────────── */

const PILLARS = [
  {
    accent: "#128F8B",
    accentRgb: "18,143,139",
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
    accent: "#F49025",
    accentRgb: "244,144,37",
    kicker: "The Business Case",
    title: "Operationalize intelligence that runs your day-to-day.",
    body: "This isn't a smarter chatbot. It's a context layer that turns what your organization knows into agents that run sales, support, ops, and research at scale — every decision traceable, every agent on the same source of truth.",
    chips: [
      "Run ops, not just answers",
      "One source of truth",
      "Every decision auditable",
      "Scales without FDE teams",
    ],
  },
];

const PULL_QUOTE =
  "Models will keep changing. Your institutional context is the asset that compounds - so it should belong to you, not to whichever model you happen to run today.";

/* ── animation helpers ────────────────────────────────────────── */

const ease = [0.23, 1, 0.32, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay: i * 0.08 },
  }),
};

/* ── component ────────────────────────────────────────────────── */

export default function WhyContextSection() {
  return (
    <section
      id="why-context"
      className="relative w-full bg-[#FAFAFA] py-28 overflow-hidden"
      aria-labelledby="why-context-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        {/* ── Section header ─────────────────────────────────── */}
        <div className="mb-16 max-w-4xl text-center mx-auto">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            custom={0}
            className="inline-block font-mono text-[11px] uppercase tracking-[0.12em] font-semibold text-[#F49025] bg-[#F49025]/8 border border-[#F49025]/20 px-4 py-1 mb-6"
          >
            Why context
          </motion.span>

          <motion.h2
            id="why-context-heading"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight leading-[1.1] mb-5"
          >
            The model is replaceable.
            <br />
            Your <span className=" text-[#F49025]">institutional context </span>{" "}
            isn&apos;t.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            custom={2}
            className="text-base lg:text-lg text-[#475569] leading-relaxed"
          >
            Models are commoditizing fast. Durable advantage comes from a context
            layer that operationalizes your business intelligence and stays
            yours no matter which model you run it on.
          </motion.p>
        </div>

        {/* ── Bento grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-16">
          {/* Pull-quote card — spans 2 rows on desktop */}
          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            custom={3}
            className="relative flex flex-col justify-center bg-white border border-[#E5E7EB] p-10 lg:p-12 lg:row-span-2 transition-all duration-300 hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.08)] hover:-translate-y-[2px]"
          >
            {/* Large decorative quotation mark */}
            <span
              aria-hidden
              className="absolute top-8 left-10 text-[120px] leading-none font-serif text-[#E5E7EB] select-none pointer-events-none"
            >
              &ldquo;
            </span>

            <p className="relative z-10 text-xl sm:text-2xl lg:text-[1.65rem] font-semibold text-[#0F172A] leading-snug tracking-tight mt-12 lg:mt-0">
              {PULL_QUOTE.split("institutional context").map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <span className="text-[#F49025]">institutional context</span>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </p>

            <span className="mt-8 inline-flex items-center gap-2 text-[#64748B] text-sm font-mono tracking-wide">
              <a
                href="/thesis"
                className="text-[#F49025] hover:text-[#D97B1A] transition-colors"
              >
                Read the Context Thesis &rarr;
              </a>
            </span>
          </motion.blockquote>

          {/* Pillar cards */}
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.kicker}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              custom={4 + i}
              className="group relative bg-white border border-[#E5E7EB] p-8 lg:p-10 transition-all duration-300 hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.08)] hover:-translate-y-[2px] overflow-hidden"
            >
              {/* 3px top accent bar */}
              <div
                className="absolute top-0 left-0 w-full h-[3px]"
                style={{ backgroundColor: p.accent }}
              />

              <div className="flex flex-col h-full">
                {/* Kicker */}
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.12em] font-semibold mb-3"
                  style={{ color: p.accent }}
                >
                  {p.kicker}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#0F172A] leading-snug tracking-tight mb-3">
                  {p.title}
                </h3>

                {/* Body */}
                <p className="text-sm text-[#475569] leading-relaxed mb-6 flex-grow">
                  {p.body}
                </p>

                {/* Chips */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {p.chips.map((chip) => (
                    <span
                      key={chip}
                      className="font-mono text-[10px] text-[#475569] bg-slate-50 border border-[#E5E7EB] px-3 py-1.5 transition-colors group-hover:bg-white group-hover:border-slate-300"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Full-width flow diagram ────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          custom={6}
        >
          <ContextSovereigntyFlow />
        </motion.div>
      </div>
    </section>
  );
}
