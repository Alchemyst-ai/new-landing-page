import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleSchema from "@/components/ArticleSchema";
import type { Metadata } from "next";

const SANS = "'Sora', sans-serif";

const PAGE_PATH = "/compare/alchemyst-vs-openai-dreaming";
const PAGE_TITLE = "Alchemyst AI vs OpenAI Dreaming: Auditable Memory vs Black Box";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: "OpenAI's Dreaming synthesizes memory in the background without auditability. Alchemyst AI provides deterministic, traceable context for enterprises.",
};

export default function DreamingVsAlchemystPage() {
  return (
    <>
      <ArticleSchema
        headline={PAGE_TITLE}
        description="OpenAI's Dreaming synthesizes memory in the background without auditability. Alchemyst AI provides deterministic, traceable context for enterprises."
        url={PAGE_PATH}
      />
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
          <h1 style={{ fontFamily: SANS, fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, color: "#FFFFFF", marginBottom: "24px" }}>
            {PAGE_TITLE}
          </h1>
          <div style={{ marginBottom: "48px" }}>
            <p style={{ fontFamily: SANS, fontSize: "1.125rem", lineHeight: 1.6, color: "#CBD5E1" }}>
              OpenAI's Dreaming (June 2026) automatically curates memories in the background. But this black-box approach breaks down for enterprises that need to audit, verify, and control how context is used.
            </p>
            <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "#64748B", marginTop: "16px" }}>Last updated: June 2026</p>
          </div>
          <div className="prose-blog-dark" style={{ fontFamily: SANS, color: "#CBD5E1", lineHeight: 1.7 }}>
            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              What is OpenAI Dreaming?
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Dreaming is a background process launched June 2026 that synthesizes memories from your entire chat history. It automatically updates facts like "You went to Singapore in July" becoming "You went to Singapore in July 2026" after your trip ends.
            </p>
            <p style={{ marginBottom: "24px" }}>
              The problem: you see a summary, not the actual stored memories. Selecting "don't mention this again" suppresses details without deleting underlying entries. Deleting a conversation doesn't remove derived memories.
            </p>
            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              The auditability gap
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Dreaming creates a synthesized memory state that exports badly. What would you even export—the summary? Every month of dreaming makes ChatGPT more useful to you and your context less reconstructible elsewhere.
            </p>
            <p style={{ marginBottom: "24px" }}>
              For enterprises, this is a compliance nightmare. You cannot verify what the model "knows" about you, cannot systematically correct wrong inferences, and cannot demonstrate to auditors how context influenced decisions.
            </p>
            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              How Alchemyst AI differs
            </h2>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "8px" }}><strong>Explicit scoping:</strong> Context is tagged at write time with <code>&#123;user_id, agent_id, session_id, org_id&#125;</code>, not inferred after the fact.</li>
              <li style={{ marginBottom: "8px" }}><strong>Full provenance:</strong> Every context entry traces to its source with timestamps, confidence scores, and supersession chains.</li>
              <li style={{ marginBottom: "8px" }}><strong>Exportable:</strong> Your context exports in structured formats—move to any system without losing knowledge.</li>
              <li style={{ marginBottom: "8px" }}><strong>Deterministic retrieval:</strong> Same query always returns same results. No probabilistic black-box surprises.</li>
            </ul>
            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              When to choose which?
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <th style={{ padding: "12px", color: "#FFFFFF" }}>Consideration</th>
                  <th style={{ padding: "12px", color: "#F49025" }}>Alchemyst AI</th>
                  <th style={{ padding: "12px", color: "#FFFFFF" }}>OpenAI Dreaming</th>
                </tr>
              </thead>
              <tbody style={{ color: "#CBD5E1" }}>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Audit trail</td>
                  <td style={{ padding: "12px" }}>✅ Full traceability</td>
                  <td style={{ padding: "12px" }}>❌ Summary only</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Cross-model</td>
                  <td style={{ padding: "12px" }}>✅ Any LLM</td>
                  <td style={{ padding: "12px" }}>❌ ChatGPT only</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Storage limit</td>
                  <td style={{ padding: "12px" }}>✅ Unlimited</td>
                  <td style={{ padding: "12px" }}>❌ ~1,500 words</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Enterprise controls</td>
                  <td style={{ padding: "12px" }}>✅ RBAC, export</td>
                  <td style={{ padding: "12px" }}>❌ Platform-managed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
