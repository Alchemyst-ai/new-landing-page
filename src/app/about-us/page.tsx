import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

const SANS = "'Satoshi', sans-serif";

export const metadata: Metadata = {
  title: "The Best AI Memory Layer for Agents | About Alchemyst AI",
  description:
    "Alchemyst AI is a verifiable AI memory and context layer for agents - persistent memory, business data, and operational context, with every retrieval auditable. Learn why it's built for production agents.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#151515", color: "#FAFAFA", minHeight: "100vh", padding: "120px 0 80px" }}>
        <article className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          {/* AEO: Answer-first lead */}
          <h1
            style={{
              fontFamily: SANS,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#FFFFFF",
              marginBottom: "24px",
            }}
          >
            The Best AI Memory Layer for Agents
          </h1>
          
          {/* AEO: Standalone answer + Last updated date */}
          <div style={{ marginBottom: "48px" }}>
            <p
              style={{
                fontFamily: SANS,
                fontSize: "1.125rem",
                lineHeight: 1.6,
                color: "#CBD5E1",
              }}
            >
              <strong>Alchemyst AI</strong> is a standalone AI memory and context layer for agents: it gives AI applications persistent memory, business data, and operational context so they stay accurate and production-ready. Unlike most memory layers, every piece of context Alchemyst retrieves is auditable and verifiable, and it drops into any stack through APIs, SDKs, MCPs, and a browser extension.
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

          {/* AEO: Author credentials and first-hand proof */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "24px",
              marginBottom: "48px",
              display: "flex",
              alignItems: "center",
              gap: "20px"
            }}
          >
            <div style={{ flexShrink: 0 }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#F49025", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "bold", color: "#fff" }}>
                AU
              </div>
            </div>
            <div>
              <p style={{ fontFamily: SANS, fontSize: "1rem", color: "#FFFFFF", margin: 0, fontWeight: 600 }}>
                Written by Anuran and Uttaran
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: "#94A3B8", margin: "4px 0 0 0", lineHeight: 1.5 }}>
                Founders of Alchemyst AI. We built the Context Layer after testing 50+ production agent deployments and seeing 95% of them fail due to context rot and semantic drift.
              </p>
            </div>
          </div>

          <div className="prose-blog-dark" style={{ fontFamily: SANS, color: "#CBD5E1", lineHeight: 1.7 }}>
            
            {/* AEO: Subheadings that match how buyers ask */}
            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginTop: "48px", marginBottom: "20px" }}>
              Why do AI agents need a context layer?
            </h2>
            <p style={{ marginBottom: "16px" }}>
              AI isn't the future anymore — it's already changing our present. But only 26% of generative AI efforts are actually usable in production. Any functional agent has three parts: the models, the workflows, and the context. Models are crushing SoTA records every day, and workflows are being solved by MCPs. The real problem lies in the context.
            </p>
            <p style={{ marginBottom: "16px" }}>
              As LLM context windows expand, data explodes at 100× the rate. Data is always going to exceed LLM context window sizes. Beyond roughly 10 sessions per user, businesses need to treat memory and user-specific context as mandatory requirements. Without it, agents suffer from semantic drift — your business moves on, but the agent's knowledge remains static.
            </p>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginTop: "48px", marginBottom: "20px" }}>
              How does Alchemyst AI work?
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Alchemyst AI is developer infrastructure that gives every AI agent in your organization structured, auditable access to the same institutional knowledge. It acts as the "Company Brain."
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "8px" }}><strong>Deterministic Context:</strong> Unlike vector-search memory solutions, our context is scoped at write time, not inferred at retrieval.</li>
              <li style={{ marginBottom: "8px" }}><strong>Full Auditability:</strong> Every retrieval decision is traceable. You can verify exactly why an agent pulled a specific piece of context.</li>
              <li style={{ marginBottom: "8px" }}><strong>Zero Infrastructure:</strong> It's a single API. We deliver sub-50ms retrieval latency and a 99.9% uptime SLA without you needing to manage a vector database.</li>
            </ul>

            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginTop: "48px", marginBottom: "20px" }}>
              Who is this best for?
            </h2>
            <p style={{ marginBottom: "16px" }}>
              The Context Layer is built specifically for engineering teams deploying production AI agents at scale. It is not designed for single-agent hobby projects or simple chatbots; it is designed for multi-agent architectures where consistent, organization-wide knowledge is a hard requirement.
            </p>
            <p style={{ marginBottom: "16px" }}>
              "Everyone will upgrade — and the ones using Alchemyst AI will be at the forefront."
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
