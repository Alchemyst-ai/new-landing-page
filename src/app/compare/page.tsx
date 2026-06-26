import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";

const SANS = "'Sora', sans-serif";

export const metadata: Metadata = {
  title: "Compare Alchemyst AI | Context Layer vs Memory, Ontology & Search",
  description:
    "How Alchemyst AI's deterministic context layer compares to Mem0, Zep, Palantir, Databricks, Snowflake Cortex and Glean — and why a sovereign, cross-system context layer is a different primitive from memory, ontology, data governance or enterprise search.",
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
      "Sovereign, model-agnostic context infrastructure versus Zep's conversational memory service — and what that means for traceability and semantic consensus at scale.",
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
      "Cross-system, self-updating consensus versus warehouse-bounded, hand-authored semantic views. Context that spans every system your agents touch — not just the one warehouse.",
  },
  {
    competitor: "Glean",
    href: "/compare/alchemyst-ai-vs-glean",
    category: "Enterprise Search",
    blurb:
      "Deterministic, developer-embeddable context for your own agents versus a probabilistic enterprise search assistant for human employees. Infrastructure, not a search box.",
  },
];

export default function CompareIndexPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          background: "#151515",
          color: "#FAFAFA",
          minHeight: "100vh",
          padding: "120px 0 80px",
        }}
      >
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Breadcrumbs
            currentPath="/compare"
            items={[{ name: "Compare" }]}
          />

          <header style={{ maxWidth: "760px", marginBottom: "56px" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#F49025",
                fontWeight: 600,
              }}
            >
              Honest comparisons
            </span>
            <h1
              style={{
                fontFamily: SANS,
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#FFFFFF",
                margin: "16px 0 20px",
              }}
            >
              How Alchemyst compares
            </h1>
            <p
              style={{
                fontFamily: SANS,
                fontSize: "1.0625rem",
                lineHeight: 1.7,
                color: "#CBD5E1",
              }}
            >
              A context layer is a different primitive from memory, ontology, data
              governance or enterprise search. These pages lay out — fairly, with
              the strengths of each platform acknowledged — where a sovereign,
              cross-system, deterministic context layer fits, and where the other
              tools genuinely shine.
            </p>
          </header>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {COMPARISONS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "#1C1C1C",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "28px",
                  textDecoration: "none",
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#0E9594",
                    fontWeight: 600,
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
                    color: "#FFFFFF",
                    margin: "0 0 10px",
                  }}
                >
                  Alchemyst <span style={{ color: "#F49025" }}>vs {c.competitor}</span>
                </h2>
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: "0.9375rem",
                    lineHeight: 1.6,
                    color: "#94A3B8",
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
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
