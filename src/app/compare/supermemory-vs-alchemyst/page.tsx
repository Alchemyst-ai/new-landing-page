import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";

const SANS = "'Sora', sans-serif";

const PAGE_PATH = "/compare/supermemory-vs-alchemyst";
const PAGE_TITLE = "SuperMemory vs Alchemyst: Memory + RAG vs Deterministic Context";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "Compare SuperMemory's memory+rag approach with Alchemyst AI's deterministic context layer. Both combine memory with retrieval, but with different architectures.",
};

export default function SuperMemoryVsAlchemystPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#151515", color: "#FAFAFA", minHeight: "100vh", padding: "120px 0 80px" }}>
        <article className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>

          <Breadcrumbs
            currentPath={PAGE_PATH}
            items={[
              { name: "Compare", path: "/compare" },
              { name: PAGE_TITLE },
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
            }}
          >
            {PAGE_TITLE}
          </h1>

          <div style={{ marginBottom: "48px" }}>
            <p
              style={{
                fontFamily: SANS,
                fontSize: "1.125rem",
                lineHeight: 1.6,
                color: "#CBD5E1",
              }}
            >
              SuperMemory combines memory graph + user profiles + knowledge base + session context + compliance in a single API. Alchemyst AI provides a deterministic context layer with context arithmetic. Both target developers, but with different priorities.
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

          <div className="prose-blog-dark" style={{ fontFamily: SANS, color: "#CBD5E1", lineHeight: 1.7 }}>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              What is SuperMemory's five-layer approach?
            </h2>
            <p style={{ marginBottom: "24px" }}>
              SuperMemory provides a unified context stack:
            </p>
            <ol style={{ paddingLeft: "24px", marginBottom: "24px", listStyleType: "decimal" }}>
              <li style={{ marginBottom: "8px" }}><strong>Memory Graph</strong> — stores facts extracted from conversations with temporal validity.</li>
              <li style={{ marginBottom: "8px" }}><strong>User Profiles</strong> — maintains stable facts + recent activity for personalization.</li>
              <li style={{ marginBottom: "8px" }}><strong>Knowledge Base</strong> — RAG over documents and external data.</li>
              <li style={{ marginBottom: "8px" }}><strong>Session Context</strong> — conversation continuity within sessions.</li>
              <li style={{ marginBottom: "8px" }}><strong>Enterprise Compliance</strong> — SOC 2, HIPAA, GDPR controls.</li>
            </ol>
            <p style={{ marginBottom: "24px" }}>
              This works well for coding agents and personal assistants where the agent needs both memory and document retrieval.
            </p>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              What is Alchemyst AI's deterministic approach?
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Alchemyst AI focuses exclusively on institutional context with three primitives:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "8px" }}><strong>Context Arithmetic</strong> — set operations over meaning at query time.</li>
              <li style={{ marginBottom: "8px" }}><strong>Semantic Consensus</strong> — resolve contested definitions before retrieval.</li>
              <li style={{ marginBottom: "8px" }}><strong>Context Traces</strong> — every retrieval is fully auditable.</li>
            </ul>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              Key differences
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <th style={{ padding: "12px", color: "#FFFFFF" }}>Aspect</th>
                  <th style={{ padding: "12px", color: "#F49025" }}>Alchemyst AI</th>
                  <th style={{ padding: "12px", color: "#FFFFFF" }}>SuperMemory</th>
                </tr>
              </thead>
              <tbody style={{ color: "#CBD5E1" }}>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Primary focus</td>
                  <td style={{ padding: "12px" }}>Institutional context</td>
                  <td style={{ padding: "12px" }}>Memory + RAG combined</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Memory model</td>
                  <td style={{ padding: "12px" }}>Deterministic (scoped writes)</td>
                  <td style={{ padding: "12px" }}>Graph + RAG hybrid</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Audit trail</td>
                  <td style={{ padding: "12px" }}>✅ Retrieval-level traces</td>
                  <td style={{ padding: "12px" }}>⚠️ Limited</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Document handling</td>
                  <td style={{ padding: "12px" }}>Via MCP connectors</td>
                  <td style={{ padding: "12px" }}>✅ Native knowledge base</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Latency</td>
                  <td style={{ padding: "12px" }}>P95 &lt;300ms</td>
                  <td style={{ padding: "12px" }}>Reported 85.4% on LongMemEval</td>
                </tr>
              </tbody>
            </table>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              When to choose which?
            </h2>
            <p style={{ marginBottom: "16px" }}>
              <strong>Choose SuperMemory if:</strong>
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "8px" }}>You are building a coding agent or personal assistant.</li>
              <li style={{ marginBottom: "8px" }}>You need both user preferences AND document retrieval in one API.</li>
              <li style={{ marginBottom: "8px" }}>You want connectors to Google Drive, Slack, Notion, GitHub.</li>
            </ul>

            <p style={{ marginBottom: "16px" }}>
              <strong>Choose Alchemyst AI if:</strong>
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "8px" }}>You are building multi-agent systems with shared institutional knowledge.</li>
              <li style={{ marginBottom: "8px" }}>You need audit trails for every context retrieval.</li>
              <li style={{ marginBottom: "8px" }}>You want to enforce semantic consensus across teams ("revenue" means one thing).</li>
            </ul>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              The trade-offs
            </h2>
            <p style={{ marginBottom: "24px" }}>
              SuperMemory covers more ground in a single service—memory, user profiles, knowledge base, and compliance. This reduces integration complexity but can mean you are paying for capabilities you may not need.
            </p>
            <p style={{ marginBottom: "24px" }}>
              Alchemyst does one thing (context) but does it with surgical precision—deterministic, traceable, and consensual. For enterprises where wrong answers cost millions, this precision matters more than breadth.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}