"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/sections/iso/kit";

/* ── Layout constants (viewBox 760 × 600) ─────────────────────────────────── */

const W = 760;
const H = 600;

const NODES = {
  user:      { cx: 95,  cy: 190, r: 22, label: "USER",      sub: "session"   },
  docs:      { cx: 95,  cy: 300, r: 22, label: "DOCS",      sub: "knowledge" },
  calls:     { cx: 95,  cy: 410, r: 22, label: "CALLS",     sub: "meetings"  },
  memory:    { cx: 540, cy: 210, r: 22, label: "MEMORY",    sub: "graph"     },
  knowledge: { cx: 540, cy: 390, r: 22, label: "KNOWLEDGE", sub: "vectors"   },
  llm:       { cx: 690, cy: 300, r: 26, label: "LLM",       sub: "model"     },
} as const;

type NodeKey = keyof typeof NODES;

const CORE = { cx: 345, cy: 300, rb: 66 }; // context-layer core + terminal radius

type EdgeKind = "forward" | "store" | "output";

interface FlowEdge {
  from: NodeKey;
  to: NodeKey;
  kind: EdgeKind;
  duration: number;
  begin: number;
  sync?: boolean; // gold reverse packet (memory sync)
}

const KIND_COLOR: Record<EdgeKind, string> = {
  forward: "#B45309",
  store: "#E4C090",
  output: "#A16207",
};

const EDGES: FlowEdge[] = [
  { from: "user",      to: "memory",    kind: "forward", duration: 2.2, begin: 0.0 },
  { from: "docs",      to: "memory",    kind: "forward", duration: 2.5, begin: 0.5 },
  { from: "calls",     to: "memory",    kind: "forward", duration: 2.8, begin: 0.9 },
  { from: "memory",    to: "knowledge", kind: "store",   duration: 2.0, begin: 1.2, sync: true },
  { from: "knowledge", to: "llm",       kind: "output",  duration: 1.9, begin: 1.5 },
];

/* Core-routed edges need custom geometry (core sits between the columns) */
type CoreLink =
  | { key: string; to: NodeKey; color: string; duration: number; begin: number; sync?: boolean; from?: never }
  | { key: string; from: NodeKey; color: string; duration: number; begin: number; sync?: boolean; to?: never };

const CORE_LINKS: CoreLink[] = [
  { key: "c-mem", to: "memory",    color: "#E4C090", duration: 1.8, begin: 0.3, sync: true },
  { key: "c-kno", to: "knowledge", color: "#E4C090", duration: 2.1, begin: 0.7, sync: true },
  { key: "mem-llm", from: "memory",    color: "#A16207", duration: 1.6, begin: 1.0 },
  { key: "kno-llm", from: "knowledge", color: "#A16207", duration: 1.8, begin: 1.3 },
];

/* ── Path helpers ─────────────────────────────────────────────────────────── */

function borderPoint(x: number, y: number, tx: number, ty: number, r: number) {
  const dx = tx - x;
  const dy = ty - y;
  const dist = Math.hypot(dx, dy);
  return { x: x + (dx / dist) * r, y: y + (dy / dist) * r };
}

/** Smooth horizontal S-curve between two points. */
function sCurve(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const k = Math.max(40, Math.abs(dx) * 0.45);
  return `M${x1},${y1} C${x1 + k},${y1} ${x2 - k},${y2} ${x2},${y2}`;
}

function edgeGeometry(from: NodeKey, to: NodeKey) {
  const a = NODES[from];
  const b = NODES[to];
  // Core-routed: pass through the core's radius as a waypoint.
  const viaCore =
    (a.cx < CORE.cx && b.cx > CORE.cx) || (b.cx < CORE.cx && a.cx > CORE.cx);
  if (viaCore) {
    const p1 = borderPoint(a.cx, a.cy, CORE.cx, CORE.cy, a.r);
    const p2 = borderPoint(CORE.cx, CORE.cy, a.cx, a.cy, CORE.rb);
    const p3 = borderPoint(CORE.cx, CORE.cy, b.cx, b.cy, CORE.rb);
    const p4 = borderPoint(b.cx, b.cy, CORE.cx, CORE.cy, b.r);
    return {
      d: `${sCurve(p1.x, p1.y, p2.x, p2.y)} L${p3.x},${p3.y} ${sCurve(p3.x, p3.y, p4.x, p4.y)}`,
      mx: CORE.cx,
      my: CORE.cy,
    };
  }
  const p1 = borderPoint(a.cx, a.cy, b.cx, b.cy, a.r);
  const p2 = borderPoint(b.cx, b.cy, a.cx, a.cy, b.r);
  return {
    d: sCurve(p1.x, p1.y, p2.x, p2.y),
    mx: (p1.x + p2.x) / 2,
    my: (p1.y + p2.y) / 2,
  };
}

