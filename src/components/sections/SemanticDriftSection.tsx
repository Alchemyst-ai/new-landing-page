// SemanticDriftSection — "The Silent Problem Killing Enterprise AI"
// Design: Light warm paper (#F7F4EE), editorial dark ink headings (Server Component)

const PROBLEM_CARDS = [
  {
    title: "Semantic Consensus breaks silently",
    body: '"Revenue" means $500K to your CFO and $5M to your Sales team. Your AI agent doesn\'t know which one is right — and acts with false confidence on whichever it finds first.',
    tag: "Semantic Consensus",
  },
  {
    title: "Ontologies rot from day one",
    body: "Every knowledge graph starts accurate. The decay begins the moment you ship it. New pricing tiers, new segments, new teams — the schema never updates itself. Agents keep acting on a version of your business that no longer exists.",
    tag: "Context Rot",
  },
  {
    title: "Tractability is the missing primitive",
    body: "You can't audit what you can't trace. Without knowing exactly what context an agent had when it made a decision, debugging failures is guesswork. Auditability across agentic tasks requires a traceable context layer — not just logs.",
    tag: "Auditability",
  },
  {
    title: "Manual FDE teams don't scale",
    body: "Palantir solves this with entire teams of forward-deployed engineers embedded in every client. That works at $50M+ contracts. It doesn't work for the rest of the market. There has to be a better way.",
    tag: "Scalability",
  },
];

