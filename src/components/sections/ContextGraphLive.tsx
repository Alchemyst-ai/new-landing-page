// ContextGraphLive - animated "context_graph.live" hero diagram (Server Component)
// Live data flow: animated dashes stream along every edge, glowing packets
// travel input → Context Layer → memory/knowledge → LLM, and the central
// node breathes. All animation is pure SVG SMIL/CSS, so no client JS needed.

export default function ContextGraphLive() {
  return (
    <div
      className="animate-fade-in-up delay-500"
      style={{
        marginTop: "48px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "12px",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Window chrome */}
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
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#22C55E",
              display: "inline-block",
              animation: "pulse 1.6s ease-in-out infinite",
            }}
          />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#22C55E", letterSpacing: "0.08em" }}>active</span>
        </div>
      </div>

      {/* Live diagram */}
      <div style={{ padding: "32px 24px", minHeight: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 860 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Live context engine data flow" style={{ width: "100%", maxWidth: "760px" }}>
          <defs>
            <radialGradient id="cgl-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F49025" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#F49025" stopOpacity="0" />
            </radialGradient>
            <filter id="cgl-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ambient glow behind central node (breathing) */}
          <ellipse cx="390" cy="110" rx="280" ry="100" fill="url(#cgl-glow)">
            <animate attributeName="opacity" values="0.55;1;0.55" dur="3.2s" repeatCount="indefinite" />
          </ellipse>

          {/* ── Edges: base + animated flowing dashes ──────────────────────── */}
          {/* USER -> CONTEXT */}
          <line x1="155" y1="60" x2="335" y2="110" stroke="rgba(244,144,37,0.16)" strokeWidth="1.5" />
          <line x1="155" y1="60" x2="335" y2="110" stroke="#F49025" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 13" opacity="0.85">
            <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="0.9s" repeatCount="indefinite" />
          </line>
          {/* DOCS -> CONTEXT */}
          <line x1="155" y1="160" x2="335" y2="110" stroke="rgba(244,144,37,0.14)" strokeWidth="1.5" />
          <line x1="155" y1="160" x2="335" y2="110" stroke="#F49025" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 13" opacity="0.7">
            <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.1s" repeatCount="indefinite" />
          </line>
          {/* CONTEXT -> MEMORY */}
          <line x1="445" y1="110" x2="595" y2="60" stroke="rgba(244,144,37,0.16)" strokeWidth="1.5" />
          <line x1="445" y1="110" x2="595" y2="60" stroke="#FDB560" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 13" opacity="0.8">
            <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.0s" repeatCount="indefinite" />
          </line>
          {/* CONTEXT -> KNOWLEDGE */}
          <line x1="445" y1="110" x2="595" y2="160" stroke="rgba(244,144,37,0.14)" strokeWidth="1.5" />
          <line x1="445" y1="110" x2="595" y2="160" stroke="#FDB560" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 13" opacity="0.65">
            <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.2s" repeatCount="indefinite" />
          </line>
          {/* MEMORY -> LLM */}
          <line x1="650.4" y1="70.1" x2="735.8" y2="98.6" stroke="rgba(100,116,139,0.22)" strokeWidth="1.5" />
          <line x1="650.4" y1="70.1" x2="735.8" y2="98.6" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 13" opacity="0.7">
            <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="0.9s" repeatCount="indefinite" />
          </line>
          {/* KNOWLEDGE -> LLM */}
          <line x1="650.4" y1="149.9" x2="735.8" y2="121.4" stroke="rgba(100,116,139,0.22)" strokeWidth="1.5" />
          <line x1="650.4" y1="149.9" x2="735.8" y2="121.4" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 13" opacity="0.6">
            <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.05s" repeatCount="indefinite" />
          </line>

          {/* ── Traveling packets (glowing dots moving along each edge) ─────── */}
          {/* USER -> CONTEXT */}
          <circle r="3" fill="#FFD9A8" filter="url(#cgl-soft)">
            <animateMotion path="M155,60 L335,110" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.6s" repeatCount="indefinite" />
          </circle>
          {/* DOCS -> CONTEXT */}
          <circle r="3" fill="#FFD9A8" filter="url(#cgl-soft)">
            <animateMotion path="M155,160 L335,110" dur="1.9s" begin="0.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.9s" begin="0.4s" repeatCount="indefinite" />
          </circle>
          {/* CONTEXT -> MEMORY */}
          <circle r="3" fill="#FFE3BE" filter="url(#cgl-soft)">
            <animateMotion path="M445,110 L595,60" dur="1.7s" begin="0.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.7s" begin="0.8s" repeatCount="indefinite" />
          </circle>
          {/* CONTEXT -> KNOWLEDGE */}
          <circle r="3" fill="#FFE3BE" filter="url(#cgl-soft)">
            <animateMotion path="M445,110 L595,160" dur="2.0s" begin="1.1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur="2.0s" begin="1.1s" repeatCount="indefinite" />
          </circle>
          {/* MEMORY -> LLM */}
          <circle r="2.6" fill="#86EFAC" filter="url(#cgl-soft)">
            <animateMotion path="M650.4,70.1 L735.8,98.6" dur="1.5s" begin="1.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" begin="1.4s" repeatCount="indefinite" />
          </circle>
          {/* KNOWLEDGE -> LLM */}
          <circle r="2.6" fill="#86EFAC" filter="url(#cgl-soft)">
            <animateMotion path="M650.4,149.9 L735.8,121.4" dur="1.65s" begin="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.65s" begin="1.6s" repeatCount="indefinite" />
          </circle>

          {/* ── LLM WRITE-BACK: blue packet flowing in reverse along existing edges ──
             LLM -> CONTEXT LAYER -> MEMORY, reusing the same lines so the
             feedback loop reads without adding extra paths. */}
          {/* LLM -> CONTEXT LAYER (reverse of MEMORY->LLM + CONTEXT->MEMORY chain) */}
          <circle r="3" fill="#7DD3FC" filter="url(#cgl-soft)">
            <animateMotion path="M735.8,98.6 L650.4,70.1 M595,60 L445,110" dur="2.8s" begin="0.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;1;0" dur="2.8s" begin="0.6s" repeatCount="indefinite" />
          </circle>
          {/* CONTEXT LAYER -> MEMORY (write the new context into memory) */}
          <circle r="3" fill="#818CF8" filter="url(#cgl-soft)">
            <animateMotion path="M445,110 L595,60" dur="1.6s" begin="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.6s" begin="1.8s" repeatCount="indefinite" />
          </circle>
          {/* CONTEXT LAYER -> KNOWLEDGE (write-back also persists to vectors) */}
          <circle r="3" fill="#818CF8" filter="url(#cgl-soft)">
            <animateMotion path="M445,110 L595,160" dur="1.8s" begin="2.1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" begin="2.1s" repeatCount="indefinite" />
          </circle>

          {/* ── Input nodes ────────────────────────────────────────────────── */}
          <circle cx="130" cy="60" r="32" fill="rgba(15,23,42,0.95)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <text x="130" y="55" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono, monospace">USER</text>
          <text x="130" y="68" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="JetBrains Mono, monospace">session</text>
          <circle cx="130" cy="160" r="32" fill="rgba(15,23,42,0.95)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <text x="130" y="155" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono, monospace">DOCS</text>
          <text x="130" y="168" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="JetBrains Mono, monospace">+ calls</text>

          {/* ── Central node (breathing ring) ──────────────────────────────── */}
          <circle cx="390" cy="110" r="50" fill="rgba(10,15,30,0.98)" stroke="#F49025" strokeWidth="1.5" />
          <circle cx="390" cy="110" r="50" fill="none" stroke="#F49025" strokeWidth="1.5">
            <animate attributeName="r" values="50;62;50" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
          </circle>
          {/* Teal counter-ring echoing the logo's secondary accent */}
          <circle cx="390" cy="110" r="50" fill="none" stroke="#0E9594" strokeWidth="1.5">
            <animate attributeName="r" values="62;50;62" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.45;0" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <text x="390" y="104" textAnchor="middle" fill="#F49025" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="500" letterSpacing="1">CONTEXT</text>
          <text x="390" y="118" textAnchor="middle" fill="#F49025" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="500" letterSpacing="1">LAYER</text>
          <text x="390" y="132" textAnchor="middle" fill="#D97B1A" fontSize="8" fontFamily="JetBrains Mono, monospace">alchemyst</text>

          {/* ── Memory / Knowledge nodes ───────────────────────────────────── */}
          <circle cx="620" cy="60" r="32" fill="rgba(15,23,42,0.95)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <text x="620" y="55" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono, monospace">MEMORY</text>
          <text x="620" y="68" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="JetBrains Mono, monospace">graph</text>
          <circle cx="620" cy="160" r="32" fill="rgba(15,23,42,0.95)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <text x="620" y="155" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono, monospace">KNOWLEDGE</text>
          <text x="620" y="168" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="JetBrains Mono, monospace">vectors</text>

          {/* ── LLM node ───────────────────────────────────────────────────── */}
          <circle cx="770" cy="110" r="36" fill="rgba(15,23,42,0.95)" stroke="rgba(34,197,94,0.3)" strokeWidth="1.5" />
          <text x="770" y="105" textAnchor="middle" fill="#22C55E" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="500">LLM</text>
          <text x="770" y="118" textAnchor="middle" fill="#16A34A" fontSize="8" fontFamily="JetBrains Mono, monospace">model</text>

          <text x="390" y="20" textAnchor="middle" fill="#334155" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">CONTEXT ENGINE · LIVE</text>
        </svg>
      </div>
    </div>
  );
}
