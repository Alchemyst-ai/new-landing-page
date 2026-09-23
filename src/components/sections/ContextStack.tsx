"use client";

/* ── ContextStack: hero visual ─────────────────────────────────────────────
 * An exploded, isometric cross-section of the Alchemyst context layer sitting
 * on top of your data sources. A live query loop plays through the stack:
 *
 *   compose query → route (packet pierces every layer) → connect (sources
 *   light) → model (graph path) → compute (∩ intersection) → resolve
 *   (canonical term) → deliver (selected tokens) → traced answer.
 *
 * Hovering / focusing / tapping a layer explodes the stack around it, zooms
 * the plate, pauses the loop and slides in a detail panel.
 * viewBox 640 × 720, aspect-locked container. All motion respects
 * prefers-reduced-motion (renders the fully-resolved state, statically).
 * SVG def IDs are namespaced `ks*`. */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "./iso/kit";

/* ── Geometry ─────────────────────────────────────────────────────────────── */

const W = 640;
const H = 720;
const CX = 214;          // stack centre x
const HALF = 78;         // plate half-size (local units)
const IA = 0.9;          // dimetric projection: x factor
const IB = 0.32;         // dimetric projection: y factor
const T = 9;             // plate thickness
const RX = IA * 2 * HALF; // rhombus half-width  (140.4)
const RY = IB * 2 * HALF; // rhombus half-height (49.9)
const CARD_Y = 24;
const CARD_H = 74;
const CARD_BOTTOM = CARD_Y + CARD_H;
const CALLOUT_X = 394;

const MONO = "JetBrains Mono, monospace";
const SERIF = "var(--font-merriweather), Georgia, serif";
const EASE = [0.23, 1, 0.32, 1] as const;
const AMBER = "#B45309";

/** Local plate coords (u, v) → screen offset from the plate centre. */
const iso = (u: number, v: number) => ({ x: IA * (u - v), y: IB * (u + v) });
/** Affine matrix mapping local plate coords onto the plate's top face. */
const isoMatrix = (cy: number) => `matrix(${IA} ${IB} ${-IA} ${IB} ${CX} ${cy})`;

/* ── Content ──────────────────────────────────────────────────────────────── */

type LayerKind = "connect" | "model" | "compute" | "resolve" | "deliver";

interface Layer {
  id: LayerKind;
  idx: string;
  verb: string;
  title: string;
  sub: string;
  y: number;
  body: string;
  stats: [string, string][];
  code: string;
}

/* Ordered bottom → top. */
const LAYERS: Layer[] = [
  {
    id: "connect", idx: "L00", verb: "CONNECT", title: "Your data sources",
    sub: "slack · drive · crm · email · jira", y: 582,
    body: "Slack, Drive, CRM, email, tickets and wikis stay exactly where they are. They sync continuously and are never copied into another silo.",
    stats: [["Sources", "6 live"], ["Documents", "1.2M"], ["Sync", "real-time"]],
    code: 'sources.connect("crm")',
  },
  {
    id: "model", idx: "L01", verb: "MODEL", title: "Knowledge graph",
    sub: "entities · edges · provenance", y: 470,
    body: "Entities, relationships and provenance are extracted from every source into one versioned institutional graph.",
    stats: [["Entities", "4.8M"], ["Edges", "12.1M"], ["Version", "v2 · live"]],
    code: "graph.link(deal, account)",
  },
  {
    id: "compute", idx: "L02", verb: "COMPUTE", title: "Context arithmetic",
    sub: "∩ narrow · ∪ widen · − subtract", y: 372,
    body: "Set algebra over meaning at query time: intersect scope, union recall, subtract what's superseded, rank what remains.",
    stats: [["Operators", "∩ ∪ − rank"], ["Candidates", "12.4K → 38"], ["Latency", "291ms p95"]],
    code: 'ctx.search({ groupName: ["emea"] })',
  },
  {
    id: "resolve", idx: "L03", verb: "RESOLVE", title: "Semantic consensus",
    sub: "one meaning per term", y: 274,
    body: "Canonical definitions are enforced before the model sees a token. “Revenue” means ARR for every team and every agent.",
    stats: [["Terms", "1,240"], ["Conflicts", "0"], ["Owner", "finance"]],
    code: 'ontology.define("revenue")',
  },
  {
    id: "deliver", idx: "L04", verb: "DELIVER", title: "Traceable context",
    sub: "right tokens → your agent", y: 176,
    body: "Only what survives reaches the agent, and every token carries a pointer back to the exact source it came from.",
    stats: [["Window", "2.1K / 128K"], ["Trace", "#A-4821"], ["Audit", "100%"]],
    code: "trace.get(session, turn)",
  },
];

const QUERY = "What was Q3 revenue in EMEA?";
/* Step durations: 0 compose · 1 route · 2 connect · 3 model · 4 compute ·
   5 resolve · 6 deliver · 7 answer */
