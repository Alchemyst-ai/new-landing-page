"use client";

import { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

const NODES = {
  user:      { cx: 80,  cy: 80,  r: 24, label: "USER",      sub: "session" },
  docs:      { cx: 80,  cy: 280, r: 24, label: "DOCS",      sub: "+ calls" },
  context:   { cx: 300, cy: 180, r: 40, label: "CONTEXT",   sub: "LAYER" },
  memory:    { cx: 520, cy: 80,  r: 24, label: "MEMORY",    sub: "graph" },
  knowledge: { cx: 520, cy: 280, r: 34, label: "KNOWLEDGE", sub: "vectors" },
  llm:       { cx: 700, cy: 180, r: 30, label: "LLM",       sub: "model" },
} as const;

type NodeKey = keyof typeof NODES;

interface Edge {
  from: NodeKey;
  to: NodeKey;
  color: string;
  duration: number;
  begin: number;
  reverse?: boolean;
}

const EDGES: Edge[] = [
  { from: "user",    to: "context",   color: "#F49025", duration: 1.6, begin: 0.0 },
  { from: "docs",    to: "context",   color: "#F49025", duration: 1.9, begin: 0.4 },
  { from: "context", to: "memory",    color: "#FDB560", duration: 1.7, begin: 0.8 },
  { from: "context", to: "knowledge", color: "#FDB560", duration: 2.0, begin: 1.1 },
  { from: "memory",  to: "llm",       color: "#128F8B", duration: 1.5, begin: 1.4 },
  { from: "knowledge", to: "llm",     color: "#128F8B", duration: 1.65, begin: 1.6 },
  { from: "llm",      to: "context",  color: "#4FD1C5", duration: 2.8, begin: 0.6, reverse: true },
  { from: "context",  to: "memory",   color: "#4FD1C5", duration: 1.6, begin: 1.8, reverse: true },
  { from: "context",  to: "knowledge",color: "#4FD1C5", duration: 1.8, begin: 2.1, reverse: true },
];

/* Axis tick positions */
const CG_LEFT_TICKS  = [20, 80, 140, 200, 260, 320];
const CG_BOTTOM_TICKS = [24, 104, 184, 264, 344, 424, 504, 584, 664, 744];

function edgePath(from: NodeKey, to: NodeKey) {
  const a = NODES[from];
  const b = NODES[to];
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;
  const dist = Math.hypot(dx, dy);
  const ux = dx / dist;
  const uy = dy / dist;
  const x1 = a.cx + ux * a.r;
  const y1 = a.cy + uy * a.r;
  const x2 = b.cx - ux * b.r;
  const y2 = b.cy - uy * b.r;
  
  const midX = (x1 + x2) / 2;
  const d = `M${x1},${y1} L${midX},${y1} L${midX},${y2} L${x2},${y2}`;
  return { d, len: Math.hypot(x2 - x1, y2 - y1) }; 
}

function straightEdgePath(from: NodeKey, to: NodeKey) {
  const a = NODES[from];
  const b = NODES[to];
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;
  const dist = Math.hypot(dx, dy);
  const ux = dx / dist;
  const uy = dy / dist;
  const x1 = a.cx + ux * a.r;
  const y1 = a.cy + uy * a.r;
  const x2 = b.cx - ux * b.r;
  const y2 = b.cy - uy * b.r;
  return { d: `M${x1},${y1} L${x2},${y2}` };
}

export default function ContextGraphLive() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<NodeKey | null>(null);

  const edges = useMemo(() => EDGES.map((e, i) => {
    return { ...e, id: `e${i}`, ...straightEdgePath(e.from, e.to), angled: edgePath(e.from, e.to).d };
  }), []);

  const isDimmed = (key: NodeKey) => hovered !== null && hovered !== key;

  return (
    <div 
      ref={wrapRef}
      className="relative w-full h-[400px] lg:h-[500px]"
    >
      {/* SVG Canvas */}
      <svg
        viewBox="0 0 780 360"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Live context engine data flow: inputs flow into the Alchemyst Context Layer, which feeds memory and knowledge stores, which feed the LLM, with write-back flowing in reverse."
      >
        <defs>
          <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
             <feGaussianBlur stdDeviation="3" result="blur" />
             <feMerge>
               <feMergeNode in="blur" />
               <feMergeNode in="SourceGraphic" />
             </feMerge>
          </filter>
          <filter id="glow-teal" x="-50%" y="-50%" width="200%" height="200%">
             <feGaussianBlur stdDeviation="3" result="blur" />
             <feMerge>
               <feMergeNode in="blur" />
               <feMergeNode in="SourceGraphic" />
             </feMerge>
          </filter>
          <pattern id="cgDotGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="0.5" fill="#94A3B8" opacity="0.25" />
          </pattern>
        </defs>

        {/* ── Schematic background layer ── */}

        {/* Dot grid */}
        <rect x="0" y="0" width="780" height="360" fill="url(#cgDotGrid)" />

        {/* Left ruled axis */}
        <line x1="24" y1="14" x2="24" y2="340" stroke="#CBD5E1" strokeWidth="1" />
        {CG_LEFT_TICKS.map(y => (
          <line key={`lt${y}`} x1="24" y1={y} x2="30" y2={y} stroke="#CBD5E1" strokeWidth="1" />
        ))}

        {/* Bottom ruled axis */}
        <line x1="24" y1="340" x2="766" y2="340" stroke="#CBD5E1" strokeWidth="1" />
        {CG_BOTTOM_TICKS.map(x => (
          <line key={`bt${x}`} x1={x} y1="340" x2={x} y2="334" stroke="#CBD5E1" strokeWidth="1" />
        ))}

        {/* Corner registration brackets */}
        <g stroke="#94A3B8" strokeWidth="1" fill="none" opacity="0.5">
          <path d="M6,30 L6,6 L30,6" />
          <path d="M750,6 L774,6 L774,30" />
          <path d="M6,330 L6,354 L30,354" />
          <path d="M750,354 L774,354 L774,330" />
        </g>

        {/* Bottom-left axis annotation */}
        <text x="34" y="354" fill="#94A3B8" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5" fontWeight="500">context_graph.live</text>

        {/* Top-right status */}
        <g>
          <circle cx="764" cy="14" r="2.5" fill="#10B981" opacity="0.7" />
          <text x="756" y="17" textAnchor="end" fill="#94A3B8" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fontWeight="500">LIVE</text>
        </g>

        {/* ── Dynamic Data Lines ── */}
        {edges.map((e) => (
          <g key={e.id}>
            {/* Background angled technical track */}
            <path d={e.angled} fill="none" stroke="#E2E8F0" strokeWidth="1" />
            
            {/* Straight particle path track */}
            <path d={e.d} fill="none" stroke="#F1F5F9" strokeWidth="4" />
            
            {/* Flowing animated dash representing data */}
            <motion.path
               d={e.d}
               fill="none"
               stroke={e.color}
               strokeWidth="1.5"
               strokeDasharray="4 24"
               opacity={hovered && hovered !== e.from && hovered !== e.to ? 0.1 : 0.8}
               animate={{ strokeDashoffset: [0, -28] }}
               transition={{ duration: e.duration, repeat: Infinity, ease: "linear" }}
               filter={e.color.includes('F49025') ? 'url(#glow-orange)' : 'url(#glow-teal)'}
            />
            
            {/* Traveling glowing packet */}
            <motion.circle
               r="3"
               fill={e.color}
               opacity={hovered && hovered !== e.from && hovered !== e.to ? 0 : 1}
               animate={{ offsetDistance: ["0%", "100%"] }}
               transition={{ duration: e.duration, repeat: Infinity, ease: "linear", delay: e.begin }}
               style={{ offsetPath: `path("${e.d}")` }}
            />
          </g>
        ))}

        {/* ── Nodes ── */}
        {Object.entries(NODES).map(([key, n]) => {
          const k = key as NodeKey;
          const isContext = k === "context";
          const isHovered = hovered === k;
          const dim = isDimmed(k);

          return (
            <g
              key={k}
              onMouseEnter={() => setHovered(k)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer", transition: "opacity 0.3s" }}
              opacity={dim ? 0.4 : 1}
            >
              {isContext && (
                <motion.rect
                  x={n.cx - n.r - 15} y={n.cy - n.r - 15} width={(n.r + 15)*2} height={(n.r + 15)*2}
                  fill="none"
                  stroke="#F49025"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
                />
              )}
              
              {/* Sharp Rectangles for nodes */}
              <motion.rect
                x={n.cx - n.r} y={n.cy - n.r} width={n.r*2} height={n.r*2} rx="0"
                fill="#FFFFFF"
                stroke={isContext ? "#F49025" : k === "llm" ? "#128F8B" : "#CBD5E1"}
                strokeWidth={isHovered ? 2 : 1}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
              />
              
              <text x={n.cx} y={n.cy - (isContext ? 6 : 2)} textAnchor="middle" fill={isContext ? "#F49025" : "#0F172A"} fontSize={isContext ? "11" : "9"} fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1">{n.label}</text>
              <text x={n.cx} y={n.cy + (isContext ? 8 : 10)} textAnchor="middle" fill={isContext ? "#D97B1A" : "#64748B"} fontSize={isContext ? "9" : "8"} fontFamily="JetBrains Mono, monospace">{n.sub}</text>
              {isContext && <text x={n.cx} y={n.cy + 20} textAnchor="middle" fill="#D97B1A" fontSize="7" fontFamily="JetBrains Mono, monospace" opacity="0.8">alchemyst</text>}
            </g>
          );
        })}

        <text x="390" y="330" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2" fontWeight="600">CONTEXT ENGINE · LIVE</text>
      </svg>
    </div>
  );
}
