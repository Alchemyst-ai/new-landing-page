// /thesis - The Context Thesis, migrated off the home page into a dedicated route.
// Standalone App Router page reusing the shared Navbar/Footer shell and the
// project's light editorial design system (Sora + JetBrains Mono, amber accent,
// paper bg, 0 radius) per design.md.

import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import SemanticDriftFlow from "@/components/sections/SemanticDriftFlow";
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
          background: "var(--paper)",
          color: "var(--ink)",
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
            backgroundImage: `linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)`,
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
              color: "var(--ink)",
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
              color: "#475569",
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
                   background: "#FFFFFF",
                   border: "1px solid #E5E7EB",
                   borderRadius: "0",
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
                     color: "var(--ink)",
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
                     color: "#64748B",
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
                color: "var(--ink)",
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
                 color: "#64748B",
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
                   background: "#FFFFFF",
                   border: "1px solid #E5E7EB",
                   borderRadius: "0",
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
                       color: "var(--ink)",
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
                       borderRadius: "0",
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
                     color: "#64748B",
                   }}
                 >
                   {card.body}
                 </p>
               </div>
             ))}
           </div>

           {/* Drift propagation diagram — bespoke scroll-narrated Framer Motion sequence */}
           <Reveal direction="up" amount={0.15}>
             <SemanticDriftFlow />
           </Reveal>

           {/* Zillow pull quote (migrated) */}
           <div style={{ marginBottom: "72px", textAlign: "center" }}>
             <blockquote
               style={{
                 fontFamily: SANS,
                 fontWeight: 700,
                 fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                 lineHeight: 1.4,
                 letterSpacing: "-0.02em",
                 color: "#0F172A",
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
                color: "var(--ink)",
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
              borderRadius: "0",
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
                color: "var(--ink)",
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
                 color: "#64748B",
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