export default function SemanticDriftSection() {
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
      aria-labelledby="drift-heading"
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
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p className="eyebrow" style={{ color: "#EF4444", borderColor: "rgba(239,68,68,0.25)", marginBottom: "16px" }}>
            The Silent Problem
          </p>
          <h2
            id="drift-heading"
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.875rem, 3.5vw, 3rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#0F172A",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            Enterprise AI doesn&apos;t fail because the model is bad.
            <br />
            It fails because the{" "}
            <span style={{ color: "#EF4444", fontStyle: "italic" }}>context rots.</span>
          </h2>
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 400,
              fontSize: "1.0625rem",
              lineHeight: 1.65,
              color: "#64748B",
              maxWidth: "560px",
              margin: "20px auto 0",
            }}
          >
            GPT-4, Gemini, Claude — they&apos;re all capable enough. The gap between a capable model
            and a truly intelligent product is the layer that keeps its knowledge current, traceable,
            and semantically consistent across your entire organization.
          </p>
        </div>

        {/* Problem cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "80px",
          }}
        >
          {PROBLEM_CARDS.map((card) => (
            <div
              key={card.title}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                padding: "28px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <h3
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    letterSpacing: "-0.01em",
                    color: "#0F172A",
                  }}
                >
                  {card.title}
                </h3>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#EF4444",
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.18)",
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
                  fontFamily: "'Satoshi', sans-serif",
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

        {/* Flowchart diagram */}
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
            How Semantic Drift propagates through your organization
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
                semantic_drift.flow
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#EF4444", letterSpacing: "0.08em" }}>drift detected</span>
              </div>
            </div>
            {/* SVG flowchart */}
            <svg viewBox="0 0 760 480" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Semantic drift flowchart" style={{ width: "100%" }}>
              <defs>
                <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#F49025" /></marker>
                <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#EF4444" /></marker>
                <marker id="arrowGray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#64748B" /></marker>
              </defs>
              {/* Row 1: Business Reality */}
              <rect x="255" y="20" width="250" height="50" rx="8" fill="#0F172A" stroke="#F49025" strokeWidth="1.5" />
              <text x="380" y="41" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontFamily="Satoshi, sans-serif" fontWeight="700">Business Reality</text>
              <text x="380" y="57" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono, monospace">teams, decisions, evolving context</text>
              <line x1="380" y1="70" x2="380" y2="100" stroke="#F49025" strokeWidth="1.5" markerEnd="url(#arrowAmber)" />
              {/* Row 2: Ontology */}
              <rect x="215" y="104" width="330" height="50" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
              <text x="380" y="125" textAnchor="middle" fill="#0F172A" fontSize="12" fontFamily="Satoshi, sans-serif" fontWeight="700">Ontology / Knowledge Graph</text>
              <text x="380" y="142" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono, monospace">static snapshot at write time</text>
              {/* Split */}
              <line x1="380" y1="154" x2="380" y2="175" stroke="#64748B" strokeWidth="1.5" />
              <line x1="200" y1="175" x2="560" y2="175" stroke="#64748B" strokeWidth="1.5" />
              <line x1="200" y1="175" x2="200" y2="195" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
              <line x1="560" y1="175" x2="560" y2="195" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
              {/* Row 3 */}
              <rect x="90" y="198" width="220" height="50" rx="8" fill="#FFF7ED" stroke="rgba(244,144,37,0.4)" strokeWidth="1.5" />
              <text x="200" y="219" textAnchor="middle" fill="#D97B1A" fontSize="11" fontFamily="Satoshi, sans-serif" fontWeight="700">AI Agent</text>
              <text x="200" y="236" textAnchor="middle" fill="#92400E" fontSize="10" fontFamily="JetBrains Mono, monospace">consumes graph as truth</text>
              <rect x="450" y="198" width="220" height="50" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
              <text x="560" y="219" textAnchor="middle" fill="#0F172A" fontSize="11" fontFamily="Satoshi, sans-serif" fontWeight="700">Business Evolves</text>
              <text x="560" y="236" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono, monospace">new teams, terms, pricing</text>
              <line x1="200" y1="248" x2="200" y2="268" stroke="#F49025" strokeWidth="1.5" markerEnd="url(#arrowAmber)" />
              <line x1="560" y1="248" x2="560" y2="268" stroke="#EF4444" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
              {/* Row 4: Stale context */}
              <rect x="70" y="272" width="260" height="56" rx="8" fill="#FEF2F2" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5" />
              <text x="200" y="293" textAnchor="middle" fill="#DC2626" fontSize="11" fontFamily="Satoshi, sans-serif" fontWeight="700">Agent acts on stale context</text>
              <text x="200" y="309" textAnchor="middle" fill="#EF4444" fontSize="10" fontFamily="JetBrains Mono, monospace">&quot;revenue&quot; = $500K or $5M?</text>
              <rect x="430" y="272" width="260" height="56" rx="8" fill="#FEF2F2" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5" />
              <text x="560" y="293" textAnchor="middle" fill="#DC2626" fontSize="11" fontFamily="Satoshi, sans-serif" fontWeight="700">Ontology not updated</text>
              <text x="560" y="309" textAnchor="middle" fill="#EF4444" fontSize="10" fontFamily="JetBrains Mono, monospace">schema decay, shadow systems</text>
              {/* Converge */}
              <line x1="200" y1="328" x2="200" y2="350" stroke="#EF4444" strokeWidth="1.5" />
              <line x1="560" y1="328" x2="560" y2="350" stroke="#EF4444" strokeWidth="1.5" />
              <line x1="200" y1="350" x2="380" y2="350" stroke="#EF4444" strokeWidth="1.5" />
              <line x1="560" y1="350" x2="380" y2="350" stroke="#EF4444" strokeWidth="1.5" />
              <line x1="380" y1="350" x2="380" y2="368" stroke="#EF4444" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
              {/* Row 5: SEMANTIC DRIFT */}
              <rect x="195" y="372" width="370" height="60" rx="8" fill="#DC2626" stroke="#EF4444" strokeWidth="2" />
              <text x="380" y="396" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontFamily="Satoshi, sans-serif" fontWeight="800" letterSpacing="-0.02em">SEMANTIC DRIFT</text>
              <text x="380" y="412" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5">also called &quot;Context Rot&quot;</text>
              <text x="380" y="426" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="10" fontFamily="JetBrains Mono, monospace">consensus existed &rarr; now it doesn&apos;t</text>
            </svg>
          </div>
        </div>

        {/* Pull quote */}
        <div style={{ marginTop: "64px", textAlign: "center" }}>
          <blockquote
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
              lineHeight: 1.4,
              letterSpacing: "-0.02em",
              color: "#0F172A",
              maxWidth: "680px",
              margin: "0 auto",
              fontStyle: "italic",
            }}
          >
            &ldquo;If structured data drift almost killed Zillow — imagine what{" "}
            <span style={{ color: "#EF4444" }}>semantic drift</span> can do to your AI-driven
            organization.&rdquo;
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
            — Anuran Roy, Semantic Consensus and Semantic Drift
          </p>
        </div>
      </div>
    </section>
  );
}
