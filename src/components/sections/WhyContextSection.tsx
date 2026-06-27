// WhyContextSection - "Why Context" (id="why-context")
// Reframes the section around operationalizing business intelligence through two
// lenses: the Technical case (model-agnostic continuity + context sovereignty) and
// the Business case (agents that run day-to-day operations at scale).
// Design: light warm paper (#F7F4EE), editorial dark ink headings (Server Component)
// per design.md. The former semantic-drift problem content now lives on /thesis.
// Pillars use the reusable shadcn Card primitive (light-surface styling passed
// explicitly, since this section sits on the warm paper background).

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const PILLARS = [
  {
    accent: "#0E9594",
    accentRgb: "14,149,148",
    kicker: "The Technical Case",
    tag: "Model-agnostic continuity",
    title: "Switch models freely. Keep your context sovereign.",
    body: "You will switch models - GPT today, Gemini or Claude tomorrow, the next frontier model after that, often several at once routed by cost or capability. Normally every switch resets the agent's memory and behavior. Alchemyst decouples what your organization knows from whichever model is reasoning over it, so your institutional context stays continuous across every upgrade, swap, or multi-model setup. The context is yours - it plugs into any AI model or agent on demand, according to the requirement at hand.",
    chips: ["Model-agnostic", "Context sovereignty", "Zero migration cost", "Multi-model routing", "Sub-300ms retrieval"],
  },
  {
    accent: "#F49025",
    accentRgb: "244,144,37",
    kicker: "The Business Case",
    tag: "Operationalized intelligence at scale",
    title: "Operationalize business intelligence that runs your day-to-day.",
    body: "This isn't about a smarter chatbot. It's about operationalizing your business intelligence - turning what your organization knows into agents that can actually run day-to-day operations and knowledge work across sales, support, ops, and research, at scale. The context layer is what makes that dependable: every agent acts on the same current, traceable, consensus version of the business, so you can trust it to operate, not just assist - without embedding a forward-deployed team in every workflow.",
    chips: ["Run ops, not just answers", "One source of truth", "Every decision auditable", "Scales without FDE teams"],
  },
];

