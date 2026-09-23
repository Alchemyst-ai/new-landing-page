import { Arrow, Section, Ticks } from "@/components/brand";
import { FadeUp } from "@/components/motion/primitives";
import { PageHero, PageShell } from "@/components/page";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compare Alchemyst AI | Context Layer vs Memory, Ontology & Search",
  alternates: { canonical: "https://getalchemystai.com/compare" },
  description:
    "How Alchemyst AI's deterministic context layer compares to Mem0, Zep, Palantir, Databricks, Snowflake Cortex, Memvid, SuperMemory, Letta, LangChain, Cognee, OpenAI Memory, and Claude Memory, and why a sovereign, cross-system context layer is a different primitive from memory, ontology, data governance or enterprise search.",
};

const COMPARISONS = [
  {
    competitor: "Mem0",
    href: "/compare/alchemyst-ai-vs-mem0",
    category: "AI Memory",
    blurb:
      "A deterministic context layer over an institutional knowledge graph versus a per-agent memory store. Why context arithmetic beats naïve recall for production multi-agent systems.",
  },
  {
    competitor: "Zep",
    href: "/compare/alchemyst-ai-vs-zep",
    category: "AI Memory",
    blurb:
      "Sovereign, model-agnostic context infrastructure versus Zep's conversational memory service, and what that means for traceability and semantic consensus at scale.",
  },
  {
    competitor: "Palantir",
    href: "/compare/alchemyst-ai-vs-palantir",
    category: "Ontology & FDEs",
    blurb:
      "A self-updating context layer delivered as an API versus a powerful but FDE-maintained, drift-prone static ontology. Institutional memory without a forward-deployed army.",
  },
  {
    competitor: "Databricks",
    href: "/compare/alchemyst-ai-vs-databricks",
    category: "Data & Governance",
    blurb:
      "Governing semantic meaning versus governing data. Why Unity Catalog and vector RAG manage your data layer, while Alchemyst manages the meaning layer on top of any warehouse or model.",
  },
  {
    competitor: "Snowflake Cortex",
    href: "/compare/alchemyst-ai-vs-snowflake-cortex",
    category: "Data & Governance",
    blurb:
      "Cross-system, self-updating consensus versus warehouse-bounded, hand-authored semantic views. Context that spans every system your agents touch, not just the one warehouse.",
  },
  {
    competitor: "Glean",
    href: "/compare/alchemyst-ai-vs-glean",
    category: "Enterprise Search",
    blurb:
      "Deterministic, developer-embeddable context for your own agents versus a probabilistic enterprise search assistant for human employees. Infrastructure, not a search box.",
  },
  {
    competitor: "Memvid",
    href: "/compare/memvid-vs-alchemyst-agent-memory",
    category: "AI Memory",
    blurb:
      "Single-file embedded memory versus hosted context layer. Both eliminate infrastructure, but serve different use cases: edge/offline vs enterprise.",
  },
  {
    competitor: "SuperMemory",
    href: "/compare/supermemory-vs-alchemyst",
    category: "AI Memory",
    blurb:
      "Browser extension memory capture versus structured institutional context. Consumer-friendly vs enterprise-grade auditability.",
  },
  {
    competitor: "Letta",
    href: "/compare/letta-vs-alchemyst-llm-memory",
    category: "AI Memory",
    blurb:
      "OS-level agent memory versus institutional context infrastructure. Focused on single-agent versus multi-agent architectures.",
  },
  {
    competitor: "LangChain Memory",
    href: "/compare/langchain-memory-vs-alchemyst",
    category: "AI Memory",
    blurb:
      "Memory modules and vector stores versus unified context layer primitive. Framework components vs standalone infrastructure.",
  },
  {
    competitor: "Cognee",
    href: "/compare/cognee-vs-alchemyst-knowledge-graph",
    category: "Knowledge Graph",
    blurb:
      "Both build knowledge graphs, but Cognee focuses on data ingestion while Alchemyst specializes in context arithmetic and governance.",
  },
  {
    competitor: "OpenAI Memory",
    href: "/compare/openai-memory-vs-deterministic-context",
    category: "AI Memory",
    blurb:
      "Model-bound built-in memory versus model-agnostic sovereign context layer infrastructure for enterprises.",
  },
  {
    competitor: "Claude Memory",
    href: "/compare/claude-memory-vs-alchemyst",
    category: "AI Memory",
    blurb:
      "Implicit conversation memory versus explicit, scoped, auditable context operations with semantic consensus.",
  },
  {
    competitor: "Claude Auto Memory",
    href: "/compare/claude-auto-memory-vs-portable-context",
    category: "AI Memory",
    blurb:
      "Per-repository auto memory versus unified, user-scoped knowledge across tools. Why Claude's storage model fragments team context.",
  },
  {
    competitor: "OpenAI Dreaming",
    href: "/compare/alchemyst-vs-openai-dreaming",
    category: "AI Memory",
    blurb:
      "Black-box synthesized memory versus explicit, auditable context scopes. The compliance implications of dream-state knowledge.",
  },
  {
    competitor: "Native Tool Memory",
    href: "/compare/team-context-vs-siloed-memory",
    category: "Multi-Agent",
    blurb:
      "Unified team context versus fragmented per-tool memory silos. How portable context prevents knowledge loss across vendor switches.",
  },
];

export default function CompareIndexPage() {
  return (
    <PageShell cta>
      <PageHero
        width="wide"
        crumbs={[{ name: "Compare" }]}
        currentPath="/compare"
        eyebrow="Honest comparisons"
        title="How Alchemyst compares"
        lead="A context layer is a different primitive from memory, ontology, data governance or enterprise search. These pages lay out, fairly and with the strengths of each platform acknowledged, where a sovereign, cross-system, deterministic context layer fits, and where the other tools genuinely shine."
      />

      <Section tone="sand" bordered>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {COMPARISONS.map((c, i) => (
            <FadeUp standalone key={c.href} delay={(i % 3) * 0.06} className="h-full">
              <Link
                href={c.href}
                className="group group/btn relative flex h-full flex-col rounded-[var(--radius)] border border-[#E4D9BC] bg-white p-7 shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-[3px] hover:border-[#E4C090] hover:shadow-[var(--shadow-soft-lg)]"
              >
                <Ticks />
                <span className="mb-5 inline-flex items-center gap-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#A16207]">
                  <span aria-hidden className="h-[5px] w-[5px] bg-[#A16207]" />
                  {c.category}
                </span>
                <h2 className="mb-3 text-[1.375rem] font-bold leading-[1.25] tracking-[-0.02em] text-[#4A3B33]">
                  Alchemyst <span className="text-[#B45309]">vs {c.competitor}</span>
                </h2>
                <p className="flex-1 text-[0.9375rem] leading-[1.7] text-[#57534E]">{c.blurb}</p>
                <span className="mt-6 inline-flex items-center gap-2 border-t border-[#F1E9DA] pt-5 text-[0.875rem] font-bold text-[#B45309]">
                  Read the comparison
                  <Arrow />
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
