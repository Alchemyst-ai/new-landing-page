// HeroSection — HydraDB-style dark hero, SSG (Server Component)
// Design: full-bleed dark #0A0F1E, centered headline, amber accent

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        background: "#0A0F1E",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
          left: "50%",
          transform: "translateX(-50%)",
          width: "1000px",
          height: "520px",
          background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(244,144,37,0.13), transparent 70%)",
        }}
      />

      <div className="container relative" style={{ maxWidth: "900px", textAlign: "center" }}>
        {/* Badge */}
        <div
          className="animate-fade-in"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(244,144,37,0.08)",
            border: "1px solid rgba(244,144,37,0.22)",
            borderRadius: "100px",
            padding: "6px 16px",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#F49025",
              display: "inline-block",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#F49025",
            }}
          >
            Context Layer API · Now in Beta
          </span>
        </div>

        {/* H1 */}
        <h1
          id="hero-heading"
          className="animate-fade-in-up delay-100"
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            maxWidth: "860px",
            margin: "0 auto",
          }}
        >
          Never let your AI Agents work on{" "}
          <span
            style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #F49025 0%, #FDB560 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            stale Knowledge
          </span>{" "}
          again.
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up delay-200"
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
            lineHeight: 1.65,
            color: "#94A3B8",
            maxWidth: "580px",
            margin: "24px auto 0",
          }}
        >
          Your AI agent has a knowledge problem — your business moves on but its knowledge base
          remains static.{" "}
          <span style={{ color: "#CBD5E1", fontWeight: 600 }}>Alchemyst fixes that.</span>
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
          <a href="#get-access" className="btn-primary">
            Get API Access
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a href="#why-context" className="btn-ghost">
            See the problem
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>

        {/* Stats bar */}
        <div
          className="animate-fade-in delay-400"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "0",
            marginTop: "56px",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {[
            { value: "< 50ms", label: "Retrieval Latency" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "3-layer", label: "Context Architecture" },
            { value: "1 API", label: "Zero Infra" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: "1 1 120px",
                padding: "20px 24px",
                textAlign: "center",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.375rem, 2.2vw, 1.875rem)",
                  letterSpacing: "-0.04em",
                  color: "#FFFFFF",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#475569",
                  marginTop: "4px",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Product visual chrome */}
        <div
          className="animate-fade-in-up delay-500"
          style={{
            marginTop: "48px",
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ display: "flex", gap: "6px" }}>
              {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
                <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
              ))}
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#475569", letterSpacing: "0.08em" }}>
              context_graph.live
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#22C55E", letterSpacing: "0.08em" }}>active</span>
            </div>
          </div>
          <div style={{ padding: "32px 24px", minHeight: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 780 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Context engine diagram" style={{ width: "100%", maxWidth: "700px" }}>
              <defs>
                <radialGradient id="hg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F49025" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#F49025" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="390" cy="110" rx="280" ry="100" fill="url(#hg)" />
              {/* Edges */}
              <line x1="155" y1="60" x2="335" y2="110" stroke="rgba(244,144,37,0.3)" strokeWidth="1.5" strokeDasharray="5 4" />
              <line x1="155" y1="160" x2="335" y2="110" stroke="rgba(244,144,37,0.2)" strokeWidth="1.5" strokeDasharray="5 4" />
              <line x1="445" y1="110" x2="595" y2="60" stroke="rgba(244,144,37,0.3)" strokeWidth="1.5" strokeDasharray="5 4" />
              <line x1="445" y1="110" x2="595" y2="160" stroke="rgba(244,144,37,0.2)" strokeWidth="1.5" strokeDasharray="5 4" />
              <line x1="645" y1="60" x2="670" y2="110" stroke="rgba(100,116,139,0.25)" strokeWidth="1.5" strokeDasharray="4 5" />
              <line x1="645" y1="160" x2="670" y2="110" stroke="rgba(100,116,139,0.25)" strokeWidth="1.5" strokeDasharray="4 5" />
              {/* Input nodes */}
              <circle cx="130" cy="60" r="32" fill="rgba(15,23,42,0.95)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <text x="130" y="55" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono, monospace">USER</text>
              <text x="130" y="68" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="JetBrains Mono, monospace">session</text>
              <circle cx="130" cy="160" r="32" fill="rgba(15,23,42,0.95)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <text x="130" y="155" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono, monospace">DOCS</text>
              <text x="130" y="168" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="JetBrains Mono, monospace">+ calls</text>
              {/* Central node */}
              <circle cx="390" cy="110" r="50" fill="rgba(10,15,30,0.98)" stroke="#F49025" strokeWidth="1.5" />
              <text x="390" y="104" textAnchor="middle" fill="#F49025" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="500" letterSpacing="1">CONTEXT</text>
              <text x="390" y="118" textAnchor="middle" fill="#F49025" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="500" letterSpacing="1">LAYER</text>
              <text x="390" y="132" textAnchor="middle" fill="#D97B1A" fontSize="8" fontFamily="JetBrains Mono, monospace">alchemyst</text>
              {/* Memory nodes */}
              <circle cx="620" cy="60" r="32" fill="rgba(15,23,42,0.95)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <text x="620" y="55" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono, monospace">MEMORY</text>
              <text x="620" y="68" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="JetBrains Mono, monospace">graph</text>
              <circle cx="620" cy="160" r="32" fill="rgba(15,23,42,0.95)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <text x="620" y="155" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono, monospace">KNOWLEDGE</text>
              <text x="620" y="168" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="JetBrains Mono, monospace">vectors</text>
              {/* LLM node */}
              <circle cx="695" cy="110" r="36" fill="rgba(15,23,42,0.95)" stroke="rgba(34,197,94,0.3)" strokeWidth="1.5" />
              <text x="695" y="105" textAnchor="middle" fill="#22C55E" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="500">LLM</text>
              <text x="695" y="118" textAnchor="middle" fill="#16A34A" fontSize="8" fontFamily="JetBrains Mono, monospace">model</text>
              <text x="390" y="20" textAnchor="middle" fill="#334155" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">CONTEXT ENGINE · LIVE</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
