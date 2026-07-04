"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Configuration ──────────────────────────────────────────────────────────
const NODE_COUNT = 55;
const CONNECT_DISTANCE = 160;
const PULSE_INTERVAL = 2200; // ms between pulse spawns
const MAX_PULSES = 6;

const BRAND_ORANGE = "#F49025";
const BRAND_TEAL = "#128F8B";
const NODE_COLOR = "#CBD5E1";
const LINE_COLOR_R = 203;
const LINE_COLOR_G = 213;
const LINE_COLOR_B = 225;

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  accent: boolean;
}

interface Pulse {
  fromIdx: number;
  toIdx: number;
  progress: number; // 0→1
  speed: number;
  color: string;
}

function createNodes(w: number, h: number): Node[] {
  const nodes: Node[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const isAccent = i < 4;
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: isAccent ? 3 : 2,
      color: isAccent
        ? i < 2
          ? BRAND_ORANGE
          : BRAND_TEAL
        : NODE_COLOR,
      accent: isAccent,
    });
  }
  return nodes;
}

export default function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const animRef = useRef<number>(0);
  const lastPulseRef = useRef<number>(0);
  const dprRef = useRef<number>(1);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    // Reinitialize nodes only if we have none or the canvas resized significantly
    if (nodesRef.current.length === 0) {
      nodesRef.current = createNodes(w, h);
    }
  }, []);

  const tick = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = dprRef.current;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const nodes = nodesRef.current;
    const pulses = pulsesRef.current;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // ── Update nodes ──
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      // Bounce off edges with padding
      if (n.x < -40) n.vx = Math.abs(n.vx);
      if (n.x > w + 40) n.vx = -Math.abs(n.vx);
      if (n.y < -40) n.vy = Math.abs(n.vy);
      if (n.y > h + 40) n.vy = -Math.abs(n.vy);
    }

    // ── Draw edges ──
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DISTANCE) {
          const alpha = (1 - dist / CONNECT_DISTANCE) * 0.18;
          ctx.strokeStyle = `rgba(${LINE_COLOR_R},${LINE_COLOR_G},${LINE_COLOR_B},${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // ── Spawn pulses ──
    if (time - lastPulseRef.current > PULSE_INTERVAL && pulses.length < MAX_PULSES) {
      // Find a pair of connected nodes
      const candidates: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < CONNECT_DISTANCE * 0.8) {
            candidates.push([i, j]);
          }
        }
      }
      if (candidates.length > 0) {
        const [fi, ti] = candidates[Math.floor(Math.random() * candidates.length)];
        const reverse = Math.random() > 0.5;
        pulses.push({
          fromIdx: reverse ? ti : fi,
          toIdx: reverse ? fi : ti,
          progress: 0,
          speed: 0.012 + Math.random() * 0.01,
          color: Math.random() > 0.5 ? BRAND_ORANGE : BRAND_TEAL,
        });
        lastPulseRef.current = time;
      }
    }

    // ── Update & draw pulses ──
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.progress += p.speed;
      if (p.progress > 1) {
        pulses.splice(i, 1);
        continue;
      }
      const from = nodes[p.fromIdx];
      const to = nodes[p.toIdx];
      const px = from.x + (to.x - from.x) * p.progress;
      const py = from.y + (to.y - from.y) * p.progress;
      const pulseAlpha = Math.sin(p.progress * Math.PI); // fade in/out

      // Glow
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fillStyle =
        p.color === BRAND_ORANGE
          ? `rgba(244,144,37,${0.15 * pulseAlpha})`
          : `rgba(18,143,139,${0.15 * pulseAlpha})`;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle =
        p.color === BRAND_ORANGE
          ? `rgba(244,144,37,${0.9 * pulseAlpha})`
          : `rgba(18,143,139,${0.9 * pulseAlpha})`;
      ctx.fill();
    }

    // ── Draw nodes ──
    for (const n of nodes) {
      const s = n.size;
      // Sharp square for regular nodes, filled rect
      if (n.accent) {
        // Accent glow
        ctx.fillStyle =
          n.color === BRAND_ORANGE
            ? "rgba(244,144,37,0.12)"
            : "rgba(18,143,139,0.12)";
        ctx.fillRect(n.x - s - 3, n.y - s - 3, (s + 3) * 2, (s + 3) * 2);
      }
      ctx.fillStyle = n.color;
      ctx.fillRect(n.x - s, n.y - s, s * 2, s * 2);
    }

    animRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    resize();
    animRef.current = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    // Reduced motion: stop animation loop
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotion = () => {
      if (mq.matches) {
        cancelAnimationFrame(animRef.current);
      } else {
        animRef.current = requestAnimationFrame(tick);
      }
    };
    mq.addEventListener("change", handleMotion);
    if (mq.matches) cancelAnimationFrame(animRef.current);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      mq.removeEventListener("change", handleMotion);
    };
  }, [resize, tick]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
      }}
    />
  );
}
