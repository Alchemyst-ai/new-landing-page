"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const MODELS = [
  { x: 40, label: "GPT" },
  { x: 220, label: "Gemini" },
  { x: 400, label: "Claude" },
  { x: 580, label: "Next model" },
];

const AGENTS = [
  { x: 60, label: "Sales agent" },
  { x: 240, label: "Support agent" },
  { x: 420, label: "Ops agent" },
  { x: 600, label: "Research agent" },
];

/* Axis tick positions */
const CS_LEFT_TICKS  = [14, 80, 146, 212, 278, 344];
const CS_BOTTOM_TICKS = [24, 104, 184, 264, 344, 424, 504, 584, 664, 734];

export default function ContextSovereigntyFlow() {
  const reduce = useReducedMotion();
  const [hoveredModel, setHoveredModel] = useState<number | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState(false);

  return (
    <div className="w-full">
      <div className="flex justify-center mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 font-medium">
          One sovereign context layer, any model, agents that operate
        </p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        <div className="relative w-full aspect-[2/1] min-h-[300px] flex items-center justify-center p-8 md:p-12">
          <svg viewBox="0 0 760 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Any model plugs into one sovereign context layer feeding agents that run operations" className="w-full h-full max-w-full">
            <defs>
              <marker id="wcArrowAmberLight" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#F49025" /></marker>
              <marker id="wcArrowGreenLight" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#128F8B" /></marker>
              <filter id="glowLayerLight" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <pattern id="csDotGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="12" r="0.5" fill="#94A3B8" opacity="0.25" />
              </pattern>
            </defs>

            {/* ── Schematic background layer ── */}

            {/* Dot grid */}
            <rect x="0" y="0" width="760" height="360" fill="url(#csDotGrid)" />

            {/* Left ruled axis */}
            <line x1="24" y1="8" x2="24" y2="344" stroke="#CBD5E1" strokeWidth="1" />
            {CS_LEFT_TICKS.map(y => (
              <line key={`lt${y}`} x1="24" y1={y} x2="30" y2={y} stroke="#CBD5E1" strokeWidth="1" />
            ))}

            {/* Bottom ruled axis */}
            <line x1="24" y1="344" x2="746" y2="344" stroke="#CBD5E1" strokeWidth="1" />
            {CS_BOTTOM_TICKS.map(x => (
              <line key={`bt${x}`} x1={x} y1="344" x2={x} y2="338" stroke="#CBD5E1" strokeWidth="1" />
            ))}

            {/* Corner registration brackets */}
            <g stroke="#94A3B8" strokeWidth="1" fill="none" opacity="0.5">
              <path d="M6,30 L6,6 L30,6" />
              <path d="M730,6 L754,6 L754,30" />
              <path d="M6,330 L6,354 L30,354" />
              <path d="M730,354 L754,354 L754,330" />
            </g>

            {/* Bottom-left axis annotation */}
            <text x="34" y="356" fill="#94A3B8" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5" fontWeight="500">context_sovereignty.flow</text>

            {/* Top-right status */}
            <g>
              <circle cx="744" cy="14" r="2.5" fill="#10B981" opacity="0.7" />
              <text x="736" y="17" textAnchor="end" fill="#94A3B8" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fontWeight="500">LIVE</text>
            </g>

            {/* ── Top row: Models ── */}
            {MODELS.map((m, i) => {
              const isActive = hoveredModel === i;
              const isOther = hoveredModel !== null && !isActive;
              return (
                <motion.g
                  key={m.label}
                  initial={reduce ? false : { opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={reduce ? undefined : { delay: 0.1 + i * 0.1, type: "spring", stiffness: 100, damping: 20 }}
                  onMouseEnter={() => setHoveredModel(i)}
                  onMouseLeave={() => setHoveredModel(null)}
                  style={{ cursor: "pointer" }}
                  opacity={isOther ? 0.3 : 1}
                >
                  <rect x={m.x} y="20" width="140" height="44" rx="0" fill="#FFFFFF" stroke={isActive ? "#F49025" : "#CBD5E1"} strokeWidth={isActive ? 2 : 1} />
                  <text x={m.x + 70} y="46" textAnchor="middle" fill="#0F172A" fontSize="13" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="0.5">{m.label}</text>
                  
                  {/* Glowing Arrow Path */}
                  <motion.path
                    d={`M${m.x + 70},64 L${m.x + 70},90 L380,120`}
                    fill="none"
                    stroke="#F49025"
                    strokeWidth={isActive ? 2 : 1}
                    opacity={isActive ? 1 : isOther ? 0.1 : 0.4}
                    markerEnd="url(#wcArrowAmberLight)"
                    strokeDasharray={isActive ? "none" : "4 4"}
                    animate={isActive && !reduce ? { strokeDashoffset: [0, -20] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                  />
                </motion.g>
              );
            })}
            
            <text x="380" y="90" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fontWeight="500">swap or route freely · no memory reset</text>

            {/* Context Layer */}
            <motion.g
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={reduce ? undefined : { delay: 0.4, type: "spring", stiffness: 100 }}
              style={{ transformOrigin: "380px 160px", cursor: "pointer" }}
              onMouseEnter={() => setHoveredLayer(true)}
              onMouseLeave={() => setHoveredLayer(false)}
            >
              <rect
                x="180" y="124" width="400" height="72" rx="0"
                fill="#FFFFFF"
                stroke="#F49025" strokeWidth="2"
                filter={hoveredLayer ? "url(#glowLayerLight)" : "none"}
                style={{ transition: "all 0.3s ease" }}
              />
              <text x="380" y="153" textAnchor="middle" fill="#0F172A" fontSize="16" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="0.5">Alchemyst Context Layer</text>
              <text x="380" y="176" textAnchor="middle" fill="#F49025" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="1" opacity={0.9} fontWeight="600">
                {hoveredLayer ? "sovereign · current · traceable · consensus" : "sovereign · current · traceable · consensus"}
              </text>
            </motion.g>

            {/* Downward flow to agents */}
            <motion.path 
              d="M380,196 L380,232" 
              stroke="#128F8B" 
              strokeWidth="2" 
              markerEnd="url(#wcArrowGreenLight)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
            <text x="398" y="220" textAnchor="start" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fontWeight="500">continuity preserved</text>

            {/* Bottom row: Agents */}
            {AGENTS.map((a, i) => (
              <motion.g
                key={a.label}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={reduce ? undefined : { delay: 0.7 + i * 0.1, type: "spring", stiffness: 100, damping: 20 }}
              >
                <path d={`M380,236 L${a.x + 70},260 L${a.x + 70},270`} fill="none" stroke="#128F8B" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" markerEnd="url(#wcArrowGreenLight)" />
                <rect x={a.x} y="274" width="140" height="56" rx="0" fill="#FFFFFF" stroke="#128F8B" strokeWidth="1" />
                <text x={a.x + 70} y="298" textAnchor="middle" fill="#0F172A" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600">{a.label}</text>
                <text x={a.x + 70} y="316" textAnchor="middle" fill="#128F8B" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="600">runs operations</text>
              </motion.g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
