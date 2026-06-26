import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";

const SANS = "'Sora', sans-serif";

const PAGE_PATH = "/blog/letta-vs-alchemyst-llm-memory";
const PAGE_TITLE = "Letta (MemGPT) vs Alchemyst: OS-Style Memory vs Context Layer";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "Letta (formerly MemGPT) uses OS-inspired tiered memory. Alchemyst uses context arithmetic. Compare architectures for long-running agents.",
};

export default function LettaVsAlchemystPage() {
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
              Letta (formerly MemGPT) implements OS-style tiered memory: core (RAM), archival (disk), and recall (history). Alchemyst AI provides context arithmetic over an institutional knowledge graph. Both solve memory for long-running agents, but with fundamentally different architectures.
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
              What is Letta's OS-inspired memory model?
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Letta treats the LLM like an operating system managing its own memory:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "8px" }}><strong>Core memory (RAM):</strong> Always in-context, always visible to agent.</li>
              <li style={{ marginBottom: "8px" }}><strong>Archival memory (disk):</strong> External vector store, agent decides when to retrieve.</li>
              <li style={{ marginBottom: "8px" }}><strong>Recall memory:</strong> Conversation history, searchable on demand.</li>
            </ul>
            <p style={{ marginBottom: "24px" }}>
              The agent actively manages its own memory through function calls—`archival_memory_search`, `core_memory_append`, etc. This is excellent for agents that run for weeks or months without human intervention.
            </p>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              What is Alchemyst's context arithmetic?
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Alchemyst AI provides a single API for institutional context:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "8px" }}><strong>Context arithmetic:</strong> Set operations (intersect, union, subtract) over meaning at query time.</li>
              <li style={{ marginBottom: "8px" }}><strong>Semantic consensus:</strong> Prevent ambiguity before it reaches the model.</li>
              <li style={{ marginBottom: "8px" }}><strong>Context traces:</strong> Every retrieval is fully auditable.</li>
            </ul>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              When to choose which architecture?
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <th style={{ padding: "12px", color: "#FFFFFF" }}>Use Case</th>
                  <th style={{ padding: "12px", color: "#F49025" }}>Alchemyst AI</th>
                  <th style={{ padding: "12px", color: "#FFFFFF" }}>Letta</th>
                </tr>
              </thead>
              <tbody style={{ color: "#CBD5E1" }}>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Multi-agent coordination</td>
                  <td style={{ padding: "12px" }}>✅ Shared context layer</td>
                  <td style={{ padding: "12px" }}>⚠️ Separate memory per agent</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Long-running research</td>
                  <td style={{ padding: "12px" }}>✅ Good</td>
                  <td style={{ padding: "12px" }}>✅ Excellent</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Semantic consensus</td>
                  <td style={{ padding: "12px" }}>✅ Built-in ontology</td>
                  <td style={{ padding: "12px" }}>⚠️ Agent-managed</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Model choice</td>
                  <td style={{ padding: "12px" }}>✅ Any via API/MCP</td>
                  <td style={{ padding: "12px" }}>✅ Any via endpoints</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Audit requirements</td>
                  <td style={{ padding: "12px" }}>✅ Retrieval traces</td>
                  <td style={{ padding: "12px" }}>⚠️ Function call logs</td>
                </tr>
              </tbody>
            </table>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              Architectural trade-offs
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Letta places memory management inside the agent's reasoning loop. The agent decides what to remember, what to archive, and what to recall. This gives agents autonomy but means they must be taught good memory hygiene.
            </p>
            <p style={{ marginBottom: "24px" }}>
              Alchemyst places memory management outside the agent. Context is scoped at write time through explicit APIs. This removes burden from agents but requires deliberate context structuring.
            </p>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              The hybrid approach
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Many teams use Letta for long-running research agents (coding, documentation, analysis) and Alchemyst for production workflows requiring semantic consensus and audit trails. Both are open-source, self-hostable, and model-agnostic.
            </p>
            <p style={{ marginBottom: "24px" }}>
              The key is matching architecture to use case: Letta when agents should manage their own memory, Alchemyst when institutional reliability matters more than agent autonomy.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}