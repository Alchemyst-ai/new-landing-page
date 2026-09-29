"use client";

import { BrandButton, Section, SpecCard } from "@/components/brand";
import CodeBlock from "@/components/brand/CodeBlock";
import SectionHeader from "@/components/brand/SectionHeader";
import { EASE, FadeUp, FigureReveal } from "@/components/motion/primitives";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import BenchmarkChart from "./BenchmarkChart";
import { useReducedMotionSafe } from "./iso/kit";

const STEPS = [
  {
    num: "01",
    title: "How does knowledge retrieval for AI agents work?",
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
    title: "How does an enterprise knowledge graph support memory?",
    body: "What you store is an institutional knowledge graph of your organization's context, fully traceable. Memory isn't three hard-coded layers. By applying context arithmetic over the graph you can derive the behaviors people expect from memory: recall what happened, resolve what it means, and inform how to act. The memory types are outcomes of the primitive, not separate modules.",
    code: `// One graph + arithmetic → derived "memories"

const captureTime1 = "end-date-" + Date.now();

// Represents what should be added when your session is first saved.
const storeInformationOfSessionAtFirstInstance = await ctx.add({
    documents: [ ],
    metadata: {
      groupName: [session_id, captureTime1]
    }
});

// Now resume from where you left off, or let someone resume from there.
const whatHappened = await ctx.search({
  query: term,
  metadata {
    groupName: [session_id, captureTime1]
  }
});

// Second checkpint
const storeInformationOfSessionAtSecondInstance = await ctx.add({
    documents: [...],
    metadata: {
      groupName: [session_id, captureTime2]
    }
});

// Now team lead / CXO looks up about the information

const whatItMeans = ctx.search({
  query: term,
  metadata: {
    groupName: [session_id]
  }
})
// "how to act" falls out of scope over the global context`,
  },
  {
    num: "03",
    title: "Why did my AI agent give a wrong answer?",
    body: "When an AI agent gives wrong answers about internal data, inspect what it retrieved before changing the prompt. Alchemyst Context Traces expose the sources, scores, and rules used to assemble context. Developers can investigate retrieval failures, while enterprise teams can review which business information supported an answer.",
    code: `const trace = await alchemyst.trace.get(
  session_id, turn_id
);
// Returns: sources[], scores[], rules_applied[]
// Pairs with Euphony for visual debugging`,
  },
  {
    num: "04",
    title: "How do agents use consistent business definitions?",
    body: 'Define canonical term definitions at the org level. When "revenue" means different things to different teams, Alchemyst resolves the ambiguity before it reaches the model.',
//     code: `await alchemyst.ontology.define({
//   term: "revenue",
//   canonical: "ARR as reported to board",
//   aliases: ["sales", "bookings", "ARR"],
//   owner: "finance",
//   updated_at: new Date()
// });`,
    code: `
const gtmTeamResponse = await alchemyst.context.add({
  documents: [...], // Data here
  metadata: {
    groupName: ["gtm", "revenue"] // The term "revenue" defined by GTM team
  }
})

const financeTeamResponse = await alchemyst.context.add({
  documents: [...], // Data here
  metadata: {
    groupName: ["finance", "revenue"] // The term "revenue" defined by Finances team.
  }
})

const cxoResponse = await alchemyst.context.search({
  query: "What's the revenue for Q2 2026?",
  metadata: {
    groupName: ["revenue"]
    // The term "revenue" defined for CXO, with clear segregation between the resources by GTM team and Finances team.
  }
})
    `
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
        lead="Alchemyst AI is an AI context management platform for storing and retrieving business knowledge. Use context arithmetic to select relevant information from your institutional knowledge graph, then inspect the sources behind retrieval without operating your own vector database or graph store."
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
