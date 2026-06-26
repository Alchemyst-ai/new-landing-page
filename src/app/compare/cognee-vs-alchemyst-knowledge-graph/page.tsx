import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";

const SANS = "'Sora', sans-serif";

const PAGE_PATH = "/compare/cognee-vs-alchemyst-knowledge-graph";
const PAGE_TITLE = "Cognee vs Alchemyst: Open-Source Graph vs Deterministic Context";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "Cognee builds knowledge graphs from documents. Alchemyst provides deterministic context arithmetic. Compare graph-based memory architectures.",
};

export default function CogneeVsAlchemystPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#151515", color: "#FAFAFA", minHeight: "100vh", padding: "120px 0 80px" }}>
        <article className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>

          <Breadcrumbs
            currentPath={PAGE_PATH}
            items={[
              { name: "Blog", path: "/blog" },
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
              Cognee builds knowledge graphs from unstructured data using remember/recall/improve/forget operations. Alchemyst AI provides deterministic context arithmetic over institutional knowledge. Both use graph structures, but with different priorities.
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
              What is Cognee's graph memory pipeline?
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Cognee implements a four-stage memory lifecycle:
            </p>
            <ol style={{ paddingLeft: "24px", marginBottom: "24px", listStyleType: "decimal" }}>
              <li style={{ marginBottom: "8px" }}><strong>Remember:</strong> Ingest documents, conversations, and external data into a knowledge graph.</li>
              <li style={{ marginBottom: "8px" }}><strong>Recall:</strong> Query the graph with hybrid search (vector + graph traversal).</li>
              <li style={{ marginBottom: "8px" }}><strong>Improve:</strong> Refine relationships and update the graph structure.</li>
              <li style={{ marginBottom: "8px" }}><strong>Forget:</strong> Remove outdated or irrelevant information.</li>
            </ol>
            <p style={{ marginBottom: "24px" }}>
              Cognee excels at building a knowledge graph before any queries happen, combining graph traversal with vector similarity for better recall.
            </p>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              What is Alchemyst's graph approach?
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Alchemyst AI uses context arithmetic—a dynamic set algebra over meaning computed at query time:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "8px" }}><strong>Context arithmetic:</strong> Intersect, union, subtract operations on semantic groups.</li>
              <li style={{ marginBottom: "8px" }}><strong>Layered references:</strong> Raw data → Inferences → Derived meanings.</li>
              <li style={{ marginBottom: "8px" }}><strong>Semantic consensus:</strong> Resolve contested definitions before retrieval.</li>
            </ul>
            <p style={{ marginBottom: "24px" }}>
              The graph emerges from how context is actually used, not pre-built from documents. This adapts to changing business meanings automatically.
            </p>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              Key differences
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <th style={{ padding: "12px", color: "#FFFFFF" }}>Aspect</th>
                  <th style={{ padding: "12px", color: "#F49025" }}>Alchemyst AI</th>
                  <th style={{ padding: "12px", color: "#FFFFFF" }}>Cognee</th>
                </tr>
              </thead>
              <tbody style={{ color: "#CBD5E1" }}>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Graph build timing</td>
                  <td style={{ padding: "12px" }}>Dynamic (query-time)</td>
                  <td style={{ padding: "12px" }}>Batch (pre-query)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Semantic consensus</td>
                  <td style={{ padding: "12px" }}>✅ Built-in ontology</td>
                  <td style={{ padding: "12px" }}>⚠️ Manual curation</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Deployment</td>
                  <td style={{ padding: "12px" }}>API / MCP (zero-infra)</td>
                  <td style={{ padding: "12px" }}>Self-host required</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Connectors</td>
                  <td style={{ padding: "12px" }}>30+ via MCP</td>
                  <td style={{ padding: "12px" }}>30+ native connectors</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Audit trail</td>
                  <td style={{ padding: "12px" }}>✅ Everything traced</td>
                  <td style={{ padding: "12px" }}>⚠️ Graph update logs</td>
                </tr>
              </tbody>
            </table>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              When to choose which?
            </h2>
            <p style={{ marginBottom: "16px" }}>
              <strong>Choose Cognee if:</strong>
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "8px" }}>You want to build a knowledge graph from documents before queries.</li>
              <li style={{ padding: "12px" }}>You prefer open-source self-hosted infrastructure.</li>
              <li style={{ marginBottom: "8px" }}>Graph complexity over audit simplicity is acceptable.</li>
            </ul>

            <p style={{ marginBottom: "16px" }}>
              <strong>Choose Alchemyst if:</strong>
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "8px" }}>You need audit trails for every context decision.</li>
              <li style={{ marginBottom: "8px" }}>Your business definitions change over time (semantic drift).</li>
              <li style={{ marginBottom: "8px" }}>You want to avoid managing graph database infrastructure.</li>
            </ul>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              The architectural trade-off
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Cognee builds a graph first, then queries it. This is predictable but brittle—ontology changes require rebuilding. It's excellent for static knowledge bases.
            </p>
            <p style={{ marginBottom: "24px" }}>
              Alchemyst queries contextually, with the graph emerging from usage patterns. This adapts to semantic drift but requires understanding of context arithmetic patterns. It's excellent for evolving business context.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}