const STEP_MS = [1800, 1400, 800, 750, 750, 750, 700, 3800];
const STATUS = [
  "composing query",
  "routing query through the stack",
  "fetching · crm · drive · slack",
  "traversing knowledge graph",
  "computing scope ∩ recall − superseded",
  "resolving “revenue” ≡ ARR",
  "assembling traceable context",
  "",
];
const PHASE = ["COMPOSE", "ROUTE", "CONNECT", "MODEL", "COMPUTE", "RESOLVE", "DELIVER", "ANSWER"];
const DESCENT_S = 1.3;

/* Rising-particle columns in the gaps (local (−44, 30) and (44, −30)). */
const COLS = [
  { dx: -IA * 74, dy: -IB * 14 },
  { dx: IA * 74, dy: IB * 14 },
];

/* L00 source tiles */
const SOURCES = [
  { label: "SLACK", u: -50, v: -25, hit: true },
  { label: "DRIVE", u: 0, v: -25, hit: true },
  { label: "CRM", u: 50, v: -25, hit: true },
  { label: "EMAIL", u: -50, v: 25, hit: false },
  { label: "JIRA", u: 0, v: 25, hit: false },
  { label: "WIKI", u: 50, v: 25, hit: false },
];

/* L01 graph. Laid out in a screen-aligned frame (a: horizontal, b: depth)
   centred on the plate's port, so the graph is mirror-symmetric around the
   hole the query beam passes through. The port is the graph's hub. */
const G_NODES: [number, number][] = [
  [-72, -20], // 0 emea
  [72, -20],  // 1 revenue
  [-36, -54], // 2
  [36, -54],  // 3
  [-42, 36],  // 4
  [42, 36],   // 5
  [0, -78],   // 6 q3
  [0, 66],    // 7
];
/* Outer ring */
const G_EDGES: [number, number][] = [
  [6, 2], [2, 0], [0, 4], [4, 7], [7, 5], [5, 1], [1, 3], [3, 6],
];
/* Spokes from the hub (port) to the cardinal nodes */
const G_SPOKES = [0, 1, 6, 7];
const G_SPOKES_LIT = new Set([0, 1, 6]);
const G_PATH_NODES = new Set([0, 1, 6]);
const G_LABELS: Record<number, string> = { 0: "emea", 6: "q3", 1: "revenue" };

/* Screen offset of a point in the plate's screen-aligned (a, b) frame. */
const flat = (a: number, b: number) => ({ x: IA * Math.SQRT2 * a, y: IB * Math.SQRT2 * b });

/* L03 aliases → canonical */
const ALIASES = [
  { label: "bookings", u: -46, v: -42 },
  { label: "sales", u: -46, v: 0 },
  { label: "ARR", u: -46, v: 42 },
];
const CANON = { label: "revenue", u: 44, v: 0 };

/* L04 context window lines */
const DOC_LINES = [
  { v: -30, len: 92, keep: true },
  { v: -18, len: 70, keep: false },
  { v: -6, len: 96, keep: true },
  { v: 6, len: 52, keep: false },
  { v: 18, len: 84, keep: true },
  { v: 30, len: 60, keep: false },
];

/* ── Plate content (drawn in local iso coords) ────────────────────────────── */

const ns = { vectorEffect: "non-scaling-stroke" as const };

