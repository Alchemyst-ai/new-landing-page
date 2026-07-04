"use client";

// SemanticDriftFlow — bespoke scroll-narrated diagram for the /thesis page.
// Replaces the static SVG with a scroll-narrated Framer Motion sequence:
//   Business Reality pulses → Ontology snapshot fades → Agent consumes
//   (amber edge flows) → Business Evolves (red edge) → both converge into the
//   SEMANTIC DRIFT red bar at the bottom, which flashes on viewport enter.
// All node labels, the "semantic_drift.flow" filename caption, the
// "drift detected" status pill, and the aria-label are preserved verbatim.

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function SemanticDriftFlow() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Drive the narrative stages from the section's own scroll progress.
  // Stage 1 (0.0–0.25): Business Reality + Ontology appear
  // Stage 2 (0.25–0.5): Agent + Business Evolves appear, amber edges flow
  // Stage 3 (0.5–0.75): red edges flow to the SEMANTIC DRIFT bar
  // Stage 4 (0.75–1.0): the red bar flashes
  const realityOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const ontologyOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const agentOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const evolveOpacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const driftBarOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const driftFlash = useTransform(
    scrollYProgress,
    [0.7, 0.78, 0.86, 0.94],
    [1, 0.3, 1, 0.6],
  );

  return (
    <div ref={ref} style={{ marginBottom: "56px" }}>
      <p
        className="caption-chapter"
        style={{
          textAlign: "center",
          color: "#475569",
          marginBottom: "24px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        How Semantic Drift propagates through your organization
      </p>
      <div
         style={{
           background: "#FFFFFF",
           border: "1px solid #E5E7EB",
           borderRadius: "0",
           padding: "32px 24px",
         }}
      >
        {/* Window chrome */}
         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #E5E7EB" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
              <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
            ))}
          </div>
          <span className="caption-meta" style={{ color: "#475569" }}>
            semantic_drift.flow
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
            <span className="caption-status" style={{ color: "#EF4444" }}>
              drift detected
            </span>
          </div>
        </div>

        <svg viewBox="0 0 760 480" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Semantic drift flowchart: Business Reality feeds a static Ontology snapshot, which an AI Agent consumes as truth while the Business Evolves; both paths converge into a SEMANTIC DRIFT failure state, also called Context Rot." style={{ width: "100%" }}>
          <defs>
            <marker id="sdArrowAmber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#F49025" /></marker>
            <marker id="sdArrowRed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#EF4444" /></marker>
            <marker id="sdArrowGray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#64748B" /></marker>
          </defs>

           {/* Business Reality */}
           <motion.g style={{ opacity: reduce ? 1 : realityOpacity }}>
             <rect x="255" y="20" width="250" height="50" rx="0" fill="#0F172A" stroke="#F49025" strokeWidth="1.5" />
             <text x="380" y="41" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontFamily="Sora, sans-serif" fontWeight="700">Business Reality</text>
             <text x="380" y="57" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono, monospace">teams, decisions, evolving context</text>
             <line x1="380" y1="70" x2="380" y2="100" stroke="#F49025" strokeWidth="1.5" markerEnd="url(#sdArrowAmber)" />
           </motion.g>

           {/* Ontology / Knowledge Graph */}
           <motion.g style={{ opacity: reduce ? 1 : ontologyOpacity }}>
             <rect x="215" y="104" width="330" height="50" rx="0" fill="rgba(15,23,42,0.03)" stroke="#E5E7EB" strokeWidth="1.5" />
             <text x="380" y="125" textAnchor="middle" fill="#0F172A" fontSize="12" fontFamily="Sora, sans-serif" fontWeight="700">Ontology / Knowledge Graph</text>
             <text x="380" y="142" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono, monospace">static snapshot at write time</text>
            <line x1="380" y1="154" x2="380" y2="175" stroke="#64748B" strokeWidth="1.5" />
            <line x1="200" y1="175" x2="560" y2="175" stroke="#64748B" strokeWidth="1.5" />
            <line x1="200" y1="175" x2="200" y2="195" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#sdArrowGray)" />
            <line x1="560" y1="175" x2="560" y2="195" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#sdArrowGray)" />
          </motion.g>

           {/* AI Agent (consumes graph as truth) */}
           <motion.g style={{ opacity: reduce ? 1 : agentOpacity }}>
             <rect x="90" y="198" width="220" height="50" rx="0" fill="rgba(244,144,37,0.08)" stroke="rgba(244,144,37,0.4)" strokeWidth="1.5" />
             <text x="200" y="219" textAnchor="middle" fill="#D97B1A" fontSize="11" fontFamily="Sora, sans-serif" fontWeight="700">AI Agent</text>
             <text x="200" y="236" textAnchor="middle" fill="#B45309" fontSize="10" fontFamily="JetBrains Mono, monospace">consumes graph as truth</text>
            <line x1="200" y1="248" x2="200" y2="268" stroke="#F49025" strokeWidth="1.5" markerEnd="url(#sdArrowAmber)" />
          </motion.g>

           {/* Business Evolves */}
           <motion.g style={{ opacity: reduce ? 1 : evolveOpacity }}>
             <rect x="450" y="198" width="220" height="50" rx="0" fill="rgba(15,23,42,0.03)" stroke="#E5E7EB" strokeWidth="1.5" />
             <text x="560" y="219" textAnchor="middle" fill="#0F172A" fontSize="11" fontFamily="Sora, sans-serif" fontWeight="700">Business Evolves</text>
             <text x="560" y="236" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono, monospace">new teams, terms, pricing</text>
            <line x1="560" y1="248" x2="560" y2="268" stroke="#EF4444" strokeWidth="1.5" markerEnd="url(#sdArrowRed)" />
          </motion.g>

          {/* Failure cards */}
          <motion.g style={{ opacity: reduce ? 1 : driftBarOpacity }}>
            <rect x="70" y="272" width="260" height="56" rx="0" fill="rgba(239,68,68,0.12)" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5" />
            <text x="200" y="293" textAnchor="middle" fill="#FCA5A5" fontSize="11" fontFamily="Sora, sans-serif" fontWeight="700">Agent acts on stale context</text>
            <text x="200" y="309" textAnchor="middle" fill="#F87171" fontSize="10" fontFamily="JetBrains Mono, monospace">&quot;revenue&quot; = $500K or $5M?</text>
            <rect x="430" y="272" width="260" height="56" rx="0" fill="rgba(239,68,68,0.12)" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5" />
            <text x="560" y="293" textAnchor="middle" fill="#FCA5A5" fontSize="11" fontFamily="Sora, sans-serif" fontWeight="700">Ontology not updated</text>
            <text x="560" y="309" textAnchor="middle" fill="#F87171" fontSize="10" fontFamily="JetBrains Mono, monospace">schema decay, shadow systems</text>
            <line x1="200" y1="328" x2="200" y2="350" stroke="#EF4444" strokeWidth="1.5" />
            <line x1="560" y1="328" x2="560" y2="350" stroke="#EF4444" strokeWidth="1.5" />
            <line x1="200" y1="350" x2="380" y2="350" stroke="#EF4444" strokeWidth="1.5" />
            <line x1="560" y1="350" x2="380" y2="350" stroke="#EF4444" strokeWidth="1.5" />
            <line x1="380" y1="350" x2="380" y2="368" stroke="#EF4444" strokeWidth="1.5" markerEnd="url(#sdArrowRed)" />
          </motion.g>

          {/* SEMANTIC DRIFT bar — flashes on viewport enter (Palantir chapter cut) */}
          <motion.g style={{ opacity: reduce ? 1 : driftBarOpacity }}>
            <motion.rect
              x="195" y="372" width="370" height="60" rx="0"
              fill="#DC2626" stroke="#EF4444" strokeWidth="2"
              style={{ opacity: reduce ? 1 : driftFlash }}
            />
            <text x="380" y="396" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontFamily="Sora, sans-serif" fontWeight="800" letterSpacing="-0.02em">SEMANTIC DRIFT</text>
            <text x="380" y="412" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5">also called &quot;Context Rot&quot;</text>
            <text x="380" y="426" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="10" fontFamily="JetBrains Mono, monospace">consensus existed &rarr; now it doesn&apos;t</text>
          </motion.g>
        </svg>
      </div>
    </div>
  );
}
