"use client";

/* ── Sovereignty row: "the model is replaceable, your context isn't" ────────
 * A horizontal, isometric row in the ContextStack family, spread across the
 * full section width:
 *
 *   L01 MODELS    four model chips on one plate; the docked model is
 *                 hot-swapped on a loop (hover or tap a chip to dock it)
 *   L02 CONTEXT   the sovereign layer: nine institutional memory cells that
 *                 stay lit through every swap
 *   L03 AGENTS    four agents that never stop working (live task counts)
 *
 * Conduits carry context between the plates. When the model is swapped the
 * model conduit pauses for a beat while the context → agents conduit keeps
 * flowing: memory retained 100%, agent downtime 0s. Hovering a plate spreads
 * the row apart, zooms the plate and opens a detail panel beneath it.
 * Reduced motion renders a static, fully-resolved state. */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  AMBER, DetailPanel, EASE, FooterStrip, HudHeader, IA, IB, IsoDefs, MONO, Plate, SERIF, T_FADE,
  explodeOffsetX, iso, ns, useInspect, useReducedMotionSafe, type PanelData,
} from "./iso/kit";

const P = "sv";
const W = 1200;
const H = 540;
const CY = 236;

const MODELS = [
  { name: "GPT", display: "GPT", vendor: "openai", id: "gpt", u: -38, v: -32 },
  { name: "GEMINI", display: "Gemini", vendor: "google", id: "gemini", u: 38, v: -32 },
  { name: "CLAUDE", display: "Claude", vendor: "anthropic", id: "claude", u: -38, v: 32 },
  { name: "NEXT MODEL", display: "Next model", vendor: "any provider", id: "next", u: 38, v: 32 },
];

const CELLS = [
  { label: "accounts", u: -52, v: -52 }, { label: "deals", u: 0, v: -52 }, { label: "policies", u: 52, v: -52 },
  { label: "people", u: -52, v: 0 }, { label: "revenue", u: 0, v: 0 }, { label: "tickets", u: 52, v: 0 },
  { label: "pricing", u: -52, v: 52 }, { label: "docs", u: 0, v: 52 }, { label: "decisions", u: 52, v: 52 },
];

const AGENTS = [
  { name: "SALES", u: -38, v: -32, base: 1284, inc: 3 },
  { name: "SUPPORT", u: 38, v: -32, base: 3920, inc: 7 },
  { name: "OPS", u: -38, v: 32, base: 812, inc: 2 },
  { name: "RESEARCH", u: 38, v: 32, base: 356, inc: 1 },
];

/* Ordered left → right. */
const PLATES = [
  { id: "models", cx: 192, half: 86, thick: 9, idx: "L01", verb: "ROUTE", title: "Any model", sub: "hover a chip to dock it" },
  { id: "context", cx: 600, half: 104, thick: 11, idx: "L02", verb: "PERSIST", title: "Sovereign context layer", sub: "owned by you · model-agnostic" },
  { id: "agents", cx: 1008, half: 86, thick: 9, idx: "L03", verb: "OPERATE", title: "Agents that operate", sub: "sales · support · ops · research" },
] as const;

const rx = (half: number) => IA * 2 * half;
const ry = (half: number) => IB * 2 * half;

/* Conduits between plate corners. */
const CONDUITS = [
  { key: "model", x1: PLATES[0].cx + rx(PLATES[0].half), x2: PLATES[1].cx - rx(PLATES[1].half), label: "CONTEXT ⇄ MODEL" },
  { key: "agents", x1: PLATES[1].cx + rx(PLATES[1].half), x2: PLATES[2].cx - rx(PLATES[2].half), label: "CONTEXT → AGENTS" },
];

