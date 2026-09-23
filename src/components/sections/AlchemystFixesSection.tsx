"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BrandButton, Section, SpecCard } from "@/components/brand";
import CodeBlock from "@/components/brand/CodeBlock";
import SectionHeader from "@/components/brand/SectionHeader";
import { EASE, FadeUp, FigureReveal } from "@/components/motion/primitives";
import BenchmarkChart from "./BenchmarkChart";
import { useReducedMotionSafe } from "./iso/kit";

const STEPS = [
  {
    num: "01",
    title: "Context Arithmetic: the core primitive",
    body: "Context arithmetic is the foundational primitive: dynamic set algebra over meaning, computed at query time. Instead of naïve top-K similarity, Alchemyst intersects to narrow scope, unions to widen recall, subtracts superseded or out-of-scope content, and ranks what remains, so only the right context survives into the window.",
    code: `// Set algebra over meaning, at query time
const window = alchemyst.context.search({
  query: userMessage,
  groupName: ["sales", "emea"],   // ∩ narrow scope
  metadata: { version: "v2" },     // ∩ filter
});
// − superseded / deduped  → rank → top-K`,
  },
  {
    num: "02",
    title: "Institutional knowledge graph + context traces",
    body: "What you store is an institutional knowledge graph of your organization's context, fully traceable. Memory isn't three hard-coded layers. By applying context arithmetic over the graph you can derive the behaviors people expect from memory: recall what happened, resolve what it means, and inform how to act. The memory types are outcomes of the primitive, not separate modules.",
    code: `// One graph + arithmetic → derived "memories"
const whatHappened = ctx.search({ groupName: [session_id] });
const whatItMeans  = ctx.search({ query: term })
                        .subtract(deprecated);
// "how to act" falls out of ranked, in-scope context`,
  },
  {
    num: "03",
    title: "Context Traces for full auditability",
    body: "Every agent decision is traceable back to the exact context it had, at a query level. Not a summary, but the exact data points, scores, and rules that went into the model's context window. Debug in minutes, not days.",
    code: `const trace = await alchemyst.trace.get(
  session_id, turn_id
);
// Returns: sources[], scores[], rules_applied[]
// Pairs with Euphony for visual debugging`,
  },
  {
    num: "04",
    title: "Semantic consensus enforcement",
    body: 'Define canonical term definitions at the org level. When "revenue" means different things to different teams, Alchemyst resolves the ambiguity before it reaches the model.',
    code: `await alchemyst.ontology.define({
  term: "revenue",
  canonical: "ARR as reported to board",
  aliases: ["sales", "bookings", "ARR"],
  owner: "finance",
  updated_at: new Date()
});`,
  },
];

/* ── Step card: reports itself active when it crosses the viewport centre ── */

function StepCard({
  step,
  index,
  active,
  onActive,
}: {
  step: (typeof STEPS)[number];
  index: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const centred = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (centred) onActive(index);
  }, [centred, index, onActive]);

  return (
    <FadeUp standalone>
      <div ref={ref} id={`step-${step.num}`} className="scroll-mt-32">
        <SpecCard
          interactive={false}
          className={`p-7 sm:p-9 lg:p-10 transition-[border-color,box-shadow] duration-500 ${
            active ? "lg:border-[#E4C090] lg:shadow-[var(--shadow-soft-lg)]" : ""
          }`}
        >
          <div className="mb-5 flex items-center gap-3">
            <span
              className={`font-mono text-[12px] font-semibold tracking-[0.14em] transition-colors duration-500 ${
                active ? "text-[#B45309]" : "text-[#A16207]"
              }`}
            >
              {step.num}
            </span>
            <span aria-hidden className="h-px flex-1 bg-[#F1E9DA]" />
          </div>
          <h3 className="mb-4 text-[1.375rem] font-bold leading-snug tracking-[-0.015em] text-[#4A3B33]">
            {step.title}
          </h3>
          <p className="mb-8 text-[0.9375rem] leading-[1.75] text-[#57534E] max-w-[62ch]">{step.body}</p>
          <CodeBlock code={step.code} />
        </SpecCard>
      </div>
    </FadeUp>
  );
}

/* ── Sticky rail (desktop): step list + HUD-style segmented progress ─────── */

