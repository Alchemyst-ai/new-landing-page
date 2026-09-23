"use client";

/* ── Iso kit: shared primitives for the isometric diagram family ────────────
 * Used by the Sovereignty stack, the Accuracy terrain and the Drift stack so
 * they match the hero ContextStack exactly: same dimetric projection, plate
 * construction, halos, levitation, surface scan, explode-on-hover, detail
 * panel, HUD header and footer strip. */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Reduced-motion preference that is always `false` for the server render and
 *  the first client render, so SSR markup and hydration match. The real
 *  preference applies immediately after mount. */
export function useReducedMotionSafe() {
  const pref = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? !!pref : false;
}

export const IA = 0.9;
export const IB = 0.32;
export const MONO = "JetBrains Mono, monospace";
export const SERIF = "var(--font-merriweather), Georgia, serif";
export const AMBER = "#B45309";
export const RED = "#991B1B";
export const EASE = [0.23, 1, 0.32, 1] as const;
export const SPRING = { type: "spring" as const, stiffness: 170, damping: 22 };
export const ns = { vectorEffect: "non-scaling-stroke" as const };
export const T_FADE = { transition: "fill 0.4s, stroke 0.4s, opacity 0.4s" };

/** Local plate coords (u, v) → screen offset from the plate centre. */
export const iso = (u: number, v: number) => ({ x: IA * (u - v), y: IB * (u + v) });
/** Affine matrix mapping local plate coords onto a plate's top face. */
export const isoMatrix = (cx: number, cy: number) => `matrix(${IA} ${IB} ${-IA} ${IB} ${cx} ${cy})`;

/** Explode offset: plates above the inspected one lift, plates below drop. */
export const explodeOffset = (i: number, hovered: number | null, gap = 26) =>
  hovered === null ? 0 : i > hovered ? -gap : i < hovered ? gap : -4;

/** Horizontal explode for row layouts (index increases left → right). */
export const explodeOffsetX = (i: number, hovered: number | null, gap = 30) =>
  hovered === null ? 0 : i < hovered ? -gap : i > hovered ? gap : 0;

/** Hover / focus / tap inspection with a short grace period so the pointer
 *  can travel from a plate onto its detail panel without it closing. */
export function useInspect(delay = 140, initial: number | null = null) {
  const [hovered, setHovered] = useState<number | null>(initial);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  const enter = (i: number) => {
    if (timer.current) clearTimeout(timer.current);
    setHovered(i);
  };
  const leave = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setHovered(null), delay);
  };
  const toggle = (i: number) => setHovered((h) => (h === i ? null : i));
  return { hovered, enter, leave, toggle };
}

/* ── Defs ──────────────────────────────────────────────────────────────────── */

