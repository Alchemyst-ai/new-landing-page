"use client";

/* ── Accuracy terrain: isometric 3D benchmark ────────────────────────────────
 * Same data story (Alchemyst holds ~92% while baselines decay as the
 * conversation grows), built as an isometric terrain in the ContextStack
 * family: each series is a translucent wall standing on a floor plate. A
 * scrubber plane rests at a random token position; hovering the terrain
 * brings it into motion and it follows the pointer, reading live values into
 * the readout. Hovering a series (wall or readout row) isolates it and opens
 * its detail panel in the clear slot above the chart, so nothing is covered.
 * Reduced motion renders the final, fully grown state. */

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import {
  AMBER, DetailPanel, EASE, FooterStrip, HudHeader, IA, IB, IsoDefs, MONO, SERIF,
  useInspect, useReducedMotionSafe, type PanelData,
} from "./iso/kit";

const P = "bm";
const W = 960;
const H = 684;
const OX = 220;
const OY = 354;
const L = 520;          // token axis length (world units)
const ZS = 3.0;         // accuracy → height
const FT = 10;          // floor thickness
const U0 = -24;
const U1 = L + 24;
const V0 = -24;
const V1 = 164;
const ZMAX = (100 - 40) * ZS;
const RIGHT_X = 752;
const RIGHT_END = 936;

const TOKENS = [8, 32, 64, 96, 115];

const SERIES = [
  {
    key: "alchemyst", label: "Alchemyst", color: "#B45309", v: 0, width: 3,
    points: [92, 92.5, 91.8, 92.2, 92],
    panel: {
      eyebrow: "SERIES · ALCHEMYST", title: "Deterministic context",
      body: "Accuracy holds near 92% at every length because only in-scope, current context ever reaches the model.",
      code: "ctx.search({ scope, recall, rank })",
    },
  },
  {
    key: "vectordb", label: "Vector DB", color: "#A16207", v: 70, width: 2.2,
    points: [88, 85, 78, 70, 63],
    panel: {
      eyebrow: "SERIES · VECTOR DB", title: "Top-K similarity",
      body: "Nearest-neighbour recall keeps pulling stale and off-scope chunks as the conversation grows, so accuracy decays steadily.",
      code: "index.query({ topK: 10 })",
    },
  },
  {
    key: "fullctx", label: "Full-context GPT-4o", color: "#A8A29E", v: 140, width: 2.2,
    points: [90, 88, 72, 55, 41],
    panel: {
      eyebrow: "SERIES · FULL CONTEXT", title: "Stuff the window",
      body: "Pasting the entire history into the prompt dilutes attention. Past 64K tokens the model loses the thread.",
      code: "messages: [...history]",
    },
  },
];

const pt = (u: number, v: number, z = 0) => ({ x: OX + IA * (u - v), y: OY + IB * (u + v) - z });
const pts = (list: { x: number; y: number }[]) => list.map((q) => `${q.x},${q.y}`).join(" ");
const uOf = (t: number) => ((t - TOKENS[0]) / (TOKENS[TOKENS.length - 1] - TOKENS[0])) * L;
const zOf = (val: number) => (val - 40) * ZS;
const tokAt = (u: number) => Math.round(TOKENS[0] + (u / L) * (TOKENS[TOKENS.length - 1] - TOKENS[0]));

function valueAt(points: number[], u: number) {
  for (let i = 0; i < TOKENS.length - 1; i++) {
    const a = uOf(TOKENS[i]);
    const b = uOf(TOKENS[i + 1]);
    if (u <= b) {
      const k = Math.max(0, Math.min(1, (u - a) / (b - a)));
      return points[i] + (points[i + 1] - points[i]) * k;
    }
  }
  return points[points.length - 1];
}

