"use client";

// ProofMetrics: the opening beat of the dark closing chapter. Four proof
// numbers on warm charcoal, separated by hairlines, counting up once. The
// chapter continues straight into the CTA and the footer.

import { Section } from "@/components/brand";
import { DrawLine, FadeUp, Stagger } from "@/components/motion/primitives";
import CountUpMetric from "./CountUpMetric";

const METRICS = [
  { prefix: "< ", value: 300, suffix: "ms", decimals: 0, label: "context retrieval latency", sub: "p95 across all query types" },
  { prefix: "", value: 99.7, suffix: "%", decimals: 1, label: "reduction in hallucinations", sub: "on domain-specific tasks" },
  { prefix: "", value: 20, suffix: "×", decimals: 0, label: "faster agent debugging", sub: "with context traces vs raw logs" },
  { prefix: "", value: 1, suffix: " API", decimals: 0, label: "replaces 4 infra pieces", sub: "vector DB, graph DB, cache, logger" },
];

// Hairline grid: 1 column on mobile, 2x2 on tablet, 4 across on desktop.
const CELL = [
  "",
  "border-t sm:border-t-0 sm:border-l sm:pl-8 lg:pl-10",
  "border-t lg:border-t-0 lg:border-l lg:pl-10",
  "border-t sm:border-l sm:pl-8 lg:border-t-0 lg:pl-10",
];

export default function ProofMetrics() {
  return (
    <Section tone="dark" grid aria-label="Alchemyst AI in numbers" pad="none" innerClassName="pt-24 md:pt-32 pb-4">
      <DrawLine className="!bg-white/[0.1]" />
      <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
        {METRICS.map((m, i) => (
          <FadeUp
            key={m.label}
            className={`py-10 sm:py-12 sm:pr-8 lg:pr-10 border-white/[0.08] ${CELL[i]}`}
          >
            <CountUpMetric
              tone="dark"
              value={m.value}
              prefix={m.prefix}
              suffix={m.suffix}
              decimals={m.decimals}
              label={m.label}
              sub={m.sub}
            />
          </FadeUp>
        ))}
      </Stagger>
    </Section>
  );
}