function PlateContent({ kind, lit, reduce }: { kind: LayerKind; lit: boolean; reduce: boolean }) {
  const t = { transition: "fill 0.4s, stroke 0.4s, opacity 0.4s" };
  switch (kind) {
    case "connect":
      return (
        <>
          {SOURCES.map((s) => {
            const on = lit && s.hit;
            return (
              <g key={s.label}>
                <rect
                  x={s.u - 20} y={s.v - 18} width="40" height="36" rx="3"
                  {...ns} strokeWidth="1"
                  style={{ ...t, fill: on ? "rgba(180,83,9,0.12)" : "#FFFFFF", stroke: on ? AMBER : "#E4D9BC" }}
                />
                <motion.circle
                  cx={s.u + 13} cy={s.v + 11} r="2"
                  style={{ ...t, fill: on ? AMBER : "#A8A29E" }}
                  animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8 + s.u / 100, repeat: Infinity }}
                />
              </g>
            );
          })}
        </>
      );
    case "model":
      return (
        <g transform="rotate(-45)">
          {G_EDGES.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={G_NODES[a][0]} y1={G_NODES[a][1]} x2={G_NODES[b][0]} y2={G_NODES[b][1]}
              {...ns} strokeWidth="1" stroke="#E4D9BC"
            />
          ))}
          {G_SPOKES.map((n) => {
            const [a, b] = G_NODES[n];
            const d = Math.hypot(a, b);
            const on = lit && G_SPOKES_LIT.has(n);
            return (
              <line
                key={`spoke-${n}`}
                x1={(a / d) * 13} y1={(b / d) * 13} x2={a} y2={b}
                {...ns} strokeWidth={on ? 1.6 : 1}
                style={{ ...t, stroke: on ? AMBER : "#E4D9BC" }}
              />
            );
          })}
          {/* Hub ring around the port */}
          <circle cx="0" cy="0" r="13" fill="none" {...ns} strokeWidth="1" strokeDasharray="2 2.5"
            style={{ ...t, stroke: lit ? AMBER : "#E4C090" }} />
          {G_NODES.map(([a, b], i) => {
            const on = lit && G_PATH_NODES.has(i);
            return (
              <circle
                key={i} cx={a} cy={b} r={on ? 5.5 : 4.2} {...ns} strokeWidth="1.2"
                style={{ ...t, fill: on ? AMBER : "#FFFFFF", stroke: on ? AMBER : "#E4C090" }}
              />
            );
          })}
        </g>
      );
    case "compute":
      return (
        <g transform="rotate(-45)">
          <circle cx="-20" cy="0" r="34" {...ns} strokeWidth="1.2"
            style={{ ...t, fill: "rgba(228,192,144,0.14)", stroke: lit ? AMBER : "#E4C090" }} />
          <circle cx="20" cy="0" r="34" {...ns} strokeWidth="1.2"
            style={{ ...t, fill: "rgba(228,192,144,0.14)", stroke: lit ? AMBER : "#E4C090" }} />
          <motion.circle
            cx="20" cy="0" r="34" clipPath="url(#ksClipA)" fill={AMBER}
            initial={false}
            animate={{ opacity: lit ? (reduce ? 0.4 : [0.28, 0.5, 0.28]) : 0.07 }}
            transition={lit && !reduce ? { duration: 1.6, repeat: Infinity } : { duration: 0.4 }}
          />
          {/* Rank funnel: candidates narrowing, centred under the lens */}
          {[96, 70, 46, 22].map((w, i) => (
            <rect
              key={w} x={-w / 2} y={39 + i * 9} width={w} height="6" rx="2"
              style={{ ...t, fill: i === 3 && lit ? AMBER : i === 3 ? "#E4C090" : "#EFE6D6" }}
            />
          ))}
        </g>
      );
    case "resolve":
      return (
        <>
          {ALIASES.map((a) => (
            <line
              key={`l-${a.label}`}
              x1={a.u + 15} y1={a.v} x2={CANON.u - 20} y2={CANON.v}
              {...ns} strokeWidth={lit ? 1.4 : 1} strokeDasharray={lit ? undefined : "3 3"}
              style={{ ...t, stroke: lit ? AMBER : "#E4C090" }}
            />
          ))}
          {ALIASES.map((a) => (
            <rect
              key={a.label} x={a.u - 15} y={a.v - 12} width="30" height="24" rx="3" {...ns} strokeWidth="1"
              style={{ ...t, fill: "#FFFFFF", stroke: lit ? "#E4C090" : "#E4D9BC" }}
            />
          ))}
          <rect
            x={CANON.u - 20} y={CANON.v - 16} width="40" height="32" rx="4" {...ns} strokeWidth="1.4"
            style={{ ...t, fill: lit ? "rgba(180,83,9,0.14)" : "#FFFFFF", stroke: lit ? AMBER : "#E4C090" }}
          />
        </>
      );
    case "deliver":
      return (
        <>
          <rect x="-58" y="-44" width="116" height="88" rx="4" fill="#FFFFFF" {...ns} strokeWidth="1"
            style={{ ...t, stroke: lit ? "#E4C090" : "#E4D9BC" }} />
          {DOC_LINES.map((l) => (
            <g key={l.v}>
              <rect
                x="-48" y={l.v - 2} width={l.len} height="4" rx="1.5"
                style={{
                  ...t,
                  fill: lit && l.keep ? AMBER : "#E4D9BC",
                  opacity: lit && !l.keep ? 0.35 : 1,
                }}
              />
              {l.keep && (
                <circle cx={-48 + l.len + 6} cy={l.v} r="2.4"
                  style={{ ...t, fill: AMBER, opacity: lit ? 1 : 0 }} />
              )}
            </g>
          ))}
        </>
      );
  }
}

