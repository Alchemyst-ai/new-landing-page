"use client";

// SemanticDriftFlow: scroll-narrated isometric drift stack for /thesis.
// Scrolling advances time from month 0 to month 12:
//   L00 BUSINESS REALITY  entities drift and change meaning (revenue becomes
//                         ARR, EMEA splits, pricing moves to v3)
//   L01 ONTOLOGY SNAPSHOT frozen at M0; tethers to reality stretch, turn red
//                         and snap as definitions diverge
//   L02 AI AGENT          keeps reading the snapshot as truth, so its answer
//                         goes stale while its confidence stays high
// A drift meter, timeline and consensus state track the damage. Hovering a
// plate explodes the stack and opens a detail panel. Reduced motion renders
// the final (month 12) state.

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  AMBER, DetailPanel, FooterStrip, GapParticles, HudHeader, IA, IB, IsoDefs, MONO, Plate, RED,
  SERIF, T_FADE, explodeOffset, iso, ns, useInspect, useReducedMotionSafe, type PanelData,
} from "./iso/kit";

const P = "sd";
const W = 960;
const H = 640;
const CX = 460;
const HALF = 96;
const RX = IA * 2 * HALF;
const RY = IB * 2 * HALF;
const T = 10;
const CALLOUT_X = 690;
const CARD_Y = 26;
const CARD_H = 74;
const COL_X = 24;
const COL_R = 250;

const clamp = (x: number) => Math.max(0, Math.min(1, x));

const ENTITIES = [
  { key: "revenue", u: -46, v: -40, d0: "= bookings", d1: "= ARR", at: 0.3, du: 0, dv: 24 },
  { key: "EMEA team", u: 46, v: -40, d0: "one region", d1: "split N / S", at: 0.52, du: 16, dv: 8 },
  { key: "pricing", u: -46, v: 40, d0: "v1", d1: "v3", at: 0.72, du: -16, dv: 14 },
  { key: "customer", u: 46, v: 40, d0: "= account", d1: "= account", at: 9, du: 0, dv: 0 },
];

/* Ordered bottom → top. */
const LAYERS = [
  { id: "reality", y: 488, idx: "L00", verb: "EVOLVE", title: "Business reality", sub: "teams · terms · pricing keep moving" },
  { id: "ontology", y: 338, idx: "L01", verb: "SNAPSHOT", title: "Ontology snapshot", sub: "static · written once at M0" },
  { id: "agent", y: 188, idx: "L02", verb: "CONSUME", title: "AI agent", sub: "consumes the graph as truth" },
] as const;

const COLS = [
  { dx: -IA * 74, dy: -IB * 14 },
  { dx: IA * 74, dy: IB * 14 },
];