function StepRail({ active }: { active: number }) {
  const reduce = useReducedMotionSafe();
  const go = (num: string) => {
    const el = document.getElementById(`step-${num}`);
    if (!el) return;
    if (window.__lenis && !reduce) window.__lenis.scrollTo(el, { offset: -160 });
    else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };
  return (
    <div className="sticky top-32">
      <div className="mb-8 flex gap-1" aria-hidden>
        {STEPS.map((s, k) => (
          <div key={s.num} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#F1E9DA]">
            <motion.div
              className="absolute inset-0 origin-left bg-[#B45309]"
              initial={false}
              animate={{ scaleX: k <= active ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
            />
          </div>
        ))}
      </div>
      <ol className="space-y-1">
        {STEPS.map((s, k) => {
          const on = k === active;
          return (
            <li key={s.num}>
              <button
                type="button"
                onClick={() => go(s.num)}
                aria-current={on ? "step" : undefined}
                className="group flex w-full items-start gap-4 rounded-[var(--radius)] py-3 pr-2 text-left"
              >
                <span
                  className={`mt-[3px] font-mono text-[11px] font-semibold tracking-[0.14em] transition-colors duration-300 ${
                    on ? "text-[#B45309]" : "text-[#A8A29E] group-hover:text-[#78716C]"
                  }`}
                >
                  {s.num}
                </span>
                <span
                  className={`text-[0.9375rem] font-bold leading-snug transition-colors duration-300 ${
                    on ? "text-[#4A3B33]" : "text-[#A8A29E] group-hover:text-[#78716C]"
                  }`}
                >
                  {s.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function AlchemystFixesSection() {
  const [active, setActive] = useState(0);

  return (
    <Section id="how-it-works" tone="white" aria-labelledby="fixes-heading">
      <SectionHeader
        eyebrow="What does Alchemyst do?"
        id="fixes-heading"
        title={
          <>
            A context layer that keeps your AI{" "}
            <span className="italic text-[#A16207]">current, traceable,</span> and semantically
            consistent.
          </>
        }
        lead="One API call. Context arithmetic over your institutional knowledge graph. Every decision traceable back to its source, without managing a single vector database or graph store."
      />

      {/* ── Pinned step sequence ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-24 md:mb-32">
        <div className="hidden lg:block lg:col-span-4">
          <StepRail active={active} />
        </div>
        <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-8">
          {STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} active={active === i} onActive={setActive} />
          ))}
        </div>
      </div>

      {/* ── Benchmark chart ────────────────────────────────── */}
      <FigureReveal className="mb-24 md:mb-32">
          {/* Wide diagram: keeps its aspect and scrolls sideways under lg. */}
          <div className="overflow-x-auto lg:overflow-visible">
            <div className="min-w-[760px]">
              <BenchmarkChart />
            </div>
          </div>
      </FigureReveal>

      {/* ── Euphony callout ────────────────────────────────── */}
      <FadeUp standalone>
        <SpecCard tone="sand" className="overflow-hidden p-8 sm:p-10 md:p-14">
          <div aria-hidden className="plate-grid absolute inset-y-0 right-0 w-1/2 opacity-70 [mask-image:linear-gradient(to_left,#000,transparent)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 items-end gap-10">
            <div className="lg:col-span-8">
              <p className="mb-5 inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B45309]">
                <span aria-hidden className="h-[6px] w-[6px] bg-[#B45309]" />
                Example Use Case
              </p>
              <h3 className="mb-5 text-[1.5rem] md:text-[1.875rem] font-bold leading-[1.2] tracking-[-0.02em] text-[#4A3B33] text-balance">
                How do you debug what an agent can&apos;t see? Context Tracing with OpenAI Euphony
              </h3>
              <p className="max-w-[62ch] text-[0.9375rem] leading-[1.75] text-[#57534E]">
                Pairing Alchemyst&apos;s Context Traces with Euphony, OpenAI&apos;s open-source conversation
                visualizer, creates an end-to-end debugging workflow. Every agent failure is now
                diagnosable in minutes: was it a retrieval problem, a configuration problem, or a
                model problem?
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <BrandButton
                href="https://getalchemystai.com/blog/context-tracing-for-ai-agents-with-openai-euphony"
                external
                arrow
                className="w-full lg:w-auto"
              >
                Read the walkthrough
              </BrandButton>
            </div>
          </div>
        </SpecCard>
      </FadeUp>
    </Section>
  );
}