export default function BenchmarkChart() {
  const reduce = useReducedMotionSafe();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const inView = useInView(wrapRef, { margin: "-10% 0px" });
  const { hovered: hs, enter, leave } = useInspect();
  const [grow, setGrow] = useState(0);
  /* Parked scrubber position. Deterministic for SSR, randomised on mount. */
  const [us, setUs] = useState(L * 0.6);
  const [pointerU, setPointerU] = useState<number | null>(null);
  const grown = useRef(false);

  const g = reduce ? 1 : grow;
  const u = pointerU ?? us;
  const tok = tokAt(u);

  /* Walls rise the first time the terrain enters the viewport. */
  useEffect(() => {
    if (reduce || !inView || grown.current) return;
    grown.current = true;
    const controls = animate(0, 1, { duration: 1.6, ease: EASE, onUpdate: setGrow });
    return () => controls.stop();
  }, [inView, reduce]);

  /* Park the scrubber at a random point along the token axis. */
  useEffect(() => {
    setUs(L * (0.22 + Math.random() * 0.56));
  }, []);

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return;
    const q = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    if (q.x > 745 || q.y < 144 || q.y > 614) {
      if (pointerU !== null) {
        setUs(pointerU);
        setPointerU(null);
      }
      return;
    }
    setPointerU(Math.max(0, Math.min(L, (q.x - OX) / IA + 70)));
  };
  /* Leaving the terrain parks the scrubber wherever it was left. */
  const onPointerLeave = () => {
    if (pointerU !== null) setUs(pointerU);
    setPointerU(null);
  };

  const values = SERIES.map((s) => valueAt(s.points, u));
  const lead = values[0] - Math.max(values[1], values[2]);

  const panel: PanelData | null =
    hs === null
      ? null
      : {
          key: SERIES[hs].key,
          eyebrow: SERIES[hs].panel.eyebrow,
          title: SERIES[hs].panel.title,
          body: SERIES[hs].panel.body,
          accent: hs === 2 ? "#78716C" : SERIES[hs].color,
          status: "illustrative",
          stats: [
            ["At 8K", `${SERIES[hs].points[0].toFixed(1)}%`],
            ["At 115K", `${SERIES[hs].points[4].toFixed(1)}%`],
            ["Change", `${(SERIES[hs].points[4] - SERIES[hs].points[0] >= 0 ? "±" : "−")}${Math.abs(SERIES[hs].points[4] - SERIES[hs].points[0]).toFixed(0)}pt`],
          ],
          code: SERIES[hs].panel.code,
        };

  const zLevels = [40, 55, 70, 85, 100];

  return (
    <div className="w-full">
      <div className="flex justify-center mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-400 font-medium">
          Illustrative · accuracy vs conversation context
        </p>
      </div>

      <div ref={wrapRef} className="relative w-full max-w-5xl mx-auto aspect-[240/171] select-none">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-full block overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Isometric chart of accuracy vs conversation context tokens. Alchemyst stays stable around 92 percent, Vector DB decays from 88 to 63 percent, and Full-context GPT-4o decays from 90 to 41 percent. Illustrative."
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          style={{ cursor: pointerU !== null ? "ew-resize" : undefined }}
        >
          <defs>
            <IsoDefs p={P} />
            {SERIES.map((s) => (
              <linearGradient key={s.key} id={`${P}Wall-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity={s.key === "alchemyst" ? 0.34 : 0.26} />
                <stop offset="100%" stopColor={s.color} stopOpacity="0.04" />
              </linearGradient>
            ))}
          </defs>

          <HudHeader
            x={RIGHT_X} right={RIGHT_END} title="ALCHEMYST // ACCURACY_TERRAIN"
            meta={`${tok}K tokens · illustrative`}
            segments={TOKENS.length}
            segmentFill={(k) => (uOf(TOKENS[k]) <= u + 0.5 ? AMBER : "#E4D9BC")}
            phase={hs !== null ? `ISOLATING ${SERIES[hs].label.toUpperCase()}` : pointerU !== null ? "SCRUBBING" : "PARKED · HOVER TO SCRUB"}
            reduce={reduce}
          />

          {/* Idle hint in the detail slot */}
          <g pointerEvents="none" opacity={hs === null ? 1 : 0} style={{ transition: "opacity 0.25s" }}>
            <rect x="24" y="32" width="7" height="7" fill="none" stroke="#E4C090" strokeWidth="1" />
            <text x="38" y="39" fill="#A8A29E" fontSize="8" fontFamily={MONO} letterSpacing="1.6" fontWeight="600">
              HOVER A SERIES TO INSPECT IT
            </text>
          </g>

          {/* ── Box: back wall, left wall ── */}
          <g pointerEvents="none">
            <polygon points={pts([pt(U0, V0), pt(U1, V0), pt(U1, V0, ZMAX), pt(U0, V0, ZMAX)])}
              fill="#FFFFFF" fillOpacity="0.6" stroke="#E4D9BC" strokeWidth="1" />
            <polygon points={pts([pt(U0, V0), pt(U0, V1), pt(U0, V1, ZMAX), pt(U0, V0, ZMAX)])}
              fill="#FBF6EE" fillOpacity="0.7" stroke="#E4D9BC" strokeWidth="1" />
            {zLevels.slice(1).map((lv) => {
              const z = zOf(lv);
              return (
                <g key={lv} stroke="#E4D9BC" strokeWidth="1" strokeDasharray="3 4">
                  <line x1={pt(U0, V0, z).x} y1={pt(U0, V0, z).y} x2={pt(U1, V0, z).x} y2={pt(U1, V0, z).y} />
                  <line x1={pt(U0, V0, z).x} y1={pt(U0, V0, z).y} x2={pt(U0, V1, z).x} y2={pt(U0, V1, z).y} />
                </g>
              );
            })}
            {zLevels.map((lv) => {
              const q = pt(U0, V1, zOf(lv));
              return (
                <text key={lv} x={q.x - 7} y={q.y + 3} textAnchor="end" fill="#78716C" fontSize="8.5" fontFamily={MONO} fontWeight="500">
                  {lv}%
                </text>
              );
            })}
            {(() => {
              const q = pt(U0, V1, ZMAX / 2);
              return (
                <text x={q.x - 40} y={q.y} textAnchor="middle" fill="#57534E" fontSize="8" fontFamily={MONO}
                  letterSpacing="2" fontWeight="600" transform={`rotate(-90 ${q.x - 40} ${q.y})`}>
                  ACCURACY
                </text>
              );
            })()}
          </g>

          {/* ── Floor plate ── */}
          <g pointerEvents="none">
            <polygon
              points={`${pt(U0, V1).x},${pt(U0, V1).y} ${pt(U1, V1).x},${pt(U1, V1).y} ${pt(U1, V1).x},${pt(U1, V1).y + FT} ${pt(U0, V1).x},${pt(U0, V1).y + FT}`}
              fill="#F1E9DA"
            />
            <polygon
              points={`${pt(U1, V0).x},${pt(U1, V0).y} ${pt(U1, V1).x},${pt(U1, V1).y} ${pt(U1, V1).x},${pt(U1, V1).y + FT} ${pt(U1, V0).x},${pt(U1, V0).y + FT}`}
              fill="#E4C090"
            />
            <polygon points={pts([pt(U0, V0), pt(U1, V0), pt(U1, V1), pt(U0, V1)])} fill={`url(#${P}Top)`} stroke="#E4D9BC" strokeWidth="1" />
            {TOKENS.map((t) => {
              const uu = uOf(t);
              return (
                <line key={t} x1={pt(uu, V0).x} y1={pt(uu, V0).y} x2={pt(uu, V1).x} y2={pt(uu, V1).y}
                  stroke="#EFE6D6" strokeWidth="1" strokeDasharray="3 4" />
              );
            })}
            {SERIES.map((s) => (
              <line key={s.key} x1={pt(U0, s.v).x} y1={pt(U0, s.v).y} x2={pt(U1, s.v).x} y2={pt(U1, s.v).y}
                stroke="#EFE6D6" strokeWidth="1" />
            ))}
            {TOKENS.map((t) => {
              const q = pt(uOf(t), V1);
              return (
                <text key={t} x={q.x - 6} y={q.y + FT + 14} textAnchor="middle" fill="#78716C" fontSize="8.5" fontFamily={MONO}
                  fontWeight="500">
                  {t}K
                </text>
              );
            })}
            {(() => {
              const q = pt(L / 2, V1);
              return (
                <text x={q.x - 18} y={q.y + FT + 36} textAnchor="middle" fill="#57534E" fontSize="8" fontFamily={MONO}
                  letterSpacing="2" fontWeight="600" transform={`rotate(19.6 ${q.x - 18} ${q.y + FT + 36})`}>
                  CONVERSATION TOKENS
                </text>
              );
            })()}
          </g>

          {/* ── Series walls (back → front) ── */}
          {SERIES.map((s, k) => {
            const top = s.points.map((val, i) => pt(uOf(TOKENS[i]), s.v, zOf(val) * g));
            const wall = [...top, pt(L, s.v), pt(0, s.v)];
            const edge = `M${top.map((q) => `${q.x},${q.y}`).join(" L")}`;
            const faded = hs !== null && hs !== k;
            const end = top[top.length - 1];
            return (
              <g
                key={s.key}
                opacity={faded ? 0.14 : 1}
                style={{ transition: "opacity 0.3s", cursor: "pointer" }}
                onMouseEnter={() => enter(k)}
                onMouseLeave={leave}
              >
                <polygon points={pts(wall)} fill={`url(#${P}Wall-${s.key})`} stroke={s.color} strokeOpacity="0.25" strokeWidth="1" />
                <path d={edge} fill="none" stroke={s.color} strokeWidth={s.width} strokeLinecap="round" strokeLinejoin="round" />
                {top.map((q, i) => (
                  <circle key={i} cx={q.x} cy={q.y} r={s.key === "alchemyst" ? 3.6 : 3} fill="#FFFFFF" stroke={s.color} strokeWidth="1.8" />
                ))}
                {g >= 1 && !reduce && (
                  <motion.circle
                    r="2.6" fill={s.color} filter={`url(#${P}Glow)`}
                    animate={{ offsetDistance: ["0%", "100%"] }}
                    transition={{ duration: 3.2 + k * 0.5, repeat: Infinity, ease: "linear", delay: k * 0.6 }}
                    style={{ offsetPath: `path("${edge}")` }}
                  />
                )}
                <text x={end.x + 9} y={end.y + 3} fill={s.key === "fullctx" ? "#78716C" : s.color} fontSize="8.5" fontFamily={MONO}
                  fontWeight="700" opacity={Math.abs(u - L) > 40 ? g : 0} style={{ transition: "opacity 0.3s" }}>
                  {s.points[4]}%
                </text>
              </g>
            );
          })}

          {/* ── Scrubber plane ── */}
          <g pointerEvents="none">
            <polygon points={pts([pt(u, V0), pt(u, V1), pt(u, V1, ZMAX), pt(u, V0, ZMAX)])}
              fill={AMBER} fillOpacity="0.05" stroke={AMBER} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="4 3" />
            <line x1={pt(u, V0).x} y1={pt(u, V0).y} x2={pt(u, V1).x} y2={pt(u, V1).y} stroke={AMBER} strokeWidth="1.4" />
            {(() => {
              const q = pt(u, V0, ZMAX + 12);
              return (
                <text x={q.x} y={q.y} textAnchor="middle" fill={AMBER} fontSize="8.5" fontFamily={MONO} fontWeight="700" letterSpacing="1">
                  {tok}K
                </text>
              );
            })()}
            {SERIES.map((s, k) => {
              const q = pt(u, s.v, zOf(values[k]) * g);
              const faded = hs !== null && hs !== k;
              return (
                <g key={s.key} opacity={faded ? 0.15 : 1} style={{ transition: "opacity 0.3s" }}>
                  <circle cx={q.x} cy={q.y} r="4.6" fill={s.color} stroke="#FFFFFF" strokeWidth="1.5" filter={`url(#${P}Glow)`} />
                  <text x={q.x + 9} y={q.y - 6} fill={s.key === "fullctx" ? "#57534E" : s.color} fontSize="8.5" fontFamily={MONO}
                    fontWeight="700" stroke="#FDFBF7" strokeWidth="3" paintOrder="stroke">
                    {values[k].toFixed(1)}%
                  </text>
                </g>
              );
            })}
          </g>

          {/* ── Live readout ── */}
          <g>
            <text x={RIGHT_X} y="132" fill="#A8A29E" fontSize="8" fontFamily={MONO} letterSpacing="2" fontWeight="600">
              LIVE READOUT
            </text>
            <text x={RIGHT_END} y="132" textAnchor="end" fill={AMBER} fontSize="8" fontFamily={MONO} letterSpacing="1" fontWeight="700">
              {tok}K TOKENS
            </text>
            {SERIES.map((s, k) => {
              const y = 160 + k * 52;
              const faded = hs !== null && hs !== k;
              return (
                <g
                  key={s.key}
                  onMouseEnter={() => enter(k)}
                  onMouseLeave={leave}
                  onFocus={() => enter(k)}
                  onBlur={leave}
                  tabIndex={0}
                  role="button"
                  aria-label={`${s.label}: ${s.panel.body}`}
                  opacity={faded ? 0.35 : 1}
                  style={{ cursor: "pointer", outline: "none", transition: "opacity 0.3s" }}
                >
                  <rect x={RIGHT_X - 8} y={y - 16} width={RIGHT_END - RIGHT_X + 16} height="44" rx="6"
                    fill={hs === k ? "#FFFBF5" : "transparent"} stroke={hs === k ? "#E4C090" : "transparent"} />
                  <line x1={RIGHT_X} y1={y - 4} x2={RIGHT_X + 12} y2={y - 4} stroke={s.color} strokeWidth={s.width} strokeLinecap="round" />
                  <text x={RIGHT_X + 20} y={y} fill="#4A3B33" fontSize="11.5" fontFamily={SERIF} fontWeight={k === 0 ? 700 : 600}>
                    {s.label}
                  </text>
                  <text x={RIGHT_END} y={y} textAnchor="end" fill={k === 2 ? "#57534E" : s.color} fontSize="11" fontFamily={MONO} fontWeight="700">
                    {values[k].toFixed(1)}%
                  </text>
                  <rect x={RIGHT_X} y={y + 10} width={RIGHT_END - RIGHT_X} height="3" rx="1.5" fill="#F1E9DA" />
                  <rect x={RIGHT_X} y={y + 10} width={Math.max(0, ((values[k] - 40) / 60) * (RIGHT_END - RIGHT_X) * g)} height="3" rx="1.5" fill={s.color} />
                </g>
              );
            })}
            <g pointerEvents="none">
              <line x1={RIGHT_X} y1="318" x2={RIGHT_END} y2="318" stroke="#F1E9DA" strokeWidth="1" />
              <text x={RIGHT_X} y="340" fill="#A8A29E" fontSize="7.5" fontFamily={MONO} letterSpacing="1.6" fontWeight="600">
                ALCHEMYST LEAD
              </text>
              <text x={RIGHT_X} y="370" fill={AMBER} fontSize="24" fontFamily={SERIF} fontWeight="700">
                +{lead.toFixed(1)}pt
              </text>
              <text x={RIGHT_X} y="388" fill="#78716C" fontSize="7.5" fontFamily={MONO} letterSpacing="0.6">
                vs best baseline at {tok}K tokens
              </text>
            </g>
          </g>

          <FooterStrip
            y={646} x1={16} x2={RIGHT_END}
            left="accuracy_terrain.live · 3 series · 5 checkpoints · illustrative"
            right="HOVER THE TERRAIN TO SCRUB"
          />
        </svg>

        {/* Series detail lives in the clear slot above the terrain (top left),
            so it never covers the live readout or the data. */}
        <DetailPanel
          data={panel}
          anchor="center" left={25.4} top={1.2} layout="wide"
          className="w-[46%] min-w-[400px]"
          onEnter={() => hs !== null && enter(hs)}
          onLeave={leave}
        />
      </div>
    </div>
  );
}
