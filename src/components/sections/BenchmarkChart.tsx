"use client";

import { motion, useReducedMotion } from "framer-motion";

const TOKENS = [8, 32, 64, 96, 115];

const SERIES = [
  {
    key: "alchemyst",
    label: "Alchemyst",
    color: "#F49025",
    points: [92, 92.5, 91.8, 92.2, 92],
  },
  {
    key: "vectordb",
    label: "Vector DB",
    color: "#128F8B",
    points: [88, 85, 78, 70, 63],
  },
  {
    key: "fullctx",
    label: "Full-context GPT-4o",
    color: "#94A3B8",
    points: [90, 88, 72, 55, 41],
  },
];

const W = 760;
const H = 340;
const PAD_L = 56;
const PAD_R = 32;
const PAD_T = 60;
const PAD_B = 60;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

const X_MIN = TOKENS[0];
const X_MAX = TOKENS[TOKENS.length - 1];
const Y_MIN = 40;
const Y_MAX = 100;

function xToPx(x: number) {
  return PAD_L + ((x - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
}
function yToPx(y: number) {
  return PAD_T + (1 - (y - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_H;
}

function linePath(points: number[]) {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xToPx(TOKENS[i])} ${yToPx(p)}`)
    .join(" ");
}

function areaPath(points: number[]) {
  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xToPx(TOKENS[i])} ${yToPx(p)}`)
    .join(" ");
  return `${line} L ${xToPx(TOKENS[TOKENS.length - 1])} ${yToPx(Y_MIN)} L ${xToPx(TOKENS[0])} ${yToPx(Y_MIN)} Z`;
}

const PATH_LEN = 1200;

export default function BenchmarkChart() {
  const reduce = useReducedMotion();

  return (
    <div className="w-full">
      <div className="flex justify-center mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 font-medium">
          Illustrative · accuracy vs conversation context
        </p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto bg-white border border-slate-200 rounded-none shadow-[0_20px_60px_-16px_rgba(0,0,0,0.05)] overflow-hidden">
        
        <svg viewBox={`0 0 ${W} ${H}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Line chart: accuracy vs conversation context tokens, showing Alchemyst stable around 92 percent, Vector DB decaying from 88 to 63 percent, and Full-context GPT-4o decaying from 90 to 41 percent. Illustrative." className="w-full h-full p-6 md:p-8">
          
          <defs>
            <linearGradient id="gradient-alchemyst" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F49025" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#F49025" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradient-vectordb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#128F8B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#128F8B" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradient-fullctx" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#94A3B8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Legend - Moved to Top inside the box */}
          {SERIES.map((s, i) => (
            <g key={`leg-${s.key}`} transform={`translate(${PAD_L + (PLOT_W / 3) * i}, 20)`}>
              <line x1="0" y1="0" x2="16" y2="0" stroke={s.color} strokeWidth={s.key === "alchemyst" ? "3" : "2"} strokeLinecap="round" />
              <circle cx="8" cy="0" r={s.key === "alchemyst" ? "4" : "3"} fill="#FFFFFF" stroke={s.color} strokeWidth="2" />
              <text x="24" y="4" fill="#0F172A" fontSize="11" fontFamily="Inter, sans-serif" fontWeight={s.key === "alchemyst" ? "600" : "500"}>{s.label}</text>
            </g>
          ))}

          {/* Y-axis grid */}
          {[40, 55, 70, 85, 100].map((y) => (
            <g key={`grid-${y}`}>
              <line
                x1={PAD_L} y1={yToPx(y)} x2={W - PAD_R} y2={yToPx(y)}
                stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4"
              />
              <text
                x={PAD_L - 12} y={yToPx(y) + 4}
                textAnchor="end" fill="#64748B" fontSize="10"
                fontFamily="JetBrains Mono, monospace" fontWeight="500"
              >
                {y}%
              </text>
            </g>
          ))}

          {/* X-axis labels */}
          {TOKENS.map((t) => (
            <g key={`xtick-${t}`}>
              <line x1={xToPx(t)} y1={yToPx(40)} x2={xToPx(t)} y2={yToPx(40) + 4} stroke="#CBD5E1" strokeWidth="1" />
              <text
                x={xToPx(t)} y={H - PAD_B + 20}
                textAnchor="middle" fill="#64748B" fontSize="10"
                fontFamily="JetBrains Mono, monospace" fontWeight="500"
              >
                {t}K
              </text>
            </g>
          ))}
          
          <text
            x={PAD_L + PLOT_W / 2} y={H - 12}
            textAnchor="middle" fill="#475569" fontSize="10"
            fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em" fontWeight="600"
          >
            CONVERSATION TOKENS
          </text>

          {/* Y-axis label */}
          <text
            x={14} y={PAD_T + PLOT_H / 2}
            textAnchor="middle" fill="#475569" fontSize="10"
            fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em" fontWeight="600"
            transform={`rotate(-90, 14, ${PAD_T + PLOT_H / 2})`}
          >
            ACCURACY
          </text>

          {/* Series paths and areas */}
          {SERIES.map((s, i) => (
            <g key={s.key}>
              <motion.path
                d={areaPath(s.points)}
                fill={`url(#gradient-${s.key})`}
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={reduce ? undefined : { duration: 1.5, delay: 0.2 + i * 0.2 }}
              />
              <motion.path
                d={linePath(s.points)}
                stroke={s.color}
                strokeWidth={s.key === "alchemyst" ? "3" : "2"}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={reduce ? false : { strokeDashoffset: PATH_LEN }}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={reduce ? undefined : { duration: 1.5, delay: 0.2 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ strokeDasharray: PATH_LEN }}
              />
            </g>
          ))}

          {/* Data points */}
          {SERIES.map((s) =>
            s.points.map((p, i) => (
              <motion.circle
                key={`pt-${s.key}-${i}`}
                cx={xToPx(TOKENS[i])}
                cy={yToPx(p)}
                r={s.key === "alchemyst" ? "4" : "3"}
                fill="#FFFFFF"
                stroke={s.color}
                strokeWidth="2"
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={reduce ? undefined : { duration: 0.4, delay: 0.8 + i * 0.1, type: "spring", stiffness: 200 }}
                style={{ transformOrigin: `${xToPx(TOKENS[i])}px ${yToPx(p)}px` }}
              />
            )),
          )}
        </svg>
      </div>
    </div>
  );
}