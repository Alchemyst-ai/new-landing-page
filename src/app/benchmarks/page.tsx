import ComparisonTable from "@/components/brand/ComparisonTable";
import { BrandButton, Chip, Section, SpecCard, SpecStrip } from "@/components/brand";
import SectionHeader from "@/components/brand/SectionHeader";
import FrontierChart from "@/components/benchmarks/FrontierChart";
import SuperiorityRadar from "@/components/benchmarks/SuperiorityRadar";
import ValueIndexChart from "@/components/benchmarks/ValueIndexChart";
import { FadeUp, Stagger } from "@/components/motion/primitives";
import { PageHero, PageShell } from "@/components/page";
import { detailedCategories } from "@/lib/benchmarks";
import type { Metadata } from "next";

const PAGE_PATH = "/benchmarks";
const URL = "https://getalchemystai.com/benchmarks";

export const metadata: Metadata = {
  title: "Benchmarks: the Pareto frontier for context",
  description:
    "Alchemyst AI memory benchmarks: 170ms P50 latency, $0.06 per 1M tokens, 12x value per dollar, and head to head F1 across six memory dimensions vs Supermemory, Zep, and Hindsight GPT.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Benchmarks | Alchemyst AI",
    description:
      "170ms P50 latency at $0.06 per 1M tokens. See the efficiency frontier and full per-category data.",
    url: URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Benchmarks | Alchemyst AI",
    description: "170ms P50 latency at $0.06 per 1M tokens. See the efficiency frontier and full per-category data.",
  },
};

function normalizeHindsight(name: string) {
  if (name.includes("Hindsight")) return "Hindsight GPT";
  return name;
}

const MATRIX_COLUMNS = ["Dimension", "Alchemyst", "Supermemory", "Zep", "Hindsight GPT"];
const MATRIX_ROWS = detailedCategories.map((cat) => {
  const byName: Record<string, number> = {};
  for (const b of cat.benchmarks) byName[normalizeHindsight(b.name)] = b.performance;
  const fmt = (v: number | undefined) => (v === undefined ? "n/a" : v.toFixed(3));
  return [
    `${cat.category} (n=${cat.count})`,
    fmt(byName["Alchemyst"]),
    fmt(byName["Supermemory"]),
    fmt(byName["Zep"]),
    fmt(byName["Hindsight GPT"]),
  ];
});

