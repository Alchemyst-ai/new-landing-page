import { Arrow, Section } from "@/components/brand";
import { FadeUp } from "@/components/motion/primitives";
import { PageHero, PageShell, Prose } from "@/components/page";
import type { Metadata } from "next";
import Link from "next/link";

const title = "Compare AI Context Engine Companies";
const description = "Evaluate AI context engine companies and memory platforms by retrieval, shared knowledge, source updates, access controls, and integration effort.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "https://getalchemystai.com/compare" },
  openGraph: { title, description, url: "https://getalchemystai.com/compare", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const COMPARISONS = [
  {
    competitor: "Mem0",
    href: "/compare/alchemyst-ai-vs-mem0",
    category: "AI Memory",
    blurb:
      "Compare the memory and shared business context requirements of your agent, including retrieval scope and traceability.",
  },
  {
    competitor: "Zep",
    href: "/compare/alchemyst-ai-vs-zep",
    category: "AI Memory",
    blurb:
      "Explore graph-based memory and context retrieval approaches for applications that need information across conversations.",
  },
  {
    competitor: "Databricks",
    href: "/compare/alchemyst-ai-vs-databricks",
    category: "Data & Governance",
    blurb:
      "Consider how a data platform and a dedicated context layer fit into an enterprise agent architecture.",
  },
  {
    competitor: "Snowflake Cortex",
    href: "/compare/alchemyst-ai-vs-snowflake-cortex",
    category: "Data & Governance",
    blurb:
      "Evaluate warehouse-based AI workflows alongside a context layer integrated into your application.",
  },
  {
    competitor: "Memvid",
    href: "/compare/memvid-vs-alchemyst-agent-memory",
    category: "AI Memory",
    blurb:
      "Compare embedded memory and hosted context infrastructure for your deployment requirements.",
  },
  {
    competitor: "SuperMemory",
    href: "/compare/supermemory-vs-alchemyst",
    category: "AI Memory",
    blurb:
      "Compare memory integrations and context management for the workflows your team is building.",
  },
  {
    competitor: "LangChain Memory",
    href: "/compare/langchain-memory-vs-alchemyst",
    category: "AI Memory",
    blurb:
      "Decide which memory components to assemble in your framework and which operations to delegate to a context service.",
  },
  {
    competitor: "Cognee",
    href: "/compare/cognee-vs-alchemyst-knowledge-graph",
    category: "Knowledge Graph",
    blurb:
      "Compare knowledge graph approaches, retrieval workflows, and the operational responsibilities of your team.",
  },
  {
    competitor: "OpenAI Memory",
    href: "/compare/openai-memory-vs-deterministic-context",
    category: "AI Memory",
    blurb:
      "Evaluate built-in memory alongside application-managed business context across model integrations.",
  },
  {
    competitor: "Claude Memory",
    href: "/compare/claude-memory-vs-alchemyst",
    category: "AI Memory",
    blurb:
      "Compare assistant memory with a shared context service for your own applications.",
  },
  {
    competitor: "Claude Auto Memory",
    href: "/compare/claude-auto-memory-vs-portable-context",
    category: "AI Memory",
    blurb:
      "Explore repository-specific memory and shared context across developer tools.",
  },
  {
    competitor: "OpenAI Dreaming",
    href: "/compare/alchemyst-vs-openai-dreaming",
    category: "AI Memory",
    blurb:
      "Consider how synthesized memory and explicit retrieval differ in traceability and application control.",
  },
  {
    competitor: "Native Tool Memory",
    href: "/compare/team-context-vs-siloed-memory",
    category: "Multi-Agent",
    blurb:
      "Evaluate shared team context alongside separate memory stores in individual tools.",
  },
];

export default function CompareIndexPage() {
  return (
    <PageShell cta>
      <PageHero
        width="wide"
        crumbs={[{ name: "Compare" }]}
        currentPath="/compare"
        eyebrow="Platform evaluation"
        title="Compare AI context engine companies"
        lead="AI context engine companies and AI memory platforms overlap, but cover different parts of an agent workflow. Compare what each system stores, how it retrieves business knowledge, and which operations your team must own. Alchemyst AI focuses on shared context and traceable retrieval for developers and enterprises."
      />

      <Prose width="wide">
        <h2>How should you evaluate an AI context engine?</h2>
        <p>Use the same small set of company documents and questions for each candidate. Include an updated policy, a question with no supported answer, and a request for restricted information. Review retrieved evidence and the generated answer separately. This makes differences in source handling and integration effort easier to assess.</p>
        <ul>
          <li><strong>Knowledge coverage:</strong> does the service handle shared documents, conversation memory, or both?</li>
          <li><strong>Retrieval:</strong> can you constrain results by customer, team, source, and version?</li>
          <li><strong>Governance:</strong> how do identity, deletion, retention, and export work in your deployment?</li>
          <li><strong>Operations:</strong> what can developers inspect when a source is missing or an answer is unsupported?</li>
          <li><strong>Commercial fit:</strong> compare current pricing, deployment terms, and usage limits with each provider.</li>
        </ul>
        <p>These are Alchemyst-authored comparisons. Product capabilities change, so validate details in each provider&apos;s current documentation and your own evaluation. For architecture choices, read our <Link href="/blog/how-to-add-persistent-memory-to-ai-agents#rag-vs-fine-tuning">RAG vs fine-tuning guide</Link> or explore <Link href="/developers#managed-rag">Alchemyst&apos;s role in managed RAG</Link>.</p>
      </Prose>
      <Section tone="sand" bordered>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {COMPARISONS.map((c, i) => (
            <FadeUp standalone key={c.href} delay={(i % 3) * 0.06} className="h-full">
              <Link
                href={c.href}
                className="group group/btn relative flex h-full flex-col rounded-[var(--radius)] border border-[#E4D9BC] bg-white p-7 shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-[3px] hover:border-[#E4C090] hover:shadow-[var(--shadow-soft-lg)]"
              >
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
