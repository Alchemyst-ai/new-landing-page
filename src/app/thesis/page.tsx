// /thesis - The Context Thesis, migrated off the home page into a dedicated route.
// Standalone App Router page reusing the shared Navbar/Footer shell and the
// project's dark editorial design system (Sora + JetBrains Mono, amber accent,
// #0A0F1E hero bg, 8px max radius) per design.md.

import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

const SANS = "'Sora', sans-serif";
const MONO = "'JetBrains Mono', monospace";

export const metadata: Metadata = {
  title: "The Context Thesis - Why We're Building the Institutional Context Backbone",
  description:
    "Alchemyst AI's thesis: intelligence without memory is performance not understanding, context is the compound interest of AI interactions, the model is not the bottleneck - the infrastructure is, and context should be a primitive, not an afterthought. Includes the problem of semantic drift and why enterprise AI fails when context rots.",
  alternates: {
    canonical: "https://getalchemystai.com/thesis",
  },
};

const PROBLEM_CARDS = [
  {
    title: "Semantic Consensus breaks silently",
    body: '"Revenue" means $500K to your CFO and $5M to your Sales team. Your AI agent doesn\'t know which one is right - and acts with false confidence on whichever it finds first.',
    tag: "Semantic Consensus",
  },
  {
    title: "Ontologies rot from day one",
    body: "Every knowledge graph starts accurate. The decay begins the moment you ship it. New pricing tiers, new segments, new teams - the schema never updates itself. Agents keep acting on a version of your business that no longer exists.",
    tag: "Context Rot",
  },
  {
    title: "Tractability is the missing primitive",
    body: "You can't audit what you can't trace. Without knowing exactly what context an agent had when it made a decision, debugging failures is guesswork. Auditability across agentic tasks requires a traceable context layer - not just logs.",
    tag: "Auditability",
  },
  {
    title: "Manual FDE teams don't scale",
    body: "Palantir solves this with entire teams of forward-deployed engineers embedded in every client. That works at $50M+ contracts. It doesn't work for the rest of the market. There has to be a better way.",
    tag: "Scalability",
  },
];

const THESES = [
  {
    num: "I",
    title: "Intelligence without memory is performance, not understanding.",
    body: "A model that can answer any question but remembers nothing is a search engine, not an agent. True intelligence requires the ability to learn from experience - to carry forward what was said, decided, and discovered. An agent that forgets the moment a session ends can never run your operations; it can only react to them, one disconnected prompt at a time.",
  },
  {
    num: "II",
    title: "Context is the compound interest of AI interactions.",
    body: "Every interaction is an investment. Without context, that investment expires at the end of the session. With context, each interaction builds on the last - the agent gets smarter, more personalized, and more valuable with every use. Over time, the context backbone becomes the single most valuable asset an enterprise owns about how its own AI operates.",
  },
  {
    num: "III",
    title: "The model is not the bottleneck. The infrastructure is.",
    body: "GPT-4, Gemini, Claude - they're all capable enough. The gap between a capable model and a truly intelligent product is the layer that gives it memory, continuity, and awareness of the world it operates in. That layer - the institutional context backbone - is where day-to-day enterprise operations are won or lost, not in the next decimal point of benchmark accuracy.",
  },
  {
    num: "IV",
    title: "Context should be a primitive, not an afterthought.",
    body: "Developers shouldn't have to build context management from scratch for every AI product. It should be as simple as calling an API - ingest, retrieve, and let intelligence compound. When context is a first-class primitive, every agent in an organization can draw on the same current, traceable, semantically consistent view of the business.",
  },
];