export function IsoDefs({ p }: { p: string }) {
  return (
    <>
      <linearGradient id={`${p}Top`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FBF6EE" />
      </linearGradient>
      <radialGradient id={`${p}Halo`}>
        <stop offset="0%" stopColor={AMBER} stopOpacity="0.22" />
        <stop offset="60%" stopColor={AMBER} stopOpacity="0.07" />
        <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${p}HaloRed`}>
        <stop offset="0%" stopColor={RED} stopOpacity="0.2" />
        <stop offset="60%" stopColor={RED} stopOpacity="0.06" />
        <stop offset="100%" stopColor={RED} stopOpacity="0" />
      </radialGradient>
      <filter id={`${p}Glow`} x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="2.6" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id={`${p}Blur`} x="-30%" y="-60%" width="160%" height="220%">
        <feGaussianBlur stdDeviation="9" />
      </filter>
      <filter id={`${p}Shadow`} x="-10%" y="-20%" width="120%" height="160%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="hsl(28 18% 25%)" floodOpacity="0.14" />
      </filter>
    </>
  );
}

/* ── Plate ─────────────────────────────────────────────────────────────────── */

type Tone = "source" | "context";
const SIDES: Record<Tone, [string, string]> = {
  source: ["#E7E5E4", "#D6D3D1"],
  context: ["#F1E9DA", "#E4C090"],
};

export interface PlateCallout {
  x: number;
  idx: string;
  verb: string;
  title: string;
  sub: string;
  width: number;
}

export interface PlateProps {
  p: string;
  index: number;
  cx: number;
  cy: number;
  half: number;
  thick?: number;
  tone?: Tone;
  accent?: string;
  lit: boolean;
  hovered: boolean;
  dimmed: boolean;
  offset: number;
  /** Horizontal explode offset (for row layouts). */
  offsetX?: number;
  reduce: boolean;
  callout?: PlateCallout;
  /** "right" (default): leader + text to the right. "below": centred under the plate. */
  calloutPlacement?: "right" | "below";
  ariaLabel: string;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
  surface?: ReactNode;
  labels?: ReactNode;
  port?: boolean;
  id?: string;
}

export function Plate({
  p, index, cx, cy, half, thick = 9, tone = "context", accent = AMBER,
  lit, hovered, dimmed, offset, offsetX = 0, reduce, callout, calloutPlacement = "right", ariaLabel,
  onEnter, onLeave, onToggle, surface, labels, port = true, id,
}: PlateProps) {
  const RX = IA * 2 * half;
  const RY = IB * 2 * half;
  const edge = lit || hovered;
  const inner = half - 6;
  const grid = [-2, -1, 0, 1, 2].map((k) => (k * inner) / 3);
  const [left, right] = SIDES[tone];

  return (
    <motion.g
      initial={false}
      animate={{ x: offsetX, y: offset, opacity: dimmed ? 0.38 : 1 }}
      transition={SPRING}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onToggle}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel}
      style={{ cursor: "pointer", outline: "none" }}
    >
      {callout && calloutPlacement === "below" && (
        <g>
          <line
            x1={cx} y1={cy + RY + thick + 6} x2={cx} y2={cy + RY + thick + 20} strokeWidth="1"
            style={{ stroke: hovered ? accent : lit ? "#E4C090" : "#E4D9BC", transition: "stroke 0.3s" }}
          />
          <circle cx={cx} cy={cy + RY + thick + 6} r="2.2" style={{ fill: edge ? accent : "#E4C090", transition: "fill 0.3s" }} />
          <g opacity={hovered ? 0 : 1} style={{ transition: "opacity 0.2s" }}>
            <text x={cx} y={cy + RY + thick + 36} textAnchor="middle" fontSize="9" fontFamily={MONO} letterSpacing="1.5" fontWeight="600"
              style={{ fill: lit ? accent : "#A16207", transition: "fill 0.3s" }}>
              {callout.idx} · {callout.verb}
            </text>
            <text x={cx} y={cy + RY + thick + 54} textAnchor="middle" fill="#4A3B33" fontSize="14" fontFamily={SERIF} fontWeight="700">
              {callout.title}
            </text>
            <text x={cx} y={cy + RY + thick + 68} textAnchor="middle" fill="#78716C" fontSize="8.5" fontFamily={MONO} letterSpacing="0.4">
              {callout.sub}
            </text>
          </g>
          <rect x={cx - callout.width / 2} y={cy + RY + thick} width={callout.width} height="76" fill="transparent" />
        </g>
      )}
      {callout && calloutPlacement === "right" && (
        <g>
          <line
            x1={cx + RX + 6} y1={cy} x2={callout.x - 10} y2={cy} strokeWidth="1"
            style={{ stroke: hovered ? accent : lit ? "#E4C090" : "#E4D9BC", transition: "stroke 0.3s" }}
          />
          <circle cx={cx + RX + 6} cy={cy} r="2.2" style={{ fill: edge ? accent : "#E4C090", transition: "fill 0.3s" }} />
          <g opacity={hovered ? 0 : 1} style={{ transition: "opacity 0.2s" }}>
            <text x={callout.x} y={cy - 13} fontSize="9" fontFamily={MONO} letterSpacing="1.5" fontWeight="600"
              style={{ fill: lit ? accent : "#A16207", transition: "fill 0.3s" }}>
              {callout.idx} · {callout.verb}
            </text>
            <text x={callout.x} y={cy + 4} fill="#4A3B33" fontSize="14" fontFamily={SERIF} fontWeight="700">
              {callout.title}
            </text>
            <text x={callout.x} y={cy + 18} fill="#78716C" fontSize="8.5" fontFamily={MONO} letterSpacing="0.4">
              {callout.sub}
            </text>
          </g>
          <rect x={callout.x - 14} y={cy - 30} width={callout.width} height="60" fill="transparent" />
        </g>
      )}

      {/* Levitation */}
      <motion.g
        animate={reduce ? undefined : { y: [0, -2.5, 0] }}
        transition={{ duration: 4.2 + index * 0.45, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Zoom */}
        <motion.g animate={{ scale: hovered ? 1.07 : 1 }} transition={SPRING}>
          <ellipse cx={cx} cy={cy + 26} rx={RX * 0.9} ry={RY * 0.72} fill="#4A3B33" opacity="0.07" filter={`url(#${p}Blur)`} />
          <motion.ellipse
            cx={cx} cy={cy + 4} rx={RX + 22} ry={RY + 18}
            fill={`url(#${p}${accent === RED ? "HaloRed" : "Halo"})`}
            initial={false}
            animate={{ opacity: hovered ? 1 : lit ? 0.4 : 0 }}
            transition={{ duration: 0.4 }}
          />
          <polygon points={`${cx - RX},${cy} ${cx},${cy + RY} ${cx},${cy + RY + thick} ${cx - RX},${cy + thick}`} fill={left} />
          <polygon points={`${cx},${cy + RY} ${cx + RX},${cy} ${cx + RX},${cy + thick} ${cx},${cy + RY + thick}`} fill={right} />
          <polygon
            points={`${cx},${cy - RY} ${cx + RX},${cy} ${cx},${cy + RY} ${cx - RX},${cy}`}
            fill={`url(#${p}Top)`}
            strokeWidth={edge ? 1.4 : 1}
            style={{ stroke: edge ? accent : "#E4D9BC", transition: "stroke 0.35s" }}
          />
          <polyline
            points={`${cx - RX},${cy} ${cx},${cy + RY} ${cx + RX},${cy}`}
            fill="none" strokeWidth="1.6" strokeLinejoin="round"
            style={{ stroke: accent, opacity: edge && tone === "context" ? 0.9 : 0, transition: "opacity 0.35s, stroke 0.35s" }}
          />

          <g transform={isoMatrix(cx, cy)}>
            <rect x={-inner} y={-inner} width={2 * inner} height={2 * inner} rx="4" fill="none" stroke="#F1E9DA" strokeWidth="1" {...ns} />
            {grid.map((g) => (
              <g key={g} stroke="#F6F0E4" strokeWidth="0.8">
                <line x1={g} y1={-inner} x2={g} y2={inner} {...ns} />
                <line x1={-inner} y1={g} x2={inner} y2={g} {...ns} />
              </g>
            ))}
            {surface}
            {!reduce && (
              <motion.line
                x1={-inner} x2={-inner} y1={-inner} y2={inner}
                stroke={accent} strokeWidth="1.2" {...ns}
                initial={{ x1: -inner, x2: -inner, opacity: 0.18 }}
                animate={{ x1: [-inner, inner], x2: [-inner, inner], opacity: edge ? 0.5 : 0.18 }}
                transition={{
                  x1: { duration: 4.4 + index * 0.6, repeat: Infinity, ease: "linear" },
                  x2: { duration: 4.4 + index * 0.6, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 0.4 },
                }}
              />
            )}
            {port && (
              <>
                <circle cx="0" cy="0" r="7" fill="#FDFBF7" strokeWidth="1.2" {...ns}
                  style={{ stroke: lit ? accent : "#E4C090", transition: "stroke 0.35s" }} />
                <circle cx="0" cy="0" r="3" style={{ fill: accent, opacity: lit ? 1 : 0, transition: "opacity 0.35s, fill 0.35s" }} />
              </>
            )}
          </g>

          {labels}

          {id && (
            <text x={cx - RX + 16} y={cy + 2.5} fontSize="6.5" fontFamily={MONO} letterSpacing="0.8" fill="#A8A29E">
              {id}
            </text>
          )}
        </motion.g>
      </motion.g>
    </motion.g>
  );
}

/* ── HUD header (top-right) ────────────────────────────────────────────────── */

export function HudHeader({
  x, right, y = 33, title, meta, segments, segmentFill, phase, phaseColor = AMBER, reduce,
}: {
  x: number;
  right: number;
  y?: number;
  title: string;
  meta: string;
  segments: number;
  segmentFill: (k: number) => string;
  phase: string;
  phaseColor?: string;
  reduce: boolean;
}) {
  const gap = 4;
  const segW = (right - x - gap * (segments - 1)) / segments;
  return (
    <g pointerEvents="none">
      <rect x={x} y={y} width="7" height="7" fill={AMBER} />
      <text x={x + 13} y={y + 7} fill="#78716C" fontSize="8" fontFamily={MONO} letterSpacing="1.6" fontWeight="600">
        {title}
      </text>
      <text x={x} y={y + 24} fill="#A8A29E" fontSize="7.5" fontFamily={MONO} letterSpacing="1">
        {meta}
      </text>
      <text x={right} y={y + 24} textAnchor="end" fill="#A8A29E" fontSize="7.5" fontFamily={MONO} letterSpacing="1">
        LIVE
      </text>
      <motion.circle
        cx={right - 32} cy={y + 21.5} r="2.4" fill={AMBER}
        animate={reduce ? undefined : { opacity: [1, 0.25, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
      {Array.from({ length: segments }).map((_, k) => (
        <rect
          key={k} x={x + k * (segW + gap)} y={y + 34} width={segW} height="3" rx="1.5"
          style={{ fill: segmentFill(k), transition: "fill 0.3s" }}
        />
      ))}
      <text x={x} y={y + 55} fontSize="7.5" fontFamily={MONO} letterSpacing="1.6" fontWeight="600"
        style={{ fill: phaseColor, transition: "fill 0.3s" }}>
        PHASE · {phase}
      </text>
    </g>
  );
}

/* ── Footer strip ──────────────────────────────────────────────────────────── */

export function FooterStrip({ y, x1, x2, left, right }: { y: number; x1: number; x2: number; left: string; right: string }) {
  return (
    <g pointerEvents="none">
      <line x1={x1} y1={y} x2={x2} y2={y} stroke="#E4D9BC" strokeWidth="1" />
      <text x={x1} y={y + 20} fill="#A8A29E" fontSize="7.5" fontFamily={MONO} letterSpacing="1.4">
        {left}
      </text>
      <text x={x2} y={y + 20} textAnchor="end" fill="#A16207" fontSize="7.5" fontFamily={MONO} letterSpacing="1.4" fontWeight="600">
        {right}
      </text>
    </g>
  );
}

/* ── Detail panel (HTML overlay) ───────────────────────────────────────────── */

export interface PanelData {
  key: string;
  eyebrow: string;
  title: string;
  body: string;
  stats: [string, string][];
  code?: string;
  accent?: string;
  status?: string;
}

export function DetailPanel({
  data, top, className = "w-[40%] min-w-[208px]", onEnter, onLeave, anchor = "right", left = 50, layout = "stack",
}: {
  data: PanelData | null;
  /** % from the top. Right anchor: panel centre. Centre anchor: panel top edge. */
  top: number;
  className?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  /** "right": pinned to the right edge. "center": centred on `left` (%). */
  anchor?: "right" | "center";
  left?: number;
  /** "stack" (default): vertical card. "wide": compact two-column card for short, wide slots. */
  layout?: "stack" | "wide";
}) {
  const centred = anchor === "center";
  const accent = data?.accent ?? AMBER;
  return (
    <AnimatePresence>
      {data && (
        <motion.div
          key={data.key}
          initial={centred ? { opacity: 0, x: "-50%", y: 10 } : { opacity: 0, x: 14, y: "-50%" }}
          animate={centred ? { opacity: 1, x: "-50%", y: 0 } : { opacity: 1, x: 0, y: "-50%" }}
          exit={centred ? { opacity: 0, x: "-50%", y: 6 } : { opacity: 0, x: 8, y: "-50%" }}
          transition={{ duration: 0.25, ease: EASE }}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className={`absolute z-10 ${centred ? "" : "right-0"} ${className}`}
          style={centred ? { top: `${top}%`, left: `${left}%` } : { top: `${top}%` }}
        >
          <div className="relative overflow-hidden rounded-lg border border-[#E4D9BC] bg-white/95 backdrop-blur-sm shadow-[var(--shadow-soft-lg)]">
            <div className="absolute inset-y-0 left-0 w-[2px]" style={{ background: accent }} />
            {layout === "wide" ? (
              <div className="grid grid-cols-[1.25fr_1fr] gap-4 p-4">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em]" style={{ color: accent }}>
                      {data.eyebrow}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#A8A29E]">
                      <span className="h-1.5 w-1.5 rounded-full animate-pulse-slow" style={{ background: accent }} />
                      {data.status ?? "live"}
                    </span>
                  </div>
                  <h4 className="mt-1.5 text-[14px] font-bold leading-snug text-[#4A3B33]">{data.title}</h4>
                  <p className="mt-1 text-[11px] leading-[1.55] text-[#57534E]">{data.body}</p>
                </div>
                <div className="border-l border-[#F1E9DA] pl-4">
                  <dl className="space-y-1">
                    {data.stats.map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-3">
                        <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#A8A29E]">{k}</dt>
                        <dd className="font-mono text-[11px] font-semibold tabular-nums text-[#4A3B33]">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  {data.code && (
                    <div className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-md border border-[#F1E9DA] bg-[#F8F4EE] px-2 py-1 font-mono text-[9px] text-[#57534E]">
                      <span style={{ color: accent }}>▸</span> {data.code}
                    </div>
                  )}
                </div>
              </div>
            ) : (
            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em]" style={{ color: accent }}>
                  {data.eyebrow}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#A8A29E]">
                  <span className="h-1.5 w-1.5 rounded-full animate-pulse-slow" style={{ background: accent }} />
                  {data.status ?? "live"}
                </span>
              </div>
              <h4 className="mt-2 text-[15px] font-bold leading-snug text-[#4A3B33]">{data.title}</h4>
              <p className="mt-1.5 text-[11.5px] leading-[1.6] text-[#57534E]">{data.body}</p>
              <dl className="mt-3 space-y-1.5 border-t border-[#F1E9DA] pt-3">
                {data.stats.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-3">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#A8A29E]">{k}</dt>
                    <dd className="font-mono text-[11px] font-semibold tabular-nums text-[#4A3B33]">{v}</dd>
                  </div>
                ))}
              </dl>
              {data.code && (
                <div className="mt-3 rounded-md border border-[#F1E9DA] bg-[#F8F4EE] px-2.5 py-1.5 font-mono text-[10px] text-[#57534E]">
                  <span style={{ color: accent }}>▸</span> {data.code}
                </div>
              )}
            </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Rising / falling particles in the gap between two plates. */
export function GapParticles({
  x, yFrom, yTo, color, glow, reduce, delay = 0, count = 2, duration = 1.6, r = 2.2,
}: {
  x: number;
  yFrom: number;
  yTo: number;
  color: string;
  glow?: string;
  reduce: boolean;
  delay?: number;
  count?: number;
  duration?: number;
  r?: number;
}) {
  if (reduce) return null;
  return (
    <>
      {Array.from({ length: count }).map((_, k) => (
        <motion.circle
          key={k} cx={x} r={r}
          style={{ fill: color, transition: "fill 0.35s" }}
          filter={glow}
          initial={{ cy: yFrom, opacity: 0 }}
          animate={{ cy: [yFrom, yTo], opacity: [0, 1, 1, 0] }}
          transition={{ duration, repeat: Infinity, ease: "linear", delay: delay + (k * duration) / count }}
        />
      ))}
    </>
  );
}