export default function WhyContextSection() {
  return (
    <section
      id="why-context"
      style={{
        background: "#F7F4EE",
        paddingTop: "96px",
        paddingBottom: "96px",
        position: "relative",
        overflow: "hidden",
      }}
      aria-labelledby="why-context-heading"
    >
      {/* Hairline grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(rgba(229,231,235,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(229,231,235,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <div className="container relative">
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="eyebrow" style={{ marginBottom: "16px" }}>
            Why context
          </p>
          <h2
            id="why-context-heading"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.875rem, 3.5vw, 3rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#0F172A",
              maxWidth: "720px",
              margin: "0 auto",
            }}
          >
            The model is replaceable.
            <br />
            Your{" "}
            <span style={{ color: "#F49025", fontStyle: "italic" }}>institutional context</span>{" "}
            isn&apos;t.
          </h2>
          <p
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
              fontSize: "1.0625rem",
              lineHeight: 1.65,
              color: "#64748B",
              maxWidth: "620px",
              margin: "20px auto 0",
            }}
          >
            Models are commoditizing fast. Durable advantage comes from a context layer that
            operationalizes your business intelligence - and stays yours no matter which model you
            run it on. There are two reasons this matters: a technical one and a business one.
          </p>
        </div>

        {/* Two pillars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            marginBottom: "72px",
          }}
        >
          {PILLARS.map((p) => (
            <Card
              key={p.kicker}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderTop: `3px solid ${p.accent}`,
                borderRadius: "12px",
                padding: "36px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: p.accent,
                    fontWeight: 600,
                  }}
                >
                  {p.kicker}
                </span>
                <Badge
                  className="rounded"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#0F172A",
                    background: `rgba(${p.accentRgb},0.1)`,
                    border: `1px solid rgba(${p.accentRgb},0.25)`,
                    borderRadius: "4px",
                    padding: "3px 8px",
                    flexShrink: 0,
                    marginLeft: "10px",
                  }}
                >
                  {p.tag}
                </Badge>
              </div>
              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.375rem",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.25,
                  color: "#0F172A",
                  marginBottom: "14px",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: "#475569",
                  marginBottom: "24px",
                }}
              >
                {p.body}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto" }}>
                {p.chips.map((chip) => (
                  <Badge
                    key={chip}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                      letterSpacing: "0.02em",
                      color: "#334155",
                      background: "#F1F5F9",
                      border: "1px solid #E2E8F0",
                      borderRadius: "6px",
                      padding: "5px 10px",
                    }}
                  >
                    {chip}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Synthesis diagram: many models → one sovereign context layer → agents that run ops */}
        <div>
          <p
            style={{
              textAlign: "center",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#94A3B8",
              marginBottom: "24px",
            }}
          >
            One sovereign context layer, any model, agents that operate
          </p>
          <div
            style={{
              background: "#0F172A",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px",
              padding: "32px 24px",
              boxShadow: "0 8px 40px rgba(15,23,42,0.12)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
                  <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                ))}
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.1em", color: "#475569" }}>
                context_sovereignty.flow
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#28CA41", display: "inline-block" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#28CA41", letterSpacing: "0.08em" }}>continuity preserved</span>
              </div>
            </div>
            <svg viewBox="0 0 760 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Any model plugs into one sovereign context layer feeding agents that run operations" style={{ width: "100%" }}>
              <defs>
                <marker id="wcArrowAmber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#F49025" /></marker>
                <marker id="wcArrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#28CA41" /></marker>
              </defs>

              {/* Top row: interchangeable models */}
              {[
                { x: 40, label: "GPT" },
                { x: 220, label: "Gemini" },
                { x: 400, label: "Claude" },
                { x: 580, label: "Next model" },
              ].map((m) => (
                <g key={m.label}>
                  <rect x={m.x} y="20" width="140" height="44" rx="8" fill="#0F172A" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
                  <text x={m.x + 70} y="46" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontFamily="Sora, sans-serif" fontWeight="700">{m.label}</text>
                  <line x1={m.x + 70} y1="64" x2="380" y2="120" stroke="#F49025" strokeWidth="1.25" opacity="0.5" markerEnd="url(#wcArrowAmber)" />
                </g>
              ))}
              <text x="380" y="92" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono, monospace">swap or route freely · no memory reset</text>

              {/* Middle: sovereign context layer */}
              <rect x="180" y="124" width="400" height="72" rx="10" fill="#F49025" stroke="#FDB560" strokeWidth="2" />
              <text x="380" y="153" textAnchor="middle" fill="#0F172A" fontSize="15" fontFamily="Sora, sans-serif" fontWeight="800" letterSpacing="-0.02em">Alchemyst Context Layer</text>
              <text x="380" y="174" textAnchor="middle" fill="rgba(15,23,42,0.75)" fontSize="11" fontFamily="JetBrains Mono, monospace">sovereign · current · traceable · consensus</text>

              {/* Down to agents */}
              <line x1="380" y1="196" x2="380" y2="232" stroke="#28CA41" strokeWidth="1.5" markerEnd="url(#wcArrowGreen)" />
              <text x="398" y="220" textAnchor="start" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono, monospace">continuity preserved</text>

              {/* Bottom row: agents running operations */}
              {[
                { x: 60, label: "Sales agent" },
                { x: 240, label: "Support agent" },
                { x: 420, label: "Ops agent" },
                { x: 600, label: "Research agent" },
              ].map((a) => (
                <g key={a.label}>
                  <line x1="380" y1="236" x2={a.x + 70} y2="270" stroke="#28CA41" strokeWidth="1.25" opacity="0.5" markerEnd="url(#wcArrowGreen)" />
                  <rect x={a.x} y="274" width="140" height="56" rx="8" fill="rgba(40,202,65,0.08)" stroke="rgba(40,202,65,0.4)" strokeWidth="1.5" />
                  <text x={a.x + 70} y="298" textAnchor="middle" fill="#86EFAC" fontSize="11" fontFamily="Sora, sans-serif" fontWeight="700">{a.label}</text>
                  <text x={a.x + 70} y="315" textAnchor="middle" fill="#4ADE80" fontSize="9" fontFamily="JetBrains Mono, monospace">runs operations</text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Pull quote */}
        <div style={{ marginTop: "64px", textAlign: "center" }}>
          <blockquote
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
              lineHeight: 1.4,
              letterSpacing: "-0.02em",
              color: "#0F172A",
              maxWidth: "700px",
              margin: "0 auto",
              fontStyle: "italic",
            }}
          >
            &ldquo;Models will keep changing. Your{" "}
            <span style={{ color: "#F49025" }}>institutional context</span> is the asset that
            compounds - so it should belong to you, not to whichever model you happen to run
            today.&rdquo;
          </blockquote>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#94A3B8",
              marginTop: "12px",
            }}
          >
            Read the full argument on our{" "}
            <a href="/thesis" style={{ color: "#F49025", textDecoration: "none", borderBottom: "1px solid rgba(244,144,37,0.4)" }}>
              Context Thesis
            </a>
            {" · "}
            <a href="/pricing" style={{ color: "#94A3B8", textDecoration: "none", marginLeft: "8px" }}>
              See Pricing
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