export default function ThesisPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          background: "#0A0F1E",
          color: "#FAFAFA",
          minHeight: "100vh",
          padding: "120px 0 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Hairline grid backdrop - consistent with home dark sections */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <article className="container relative" style={{ maxWidth: "1620px", margin: "0 auto" }}>
          <Breadcrumbs currentPath="/thesis" items={[{ name: "Thesis" }]} />

          {/* Eyebrow */}
          <p className="eyebrow" style={{ marginBottom: "20px" }}>
            The Context Thesis
          </p>

          {/* H1 */}
          <h1
            style={{
              fontFamily: SANS,
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              marginBottom: "24px",
            }}
          >
            Why we&apos;re building the{" "}
            <span style={{ color: "#F49025", fontStyle: "italic" }}>
              institutional context backbone
            </span>{" "}
            for AI.
          </h1>

          {/* Standalone lead */}
          <p
            style={{
              fontFamily: SANS,
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "#CBD5E1",
              maxWidth: "1520px",
              marginBottom: "12px",
            }}
          >
            Enterprise AI doesn&apos;t fail because the model is bad. It fails because the context
            rots. GPT-4, Gemini, and Claude are all capable enough - the gap between a capable model
            and an agent that can actually run your day-to-day operations is the layer that keeps its
            knowledge current, traceable, and semantically consistent across your entire
            organization. That layer is the thesis below.
          </p>
          <p
            style={{
              fontFamily: MONO,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#475569",
              marginBottom: "56px",
            }}
          >
            Last updated: June 2026
          </p>

          {/* Four theses */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
              marginBottom: "72px",
            }}
          >
            {THESES.map((t) => (
              <div
                key={t.num}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "8px",
                  padding: "28px",
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    color: "#F49025",
                    marginBottom: "12px",
                  }}
                >
                  {t.num}
                </div>
                <h2
                  style={{
                    fontFamily: SANS,
                    fontWeight: 700,
                    fontSize: "1.0625rem",
                    letterSpacing: "-0.01em",
                    color: "#FFFFFF",
                    marginBottom: "10px",
                    lineHeight: 1.4,
                  }}
                >
                  {t.title}
                </h2>
                <p
                  style={{
                    fontFamily: SANS,
                    fontWeight: 400,
                    fontSize: "0.9375rem",
                    lineHeight: 1.7,
                    color: "#94A3B8",
                  }}
                >
                  {t.body}
                </p>
              </div>
            ))}
          </div>

          {/* ── Migrated from the former Why Context section: the problem of semantic drift ── */}
          <div style={{ marginBottom: "24px" }}>
            <p
              style={{
                fontFamily: MONO,
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#EF4444",
                marginBottom: "12px",
              }}
            >
              The problem we exist to solve
            </p>
            <h2
              style={{
                fontFamily: SANS,
                fontWeight: 800,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                maxWidth: "1520px",
                marginBottom: "14px",
              }}
            >
              Enterprise AI doesn&apos;t fail because the model is bad. It fails because the{" "}
              <span style={{ color: "#EF4444", fontStyle: "italic" }}>context rots.</span>
            </h2>
            <p
              style={{
                fontFamily: SANS,
                fontWeight: 400,
                fontSize: "1.0625rem",
                lineHeight: 1.7,
                color: "#94A3B8",
                maxWidth: "640px",
              }}
            >
              GPT-4, Gemini, Claude - they&apos;re all capable enough. The gap between a capable model
              and a truly intelligent product is the layer that keeps its knowledge current,
              traceable, and semantically consistent across your entire organization.
            </p>
          </div>

          {/* Problem cards (dark-themed) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginBottom: "56px",
            }}
          >
            {PROBLEM_CARDS.map((card) => (
              <div
                key={card.title}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "8px",
                  padding: "28px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <h3
                    style={{
                      fontFamily: SANS,
                      fontWeight: 700,
                      fontSize: "1rem",
                      letterSpacing: "-0.01em",
                      color: "#FFFFFF",
                    }}
                  >
                    {card.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#F87171",
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      borderRadius: "4px",
                      padding: "2px 6px",
                      flexShrink: 0,
                      marginLeft: "8px",
                    }}
                  >
                    {card.tag}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: SANS,
                    fontWeight: 400,
                    fontSize: "0.9375rem",
                    lineHeight: 1.65,
                    color: "#94A3B8",
                  }}
                >
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          {/* Drift propagation diagram */}
          <div style={{ marginBottom: "56px" }}>
            <p
              style={{
                textAlign: "center",
                fontFamily: MONO,
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#475569",
                marginBottom: "24px",
              }}
            >
              How Semantic Drift propagates through your organization
            </p>
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                padding: "32px 24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
                    <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                  ))}
                </div>
                <span style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.1em", color: "#475569" }}>
                  semantic_drift.flow
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
                  <span style={{ fontFamily: MONO, fontSize: "10px", color: "#EF4444", letterSpacing: "0.08em" }}>drift detected</span>
                </div>
              </div>
              <svg viewBox="0 0 760 480" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Semantic drift flowchart" style={{ width: "100%" }}>
                <defs>
                  <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#F49025" /></marker>
                  <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#EF4444" /></marker>
                  <marker id="arrowGray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#64748B" /></marker>
                </defs>
                <rect x="255" y="20" width="250" height="50" rx="8" fill="#0A0F1E" stroke="#F49025" strokeWidth="1.5" />
                <text x="380" y="41" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontFamily="Sora, sans-serif" fontWeight="700">Business Reality</text>
                <text x="380" y="57" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono, monospace">teams, decisions, evolving context</text>
                <line x1="380" y1="70" x2="380" y2="100" stroke="#F49025" strokeWidth="1.5" markerEnd="url(#arrowAmber)" />
                <rect x="215" y="104" width="330" height="50" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                <text x="380" y="125" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontFamily="Sora, sans-serif" fontWeight="700">Ontology / Knowledge Graph</text>
                <text x="380" y="142" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono, monospace">static snapshot at write time</text>
                <line x1="380" y1="154" x2="380" y2="175" stroke="#64748B" strokeWidth="1.5" />
                <line x1="200" y1="175" x2="560" y2="175" stroke="#64748B" strokeWidth="1.5" />
                <line x1="200" y1="175" x2="200" y2="195" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
                <line x1="560" y1="175" x2="560" y2="195" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
                <rect x="90" y="198" width="220" height="50" rx="8" fill="rgba(244,144,37,0.1)" stroke="rgba(244,144,37,0.4)" strokeWidth="1.5" />
                <text x="200" y="219" textAnchor="middle" fill="#FBBF77" fontSize="11" fontFamily="Sora, sans-serif" fontWeight="700">AI Agent</text>
                <text x="200" y="236" textAnchor="middle" fill="#D8A06A" fontSize="10" fontFamily="JetBrains Mono, monospace">consumes graph as truth</text>
                <rect x="450" y="198" width="220" height="50" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                <text x="560" y="219" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontFamily="Sora, sans-serif" fontWeight="700">Business Evolves</text>
                <text x="560" y="236" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono, monospace">new teams, terms, pricing</text>
                <line x1="200" y1="248" x2="200" y2="268" stroke="#F49025" strokeWidth="1.5" markerEnd="url(#arrowAmber)" />
                <line x1="560" y1="248" x2="560" y2="268" stroke="#EF4444" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
                <rect x="70" y="272" width="260" height="56" rx="8" fill="rgba(239,68,68,0.12)" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5" />
                <text x="200" y="293" textAnchor="middle" fill="#FCA5A5" fontSize="11" fontFamily="Sora, sans-serif" fontWeight="700">Agent acts on stale context</text>
                <text x="200" y="309" textAnchor="middle" fill="#F87171" fontSize="10" fontFamily="JetBrains Mono, monospace">&quot;revenue&quot; = $500K or $5M?</text>
                <rect x="430" y="272" width="260" height="56" rx="8" fill="rgba(239,68,68,0.12)" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5" />
                <text x="560" y="293" textAnchor="middle" fill="#FCA5A5" fontSize="11" fontFamily="Sora, sans-serif" fontWeight="700">Ontology not updated</text>
                <text x="560" y="309" textAnchor="middle" fill="#F87171" fontSize="10" fontFamily="JetBrains Mono, monospace">schema decay, shadow systems</text>
                <line x1="200" y1="328" x2="200" y2="350" stroke="#EF4444" strokeWidth="1.5" />
                <line x1="560" y1="328" x2="560" y2="350" stroke="#EF4444" strokeWidth="1.5" />
                <line x1="200" y1="350" x2="380" y2="350" stroke="#EF4444" strokeWidth="1.5" />
                <line x1="560" y1="350" x2="380" y2="350" stroke="#EF4444" strokeWidth="1.5" />
                <line x1="380" y1="350" x2="380" y2="368" stroke="#EF4444" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
                <rect x="195" y="372" width="370" height="60" rx="8" fill="#DC2626" stroke="#EF4444" strokeWidth="2" />
                <text x="380" y="396" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontFamily="Sora, sans-serif" fontWeight="800" letterSpacing="-0.02em">SEMANTIC DRIFT</text>
                <text x="380" y="412" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5">also called &quot;Context Rot&quot;</text>
                <text x="380" y="426" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="10" fontFamily="JetBrains Mono, monospace">consensus existed &rarr; now it doesn&apos;t</text>
              </svg>
            </div>
          </div>

          {/* Zillow pull quote (migrated) */}
          <div style={{ marginBottom: "72px", textAlign: "center" }}>
            <blockquote
              style={{
                fontFamily: SANS,
                fontWeight: 700,
                fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                lineHeight: 1.4,
                letterSpacing: "-0.02em",
                color: "#E2E8F0",
                maxWidth: "1520px",
                margin: "0 auto",
                fontStyle: "italic",
              }}
            >
              If structured data drift almost killed Zillow - imagine what{" "}
              <span style={{ color: "#EF4444" }} className="mx-1">semantic drift</span> can do to your AI-driven
              organization.
            </blockquote>
            <p
              style={{
                fontFamily: MONO,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#475569",
                marginTop: "12px",
              }}
            >
              - Anuran Roy, Semantic Consensus and Semantic Drift
            </p>
          </div>

          {/* Pull quote */}
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <blockquote
              style={{
                fontFamily: SANS,
                fontWeight: 700,
                fontSize: "clamp(1.375rem, 2.5vw, 2rem)",
                lineHeight: 1.35,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                // maxWidth: "1520px",
                margin: "0 auto",
                fontStyle: "italic",
              }}
            >
              The model is the engine.{" "}
              <span style={{ color: "#F49025" }} className="mx-1">Context is the fuel.</span>
              Without it, you&apos;re not going anywhere.
            </blockquote>
            <p
              style={{
                fontFamily: MONO,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#475569",
                marginTop: "16px",
              }}
            >
              - Alchemyst AI, Context Thesis
            </p>
          </div>

          {/* Closing CTA */}
          <div
            style={{
              background: "rgba(244,144,37,0.06)",
              border: "1px solid rgba(244,144,37,0.22)",
              borderRadius: "8px",
              padding: "36px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: SANS,
                fontWeight: 700,
                fontSize: "clamp(1.25rem, 2.2vw, 1.625rem)",
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                marginBottom: "12px",
              }}
            >
              The institutional context backbone for your enterprise.
            </h2>
            <p
              style={{
                fontFamily: SANS,
                fontWeight: 400,
                fontSize: "1rem",
                lineHeight: 1.65,
                color: "#94A3B8",
                maxWidth: "520px",
                margin: "0 auto 28px",
              }}
            >
              Enable AI agents to run your day-to-day operations at enterprise scale - on a context
              layer that stays current, traceable, and semantically consistent.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              <Button asChild variant="orange" size="brand">
                <a href="/#get-access">
                  Get API Access
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
              </Button>
              <Button asChild variant="brand-outline" size="brand">
                <a href="/">Back to home</a>
              </Button>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
