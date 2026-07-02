// HeroSection - HydraDB-style dark hero, SSG (Server Component)
// Design: full-bleed dark #0A0F1E, centered headline, amber accent

import TypewriterWord from "@/components/TypewriterWord";
import { Button } from "@/components/ui/button";
import ContextGraphLive from "./ContextGraphLive";

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        background: "#0A0F1E",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "120px",
        paddingBottom: "80px",
        position: "relative",
        overflow: "hidden",
      }}
      aria-labelledby="hero-heading"
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      {/* Amber radial glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: 0,
          left: "0",
          width: "1000px",
          height: "520px",
          background: "radial-gradient(ellipse 55% 60% at 25% 0%, rgba(244,144,37,0.13), transparent 70%)",
        }}
      />

      <div className="container relative" style={{ textAlign: "left" }}>
        {/* H1 - punch line (Anta font) */}
        <h1
          id="hero-heading"
          className="animate-fade-in-up delay-100"
          style={{
            fontFamily: "'Anta', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4.4vw, 3.6rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            maxWidth: "35vw",
            margin: "0",
          }}
        >
          The company brain your{" "}
          <span
            style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #F49025 0%, #FDB560 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI agents
          </span>{" "}
          can{" "}
          <span
            style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #F49025 0%, #FDB560 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <TypewriterWord />
          </span>
          .
        </h1>

        {/* Subtitle - positioning + backbone combined into one level */}
        <p
          className="animate-fade-in-up delay-200"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
            lineHeight: 1.6,
            color: "#94A3B8",
            maxWidth: "45vw",
            margin: "24px 0 0",
          }}
        >
          Enable AI agents to run your day-to-day operations at enterprise scale with an institutional context backbone.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-in-up delay-300"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          <Button asChild variant="orange" size="brand">
            <a href="#get-access">
              Get API Access
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="brand"
            className="text-white/85 border border-white/15 hover:bg-white/10 hover:text-white"
          >
            <a href="/thesis">
              See the thesis
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
          </Button>
        </div>

        {/* Contextual links for SEO/AEO - not nav/footer */}
        <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", gap: "20px", fontSize: "0.875rem" }}>
          <a href="/pricing" style={{ color: "#94A3B8", textDecoration: "none" }}>View Pricing</a>
          <a href="/compare/alchemyst-ai-vs-mem0" style={{ color: "#94A3B8", textDecoration: "none" }}>Compare with Mem0</a>
          <a href="/blog" style={{ color: "#94A3B8", textDecoration: "none" }}>Read our Blog</a>
        </div>

        {/* Live context graph diagram */}
        <ContextGraphLive />
      </div>
    </section>
  );
}
