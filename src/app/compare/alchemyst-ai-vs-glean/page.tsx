import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Metadata } from "next";

const SANS = "'Sora', sans-serif";

export const metadata: Metadata = {
  title: "Alchemyst AI vs Glean: Enterprise Context Layer Comparison",
  description:
    "Compare Alchemyst AI and Glean. Understand the difference between an enterprise search assistant for humans and a developer-embeddable context layer for autonomous agents.",
};

export default function CompareGleanPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#151515", color: "#FAFAFA", minHeight: "100vh", padding: "120px 0 80px" }}>
        <article className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>

          <Breadcrumbs
            currentPath="/compare/alchemyst-ai-vs-glean"
            items={[
              { name: "Compare", path: "/compare" },
              { name: "Alchemyst AI vs Glean" },
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
            Alchemyst AI vs Glean
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
              Glean is an exceptional permissions-aware enterprise search engine and AI assistant designed for human workers. However, its context graph relies on probabilistic correlation to infer workflows. <strong>Alchemyst AI is a developer-first context API for autonomous agents</strong>. While Glean disambiguates entities for search, Alchemyst provides deterministic semantic consensus, giving your engineering team the sovereign infrastructure to build reliable multi-agent systems.
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

          <div style={{ overflowX: "auto", marginBottom: "64px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: SANS, textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <th style={{ padding: "16px", color: "#FFFFFF", fontSize: "1.125rem", width: "33%" }}>Feature</th>
                  <th style={{ padding: "16px", color: "#F49025", fontSize: "1.125rem", width: "33%" }}>Alchemyst AI</th>
                  <th style={{ padding: "16px", color: "#FFFFFF", fontSize: "1.125rem", width: "33%" }}>Glean</th>
                </tr>
              </thead>
              <tbody style={{ color: "#CBD5E1" }}>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "16px", fontWeight: 600 }}>Primary User</td>
                  <td style={{ padding: "16px" }}>Autonomous AI Agents (via API)</td>
                  <td style={{ padding: "16px" }}>Human Employees (via Assistant UI)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "16px", fontWeight: 600 }}>Context Architecture</td>
                  <td style={{ padding: "16px" }}>Deterministic Context Arithmetic</td>
                  <td style={{ padding: "16px" }}>Probabilistic Context Graph</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "16px", fontWeight: 600 }}>Semantic Consensus</td>
                  <td style={{ padding: "16px" }}>Actively resolves contested meanings</td>
                  <td style={{ padding: "16px" }}>Infers entities via ML crawling</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "16px", fontWeight: 600 }}>Product Category</td>
                  <td style={{ padding: "16px" }}>Context Infrastructure Layer</td>
                  <td style={{ padding: "16px" }}>Enterprise Search / Work Assistant</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "16px", fontWeight: 600 }}>Sovereignty</td>
                  <td style={{ padding: "16px" }}>Embeddable in your own architecture</td>
                  <td style={{ padding: "16px" }}>Closed platform ecosystem</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="prose-blog-dark" style={{ fontFamily: SANS, color: "#CBD5E1", lineHeight: 1.7 }}>
            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              Enterprise Search vs. Context Infrastructure
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Glean is fundamentally a search and discovery product. It uses a massive Enterprise Knowledge Graph to crawl your SaaS apps, disambiguate entities (knowing that "Reddit" in Jira means a customer, not the website), and serve permissions-aware results to human workers.
            </p>
            <p style={{ marginBottom: "24px" }}>
              However, <strong>search is not context infrastructure</strong>. When you are building autonomous AI agents, you do not just need a search API. You need a deterministic layer that resolves <em>contested meanings</em> across teams. If Sales and Finance have different definitions of "revenue," Glean will retrieve documents for both. Alchemyst AI actively reconciles these definitions through layered inferences, providing your agents with a unified Semantic Consensus.
            </p>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              Probabilistic Graphs vs. Deterministic Arithmetic
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Glean recently introduced a "Context Graph" that analyzes temporal traces of actions to infer how work gets done. By design, this graph is <strong>probabilistic and correlational</strong>. It calculates the likelihood that Action A leads to Action B. 
            </p>
            <p style={{ marginBottom: "24px" }}>
              While useful for suggesting the next step to a human, probabilistic retrieval is dangerous for autonomous agents. Hallucinations compound. Alchemyst AI replaces this with <strong>Context Arithmetic</strong>—a deterministic approach where context is scoped at write time. By building composable layers of references and inferences, Alchemyst ensures that agents operate on verified facts with traceable lineage, not statistical probabilities.
            </p>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              Who is Glean best for?
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Glean is best for <strong>enterprises looking to deploy an internal AI assistant for their human workforce</strong>. If your goal is to help employees find documents faster across Google Drive, Slack, and Jira while strictly enforcing existing access permissions, Glean is the market leader.
            </p>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              Who is Alchemyst AI best for?
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Alchemyst AI is best for <strong>engineering teams building their own AI agents and workflows</strong>. If you are developing custom agentic architectures and need a sovereign, embeddable context layer API to ensure those agents act deterministically and without hallucination, Alchemyst provides the necessary infrastructure.
            </p>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              The Verdict
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Glean is an excellent product for humans asking questions. But autonomous agents require deterministic infrastructure, not a search engine. <strong>Alchemyst AI is the context layer for the agentic era</strong>—giving developers the API they need to solve semantic drift and build reliable AI systems.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