/** The gold write-back arc: LLM → core, sweeping over the top. */
const WRITE_BACK = (() => {
  const llm = NODES.llm;
  const x1 = llm.cx - 6;
  const y1 = llm.cy - llm.r;
  const x2 = CORE.cx + 20;
  const y2 = CORE.cy - CORE.rb + 4;
  return {
    d: `M${x1},${y1} C${x1 - 70},96 ${x2 + 110},96 ${x2},${y2}`,
    color: "#CA8A04",
  };
})();

/* ── Icon glyphs (24×24 stroke drawings) ──────────────────────────────────── */

const GLYPHS: Record<string, React.ReactNode> = {
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.2" />
      <path d="M5.2 19 C5.2 14.5 8.4 13 12 13 C15.6 13 18.8 14.5 18.8 19" />
    </>
  ),
  docs: (
    <>
      <rect x="6.5" y="4.5" width="9" height="15" rx="1" />
      <path d="M9 9 h5 M9 12.5 h5 M9 16 h3" />
    </>
  ),
  calls: (
    <path d="M7 10 v4 M10.5 7 v10 M14 9.5 v5 M17.5 11 v2" />
  ),
  memory: (
    <>
      <path d="M5 8 L12 4.5 L19 8 L12 11.5 Z" />
      <path d="M5 12 L12 15.5 L19 12" />
      <path d="M5 16 L12 19.5 L19 16" />
    </>
  ),
  knowledge: (
    <>
      <rect x="5.5" y="5.5" width="4" height="4" rx="1" />
      <rect x="13.5" y="5.5" width="4" height="4" rx="1" />
      <rect x="5.5" y="13.5" width="4" height="4" rx="1" />
      <rect x="13.5" y="13.5" width="4" height="4" rx="1" />
    </>
  ),
  llm: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="1.5" />
      <rect x="10" y="10" width="4" height="4" />
      <path d="M9 6.5 V3.5 M12 6.5 V3.5 M15 6.5 V3.5 M9 17.5 V20.5 M12 17.5 V20.5 M15 17.5 V20.5 M6.5 9 H3.5 M6.5 12 H3.5 M6.5 15 H3.5 M17.5 9 H20.5 M17.5 12 H20.5 M17.5 15 H20.5" />
    </>
  ),
};

const MONO = "JetBrains Mono, monospace";

/* ── Component ────────────────────────────────────────────────────────────── */

