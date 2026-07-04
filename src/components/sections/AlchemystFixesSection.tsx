"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import CountUpMetric from "./CountUpMetric";
import BenchmarkChart from "./BenchmarkChart";

const STEPS = [
  {
    num: "01",
    title: "Context Arithmetic - the core primitive",
    body: "Context arithmetic is the foundational primitive: dynamic set algebra over meaning, computed at query time. Instead of naïve top-K similarity, Alchemyst intersects to narrow scope, unions to widen recall, subtracts superseded or out-of-scope content, and ranks what remains - so only the right context survives into the window.",
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
    body: "What you store is an institutional knowledge graph of your organization's context, fully traceable. Memory isn't three hard-coded layers - by applying context arithmetic over the graph you can derive the behaviors people expect from memory: recall what happened, resolve what it means, and inform how to act. The memory types are outcomes of the primitive, not separate modules.",
    code: `// One graph + arithmetic → derived "memories"
const whatHappened = ctx.search({ groupName: [session_id] });
const whatItMeans  = ctx.search({ query: term })
                        .subtract(deprecated);
// "how to act" falls out of ranked, in-scope context`,
  },
  {
    num: "03",
    title: "Context Traces for full auditability",
    body: "Every agent decision is traceable back to the exact context it had - at a query level. Not a summary, but the exact data points, scores, and rules that went into the model's context window. Debug in minutes, not days.",
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

const METRICS = [
  { prefix: "< ", value: 300, suffix: "ms", decimals: 0, label: "context retrieval latency", sub: "p95 across all query types" },
  { prefix: "", value: 99.7, suffix: "%", decimals: 1, label: "reduction in hallucinations", sub: "on domain-specific tasks" },
  { prefix: "", value: 20, suffix: "×", decimals: 0, label: "faster agent debugging", sub: "with context traces vs raw logs" },
  { prefix: "", value: 1, suffix: " API", decimals: 0, label: "replaces 4 infra pieces", sub: "vector DB, graph DB, cache, logger" },
];

const ease = [0.23, 1, 0.32, 1] as const;

function highlightCode(code: string): string {
  return code
    .replace(/\/\/(.*)/g, '<span class="text-slate-400">//$1</span>')
    .replace(/(const|await|new)/g, '<span class="text-[#128F8B]">$1</span>')
    .replace(/(alchemyst|ctx)/g, '<span class="text-[#F49025]">$1</span>');
}

export default function AlchemystFixesSection() {
  return (
    <section
      id="how-it-works"
      className="relative w-full bg-white py-28 overflow-hidden"
      aria-labelledby="fixes-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="max-w-5xl mb-16 text-center mx-auto"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#128F8B] font-semibold mb-5 block">
            What does Alchemyst do?
          </span>
          <h2
            id="fixes-heading"
            className="text-[#0F172A] text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1] mb-5"
          >
            A context layer that keeps your AI{" "}
            <span className="italic text-[#128F8B]">current, traceable,</span> and
            semantically consistent.
          </h2>
          <p className="text-[#475569] text-base lg:text-lg leading-relaxed max-w-2xl text-center mx-auto">
            One API call. Context arithmetic over your institutional knowledge graph. Every
            decision traceable back to its source - without managing a single vector database or
            graph store.
          </p>
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#E5E7EB] border border-[#E5E7EB] mb-28">
          {STEPS.map((step, i) => {
            // Row 1: card 0 spans 2, card 1 spans 1
            // Row 2: card 2 spans 1, card 3 spans 2
            const span = i === 0 || i === 3 ? "lg:col-span-2" : "lg:col-span-1";

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className={`${span} flex flex-col bg-white hover:shadow-lg hover:-translate-y-[2px] transition-all duration-300`}
              >
                <div className="p-8 lg:p-10 flex-grow">
                  <span className="font-mono text-sm tracking-[0.12em] text-[#128F8B] font-bold block mb-4">
                    {step.num}
                  </span>
                  <h3 className="text-[#0F172A] text-xl font-bold leading-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#475569] text-[15px] leading-relaxed">
                    {step.body}
                  </p>
                </div>
                <div className="bg-[#F8FAFC] border-t border-[#E5E7EB] p-8">
                  <pre className="font-mono text-[13px] leading-relaxed text-slate-700 overflow-x-auto whitespace-pre-wrap">
                    <code
                      dangerouslySetInnerHTML={{
                        __html: highlightCode(step.code),
                      }}
                    />
                  </pre>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Metrics strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="grid grid-cols-2 lg:grid-cols-4 mb-28"
        >
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="border border-[#E5E7EB] bg-white"
            >
              <CountUpMetric
                value={m.value}
                prefix={m.prefix}
                suffix={m.suffix}
                decimals={m.decimals}
                label={m.label}
                sub={m.sub}
              />
            </div>
          ))}
        </motion.div>

        {/* ── Benchmark chart ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-28"
        >
          <BenchmarkChart />
        </motion.div>

        {/* ── Euphony callout ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="bg-white border border-[#E5E7EB] p-10 md:p-16"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="flex-1 max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#F49025] font-semibold mb-4">
                Example Use Case
              </p>
              <h3 className="text-[#0F172A] text-2xl md:text-3xl font-bold leading-tight mb-5">
                How do you debug what an agent can&apos;t see? Context Tracing with OpenAI Euphony
              </h3>
              <p className="text-[#475569] text-base leading-relaxed">
                Pairing Alchemyst&apos;s Context Traces with Euphony - OpenAI&apos;s open-source conversation
                visualizer - creates an end-to-end debugging workflow. Every agent failure is now
                diagnosable in minutes: was it a retrieval problem, a configuration problem, or a
                model problem?
              </p>
            </div>

            <div className="flex-shrink-0 w-full lg:w-auto">
              <Button
                asChild
                className="w-full lg:w-auto bg-[#F49025] hover:bg-[#D97B1A] text-white px-7 py-3 rounded-none text-sm font-semibold tracking-wide transition-all shadow-[4px_4px_0px_#B45309] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#B45309]"
              >
                <a
                  href="https://getalchemystai.com/blog/context-tracing-for-ai-agents-with-openai-euphony"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the walkthrough
                  <svg
                    className="ml-2 inline-block"
                    width="16"
                    height="16"
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
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