/** Flat, readable screen-space labels projected onto plate features. */
function PlateLabels({ kind, lit, cy }: { kind: LayerKind; lit: boolean; cy: number }) {
  const t = { transition: "fill 0.4s, opacity 0.4s" };
  switch (kind) {
    case "connect":
      return (
        <>
          {SOURCES.map((s) => {
            const p = iso(s.u, s.v);
            const on = lit && s.hit;
            return (
              <text key={s.label} x={CX + p.x} y={cy + p.y + 2.8} textAnchor="middle"
                fontSize="7.5" fontFamily={MONO} fontWeight="600" letterSpacing="1"
                style={{ ...t, fill: on ? AMBER : "#78716C" }}>
                {s.label}
              </text>
            );
          })}
        </>
      );
    case "model":
      return (
        <>
          {Object.entries(G_LABELS).map(([k, label]) => {
            const [a, b] = G_NODES[Number(k)];
            const p = flat(a, b);
            /* The back node's label sits beside it so the plate above can't hide it */
            const side = a === 0;
            return (
              <text key={label} x={CX + p.x + (side ? 9 : 0)} y={cy + p.y + (side ? 2.5 : -9)}
                textAnchor={side ? "start" : "middle"}
                fontSize="7" fontFamily={MONO} fontWeight="600" letterSpacing="0.5"
                style={{ ...t, fill: AMBER, opacity: lit ? 1 : 0 }}>
                {label}
              </text>
            );
          })}
        </>
      );
    case "compute":
      return (
        <>
          {/* Operand labels inside each circle; the lens around the port is the ∩ */}
          {([["SCOPE", -36], ["RECALL", 36]] as const).map(([label, a]) => (
            <text key={label} x={CX + flat(a, 0).x} y={cy + 2.5} textAnchor="middle" fontSize="6.5" fontFamily={MONO}
              letterSpacing="1" fontWeight="600" style={{ ...t, fill: lit ? AMBER : "#A16207" }}>
              {label}
            </text>
          ))}
          <text x={CX} y={cy + 41} textAnchor="middle" fontSize="6.5" fontFamily={MONO} letterSpacing="1.2" fontWeight="600"
            style={{ ...t, fill: lit ? AMBER : "#A8A29E" }}>
            RANK ↓ 38
          </text>
        </>
      );
    case "resolve":
      return (
        <>
          {ALIASES.map((a) => {
            const p = iso(a.u, a.v);
            return (
              <text key={a.label} x={CX + p.x} y={cy + p.y + 2.6} textAnchor="middle"
                fontSize="7" fontFamily={MONO} letterSpacing="0.5" style={{ ...t, fill: "#78716C" }}>
                {a.label}
              </text>
            );
          })}
          {(() => {
            const p = iso(CANON.u, CANON.v);
            return (
              <text x={CX + p.x} y={cy + p.y + 3} textAnchor="middle" fontSize="8" fontFamily={MONO}
                fontWeight="700" letterSpacing="0.5" style={{ ...t, fill: lit ? AMBER : "#4A3B33" }}>
                {CANON.label}
              </text>
            );
          })()}
        </>
      );
    case "deliver":
      return null;
  }
}

/* ── Component ────────────────────────────────────────────────────────────── */