export default function ContextGraphLive() {
  const [hovered, setHovered] = useState<NodeKey | "core" | null>(null);
  const reduce = useReducedMotionSafe();

  const edges = useMemo(
    () =>
      EDGES.map((e, i) => ({
        ...e,
        id: `e${i}`,
        color: KIND_COLOR[e.kind],
        ...edgeGeometry(e.from, e.to),
      })),
    []
  );

  const coreLinks = useMemo(
    () =>
      CORE_LINKS.map((l) => {
        if (l.to) {
          const b = NODES[l.to];
          const p1 = borderPoint(CORE.cx, CORE.cy, b.cx, b.cy, CORE.rb);
          const p2 = borderPoint(b.cx, b.cy, CORE.cx, CORE.cy, b.r);
          return {
            key: l.key, color: l.color, duration: l.duration, begin: l.begin,
            sync: l.sync ?? false,
            d: sCurve(p1.x, p1.y, p2.x, p2.y),
            fromKey: "core" as const, toKey: l.to,
          };
        }
        const f = l.from as NodeKey;
        const a = NODES[f];
        const p1 = borderPoint(a.cx, a.cy, CORE.cx, CORE.cy, a.r);
        const p2 = borderPoint(CORE.cx, CORE.cy, a.cx, a.cy, CORE.rb);
        return {
          key: l.key, color: l.color, duration: l.duration, begin: l.begin,
          sync: false,
          d: sCurve(p1.x, p1.y, p2.x, p2.y),
          fromKey: f, toKey: "llm" as const,
        };
      }),
    []
  );

  const edgeTouchesHover = (from: NodeKey | "core", to: NodeKey | "core") =>
    hovered === null || hovered === from || hovered === to;

  const nodeDim = (key: NodeKey | "core") =>
    hovered !== null && hovered !== key ? 0.35 : 1;

  return (
    <div className="relative w-full aspect-[19/15]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full block"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Live context engine: user sessions, docs and calls flow into the Alchemyst Context Layer, which feeds the memory graph and knowledge vectors, which feed the LLM, with a continuous write-back loop."
      >
        <defs>
          <filter id="cgGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="cgDotGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="0.5" fill="#A8A29E" opacity="0.25" />
          </pattern>
          <radialGradient id="cgCoreGlow">
            <stop offset="0%" stopColor="#B45309" stopOpacity="0.16" />
            <stop offset="70%" stopColor="#B45309" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cgScanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B45309" stopOpacity="0" />
            <stop offset="50%" stopColor="#B45309" stopOpacity="0.055" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
          </linearGradient>
          <marker id="cgArrowGold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#CA8A04" />
          </marker>
        </defs>

        {/* ── Schematic background ── */}
        <rect x="0" y="0" width={W} height={H} fill="url(#cgDotGrid)" />

        {/* Scan band sweeping the canvas */}
        {!reduce && (
          <motion.rect
            x="10" width={W - 20} height="64"
            fill="url(#cgScanGrad)"
            animate={{ y: [44, H - 116] }}
            transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Quadrant crosshairs */}
        <g stroke="#E4D9BC" strokeWidth="1" opacity="0.8">
          <path d="M185,145 h10 M190,140 v10" />
          <path d="M565,145 h10 M570,140 v10" />
          <path d="M185,445 h10 M190,440 v10" />
          <path d="M565,445 h10 M570,440 v10" />
        </g>

        {/* ── Top HUD bar ── */}
        <rect x="16" y="17" width="7" height="7" fill="#B45309" />
        <text x="30" y="24" fill="#78716C" fontSize="8" fontFamily={MONO} letterSpacing="2" fontWeight="600">
          ALCHEMYST // CONTEXT_ENGINE
        </text>
        <text x="694" y="24" textAnchor="end" fill="#A8A29E" fontSize="7" fontFamily={MONO} letterSpacing="1">
          SYNC 99.99%
        </text>
        <text x="724" y="24" textAnchor="end" fill="#A8A29E" fontSize="7" fontFamily={MONO} letterSpacing="1">
          LIVE
        </text>
        <motion.circle
          cx="736" cy="21" r="2.5" fill="#B45309"
          animate={reduce ? undefined : { opacity: [1, 0.25, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <line x1="16" y1="40" x2="744" y2="40" stroke="#E4D9BC" strokeWidth="1" />

        {/* ── Data edges ── */}
        {edges.map((e) => {
          const lit = edgeTouchesHover(e.from, e.to);
          return (
            <g key={e.id} opacity={lit ? 1 : 0.12} style={{ transition: "opacity 0.3s" }}>
              <path d={e.d} fill="none" stroke="#F1E9DA" strokeWidth="4" />
              <path d={e.d} fill="none" stroke="#E4D9BC" strokeWidth="1" />
              <motion.path
                d={e.d} fill="none" stroke={e.color} strokeWidth="1.5"
                strokeDasharray="3 18"
                animate={reduce ? undefined : { strokeDashoffset: [0, -21] }}
                transition={{ duration: e.duration, repeat: Infinity, ease: "linear" }}
              />
              {!reduce && (
                <motion.circle
                  r="3" fill={e.color} filter="url(#cgGlow)"
                  animate={{ offsetDistance: ["0%", "100%"] }}
                  transition={{ duration: e.duration, repeat: Infinity, ease: "linear", delay: e.begin }}
                  style={{ offsetPath: `path("${e.d}")` }}
                />
              )}
              {/* Junction pod */}
              <rect
                x={e.mx - 3.5} y={e.my - 3.5} width="7" height="7"
                transform={`rotate(45 ${e.mx} ${e.my})`}
                fill="#FDFBF7" stroke="#E4C090" strokeWidth="1"
              />
            </g>
          );
        })}

        {/* ── Core ↔ store / store → LLM links ── */}
        {coreLinks.map((l) => {
          const lit = edgeTouchesHover(l.fromKey, l.toKey);
          return (
            <g key={l.key} opacity={lit ? 1 : 0.12} style={{ transition: "opacity 0.3s" }}>
              <path d={l.d} fill="none" stroke="#F1E9DA" strokeWidth="4" />
              <path d={l.d} fill="none" stroke="#E4D9BC" strokeWidth="1" />
              <motion.path
                d={l.d} fill="none" stroke={l.color} strokeWidth="1.5"
                strokeDasharray="3 18"
                animate={reduce ? undefined : { strokeDashoffset: [0, -21] }}
                transition={{ duration: l.duration, repeat: Infinity, ease: "linear" }}
              />
              {!reduce && (
                <motion.circle
                  r="3" fill={l.color} filter="url(#cgGlow)"
                  animate={{ offsetDistance: ["0%", "100%"] }}
                  transition={{ duration: l.duration, repeat: Infinity, ease: "linear", delay: l.begin }}
                  style={{ offsetPath: `path("${l.d}")` }}
                />
              )}
              {/* Gold sync packet travelling back into the core */}
              {l.sync && !reduce && (
                <motion.circle
                  r="2" fill="#CA8A04"
                  animate={{ offsetDistance: ["100%", "0%"] }}
                  transition={{ duration: l.duration * 1.4, repeat: Infinity, ease: "linear", delay: l.begin + 0.6 }}
                  style={{ offsetPath: `path("${l.d}")` }}
                />
              )}
            </g>
          );
        })}

        {/* ── Write-back arc: LLM → core ── */}
        <g opacity={edgeTouchesHover("llm", "core") ? 1 : 0.12} style={{ transition: "opacity 0.3s" }}>
          <motion.path
            d={WRITE_BACK.d} fill="none" stroke={WRITE_BACK.color} strokeWidth="1.5"
            strokeDasharray="3 18"
            markerEnd="url(#cgArrowGold)"
            animate={reduce ? undefined : { strokeDashoffset: [0, -21] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          />
          {!reduce && (
            <motion.circle
              r="3" fill={WRITE_BACK.color} filter="url(#cgGlow)"
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear", delay: 0.4 }}
              style={{ offsetPath: `path("${WRITE_BACK.d}")` }}
            />
          )}
          <text x="518" y="86" textAnchor="middle" fill="#CA8A04" fontSize="7" fontFamily={MONO} letterSpacing="1.5">
            WRITE-BACK · CONTEXT CONTINUOUSLY UPDATED
          </text>
        </g>

        {/* ── Context-layer core ── */}
        <g
          onMouseEnter={() => setHovered("core")}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer", transition: "opacity 0.3s" }}
          opacity={nodeDim("core")}
        >
          <circle cx={CORE.cx} cy={CORE.cy} r="112" fill="url(#cgCoreGlow)" />
          {/* Rotating dashed ring */}
          <motion.circle
            cx={CORE.cx} cy={CORE.cy} r="86"
            fill="none" stroke="#B45309" strokeWidth="1" strokeDasharray="4 6"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
            
          />
          {/* Counter-rotating tick ring */}
          <motion.circle
            cx={CORE.cx} cy={CORE.cy} r="98"
            fill="none" stroke="#E4C090" strokeWidth="5" strokeDasharray="1.5 19.05"
            animate={reduce ? undefined : { rotate: -360 }}
            transition={{ duration: 64, repeat: Infinity, ease: "linear" }}
            
          />
          {/* Layered strata */}
          <g>
            <rect x={CORE.cx - 52} y={CORE.cy - 31} width="104" height="18" rx="4" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.2" />
            <rect x={CORE.cx - 44} y={CORE.cy - 9} width="88" height="18" rx="4" fill="#FFFFFF" stroke="#E4C090" strokeWidth="1.2" />
            <rect x={CORE.cx - 36} y={CORE.cy + 13} width="72" height="18" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1.2" />
            <text x={CORE.cx} y={CORE.cy - 19} textAnchor="middle" fill="#B45309" fontSize="6.5" fontFamily={MONO} letterSpacing="1.5" fontWeight="600">SEMANTIC</text>
            <text x={CORE.cx} y={CORE.cy + 3} textAnchor="middle" fill="#78716C" fontSize="6.5" fontFamily={MONO} letterSpacing="1.5">EPISODIC</text>
            <text x={CORE.cx} y={CORE.cy + 25} textAnchor="middle" fill="#A8A29E" fontSize="6.5" fontFamily={MONO} letterSpacing="1.5">PROCEDURAL</text>
          </g>
          <text x={CORE.cx} y={CORE.cy + 52} textAnchor="middle" fill="#B45309" fontSize="10" fontFamily={MONO} letterSpacing="2" fontWeight="700">
            CONTEXT LAYER
          </text>
          <text x={CORE.cx} y={CORE.cy + 66} textAnchor="middle" fill="#A16207" fontSize="7" fontFamily={MONO} letterSpacing="1.5">
            ALCHEMYST · CORE
          </text>
        </g>

        {/* ── Node chips ── */}
        {Object.entries(NODES).map(([key, n]) => {
          const k = key as NodeKey;
          const isHovered = hovered === k;
          const accent = k === "llm" ? "#A16207" : "#B45309";
          return (
            <g
              key={k}
              onMouseEnter={() => setHovered(k)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer", transition: "opacity 0.3s" }}
              opacity={nodeDim(k)}
            >
              {/* Corner ticks */}
              <g
                stroke={isHovered ? accent : "#E4C090"}
                strokeWidth="1.2" fill="none"
                style={{ transition: "stroke 0.25s" }}
              >
                <path d={`M${n.cx - n.r - 4},${n.cy - n.r + 6} L${n.cx - n.r - 4},${n.cy - n.r - 4} L${n.cx - n.r + 6},${n.cy - n.r - 4}`} />
                <path d={`M${n.cx + n.r - 6},${n.cy - n.r - 4} L${n.cx + n.r + 4},${n.cy - n.r - 4} L${n.cx + n.r + 4},${n.cy - n.r + 6}`} />
                <path d={`M${n.cx - n.r - 4},${n.cy + n.r - 6} L${n.cx - n.r - 4},${n.cy + n.r + 4} L${n.cx - n.r + 6},${n.cy + n.r + 4}`} />
                <path d={`M${n.cx + n.r - 6},${n.cy + n.r + 4} L${n.cx + n.r + 4},${n.cy + n.r + 4} L${n.cx + n.r + 4},${n.cy + n.r - 6}`} />
              </g>
              {/* Chip */}
              <motion.rect
                x={n.cx - n.r} y={n.cy - n.r} width={n.r * 2} height={n.r * 2} rx="6"
                fill="#FFFFFF"
                stroke={isHovered ? accent : "#E4D9BC"}
                strokeWidth={isHovered ? 1.5 : 1}
                animate={{ scale: isHovered ? 1.06 : 1 }}
                style={{ transition: "stroke 0.25s" }}
              />
              {/* Glyph */}
              <g
                transform={`translate(${n.cx - 9} ${n.cy - 9}) scale(0.75)`}
                stroke={isHovered ? accent : "#A16207"}
                strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
                style={{ transition: "stroke 0.25s" }}
              >
                {GLYPHS[k]}
              </g>
              {/* Labels */}
              <text x={n.cx} y={n.cy + n.r + 14} textAnchor="middle" fill={isHovered ? accent : "#4A3B33"} fontSize="8" fontFamily={MONO} letterSpacing="1.5" fontWeight="600" style={{ transition: "fill 0.25s" }}>
                {n.label}
              </text>
              <text x={n.cx} y={n.cy + n.r + 26} textAnchor="middle" fill="#78716C" fontSize="7" fontFamily={MONO} letterSpacing="1">
                {n.sub}
              </text>
            </g>
          );
        })}

        {/* ── Bottom telemetry strip ── */}
        <line x1="16" y1="548" x2="744" y2="548" stroke="#E4D9BC" strokeWidth="1" />
        <text x="16" y="568" fill="#A8A29E" fontSize="7" fontFamily={MONO} letterSpacing="1.5">
          context_graph.live · feed 048
        </text>
        <text x="744" y="568" textAnchor="end" fill="#A8A29E" fontSize="7" fontFamily={MONO} letterSpacing="1">
          p95 291ms
        </text>
      </svg>
    </div>
  );
}