export default function ContextSovereigntyFlow() {
  const reduce = useReducedMotionSafe();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(wrapRef, { margin: "-10% 0px" });
  const { hovered, enter, leave, toggle } = useInspect();
  const [modelIdx, setModelIdx] = useState(0);
  const [chipHover, setChipHover] = useState<number | null>(null);
  const [swapping, setSwapping] = useState(false);
  const [swaps, setSwaps] = useState(0);
  const [tick, setTick] = useState(0);
  const prevModel = useRef(0);

  const model = MODELS[modelIdx];

  /* Auto hot-swap loop. */
  useEffect(() => {
    if (reduce || !inView || hovered !== null || chipHover !== null) return;
    const id = setTimeout(() => setModelIdx((i) => (i + 1) % MODELS.length), 4600);
    return () => clearTimeout(id);
  }, [modelIdx, hovered, chipHover, reduce, inView]);

  /* Swap bookkeeping. */
  useEffect(() => {
    if (prevModel.current === modelIdx) return;
    prevModel.current = modelIdx;
    setSwaps((s) => s + 1);
    setSwapping(true);
    const id = setTimeout(() => setSwapping(false), 750);
    return () => clearTimeout(id);
  }, [modelIdx]);

  /* Agents keep working. */
  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => setTick((t) => t + 1), 900);
    return () => clearInterval(id);
  }, [reduce, inView]);

  const dock = (k: number) => {
    setChipHover(k);
    setModelIdx(k);
  };

  const totalTasks = AGENTS.reduce((sum, a) => sum + a.base + tick * a.inc, 0);

  const panels: PanelData[] = [
    {
      key: "models", eyebrow: "L01 · ROUTE", title: "Any model",
      body: "Frontier or open-weight, any model docks into the same context. Swap it or route per task without resetting a single memory.",
      stats: [["Docked", model.display], ["Swap time", "< 1s"], ["Memory reset", "none"]],
      code: `ctx.route({ model: "${model.id}" })`,
    },
    {
      key: "context", eyebrow: "L02 · PERSIST", title: "Sovereign context layer",
      body: "Your institutional context lives here: owned by you, portable, and independent of any model vendor. It survives every swap.",
      stats: [["Retained", "100%"], ["Owner", "you"], ["Lock-in", "none"]],
      code: 'ctx.export({ format: "open" })',
    },
    {
      key: "agents", eyebrow: "L03 · OPERATE", title: "Agents that operate",
      body: "Sales, support, ops and research agents keep running on the same context while the model underneath them changes.",
      stats: [["Agents", "4 live"], ["Downtime", "0.0s"], ["Tasks", totalTasks.toLocaleString("en-US")]],
      code: "agent.run({ context: ctx })",
    },
  ];

  const bits = (id: (typeof PLATES)[number]["id"], cx: number) => {
    if (id === "models") {
      return {
        surface: (
          <>
            {MODELS.map((m, k) => {
              const on = k === modelIdx;
              return (
                <g
                  key={m.id}
                  onMouseEnter={() => dock(k)}
                  onMouseLeave={() => setChipHover(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    dock(k);
                  }}
                >
                  <rect
                    x={m.u - 30} y={m.v - 22} width="60" height="44" rx="4" strokeWidth={on ? 1.5 : 1} {...ns}
                    style={{ ...T_FADE, fill: on ? "rgba(180,83,9,0.14)" : "#FFFFFF", stroke: on ? AMBER : "#E4C090" }}
                  />
                  {on && !reduce && (
                    <motion.rect
                      key={`ring-${swaps}`}
                      x={m.u - 30} y={m.v - 22} width="60" height="44" rx="4" fill="none" stroke={AMBER} strokeWidth="1.4" {...ns}
                      initial={{ scale: 1, opacity: 0.9 }}
                      animate={{ scale: 1.55, opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  )}
                </g>
              );
            })}
          </>
        ),
        labels: (
          <>
            {MODELS.map((m, k) => {
              const q = iso(m.u, m.v);
              const on = k === modelIdx;
              return (
                <g key={m.id} pointerEvents="none">
                  <text x={cx + q.x} y={CY + q.y} textAnchor="middle" fontSize="7.5" fontFamily={MONO} fontWeight="700" letterSpacing="1"
                    style={{ ...T_FADE, fill: on ? AMBER : "#4A3B33" }}>
                    {m.name}
                  </text>
                  <text x={cx + q.x} y={CY + q.y + 9} textAnchor="middle" fontSize="6.2" fontFamily={MONO} letterSpacing="0.4"
                    style={{ ...T_FADE, fill: on ? "#A16207" : "#78716C" }}>
                    {on ? "docked" : m.vendor}
                  </text>
                </g>
              );
            })}
          </>
        ),
      };
    }
    if (id === "context") {
      return {
        surface: (
          <>
            {CELLS.map((c, k) => (
              <motion.rect
                key={c.label} x={c.u - 21} y={c.v - 21} width="42" height="42" rx="4" strokeWidth="1" {...ns}
                fill={c.label === "revenue" ? "rgba(180,83,9,0.16)" : "rgba(180,83,9,0.07)"}
                stroke={c.label === "revenue" ? AMBER : "#E4C090"}
                animate={reduce ? undefined : { opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: k * 0.18, ease: "easeInOut" }}
              />
            ))}
          </>
        ),
        labels: (
          <>
            {CELLS.map((c) => {
              const q = iso(c.u, c.v);
              const key = c.label === "revenue";
              return (
                <text key={c.label} x={cx + q.x} y={CY + q.y + 2.6} textAnchor="middle" fontSize="7" fontFamily={MONO}
                  letterSpacing="0.5" fontWeight={key ? 700 : 500} fill={key ? AMBER : "#78716C"}>
                  {c.label}
                </text>
              );
            })}
          </>
        ),
      };
    }
    return {
      surface: (
        <>
          {AGENTS.map((a, k) => (
            <g key={a.name}>
              <rect x={a.u - 30} y={a.v - 22} width="60" height="44" rx="4" fill="#FFFFFF" stroke="#E4C090" strokeWidth="1" {...ns} />
              <rect x={a.u - 22} y={a.v + 12} width="44" height="4" rx="1.5" fill="#F1E9DA" />
              <motion.rect
                x={a.u - 22} y={a.v + 12} height="4" rx="1.5" fill={AMBER}
                initial={{ width: reduce ? 32 : 6 }}
                animate={reduce ? undefined : { width: [6, 44, 6] }}
                transition={{ duration: 2.2 + k * 0.35, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx={a.u + 22} cy={a.v - 13} r="2.4" fill={AMBER}
                animate={reduce ? undefined : { opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.2 + k * 0.2, repeat: Infinity }}
              />
            </g>
          ))}
        </>
      ),
      labels: (
        <>
          {AGENTS.map((a) => {
            const q = iso(a.u, a.v - 5);
            return (
              <g key={a.name}>
                <text x={cx + q.x} y={CY + q.y} textAnchor="middle" fill="#4A3B33" fontSize="7.5" fontFamily={MONO} fontWeight="700"
                  letterSpacing="1">
                  {a.name}
                </text>
                <text x={cx + q.x} y={CY + q.y + 9} textAnchor="middle" fill="#A16207" fontSize="6.2" fontFamily={MONO} letterSpacing="0.3">
                  {(a.base + tick * a.inc).toLocaleString("en-US")} tasks
                </text>
              </g>
            );
          })}
        </>
      ),
    };
  };

  const hp = hovered === null ? null : PLATES[hovered];
  const panelLeft = hp ? (hp.cx / W) * 100 : 50;
  const panelTop = hp ? ((CY + ry(hp.half) + hp.thick + 12) / H) * 100 : 50;

  return (
    <div className="w-full">
      <div className="flex justify-center mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-400 font-medium">
          One sovereign context layer, any model, agents that operate
        </p>
      </div>

      <div className="w-full overflow-x-auto lg:overflow-visible">
        <div ref={wrapRef} className="relative w-full min-w-[860px] aspect-[20/9] select-none">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-full block overflow-visible"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Any model plugs into one sovereign context layer, which feeds agents that run operations. Models are hot-swapped while the context layer and the agents keep running without interruption."
          >
            <defs>
              <IsoDefs p={P} />
            </defs>

            <HudHeader
              x={24} right={330} title="ALCHEMYST // CONTEXT_SOVEREIGNTY"
              meta={`hot-swaps ${String(swaps).padStart(2, "0")} · memory reset 0`}
              segments={MODELS.length}
              segmentFill={(k) => (k === modelIdx ? AMBER : "#E4D9BC")}
              phase={swapping ? `HOT-SWAP → ${model.name}` : `OPERATING ON ${model.name}`}
              reduce={reduce}
            />

            {/* ── Active model readout (top right) ── */}
            <g pointerEvents="none">
              <text x="1176" y="40" textAnchor="end" fill="#A8A29E" fontSize="8" fontFamily={MONO} letterSpacing="2" fontWeight="600">
                ACTIVE MODEL
              </text>
              <AnimatePresence mode="wait" initial={false}>
                <motion.g
                  key={model.id}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <text x="1176" y="68" textAnchor="end" fill="#4A3B33" fontSize="20" fontFamily={SERIF} fontWeight="700">
                    {model.display}
                  </text>
                  <text x="1176" y="84" textAnchor="end" fill={AMBER} fontSize="7.5" fontFamily={MONO} letterSpacing="1.4">
                    {model.vendor.toUpperCase()} · CONTEXT UNCHANGED
                  </text>
                </motion.g>
              </AnimatePresence>
            </g>

            {/* ── Conduits (drawn first, plates sit on top of their ends) ── */}
            {CONDUITS.map((c, ci) => {
              const on = ci === 1 || !swapping;
              const dim = hovered !== null;
              return (
                <g key={c.key} pointerEvents="none" opacity={dim ? 0.12 : 1} style={{ transition: "opacity 0.3s" }}>
                  <text x={(c.x1 + c.x2) / 2} y={CY - 20} textAnchor="middle" fontSize="7" fontFamily={MONO} letterSpacing="1.4"
                    fontWeight="600" style={{ ...T_FADE, fill: on ? "#A16207" : AMBER }}>
                    {ci === 0 && swapping ? "HOT-SWAP" : c.label}
                  </text>
                  {[-7, 7].map((dy) => (
                    <line key={dy} x1={c.x1} y1={CY + dy} x2={c.x2} y2={CY + dy} strokeWidth="1.2"
                      style={{ stroke: on ? "rgba(180,83,9,0.5)" : "#E4D9BC", transition: "stroke 0.35s" }} />
                  ))}
                  <line x1={c.x1} y1={CY} x2={c.x2} y2={CY} stroke="#E4C090" strokeWidth="1" strokeDasharray="2 5" />
                  {[c.x1, c.x2].map((x) => (
                    <rect key={x} x={x - 3} y={CY - 12} width="6" height="24" rx="2" fill="#FDFBF7" strokeWidth="1"
                      style={{ stroke: on ? AMBER : "#E4C090", transition: "stroke 0.35s" }} />
                  ))}
                  {on && !reduce && [0, 1].map((k) => (
                    <g key={k}>
                      {/* Top rail: context outwards · bottom rail: back into context */}
                      <motion.circle
                        cy={CY - 7} r="2.4" fill={AMBER} filter={`url(#${P}Glow)`}
                        initial={{ cx: ci === 0 ? c.x2 : c.x1, opacity: 0 }}
                        animate={{ cx: ci === 0 ? [c.x2, c.x1] : [c.x1, c.x2], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.3, repeat: Infinity, ease: "linear", delay: k * 0.65 }}
                      />
                      <motion.circle
                        cy={CY + 7} r="2" fill="#E4C090"
                        initial={{ cx: ci === 0 ? c.x1 : c.x2, opacity: 0 }}
                        animate={{ cx: ci === 0 ? [c.x1, c.x2] : [c.x2, c.x1], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.7, repeat: Infinity, ease: "linear", delay: 0.3 + k * 0.85 }}
                      />
                    </g>
                  ))}
                </g>
              );
            })}

            {/* ── Plates ── */}
            {PLATES.map((pl, i) => {
              const { surface, labels } = bits(pl.id, pl.cx);
              const lit = pl.id === "models" ? !swapping : true;
              return (
                <Plate
                  key={pl.id}
                  p={P} index={i} cx={pl.cx} cy={CY} half={pl.half} thick={pl.thick}
                  tone="context" lit={lit} hovered={hovered === i}
                  dimmed={hovered !== null && hovered !== i}
                  offset={hovered === i ? -8 : 0}
                  offsetX={explodeOffsetX(i, hovered, 34)}
                  reduce={reduce}
                  callout={{ x: 0, idx: pl.idx, verb: pl.verb, title: pl.title, sub: pl.sub, width: 300 }}
                  calloutPlacement="below"
                  ariaLabel={`${pl.idx} ${pl.title}. ${panels[i].body}`}
                  onEnter={() => enter(i)} onLeave={leave} onToggle={() => toggle(i)}
                  surface={surface} labels={labels}
                  port={pl.id === "agents"} id={pl.idx}
                />
              );
            })}

            {/* ── Continuity readouts ── */}
            <g pointerEvents="none" opacity={hovered !== null ? 0.25 : 1} style={{ transition: "opacity 0.3s" }}>
              {[
                { k: "memory retained", v: "100%", bar: 1 },
                { k: "agent downtime", v: "0.0s", bar: 0 },
                { k: "hot-swaps", v: String(swaps), bar: Math.min(1, swaps / 8) },
                { k: "context resets", v: "never", bar: 0 },
              ].map((r, k) => {
                const x = 24 + k * 294;
                return (
                  <g key={r.k}>
                    <text x={x} y="432" fill="#78716C" fontSize="8" fontFamily={MONO} letterSpacing="1.2">
                      {r.k.toUpperCase()}
                    </text>
                    <text x={x + 270} y="432" textAnchor="end" fill="#4A3B33" fontSize="11" fontFamily={MONO} fontWeight="700">
                      {r.v}
                    </text>
                    <rect x={x} y="442" width="270" height="3" rx="1.5" fill="#F1E9DA" />
                    <rect x={x} y="442" width={270 * r.bar} height="3" rx="1.5" fill={AMBER} style={{ transition: "width 0.4s" }} />
                  </g>
                );
              })}
            </g>

            <FooterStrip
              y={484} x1={24} x2={1176}
              left="context_sovereignty.live · 4 models · 1 context layer · 4 agents"
              right="HOVER A LAYER OR DOCK A MODEL"
            />
          </svg>

          <DetailPanel
            data={hovered === null ? null : panels[hovered]}
            anchor="center" left={panelLeft} top={panelTop}
            className="w-[25%] min-w-[250px]"
            onEnter={() => hovered !== null && enter(hovered)}
            onLeave={leave}
          />
        </div>
      </div>
    </div>
  );
}