export default function BenchmarksPage() {
  return (
    <PageShell cta>
      <PageHero
        width="wide"
        crumbs={[{ name: "Benchmarks" }]}
        currentPath={PAGE_PATH}
        eyebrow="Benchmarks"
        title={
          <>
            Beyond chat sessions: the <span className="italic text-primary">Pareto frontier for context.</span>
          </>
        }
        lead="Memory benchmarks tested in December 2025. Alchemyst serves context at 170ms P50 latency for $0.06 per 1M tokens, with a memory F1 of 0.76. The charts below show what that tradeoff looks like against Supermemory, Zep, and Hindsight GPT."
        meta="Tested December 2025 · Prices in USD · Performance is F1"
      >
        <div className="mt-12 overflow-x-auto">
          <SpecStrip
            className="w-fit"
            items={[
              { value: "170ms", label: "P50 latency" },
              { value: "$0.06", label: "per 1M tokens" },
              { value: "12x", label: "value ratio" },
              { value: "0.76", label: "memory F1" },
            ]}
          />
        </div>
      </PageHero>

      {/* Server-rendered agent-readable summary, independent of JavaScript chart
          rendering. The Recharts visuals above are SVG and are dropped by the
          Markdown converter, so this section carries the same dataset as text. */}
      <section aria-label="Benchmarks summary" className="sr-only">
        <h2>Alchemyst AI memory benchmarks, December 2025</h2>
        <p>
          Overall: Alchemyst serves context at 170ms P50 latency for $0.06 per
          1M tokens, with 0.76 memory F1. Hindsight GPT OSS 120B scores 0.907
          F1 at $0.36 with 450ms latency. Supermemory scores 0.833 F1 at
          $6.33 with 820ms latency. Zep scores 0.723 F1 at $12.50 with 1150ms
          latency. Prices are USD in the test harness. Performance is F1.
        </p>
        <h3>Value index (performance per dollar)</h3>
        <p>
          Alchemyst delivers over 12x more performance value per dollar than
          the nearest competitor, and costs 83 percent less than Zep. The gap
          comes from cost, not from giving up accuracy.
        </p>
        <h3>Per-category F1 results</h3>
        <ul>
          <li>Single Session Preference (n=30): Hindsight GPT 0.867, Supermemory 0.700, Alchemyst 0.600, Zep 0.567.</li>
          <li>Single Session User (n=68): Hindsight GPT 1.000, Supermemory 0.971, Alchemyst 0.956, Zep 0.929.</li>
          <li>Knowledge Update (n=75): Hindsight GPT 0.923, Supermemory 0.884, Zep 0.833, Alchemyst 0.560.</li>
          <li>Single Session Assistant (n=55): Hindsight GPT 0.982, Alchemyst 0.964, Supermemory 0.964, Zep 0.804.</li>
          <li>Temporal Reasoning (n=131): Hindsight GPT 0.857, Supermemory 0.767, Alchemyst 0.756, Zep 0.624.</li>
          <li>Multi Session (n=133): Hindsight GPT 0.812, Alchemyst 0.729, Supermemory 0.714, Zep 0.579.</li>
        </ul>
        <h3>Methodology</h3>
        <p>
          Evals cover single session preference, user, and assistant recall,
          knowledge updates, temporal reasoning, and multi session memory,
          with 30 to 133 cases per category. Latency is P50 for a retrieval
          call in the test harness. Reproduce the setup against your own
          workload before making a buying decision. Full per-category tables
          are in the data archive section of https://getalchemystai.com/benchmarks.
        </p>
      </section>

      {/* Value index */}
      <Section tone="paper" pad="none" innerClassName="pb-20 md:pb-28">
        <SectionHeader
          rule={false}
          eyebrow="Value index"
          title={
            <>
              Intelligence delivered <span className="italic text-primary">per dollar.</span>
            </>
          }
          lead="Performance divided by cost. Alchemyst delivers more than 12x the performance value per dollar of the nearest competitor because the price denominator is an order of magnitude smaller."
        />
        <Stagger className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <FadeUp className="lg:col-span-7">
            <ValueIndexChart />
          </FadeUp>
          <FadeUp className="flex lg:col-span-5">
            <SpecCard interactive={false} tone="sand" className="flex w-full flex-col p-7 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                Reading the chart
              </p>
              <p className="mt-4 text-[1.0625rem] font-bold leading-[1.5] tracking-[-0.01em] text-foreground">
                Alchemyst delivers over 12x more performance value per dollar compared to the nearest
                competitor.
              </p>
              <dl className="mt-6 flex flex-col border-t border-border">
                {[
                  ["Cost savings vs Zep", "83% lower"],
                  ["Latency, P50", "170ms"],
                  ["Overall memory F1", "0.76"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 border-b border-border py-3.5">
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">{k}</dt>
                    <dd className="text-right text-[0.9375rem] tabular-nums text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-[0.9375rem] leading-[1.7] text-muted-foreground">
                The gap comes from cost, not from giving up accuracy. Alchemyst stays competitive on F1
                while indexing and serving at a fraction of the price.
              </p>
            </SpecCard>
          </FadeUp>
        </Stagger>
      </Section>

      {/* Efficiency frontier */}
      <Section tone="sand" bordered>
        <SectionHeader
          eyebrow="Efficiency frontier"
          title="Cost on a log scale, performance on a linear one."
          lead="Cheaper is to the left, better is to the top. Alchemyst sits alone in the low cost, high performance corner. The line connects providers sorted by price to show the frontier."
        />
        <FadeUp standalone>
          <FrontierChart />
        </FadeUp>
      </Section>

      {/* Head to head */}
      <Section tone="paper" bordered>
        <SectionHeader
          eyebrow="Relative superiority"
          title="Head to head across six memory dimensions."
          lead="One row per eval category. Alchemyst leads on efficiency everywhere and stays within striking distance on raw F1, including 0.956 on Single Session User and 0.964 on Single Session Assistant."
        />
        <FadeUp standalone>
          <SuperiorityRadar />
        </FadeUp>
        <FadeUp standalone>
          <ComparisonTable columns={MATRIX_COLUMNS} rows={MATRIX_ROWS} highlight={1} />
        </FadeUp>
        <FadeUp standalone>
          <div className="mt-6 flex flex-wrap gap-2">
            {detailedCategories.map((c) => (
              <Chip key={c.category}>
                {c.category} · n={c.count}
              </Chip>
            ))}
          </div>
        </FadeUp>
      </Section>

      {/* Full data archive */}
      <Section tone="sand" bordered>
        <SectionHeader
          eyebrow="Full data archive"
          title="Every category, every provider."
          lead="Raw per-category F1, sorted by performance within each table. Prices are USD per 1K in the test harness. This is the complete dataset behind the charts above."
        />
        <Stagger className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {detailedCategories.map((cat) => {
            const rows = [...cat.benchmarks]
              .sort((a, b) => b.performance - a.performance)
              .map((b) => [b.name, `$${b.price.toFixed(4)}`, b.performance.toFixed(3)]);
            return (
              <FadeUp key={cat.category}>
                <SpecCard interactive={false} className="overflow-hidden">
                  <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
                    <h3 className="text-[1.0625rem] font-bold tracking-[-0.01em] text-foreground">
                      {cat.category}
                    </h3>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                      n={cat.count}
                    </span>
                  </div>
                  <ComparisonTable
                    columns={["Model", "Price (USD/1K)", "Performance (F1)"]}
                    rows={rows}
                    className="!my-0 !rounded-none !border-0 !shadow-none"
                  />
                </SpecCard>
              </FadeUp>
            );
          })}
        </Stagger>

        <FadeUp standalone>
          <SpecCard interactive={false} className="mt-10 p-7 md:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
              Methodology note
            </p>
            <p className="mt-4 max-w-[72ch] text-[0.9375rem] leading-[1.75] text-muted-foreground">
              Evals cover single session preference, user, and assistant recall, knowledge updates,
              temporal reasoning, and multi session memory. Counts range from 30 to 133 cases per
              category. Latency is P50 for a retrieval call in the test harness. Reproduce the setup
              against your own workload before making a buying decision, and contact the team for the
              eval definitions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <BrandButton href="/contact" arrow>
                Discuss your workload
              </BrandButton>
              <BrandButton href="/docs" variant="outline">
                Read the docs
              </BrandButton>
            </div>
          </SpecCard>
        </FadeUp>
      </Section>
    </PageShell>
  );
}