export default function SemanticDriftFlow() {
  const reduce = useReducedMotionSafe();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { hovered, enter, leave, toggle } = useInspect();
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 0.85", "end 0.4"] });
  const [tRaw, setT] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setT(Math.round(clamp(v) * 200) / 200));

  const t = reduce ? 1 : tRaw;
  const month = Math.round(t * 12);
  const prog = ENTITIES.map((e) => clamp((t - (e.at - 0.15)) / 0.3));
  const changedFlags = prog.map((e) => e > 0.5);
  const changed = changedFlags.filter(Boolean).length;
  const inSync = ENTITIES.length - changed;
  const drift = Math.round((prog.reduce((a, b) => a + b, 0) / ENTITIES.length) * 100);
  const accuracy = 100 - drift;
  const stale = changedFlags[0];
  const state = changed === 0 ? "Aligned" : changed < 3 ? "Diverging" : "Broken";
  const stateColor = changed === 0 ? AMBER : changed < 3 ? "#A16207" : RED;

  const panels: PanelData[] = [
    {
      key: "reality", eyebrow: "L00 · EVOLVE", title: "Business reality",
      body: "Teams reorganise, pricing changes and words shift meaning. Reality keeps moving long after the snapshot was taken.",
      stats: [["Month", `M${month}`], ["Changes", String(changed)], ["In sync", `${inSync}/4`]],
      code: "reality.diff(snapshot)",
    },
    {
      key: "ontology", eyebrow: "L01 · SNAPSHOT", title: "Ontology snapshot",
      body: "Captured once at write time and never updated. Every definition stays frozen at month zero while the business moves on.",
      stats: [["Written", "M0"], ["Updated", "never"], ["Stale terms", String(changed)]],
      code: 'graph.snapshot({ at: "M0" })',
      accent: changed > 0 ? RED : AMBER,
    },
    {
      key: "agent", eyebrow: "L02 · CONSUME", title: "AI agent",
      body: "The agent treats the ontology as ground truth. It answers fluently and confidently, even after that truth has expired.",
      stats: [["Reads", "ontology @ M0"], ["Confidence", "high"], ["Accuracy", `${accuracy}%`]],
      code: 'agent.ask("Q3 revenue?")',
      accent: stale ? RED : AMBER,
    },
  ];

  const panelTop =
    hovered === null ? 50 : Math.min(80, Math.max(20, ((LAYERS[hovered].y + explodeOffset(hovered, hovered)) / H) * 100));

  const tile = (u: number, v: number, w = 28, h = 18) => ({ x: u - w, y: v - h, width: w * 2, height: h * 2 });

  const plateBits = (id: (typeof LAYERS)[number]["id"], cy: number) => {
    if (id === "reality") {
      return {
        surface: (
          <>
            {ENTITIES.map((e, k) => {
              const p = prog[k];
              const on = changedFlags[k];
              return (
                <g key={e.key}>
                  {p > 0.02 && (
                    <rect {...tile(e.u, e.v)} rx="3" fill="none" stroke="#D6D3D1" strokeWidth="1" strokeDasharray="3 3" {...ns} />
                  )}
                  <rect
                    {...tile(e.u + e.du * p, e.v + e.dv * p)} rx="3" strokeWidth={on ? 1.4 : 1} {...ns}
                    style={{ ...T_FADE, fill: on ? "rgba(180,83,9,0.12)" : "#FFFFFF", stroke: on ? AMBER : "#E4D9BC" }}
                  />
                </g>
              );
            })}
          </>
        ),
        labels: (
          <>
            {ENTITIES.map((e, k) => {
              const q = iso(e.u + e.du * prog[k], e.v + e.dv * prog[k]);
              const on = changedFlags[k];
              return (
                <g key={e.key}>
                  <text x={CX + q.x} y={cy + q.y - 1} textAnchor="middle" fill="#4A3B33" fontSize="7.5" fontFamily={MONO}
                    fontWeight="700" letterSpacing="0.5">
                    {e.key}
                  </text>
                  <text x={CX + q.x} y={cy + q.y + 8} textAnchor="middle" fontSize="6.5" fontFamily={MONO} letterSpacing="0.3"
                    style={{ ...T_FADE, fill: on ? AMBER : "#78716C" }}>
                    {on ? e.d1 : e.d0}
                  </text>
                </g>
              );
            })}
          </>
        ),
      };
    }
    if (id === "ontology") {
      return {
        surface: (
          <>
            {ENTITIES.map((e, k) => {
              const bad = changedFlags[k];
              return (
                <rect
                  key={e.key} {...tile(e.u, e.v)} rx="3" strokeWidth={bad ? 1.4 : 1} {...ns}
                  style={{ ...T_FADE, fill: bad ? "rgba(153,27,27,0.08)" : "#FFFFFF", stroke: bad ? RED : "#E4C090" }}
                />
              );
            })}
          </>
        ),
        labels: (
          <>
            {ENTITIES.map((e, k) => {
              const q = iso(e.u, e.v);
              const bad = changedFlags[k];
              return (
                <g key={e.key}>
                  <text x={CX + q.x} y={cy + q.y - 1} textAnchor="middle" fill="#4A3B33" fontSize="7.5" fontFamily={MONO}
                    fontWeight="700" letterSpacing="0.5">
                    {e.key}
                  </text>
                  <text x={CX + q.x} y={cy + q.y + 8} textAnchor="middle" fontSize="6.5" fontFamily={MONO} letterSpacing="0.3"
                    style={{ ...T_FADE, fill: bad ? RED : "#78716C" }}>
                    {e.d0}
                  </text>
                </g>
              );
            })}
            <text x={CX} y={cy + RY - 12} textAnchor="middle" fill="#A8A29E" fontSize="6.5" fontFamily={MONO} letterSpacing="1.4">
              FROZEN AT M0
            </text>
          </>
        ),
      };
    }
    return {
      surface: (
        <>
          <rect x="-36" y="-26" width="72" height="52" rx="5" strokeWidth="1.4" {...ns}
            style={{ ...T_FADE, fill: stale ? "rgba(153,27,27,0.08)" : "rgba(180,83,9,0.08)", stroke: stale ? RED : AMBER }} />
          {[[-54, -40], [54, -40], [-54, 40], [54, 40]].map(([u, v]) => (
            <circle key={`${u}${v}`} cx={u} cy={v} r="3" fill="#FDFBF7" strokeWidth="1" {...ns}
              style={{ ...T_FADE, stroke: stale ? RED : "#E4C090" }} />
          ))}
        </>
      ),
      labels: (
        <>
          <text x={CX} y={cy - 1} textAnchor="middle" fontSize="8" fontFamily={MONO} fontWeight="700" letterSpacing="1.4"
            style={{ ...T_FADE, fill: stale ? RED : AMBER }}>
            AGENT
          </text>
          <text x={CX} y={cy + 9} textAnchor="middle" fill="#78716C" fontSize="6.5" fontFamily={MONO} letterSpacing="0.3">
            reads ontology as truth
          </text>
        </>
      ),
    };
  };

  /* Tethers: reality tile → ontology tile. Drawn before the ontology plate so
     the plate occludes the part that passes behind it. */
  const tethers = ENTITIES.map((e, k) => {
    const b = iso(e.u + e.du * prog[k], e.v + e.dv * prog[k]);
    const a = iso(e.u, e.v);
    const x1 = CX + b.x;
    const y1 = LAYERS[0].y + b.y;
    const x2 = CX + a.x;
    const y2 = LAYERS[1].y + a.y;
    const visTop = LAYERS[1].y + RY * (1 - Math.min(1, Math.abs(x2 - CX) / RX)) + T;
    const f = (y1 - (y1 + visTop) / 2) / (y1 - y2);
    const mx = x1 + (x2 - x1) * f;
    const my = y1 + (y2 - y1) * f;
    return { k, x1, y1, x2, y2, mx, my, bad: changedFlags[k], d: `M${x1},${y1} L${x2},${y2}` };
  });

  const timelineX = (m: number) => COL_X + (m / 12) * (COL_R - COL_X);

  return (
    <div style={{ marginBottom: "56px" }}>
      <p
        className="caption-chapter"
        style={{ textAlign: "center", color: "#57534E", marginBottom: "24px", display: "flex", justifyContent: "center" }}
      >
        How Semantic Drift propagates through your organization
      </p>

      <div ref={wrapRef} className="relative w-full max-w-5xl mx-auto aspect-[3/2] select-none">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-full block overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Semantic drift flowchart: Business Reality feeds a static Ontology snapshot, which an AI Agent consumes as truth while the Business Evolves; both paths converge into a SEMANTIC DRIFT failure state, also called Context Rot."
        >
          <defs>
            <IsoDefs p={P} />
          </defs>

          <HudHeader
            x={CALLOUT_X} right={936} title="ALCHEMYST // SEMANTIC_DRIFT"
            meta={`month M${month} · snapshot M0`}
            segments={12}
            segmentFill={(k) => (k < month ? (k >= 4 ? RED : AMBER) : "#E4D9BC")}
            phase={changed === 0 ? "ALIGNED" : changed < 3 ? "DIVERGING" : "DRIFT DETECTED"}
            phaseColor={changed === 0 ? AMBER : RED}
            reduce={reduce}
          />

          {/* ── Drift meter ── */}
          <g pointerEvents="none" opacity={hovered !== null ? 0.35 : 1} style={{ transition: "opacity 0.3s" }}>
            <text x={COL_X} y="128" fill="#A8A29E" fontSize="8" fontFamily={MONO} letterSpacing="2" fontWeight="600">
              TIME SINCE SNAPSHOT
            </text>
            <text x={COL_R} y="128" textAnchor="end" fill={changed > 0 ? RED : AMBER} fontSize="8" fontFamily={MONO} fontWeight="700"
              letterSpacing="1">
              M{month}
            </text>
            <line x1={COL_X} y1="146" x2={COL_R} y2="146" stroke="#E4D9BC" strokeWidth="2" strokeLinecap="round" />
            <line x1={COL_X} y1="146" x2={COL_X + t * (COL_R - COL_X)} y2="146" strokeWidth="2" strokeLinecap="round"
              stroke={changed > 0 ? RED : AMBER} />
            {Array.from({ length: 13 }).map((_, m) => (
              <line key={m} x1={timelineX(m)} y1={m % 6 === 0 ? 140 : 142.5} x2={timelineX(m)} y2="146"
                stroke={m <= month ? (changed > 0 ? RED : AMBER) : "#D6D3D1"} strokeWidth="1" />
            ))}
            <circle cx={COL_X + t * (COL_R - COL_X)} cy="146" r="4" fill="#FFFFFF" strokeWidth="1.6"
              stroke={changed > 0 ? RED : AMBER} />
            {[0, 6, 12].map((m) => (
              <text key={m} x={timelineX(m)} y="162" textAnchor={m === 0 ? "start" : m === 12 ? "end" : "middle"} fill="#A8A29E"
                fontSize="7" fontFamily={MONO} letterSpacing="0.6">
                M{m}
              </text>
            ))}

            <text x={COL_X} y="202" fill={RED} fontSize="8" fontFamily={MONO} letterSpacing="2" fontWeight="700">
              SEMANTIC DRIFT
            </text>
            <text x={COL_X} y="242" fontSize="36" fontFamily={SERIF} fontWeight="700" style={{ ...T_FADE, fill: drift > 0 ? RED : "#4A3B33" }}>
              {drift}%
            </text>
            <rect x={COL_X} y="254" width={COL_R - COL_X} height="4" rx="2" fill="#F1E9DA" />
            <rect x={COL_X} y="254" width={(drift / 100) * (COL_R - COL_X)} height="4" rx="2" fill={RED} />
            {[
              { k: "entities in sync", v: `${inSync}/4` },
              { k: "definitions changed", v: String(changed) },
              { k: "agent accuracy", v: `${accuracy}%` },
            ].map((r, i) => (
              <g key={r.k}>
                <text x={COL_X} y={284 + i * 24} fill="#78716C" fontSize="7.5" fontFamily={MONO} letterSpacing="0.6">
                  {r.k}
                </text>
                <text x={COL_R} y={284 + i * 24} textAnchor="end" fill="#4A3B33" fontSize="9" fontFamily={MONO} fontWeight="700">
                  {r.v}
                </text>
                <rect x={COL_X} y={290 + i * 24} width={COL_R - COL_X} height="1" fill="#F1E9DA" />
              </g>
            ))}
            <text x={COL_X} y="376" fill="#A8A29E" fontSize="7.5" fontFamily={MONO} letterSpacing="1.6" fontWeight="600">
              CONSENSUS
            </text>
            <text x={COL_X} y="398" fontSize="16" fontFamily={SERIF} fontWeight="700" style={{ ...T_FADE, fill: stateColor }}>
              {state}
            </text>
            <g opacity={t > 0.85 ? 1 : 0} style={{ transition: "opacity 0.6s" }}>
              <text x={COL_X} y="432" fill="#57534E" fontSize="12" fontFamily={SERIF} fontStyle="italic">
                Consensus existed.
              </text>
              <text x={COL_X} y="450" fill={RED} fontSize="12" fontFamily={SERIF} fontStyle="italic">
                Now it doesn&apos;t.
              </text>
              <text x={COL_X} y="470" fill="#A8A29E" fontSize="7" fontFamily={MONO} letterSpacing="1.2">
                ALSO CALLED CONTEXT ROT
              </text>
            </g>
          </g>

          {/* ── Plates (bottom → top) with gaps ── */}
          {LAYERS.map((layer, i) => {
            const next = LAYERS[i + 1];
            const { surface, labels } = plateBits(layer.id, layer.y);
            const accent = layer.id === "reality" ? AMBER : layer.id === "ontology" ? (changed > 0 ? RED : AMBER) : stale ? RED : AMBER;
            const lit = layer.id === "agent" ? stale : changed > 0;
            return (
              <g key={layer.id}>
                <Plate
                  p={P} index={i} cx={CX} cy={layer.y} half={HALF} thick={T}
                  tone={layer.id === "reality" ? "source" : "context"} accent={accent}
                  lit={lit} hovered={hovered === i} dimmed={hovered !== null && hovered !== i}
                  offset={explodeOffset(i, hovered)} reduce={reduce}
                  callout={{ x: CALLOUT_X, idx: layer.idx, verb: layer.verb, title: layer.title, sub: layer.sub, width: W - CALLOUT_X + 8 }}
                  ariaLabel={`${layer.idx} ${layer.title}. ${panels[i].body}`}
                  onEnter={() => enter(i)} onLeave={leave} onToggle={() => toggle(i)}
                  surface={surface} labels={labels}
                  port={layer.id !== "agent"} id={layer.idx}
                />

                {/* Gap 0: tethers between reality and the snapshot */}
                {layer.id === "reality" && (
                  <g pointerEvents="none" opacity={hovered !== null ? 0.12 : 1} style={{ transition: "opacity 0.3s" }}>
                    {tethers.map((th) =>
                      th.bad ? (
                        <g key={th.k}>
                          <line x1={th.x1} y1={th.y1} x2={th.mx + (th.x1 - th.mx) * 0.14} y2={th.my + (th.y1 - th.my) * 0.14}
                            stroke={RED} strokeWidth="1.4" />
                          <line x1={th.mx + (th.x2 - th.mx) * 0.14} y1={th.my + (th.y2 - th.my) * 0.14} x2={th.x2} y2={th.y2}
                            stroke={RED} strokeWidth="1.4" strokeDasharray="2 3" />
                          <motion.g
                            animate={reduce ? undefined : { opacity: [1, 0.25, 1] }}
                            transition={{ duration: 0.9, repeat: Infinity }}
                          >
                            <path d={`M${th.mx - 4},${th.my - 4} L${th.mx + 4},${th.my + 4} M${th.mx + 4},${th.my - 4} L${th.mx - 4},${th.my + 4}`}
                              stroke={RED} strokeWidth="1.6" strokeLinecap="round" />
                          </motion.g>
                        </g>
                      ) : (
                        <g key={th.k}>
                          <line x1={th.x1} y1={th.y1} x2={th.x2} y2={th.y2} stroke="#F1E9DA" strokeWidth="4" />
                          <motion.path
                            d={th.d} fill="none" stroke={AMBER} strokeWidth="1.2" strokeDasharray="3 5"
                            animate={reduce ? undefined : { strokeDashoffset: [0, -16] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                          />
                          {!reduce && (
                            <motion.circle
                              r="2.2" fill={AMBER} filter={`url(#${P}Glow)`}
                              animate={{ offsetDistance: ["0%", "100%"] }}
                              transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: th.k * 0.35 }}
                              style={{ offsetPath: `path("${th.d}")` }}
                            />
                          )}
                        </g>
                      ),
                    )}
                  </g>
                )}

                {/* Gap 1: the agent reads the snapshot */}
                {layer.id === "ontology" && next && (
                  <g pointerEvents="none" opacity={hovered !== null ? 0.12 : 1} style={{ transition: "opacity 0.3s" }}>
                    <line x1={CX} y1={layer.y} x2={CX} y2={next.y} stroke="#E4C090" strokeWidth="1" strokeDasharray="2 5" />
                    {COLS.map((c, ci) => (
                      <g key={ci}>
                        <line x1={CX + c.dx} y1={layer.y + c.dy} x2={CX + c.dx} y2={next.y + c.dy} strokeWidth="1"
                          style={{ stroke: stale ? "rgba(153,27,27,0.4)" : "rgba(180,83,9,0.45)", transition: "stroke 0.35s" }} />
                        <GapParticles
                          x={CX + c.dx} yFrom={layer.y + c.dy} yTo={next.y + c.dy}
                          color={stale ? RED : AMBER} glow={`url(#${P}Glow)`} reduce={reduce} delay={ci * 0.45}
                        />
                      </g>
                    ))}
                  </g>
                )}
              </g>
            );
          })}

          {/* ── Top gap: agent → answer ── */}
          <line x1={CX} y1={LAYERS[2].y} x2={CX} y2={CARD_Y + CARD_H} strokeWidth="1" strokeDasharray="2 5"
            style={{ stroke: stale ? RED : "#E4C090", transition: "stroke 0.35s" }} pointerEvents="none" />

          {/* ── Answer card ── */}
          <g pointerEvents="none">
            <g filter={`url(#${P}Shadow)`}>
              <rect x={CX - 150} y={CARD_Y} width="300" height={CARD_H} rx="8" fill="#FFFFFF" strokeWidth={stale ? 1.4 : 1}
                style={{ stroke: stale ? RED : "#E4D9BC", transition: "stroke 0.35s" }} />
            </g>
            <rect x={CX - 138} y={CARD_Y + 12} width="46" height="17" rx="3" fill="rgba(180,83,9,0.1)" stroke="rgba(180,83,9,0.3)" />
            <text x={CX - 115} y={CARD_Y + 24} textAnchor="middle" fill={AMBER} fontSize="8" fontFamily={MONO} fontWeight="700" letterSpacing="1.2">
              AGENT
            </text>
            <text x={CX - 82} y={CARD_Y + 25} fill="#4A3B33" fontSize="12" fontFamily={SERIF}>
              What was Q3 revenue?
            </text>
            <line x1={CX - 138} y1={CARD_Y + 38} x2={CX + 138} y2={CARD_Y + 38} stroke="#F1E9DA" strokeWidth="1" />
            <text x={CX - 138} y={CARD_Y + 60} fontSize="13" fontFamily={SERIF} fontWeight="700" style={{ ...T_FADE, fill: stale ? RED : "#4A3B33" }}>
              $500K
            </text>
            <text x={CX - 88} y={CARD_Y + 59} fontSize="7.5" fontFamily={MONO} letterSpacing="0.3" style={{ ...T_FADE, fill: stale ? RED : "#78716C" }}>
              {stale ? "stale · reality is $5M ARR" : "bookings · matches reality"}
            </text>
            <circle cx={CX + 132} cy={CARD_Y + 56} r="7" style={{ ...T_FADE, fill: stale ? RED : AMBER }} />
            {stale ? (
              <path d={`M${CX + 129},${CARD_Y + 53} l6,6 M${CX + 135},${CARD_Y + 53} l-6,6`} stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d={`M${CX + 128.5},${CARD_Y + 56} l2.4,2.4 l4.6,-4.8`} fill="none" stroke="#FFFFFF" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" />
            )}
          </g>

          <FooterStrip
            y={600} x1={16} x2={936}
            left="semantic_drift.flow · scroll to advance time"
            right="HOVER A LAYER TO INSPECT"
          />
        </svg>

        <DetailPanel
          data={hovered === null ? null : panels[hovered]}
          top={panelTop}
          className="w-[27%] min-w-[220px]"
          onEnter={() => hovered !== null && enter(hovered)}
          onLeave={leave}
        />
      </div>
    </div>
  );
}
