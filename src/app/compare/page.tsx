import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Reveal } from "@/components/motion";
import type { Metadata } from "next";
import Link from "next/link";

const SANS = "'Sora', sans-serif";

export const metadata: Metadata = {
  title: "Compare Alchemyst AI | Context Layer vs Memory, Ontology & Search",
  description:
    "How Alchemyst AI's deterministic context layer compares to Mem0, Zep, Palantir, Databricks, Snowflake Cortex, Memvid, SuperMemory, Letta, LangChain, Cognee, OpenAI Memory, and Claude Memory - and why a sovereign, cross-system context layer is a different primitive from memory, ontology, data governance or enterprise search.",
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
      "Sovereign, model-agnostic context infrastructure versus Zep's conversational memory service - and what that means for traceability and semantic consensus at scale.",
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
      "Cross-system, self-updating consensus versus warehouse-bounded, hand-authored semantic views. Context that spans every system your agents touch - not just the one warehouse.",
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
      "Single-file embedded memory versus hosted context layer. Both eliminate infrastructure, but serve different use cases - edge/offline vs enterprise.",
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
    <>
      <Navbar />
      <main
        style={{
          background: "var(--paper)",
          color: "var(--ink)",
          minHeight: "100vh",
          padding: "120px 0 80px",
        }}
      >
        <div className="container" style={{ maxWidth: "70vw", margin: "0 auto" }}>
          <Breadcrumbs
            currentPath="/compare"
            items={[{ name: "Compare" }]}
          />

          <Reveal direction="up" amount={0.2}>
            <header style={{ maxWidth: "760px", marginBottom: "56px" }}>
              <div style={{ display: "flex", marginBottom: "16px" }}>
                <span className="caption-eyebrow">Honest comparisons</span>
              </div>
              <h1
                style={{
                  fontFamily: SANS,
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: "#0F172A",
                  margin: "16px 0 20px",
                  letterSpacing: "-0.03em",
                }}
              >
                How Alchemyst compares
              </h1>
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  color: "#64748B",
                }}
              >
                A context layer is a different primitive from memory, ontology, data
                governance or enterprise search. These pages lay out - fairly, with
                the strengths of each platform acknowledged - where a sovereign,
                cross-system, deterministic context layer fits, and where the other
                tools genuinely shine.
              </p>
            </header>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {COMPARISONS.map((c, i) => (
              <Reveal key={c.href} direction="up" delay={i * 0.04} amount={0.1}>
                <Link
                  href={c.href}
                  className="compare-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "0",
                    padding: "28px",
                    textDecoration: "none",
                    height: "100%",
                  }}
                >
                  <span
                    className="caption-meta"
                    style={{
                      color: "#128F8B",
                      marginBottom: "12px",
                    }}
                  >
                    {c.category}
                  </span>
                  <h2
                    style={{
                      fontFamily: SANS,
                      fontSize: "1.35rem",
                      fontWeight: 700,
                      color: "#0F172A",
                      margin: "0 0 10px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Alchemyst <span style={{ color: "#F49025" }}>vs {c.competitor}</span>
                  </h2>
                  <p
                    style={{
                      fontFamily: SANS,
                      fontSize: "0.9375rem",
                      lineHeight: 1.6,
                      color: "#64748B",
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    {c.blurb}
                  </p>
                  <span
                    style={{
                      fontFamily: SANS,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#F49025",
                      marginTop: "20px",
                    }}
                  >
                    Read the comparison →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
