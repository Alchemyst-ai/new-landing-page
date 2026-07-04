import ArticleSchema from "@/components/ArticleSchema";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Reveal, DarkAnchor } from "@/components/motion";
import type { Metadata } from "next";

const SANS = "'Sora', sans-serif";

const PAGE_PATH = "/creators-program";

export const metadata: Metadata = {
  title: "Creators Program - AI Context Layer Partnership",
  description:
    "Join the Alchemyst AI Creators Program. Get $1,000 credits (250+ million tokens) for building context-aware AI agents. Partnership program for content creators, developers, and builders.",
  keywords: [
    "Alchemyst AI Creators Program",
    "AI context layer partnership",
    "content creation program",
    "AI agent memory partnership",
    "developer credits",
    "AI builder program",
  ],
  alternates: {
    canonical: "https://getalchemystai.com/creators-program",
  },
};

export default function CreatorsProgramPage() {
  const FaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is the Alchemyst AI Creators Program for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Anyone who wants to build AI agents but feels stuck because their AI agent does not remember them or what they talked about. This includes content creators, developers, students, and builders who want to showcase context with AI agents and earn rewards through our partnership program.",
        },
      },
      {
        "@type": "Question",
        name: "What do I get from the Creators Program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You get $1,000 worth of credits on the Alchemyst Context platform (250+ million tokens), hands-on experience implementing context in AI agents, and a direct line with the Alchemyst team. Top creators are eligible for interviews for open positions on our team.",
        },
      },
      {
        "@type": "Question",
        name: "What do I have to do to join the Creators Program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Build content - written, video, or short-form - around Alchemyst AI: what it is, how to use it, or how fast it enables people to derive a return on investment.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get Alchemyst AI credits for the Creators Program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sign up at platform.getalchemystai.com, go to the API Keys section, create a new API key, and use the contextual-agent-generator skill to make your AI agent context-aware. The credits are automatically available on your account.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Alchemyst AI Context Layer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Alchemyst AI is a model-agnostic context and memory layer that keeps your institutional knowledge persistent across sessions. It provides sub-50ms retrieval latency, full auditability, and semantic consensus enforcement for enterprise-ready AI agents.",
        },
      },
    ],
  };

  const OrganizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Alchemyst AI",
    url: "https://getalchemystai.com",
    logo: "https://getalchemystai.com/logo.png",
    sameAs: [
      "https://twitter.com/getalchemystai",
      "https://youtube.com/@alchemystai",
    ],
    offers: {
      "@type": "Offer",
      category: "AI Developer Program",
      description: "Creators Program with $1,000 in credits for building context-aware AI agents",
    },
  };

  return (
    <>
      <Navbar />
      <ArticleSchema
        headline="Alchemyst AI Creators Program - Context Layer Partnership"
        description="Join the Alchemyst AI Creators Program. Get $1,000 credits (250+ million tokens) for building context-aware AI agents. Partnership program for content creators and developers."
        url={PAGE_PATH}
        datePublished="2026-06-01"
        dateModified="2026-06-01"
        authorName="Alchemyst AI"
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FaqJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(OrganizationJsonLd).replace(/</g, "\\u003c") }}
      />

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
        <article className="container relative" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Breadcrumbs currentPath={PAGE_PATH} items={[{ name: "Creators Program" }]} />

          {/* Eyebrow */}
          <Reveal direction="up" amount={0.2}>
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <span className="caption-eyebrow">AI Context Layer Partnership</span>
            </div>
          </Reveal>

          {/* H1 */}
          <Reveal direction="up" amount={0.2} delay={0.05}>
            <h1
              style={{
                fontFamily: SANS,
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                color: "#0F172A",
                marginBottom: "24px",
              }}
            >
              Alchemyst AI Creators Program
            </h1>
          </Reveal>

          {/* Standalone lead */}
          <Reveal direction="up" amount={0.2} delay={0.1}>
            <p
              style={{
                fontFamily: SANS,
                fontSize: "1.125rem",
                lineHeight: 1.7,
                color: "#475569",
                marginBottom: "48px",
              }}
            >
              Partnership program for content creators, developers, and builders. Get $1,000 in credits to build
              context-aware AI agents and showcase them to our community.
            </p>
          </Reveal>

          {/* Benefits */}
          <Reveal direction="up" amount={0.15}>
            <h2
              style={{
                fontFamily: SANS,
                fontWeight: 700,
                fontSize: "1.75rem",
                color: "#0F172A",
                marginBottom: "24px",
                letterSpacing: "-0.02em",
              }}
            >
              What You Get
            </h2>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
              marginBottom: "48px",
            }}
          >
            {[
              {
                title: "$1,000 in Credits",
                body: "250+ million tokens on our Context Layer platform for building production AI agents.",
              },
              {
                title: "Hands-on Experience",
                body: "Build context-aware AI agents and become a verified context layer expert.",
              },
              {
                title: "Team Access",
                body: "Direct line with founders. Top creators eligible for interviews for open positions.",
              },
            ].map((benefit, i) => (
              <Reveal key={benefit.title} direction="up" delay={i * 0.08} amount={0.2}>
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderTop: "3px solid #F49025",
                     borderRadius: "0",
                     padding: "24px",
                     height: "100%",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: SANS,
                      fontWeight: 700,
                      fontSize: "1.125rem",
                      color: "#F49025",
                      marginBottom: "8px",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p style={{ fontFamily: SANS, fontSize: "0.9375rem", lineHeight: 1.6, color: "#64748B", margin: 0 }}>
                    {benefit.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* FAQ Section */}
          <Reveal direction="up" amount={0.15}>
            <h2
              style={{
                fontFamily: SANS,
                fontWeight: 700,
                fontSize: "1.75rem",
                color: "#0F172A",
                marginBottom: "24px",
                letterSpacing: "-0.02em",
              }}
            >
              Frequently Asked Questions
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}>
            {[
              {
                q: "Who is it for?",
                a: "Anyone who wants to build AI agents but feels stuck because their AI agent does not remember them or what they talked about. Perfect for content creators, developers, and students.",
              },
              {
                q: "What do I get?",
                a: "$1,000 worth of credits (250+ million tokens), hands-on experience with context in AI agents, and direct access to our team. Top creators get interview opportunities.",
              },
              {
                q: "What do I have to do?",
                a: "Build content - written, video, or short-form - around Alchemyst AI. Showcase use cases, tutorials, or ROI stories.",
              },
            ].map((faq, i) => (
              <Reveal key={faq.q} direction="up" delay={i * 0.06} amount={0.15}>
                <details
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                     borderRadius: "0",
                   }}
                 >
                   <summary
                    style={{
                      fontFamily: SANS,
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "#0F172A",
                      padding: "16px 20px",
                      cursor: "pointer",
                    }}
                  >
                    {faq.q}
                  </summary>
                  <div style={{ padding: "0 20px 20px", borderTop: "1px solid #E5E7EB" }}>
                    <p style={{ fontFamily: SANS, fontSize: "0.9375rem", lineHeight: 1.65, color: "#64748B", marginTop: "16px" }}>
                      {faq.a}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>

          {/* CTA — dark anchor tile (orange-tinted) */}
          <Reveal direction="up" amount={0.2}>
            <DarkAnchor
              style={{
                background: "rgba(244,144,37,0.06)",
                border: "1px solid rgba(244,144,37,0.22)",
                borderRadius: "0",
                padding: "36px",
                textAlign: "center",
                marginBottom: "48px",
              }}
            >
              <h2
                style={{
                  fontFamily: SANS,
                  fontWeight: 700,
                  fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                  marginBottom: "12px",
                }}
              >
                Ready to join the Creators Program?
              </h2>
              <p
                style={{
                  fontFamily: SANS,
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: 1.65,
                  color: "#94A3B8",
                  maxWidth: "480px",
                  margin: "0 auto 28px",
                }}
              >
                Get $1,000 in credits and start building context-aware AI agents today.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px" }}>
                <Button asChild variant="orange" size="brand">
                  <a href="mailto:founders@getalchemystai.com">
                    Contact Us
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </Button>
                <Button asChild variant="brand-outline" size="brand">
                  <a href="/">Back to home</a>
                </Button>
              </div>
            </DarkAnchor>
          </Reveal>

          {/* Last updated */}
          <p
            className="caption-meta"
            style={{
              color: "#94A3B8",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            Last updated: June 2026
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