export default function ContextStack() {
  const reduce = useReducedMotionSafe();
  const [hovered, setHovered] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [chars, setChars] = useState(0);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const s = reduce ? 7 : step;
  const typed = reduce || step !== 0 ? QUERY.length : chars;

  /* Narrative loop: pauses while a layer is being inspected. */
  useEffect(() => {
    if (reduce || hovered !== null) return;
    const id = setTimeout(() => {
      if (step === 7) {
        setCycle((c) => c + 1);
        setStep(0);
      } else {
        setStep(step + 1);
      }
    }, STEP_MS[step]);
    return () => clearTimeout(id);
  }, [step, hovered, reduce]);

  /* Typewriter for the agent query. */
  useEffect(() => {
    if (reduce || step !== 0) return;
    setChars(0);
    const id = setInterval(() => setChars((c) => Math.min(c + 1, QUERY.length)), 42);
    return () => clearInterval(id);
  }, [step, cycle, reduce]);

  useEffect(() => () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  const enter = (i: number) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setHovered(i);
  };
  const leave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHovered(null), 140);
  };

  const isLit = (i: number) => s >= 2 && i <= s - 2;
  const offset = (i: number) =>
    hovered === null ? 0 : i > hovered ? -26 : i < hovered ? 26 : -4;
  const dimmed = (i: number) => hovered !== null && hovered !== i;

  const panelTop =
    hovered === null
      ? 50
      : Math.min(82, Math.max(18, ((LAYERS[hovered].y + offset(hovered)) / H) * 100));

  const descentDelay = (y: number) => ((y - CARD_BOTTOM) / (LAYERS[0].y - CARD_BOTTOM)) * DESCENT_S;
  const rowKey = s === 0 ? "compose" : s === 7 ? "answer" : `st${s}`;
  const spring = { type: "spring" as const, stiffness: 170, damping: 22 };

  const ctxTop = LAYERS[4].y - RY + 2;
  const ctxBottom = LAYERS[1].y + RY + T;
  const srcTop = LAYERS[0].y - RY + 4;
  const srcBottom = LAYERS[0].y + RY + T;

  return (
    <div className="relative w-full aspect-[8/9] select-none">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full block overflow-visible"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="The Alchemyst context layer as an exploded stack on top of your data sources: a knowledge graph, context arithmetic, semantic consensus and traceable context delivery. An agent query travels down through the stack and a traced answer rises back up."
      >
        <defs>
          <linearGradient id="ksTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FBF6EE" />
          </linearGradient>
          <radialGradient id="ksHalo">
            <stop offset="0%" stopColor={AMBER} stopOpacity="0.22" />
            <stop offset="60%" stopColor={AMBER} stopOpacity="0.07" />
            <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
          </radialGradient>
          <filter id="ksGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="ksBlur" x="-30%" y="-60%" width="160%" height="220%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <filter id="ksShadow" x="-10%" y="-20%" width="120%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="hsl(28 18% 25%)" floodOpacity="0.14" />
          </filter>
          <clipPath id="ksClipA">
            <circle cx="-20" cy="0" r="34" />
          </clipPath>
        </defs>

        {/* ── Top-right HUD: pipeline progress ── */}
        <g pointerEvents="none">
          <rect x={CALLOUT_X} y="33" width="7" height="7" fill={AMBER} />
          <text x={CALLOUT_X + 13} y="40" fill="#78716C" fontSize="8" fontFamily={MONO} letterSpacing="1.6" fontWeight="600">
            ALCHEMYST // CONTEXT_STACK
          </text>
          <text x={CALLOUT_X} y="57" fill="#A8A29E" fontSize="7.5" fontFamily={MONO} letterSpacing="1">
            cycle #{String(1042 + cycle).padStart(4, "0")} · p95 291ms
          </text>
          <text x="626" y="57" textAnchor="end" fill="#A8A29E" fontSize="7.5" fontFamily={MONO} letterSpacing="1">
            LIVE
          </text>
          <motion.circle
            cx="594" cy="54.5" r="2.4" fill={AMBER}
            animate={reduce ? undefined : { opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          {Array.from({ length: 7 }).map((_, k) => (
            <rect
              key={k} x={CALLOUT_X + k * 33} y="67" width="29" height="3" rx="1.5"
              style={{ fill: s >= k + 1 ? AMBER : "#E4D9BC", transition: "fill 0.3s" }}
            />
          ))}
          <text x={CALLOUT_X} y="88" fill={AMBER} fontSize="7.5" fontFamily={MONO} letterSpacing="1.6" fontWeight="600">
            PHASE · {PHASE[s]}
          </text>
        </g>

        {/* ── Left brackets: what is yours vs. what Alchemyst adds ── */}
        <g
          pointerEvents="none"
          opacity={hovered !== null ? 0.3 : 1}
          style={{ transition: "opacity 0.3s" }}
        >
          <path d={`M58,${ctxTop} H48 V${ctxBottom} H58`} fill="none" stroke={AMBER} strokeWidth="1" opacity="0.55" />
          <text
            x="38" y={(ctxTop + ctxBottom) / 2} textAnchor="middle"
            transform={`rotate(-90 38 ${(ctxTop + ctxBottom) / 2})`}
            fill={AMBER} fontSize="8" fontFamily={MONO} letterSpacing="3" fontWeight="600"
          >
            ALCHEMYST CONTEXT LAYER
          </text>
          <path d={`M58,${srcTop} H48 V${srcBottom} H58`} fill="none" stroke="#A8A29E" strokeWidth="1" opacity="0.7" />
          <text
            x="38" y={(srcTop + srcBottom) / 2} textAnchor="middle"
            transform={`rotate(-90 38 ${(srcTop + srcBottom) / 2})`}
            fill="#A8A29E" fontSize="8" fontFamily={MONO} letterSpacing="3" fontWeight="600"
          >
            YOUR DATA
          </text>
        </g>

        {/* ── Plates (bottom → top) with the gaps between them ── */}
        {LAYERS.map((layer, i) => {
          const cy = layer.y;
          const lit = isLit(i);
          const hov = hovered === i;
          const isSource = layer.id === "connect";
          const edge = lit || hov;
          const next = LAYERS[i + 1];

          return (
            <g key={layer.id}>
              <motion.g
                initial={false}
                animate={{ y: offset(i), opacity: dimmed(i) ? 0.38 : 1 }}
                transition={spring}
                onMouseEnter={() => enter(i)}
                onMouseLeave={leave}
                onFocus={() => enter(i)}
                onBlur={leave}
                onClick={() => setHovered(hovered === i ? null : i)}
                tabIndex={0}
                role="button"
                aria-label={`${layer.idx} ${layer.title}. ${layer.body}`}
                style={{ cursor: "pointer", outline: "none" }}
              >
                {/* Callout */}
                <g>
                  <line
                    x1={CX + RX + 6} y1={cy} x2={CALLOUT_X - 10} y2={cy} strokeWidth="1"
                    style={{ stroke: hov ? AMBER : lit ? "#E4C090" : "#E4D9BC", transition: "stroke 0.3s" }}
                  />
                  <circle cx={CX + RX + 6} cy={cy} r="2.2"
                    style={{ fill: edge ? AMBER : "#E4C090", transition: "fill 0.3s" }} />
                  <g opacity={hov ? 0 : 1} style={{ transition: "opacity 0.2s" }}>
                    <text x={CALLOUT_X} y={cy - 13} fontSize="9" fontFamily={MONO} letterSpacing="1.5" fontWeight="600"
                      style={{ fill: lit ? AMBER : "#A16207", transition: "fill 0.3s" }}>
                      {layer.idx} · {layer.verb}
                    </text>
                    <text x={CALLOUT_X} y={cy + 4} fill="#4A3B33" fontSize="14" fontFamily={SERIF} fontWeight="700">
                      {layer.title}
                    </text>
                    <text x={CALLOUT_X} y={cy + 18} fill="#78716C" fontSize="8.5" fontFamily={MONO} letterSpacing="0.4">
                      {layer.sub}
                    </text>
                  </g>
                  <rect x={CALLOUT_X - 14} y={cy - 30} width={W - CALLOUT_X + 8} height="60" fill="transparent" />
                </g>

                {/* Levitation */}
                <motion.g
                  animate={reduce ? undefined : { y: [0, -2.5, 0] }}
                  transition={{ duration: 4.2 + i * 0.45, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Zoom */}
                  <motion.g animate={{ scale: hov ? 1.07 : 1 }} transition={spring}>
                    {/* Ground shadow + halo */}
                    <ellipse cx={CX} cy={cy + 26} rx={RX * 0.9} ry={RY * 0.72} fill="#4A3B33" opacity="0.07" filter="url(#ksBlur)" />
                    <motion.ellipse
                      cx={CX} cy={cy + 4} rx={RX + 22} ry={RY + 18} fill="url(#ksHalo)"
                      initial={false}
                      animate={{ opacity: hov ? 1 : lit ? 0.4 : 0 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Side faces */}
                    <polygon
                      points={`${CX - RX},${cy} ${CX},${cy + RY} ${CX},${cy + RY + T} ${CX - RX},${cy + T}`}
                      fill={isSource ? "#E7E5E4" : "#F1E9DA"}
                    />
                    <polygon
                      points={`${CX},${cy + RY} ${CX + RX},${cy} ${CX + RX},${cy + T} ${CX},${cy + RY + T}`}
                      fill={isSource ? "#D6D3D1" : "#E4C090"}
                    />

                    {/* Top face */}
                    <polygon
                      points={`${CX},${cy - RY} ${CX + RX},${cy} ${CX},${cy + RY} ${CX - RX},${cy}`}
                      fill="url(#ksTop)"
                      strokeWidth={edge ? 1.4 : 1}
                      style={{ stroke: edge ? AMBER : "#E4D9BC", transition: "stroke 0.35s" }}
                    />
                    {/* Front edge light */}
                    <polyline
                      points={`${CX - RX},${cy} ${CX},${cy + RY} ${CX + RX},${cy}`}
                      fill="none" strokeWidth="1.6" strokeLinejoin="round"
                      style={{ stroke: AMBER, opacity: edge && !isSource ? 0.9 : 0, transition: "opacity 0.35s" }}
                    />

                    {/* Surface: grid, content, scan, port */}
                    <g transform={isoMatrix(cy)}>
                      <rect x={-HALF + 6} y={-HALF + 6} width={2 * HALF - 12} height={2 * HALF - 12} rx="4"
                        fill="none" stroke="#F1E9DA" strokeWidth="1" {...ns} />
                      {[-52, -26, 0, 26, 52].map((g) => (
                        <g key={g} stroke="#F6F0E4" strokeWidth="0.8">
                          <line x1={g} y1={-HALF + 6} x2={g} y2={HALF - 6} {...ns} />
                          <line x1={-HALF + 6} y1={g} x2={HALF - 6} y2={g} {...ns} />
                        </g>
                      ))}

                      <PlateContent kind={layer.id} lit={lit} reduce={reduce} />

                      {!reduce && (
                        <motion.line
                          x1={-HALF + 6} x2={-HALF + 6}
                          y1={-HALF + 6} y2={HALF - 6} stroke={AMBER} strokeWidth="1.2" {...ns}
                          initial={{ x1: -HALF + 6, x2: -HALF + 6, opacity: 0.18 }}
                          animate={{ x1: [-HALF + 6, HALF - 6], x2: [-HALF + 6, HALF - 6], opacity: lit || hov ? 0.5 : 0.18 }}
                          transition={{
                            x1: { duration: 4.4 + i * 0.6, repeat: Infinity, ease: "linear" },
                            x2: { duration: 4.4 + i * 0.6, repeat: Infinity, ease: "linear" },
                            opacity: { duration: 0.4 },
                          }}
                        />
                      )}

                      {/* Centre port where the query beam pierces the plate */}
                      <circle cx="0" cy="0" r="7" fill="#FDFBF7" strokeWidth="1.2" {...ns}
                        style={{ stroke: lit ? AMBER : "#E4C090", transition: "stroke 0.35s" }} />
                      <circle cx="0" cy="0" r="3"
                        style={{ fill: AMBER, opacity: lit ? 1 : 0, transition: "opacity 0.35s" }} />
                      {s === 1 && !reduce && (
                        <motion.circle
                          key={`flash-${cycle}`}
                          cx="0" cy="0" fill="none" stroke={AMBER} strokeWidth="1.5" {...ns}
                          initial={{ r: 4, opacity: 0 }}
                          animate={{ r: [4, 26], opacity: [0.95, 0] }}
                          transition={{ duration: 0.7, delay: descentDelay(cy), ease: "easeOut" }}
                        />
                      )}
                    </g>

                    <PlateLabels kind={layer.id} lit={lit} cy={cy} />

                    {/* Etched layer id */}
                    <text x={CX - RX + 16} y={cy + 2.5} fontSize="6.5" fontFamily={MONO} letterSpacing="0.8" fill="#A8A29E">
                      {layer.idx}
                    </text>
                  </motion.g>
                </motion.g>
              </motion.g>

              {/* Gap to the next plate: beams + rising data */}
              {next && (
                <g pointerEvents="none" opacity={hovered !== null ? 0.12 : 1} style={{ transition: "opacity 0.3s" }}>
                  <line x1={CX} y1={cy} x2={CX} y2={next.y} stroke="#E4C090" strokeWidth="1" strokeDasharray="2 5" />
                  {COLS.map((c, ci) => {
                    const on = isLit(i + 1);
                    const y1 = cy + c.dy;
                    const y2 = next.y + c.dy;
                    return (
                      <g key={ci}>
                        <line x1={CX + c.dx} y1={y1} x2={CX + c.dx} y2={y2} strokeWidth="1"
                          style={{ stroke: on ? "rgba(180,83,9,0.45)" : "#E4D9BC", transition: "stroke 0.35s" }} />
                        {!reduce && [0, 1].map((k) => (
                          <motion.circle
                            key={k} cx={CX + c.dx} r="2.2"
                            style={{ fill: on ? AMBER : "#E4C090", transition: "fill 0.35s" }}
                            filter={on ? "url(#ksGlow)" : undefined}
                            initial={{ cy: y1, opacity: 0 }}
                            animate={{ cy: [y1, y2], opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: k * 0.8 + ci * 0.4 + i * 0.15 }}
                          />
                        ))}
                      </g>
                    );
                  })}
                </g>
              )}
            </g>
          );
        })}

        {/* ── Top gap: L04 → agent ── */}
        <g pointerEvents="none" opacity={hovered !== null ? 0.2 : 1} style={{ transition: "opacity 0.3s" }}>
          <line x1={CX} y1={LAYERS[4].y} x2={CX} y2={CARD_BOTTOM} strokeWidth="1" strokeDasharray="2 5"
            style={{ stroke: s >= 6 ? AMBER : "#E4C090", transition: "stroke 0.35s" }} />
          {s === 7 && !reduce && (
            <motion.circle
              key={`ans-${cycle}`}
              cx={CX} r="3.5" fill={AMBER} filter="url(#ksGlow)"
              initial={{ cy: LAYERS[4].y, opacity: 1 }}
              animate={{ cy: CARD_BOTTOM, opacity: [1, 1, 0] }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
          )}
        </g>

        {/* ── Agent card ── */}
        <g pointerEvents="none">
          <g filter="url(#ksShadow)">
            <rect
              x={CX - 150} y={CARD_Y} width="300" height={CARD_H} rx="8" fill="#FFFFFF"
              strokeWidth={s === 7 ? 1.4 : 1}
              style={{ stroke: s === 7 ? AMBER : "#E4D9BC", transition: "stroke 0.35s" }}
            />
          </g>
          <rect x={CX - 138} y={CARD_Y + 12} width="46" height="17" rx="3"
            fill="rgba(180,83,9,0.1)" stroke="rgba(180,83,9,0.3)" strokeWidth="1" />
          <text x={CX - 115} y={CARD_Y + 24} textAnchor="middle" fill={AMBER} fontSize="8" fontFamily={MONO}
            fontWeight="700" letterSpacing="1.2">
            AGENT
          </text>
          <text x={CX - 82} y={CARD_Y + 25} fill="#4A3B33" fontSize="12" fontFamily={SERIF}>
            {QUERY.slice(0, typed)}
            {s === 0 && !reduce && <tspan className="animate-blink" fill={AMBER}>▍</tspan>}
          </text>
          <line x1={CX - 138} y1={CARD_Y + 38} x2={CX + 138} y2={CARD_Y + 38} stroke="#F1E9DA" strokeWidth="1" />

          <AnimatePresence mode="wait">
            <motion.g
              key={rowKey}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: EASE }}
            >
              {s === 7 ? (
                <>
                  <text x={CX - 138} y={CARD_Y + 60} fill={AMBER} fontSize="13" fontFamily={SERIF} fontWeight="700">
                    $4.2M ARR
                  </text>
                  <text x={CX - 50} y={CARD_Y + 59} fill="#78716C" fontSize="7.5" fontFamily={MONO} letterSpacing="0.3">
                    EMEA · Q3 · 3 sources · #A-4821
                  </text>
                  <circle cx={CX + 132} cy={CARD_Y + 56} r="7" fill={AMBER} />
                  <path
                    d={`M${CX + 128.5},${CARD_Y + 56} l2.4,2.4 l4.6,-4.8`}
                    fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                  />
                </>
              ) : (
                <>
                  <text x={CX - 138} y={CARD_Y + 59} fontSize="8.5" fontFamily={MONO} letterSpacing="0.5"
                    fill={s === 0 ? "#A8A29E" : "#A16207"}>
                    ▸ {STATUS[s]}
                  </text>
                  {s > 0 && !reduce && (
                    <motion.circle
                      cx={CX + 132} cy={CARD_Y + 56} r="5.5" fill="none" stroke={AMBER} strokeWidth="1.5"
                      strokeDasharray="20 20" strokeLinecap="round"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </>
              )}
            </motion.g>
          </AnimatePresence>
        </g>

        {/* ── Descent packet: the query piercing the stack ── */}
        {s === 1 && !reduce && (
          <g key={`desc-${cycle}`} pointerEvents="none">
            <motion.circle
              cx={CX} r="10" fill="rgba(180,83,9,0.16)"
              initial={{ cy: CARD_BOTTOM }} animate={{ cy: LAYERS[0].y }}
              transition={{ duration: DESCENT_S, ease: "linear" }}
            />
            <motion.circle
              cx={CX} r="3.6" fill={AMBER} filter="url(#ksGlow)"
              initial={{ cy: CARD_BOTTOM }} animate={{ cy: LAYERS[0].y }}
              transition={{ duration: DESCENT_S, ease: "linear" }}
            />
          </g>
        )}

        {/* ── Bottom strip ── */}
        <g pointerEvents="none">
          <line x1="16" y1="678" x2="626" y2="678" stroke="#E4D9BC" strokeWidth="1" />
          <text x="16" y="698" fill="#A8A29E" fontSize="7.5" fontFamily={MONO} letterSpacing="1.4">
            context_stack.live · 5 layers · 6 sources
          </text>
          <text x="626" y="698" textAnchor="end" fill="#A16207" fontSize="7.5" fontFamily={MONO} letterSpacing="1.4" fontWeight="600">
            HOVER A LAYER TO INSPECT
          </text>
        </g>
      </svg>

      {/* ── Detail panel ── */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            key={LAYERS[hovered].id}
            initial={{ opacity: 0, x: 14, y: "-50%" }}
            animate={{ opacity: 1, x: 0, y: "-50%" }}
            exit={{ opacity: 0, x: 8, y: "-50%" }}
            transition={{ duration: 0.25, ease: EASE }}
            onMouseEnter={() => enter(hovered)}
            onMouseLeave={leave}
            className="absolute right-0 z-10 w-[40%] min-w-[208px]"
            style={{ top: `${panelTop}%` }}
          >
            <div className="relative overflow-hidden rounded-lg border border-[#E4D9BC] bg-white/95 backdrop-blur-sm shadow-[var(--shadow-soft-lg)]">
              <div className="absolute inset-y-0 left-0 w-[2px] bg-[#B45309]" />
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#B45309]">
                    {LAYERS[hovered].idx} · {LAYERS[hovered].verb}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#A8A29E]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B45309] animate-pulse-slow" />
                    live
                  </span>
                </div>
                <h4 className="mt-2 text-[15px] font-bold leading-snug text-[#4A3B33]">
                  {LAYERS[hovered].title}
                </h4>
                <p className="mt-1.5 text-[11.5px] leading-[1.6] text-[#57534E]">
                  {LAYERS[hovered].body}
                </p>
                <dl className="mt-3 space-y-1.5 border-t border-[#F1E9DA] pt-3">
                  {LAYERS[hovered].stats.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-3">
                      <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#A8A29E]">{k}</dt>
                      <dd className="font-mono text-[11px] font-semibold tabular-nums text-[#4A3B33]">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-3 rounded-md border border-[#F1E9DA] bg-[#F8F4EE] px-2.5 py-1.5 font-mono text-[10px] text-[#57534E]">
                  <span className="text-[#B45309]">▸</span> {LAYERS[hovered].code}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
