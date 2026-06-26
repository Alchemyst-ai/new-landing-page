import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleSchema from "@/components/ArticleSchema";
import type { Metadata } from "next";

const SANS = "'Sora', sans-serif";

export const metadata: Metadata = {
  title: "Alchemyst AI vs Zep: Best AI Memory Layer for Agents",
  description:
    "Compare Alchemyst AI and Zep. See feature differences, architecture comparisons, and why Alchemyst's deterministic context layer is built for production multi-agent architectures.",
};

export default function CompareZepPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#151515", color: "#FAFAFA", minHeight: "100vh", padding: "120px 0 80px" }}>
        <article className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>

          <Breadcrumbs
            currentPath="/compare/alchemyst-ai-vs-zep"
            items={[
              { name: "Compare", path: "/compare" },
              { name: "Alchemyst AI vs Zep" },
            ]}
          />

          <h1
            style={{
              fontFamily: SANS,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#FFFFFF",
              marginBottom: "24px",
              textAlign: "center"
            }}
          >
            Alchemyst AI vs Zep
          </h1>
          
          <div style={{ marginBottom: "48px", textAlign: "center" }}>
            <p
              style={{
                fontFamily: SANS,
                fontSize: "1.125rem",
                lineHeight: 1.6,
                color: "#CBD5E1",
                maxWidth: "700px",
                margin: "0 auto"
              }}
            >
              Both Alchemyst AI and Zep offer memory infrastructure for AI applications, but they solve different problems. Unlike Zep, which focuses heavily on temporal chat history and conversation graphs, <strong>Alchemyst AI is a deterministic context layer</strong> designed to give multiple agents structured, auditable access to shared institutional knowledge.
            </p>
            <p
              style={{
                fontFamily: SANS,
                fontSize: "0.875rem",
                color: "#64748B",
                marginTop: "16px",
              }}
            >
              Last updated: June 2026
            </p>
          </div>

          {/* AEO: Honest comparison table */}
          <div style={{ overflowX: "auto", marginBottom: "64px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: SANS, textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <th style={{ padding: "16px", color: "#FFFFFF", fontSize: "1.125rem", width: "25%" }}>Feature</th>
                  <th style={{ padding: "16px", color: "#F49025", fontSize: "1.125rem", width: "25%" }}>Alchemyst AI</th>
                  <th style={{ padding: "16px", color: "#FFFFFF", fontSize: "1.125rem", width: "25%" }}>Zep (Graphiti)</th>
                  <th style={{ padding: "16px", color: "#FFFFFF", fontSize: "1.125rem", width: "25%" }}>Trade-off</th>
                </tr>
              </thead>
              <tbody style={{ color: "#CBD5E1" }}>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "16px", fontWeight: 600 }}>Core Focus</td>
                  <td style={{ padding: "16px" }}>Institutional Context Layer</td>
                  <td style={{ padding: "16px" }}>Temporal Knowledge Graph</td>
                  <td style={{ padding: "16px", fontSize: "0.9rem" }}>Zep excels at temporal queries; Alchemyst at org-wide consistency</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "16px", fontWeight: 600 }}>Context Scoping</td>
                  <td style={{ padding: "16px" }}>Deterministic at write time</td>
                  <td style={{ padding: "16px" }}>Temporal graph extraction</td>
                  <td style={{ padding: "16px", fontSize: "0.9rem" }}>Zep tracks "as-of" timestamps; Alchemyst uses context arithmetic</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "16px", fontWeight: 600 }}>Auditability</td>
                  <td style={{ padding: "16px" }}>100% Traceable per retrieval</td>
                  <td style={{ padding: "16px" }}>Graph-based inference</td>
                  <td style={{ padding: "16px", fontSize: "0.9rem" }}>Alchemyst traces decisions; Zep traces graph evolution</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "16px", fontWeight: 600 }}>Latency (P95)</td>
                  <td style={{ padding: "16px" }}>&lt; 300ms</td>
                  <td style={{ padding: "16px" }}>600-800ms (OSS), &lt; 200ms (managed)</td>
                  <td style={{ padding: "16px", fontSize: "0.9rem" }}>Zep Cloud faster; OSS requires self-ops tuning</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "16px", fontWeight: 600 }}>LongMemEval Score</td>
                  <td style={{ padding: "16px" }}>Benchmark pending</td>
                  <td style={{ padding: "16px" }}>63.8% (GPT-4o)</td>
                  <td style={{ padding: "16px", fontSize: "0.9rem" }}>Zep leads on temporal recall; Alchemyst on deterministic accuracy</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "16px", fontWeight: 600 }}>Target Architecture</td>
                  <td style={{ padding: "16px" }}>Multi-agent org deployments</td>
                  <td style={{ padding: "16px" }}>Conversational AI assistants</td>
                  <td style={{ padding: "16px", fontSize: "0.9rem" }}>Complementary strengths</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Latency benchmark callout */}
          <div style={{ background: "rgba(244,144,37,0.08)", border: "1px solid rgba(244,144,37,0.2)", borderRadius: "8px", padding: "24px", marginBottom: "64px" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8125rem", color: "#F49025", marginBottom: "8px" }}>
              Architecture note
            </p>
            <p style={{ fontFamily: SANS, color: "#CBD5E1", marginBottom: "0", fontSize: "0.9375rem" }}>
              Zep's open-source Graphiti engine requires self-managing Neo4j/FalkorDB/Kuzu for production. Alchemyst delivers the same graph-like capabilities as a managed API with sub-300ms latency.
            </p>
          </div>

          <div className="prose-blog-dark" style={{ fontFamily: SANS, color: "#CBD5E1", lineHeight: 1.7 }}>
<h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
               What is Alchemyst AI best for?
             </h2>
            <p style={{ marginBottom: "24px" }}>
              Alchemyst AI is best for <strong>engineering teams deploying enterprise-grade, multi-agent architectures</strong>. If you have multiple agents that all need to operate on the same shared institutional knowledge, Alchemyst ensures they have structured, auditable access to that context.
            </p>

<h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
               What is Zep best for?
             </h2>
            <p style={{ marginBottom: "24px" }}>
              Zep is best for <strong>conversational AI apps that need deep chat history</strong>. Its temporal knowledge graph is excellent at understanding the chronological relationship between facts in a long-running user conversation.
            </p>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              Which should you choose? The verdict
            </h2>
            <p style={{ marginBottom: "24px" }}>
              If your primary challenge is managing infinite scroll chat history for a conversational assistant, Zep is an excellent choice. But if you are building business-critical automation where agents need verifiable access to institutional knowledge without semantic drift, <strong>Alchemyst AI provides the deterministic context layer</strong> required for production.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
