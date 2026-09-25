"use client";

/**
 * ContextGraphField
 * ─────────────────
 * Ambient background canvas. Small knowledge-graph clusters (a hub plus a few
 * related nodes) drift slowly across the surface. When two clusters come near,
 * one reaches out with a bridge edge; once joined, signal pulses travel along
 * internal edges and hop across bridges. When the clusters drift apart, the
 * bridge snaps in the middle and each half retracts.
 *
 * It suggests context forming, being shared and being remembered. It should stay
 * faint enough to sit behind foreground content without competing for attention.
 *
 * The component fills its nearest positioned ancestor (defaults to `inset-0`).
 * Pass a className like `-inset-16` to let it bleed past the content.
 */

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ── palette (brand, from globals.css) ───────────────────────────────────── */
type RGB = readonly [number, number, number];
const INK: RGB = [74, 59, 51]; //    --ink
const NODE: RGB = [150, 128, 100]; // warm taupe between ink and sand
const AMBER: RGB = [180, 83, 9]; //  --amber
const GOLD: RGB = [161, 98, 7]; //   --teal (remapped gold)
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/* ── tuning ──────────────────────────────────────────────────────────────── */
const LINK_DIST = 235; //      centre distance at which clusters may reach out
const BREAK_DIST = 300; //     beyond this an existing bridge lets go
const SEPARATION = 88; //      clusters gently repel inside this radius
const MAX_LINKS = 2; //        bridges per cluster, which keeps groups small
const GROW_PER_MS = 1 / 1500; // bridge reach-out speed
const RETRACT_PER_MS = 1 / 950;
const PULSE_PX_PER_MS = 0.055;
const MAX_PULSES = 7;
const PING_MS = 1100;
const FADE_IN_MS = 1600;

/* ── types ───────────────────────────────────────────────────────────────── */
interface GNode {
  ox: number; oy: number; // local offset from cluster centre
  phase: number; freq: number; amp: number; // "breathing" wobble
  size: number;
  x: number; y: number; // world position, written each frame
}
interface Cluster {
  x: number; y: number;
  heading: number; speed: number; turn: number;
  angle: number; spin: number;
  nodes: GNode[];
  edges: [number, number][];
  accent: RGB | null; // hub tint for a minority of clusters
}
interface Bridge {
  a: number; na: number; b: number; nb: number;
  s: number; // 0..1 extension
  target: 0 | 1;
  life: number; // ms remaining once fully linked
  linked: boolean; // reached the other side at least once
}
interface Pulse {
  fc: number; fn: number; tc: number; tn: number;
  t: number; hops: number; color: RGB; bridgeKey: string | null;
}
interface Ping { c: number; n: number; born: number; color: RGB; strength: number; }

/* ── helpers ─────────────────────────────────────────────────────────────── */
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const randInt = (n: number) => Math.floor(Math.random() * n);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function makeCluster(x: number, y: number, scale: number): Cluster {
  const count = 4 + randInt(4); // 4–7 nodes
  const nodes: GNode[] = [];
  const mk = (ox: number, oy: number, size: number): GNode => ({
    ox, oy, size, x: 0, y: 0,
    phase: Math.random() * Math.PI * 2,
    freq: rand(0.0004, 0.0009),
    amp: rand(1.2, 3.2) * scale,
  });
  nodes.push(mk(0, 0, 2.3));
  for (let i = 1; i < count; i++) {
    let best: [number, number] = [0, 0];
    for (let tries = 0; tries < 24; tries++) {
      const a = Math.random() * Math.PI * 2;
      const r = rand(16, 48) * scale;
      const ox = Math.cos(a) * r;
      const oy = Math.sin(a) * r * 0.82;
      best = [ox, oy];
      if (nodes.every((n) => Math.hypot(n.ox - ox, n.oy - oy) > 14 * scale)) break;
    }
    nodes.push(mk(best[0], best[1], rand(1.4, 1.9)));
  }

  // Spanning tree (each node to its nearest predecessor) plus an occasional
  // extra edge to close a loop, so each cluster reads as a small graph.
  const edges: [number, number][] = [];
  const has = (i: number, j: number) => edges.some(([a, b]) => (a === i && b === j) || (a === j && b === i));
  for (let i = 1; i < nodes.length; i++) {
    let nearest = 0;
    let nd = Infinity;
    for (let j = 0; j < i; j++) {
      const d = Math.hypot(nodes[i].ox - nodes[j].ox, nodes[i].oy - nodes[j].oy);
      if (d < nd) { nd = d; nearest = j; }
    }
    edges.push([nearest, i]);
  }
  if (nodes.length >= 5 && Math.random() < 0.7) {
    for (let tries = 0; tries < 12; tries++) {
      const i = randInt(nodes.length);
      const j = randInt(nodes.length);
      if (i === j || has(i, j)) continue;
      if (Math.hypot(nodes[i].ox - nodes[j].ox, nodes[i].oy - nodes[j].oy) < 44 * scale) {
        edges.push([i, j]);
        break;
      }
    }
  }

  const r = Math.random();
  return {
    x, y,
    heading: Math.random() * Math.PI * 2,
    speed: rand(0.09, 0.2),
    turn: 0,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.0016,
    nodes,
    edges,
    accent: r < 0.18 ? AMBER : r < 0.3 ? GOLD : null,
  };
}

/* ── component ───────────────────────────────────────────────────────────── */

export interface ContextGraphFieldProps {
  className?: string;
  /** Clusters per 100k px² (default 1). */
  density?: number;
  minClusters?: number;
  maxClusters?: number;
  /** Global alpha multiplier for everything drawn (default 1). */
  intensity?: number;
  /** CSS mask-image used to feather the field's edges. */
  mask?: string;
}

export default function ContextGraphField({
  className,
  density = 1,
  minClusters = 5,
  maxClusters = 16,
  intensity = 1,
  mask = "radial-gradient(ellipse 75% 70% at 50% 50%, #000 35%, transparent 85%)",
}: ContextGraphFieldProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let scale = 1;
    let clusters: Cluster[] = [];
    const bridges = new Map<string, Bridge>();
    const cooldown = new Map<string, number>();
    let pulses: Pulse[] = [];
    let pings: Ping[] = [];
    let simT = 0;
    let last = 0;
    let nextSpawn = 900;
    let raf = 0;
    let inView = false;
    let pageVisible = !document.hidden;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = mq.matches;

    /* ── seeding ── */
    const seed = (n: number) => {
      // Jittered grid so clusters start evenly spread rather than clumped.
      const cols = Math.max(1, Math.round(Math.sqrt((n * w) / h)));
      const rows = Math.ceil(n / cols);
      const cw = w / cols;
      const ch = h / rows;
      const out: Cluster[] = [];
      for (let i = 0; i < n; i++) {
        const cx = (i % cols) * cw + cw * rand(0.25, 0.75);
        const cy = Math.floor(i / cols) * ch + ch * rand(0.25, 0.75);
        out.push(makeCluster(cx, cy, scale));
      }
      clusters = out;
      bridges.clear();
      cooldown.clear();
      pulses = [];
      pings = [];
    };

    /* ── per-frame geometry ── */
    const layout = () => {
      for (const c of clusters) {
        const cos = Math.cos(c.angle);
        const sin = Math.sin(c.angle);
        for (const n of c.nodes) {
          const lx = n.ox + Math.sin(simT * n.freq + n.phase) * n.amp;
          const ly = n.oy + Math.cos(simT * n.freq * 0.8 + n.phase) * n.amp;
          n.x = c.x + lx * cos - ly * sin;
          n.y = c.y + lx * sin + ly * cos;
        }
      }
    };

    const nearestPair = (i: number, j: number): [number, number] => {
      let best: [number, number] = [0, 0];
      let bd = Infinity;
      for (let a = 0; a < clusters[i].nodes.length; a++) {
        const A = clusters[i].nodes[a];
        for (let b = 0; b < clusters[j].nodes.length; b++) {
          const B = clusters[j].nodes[b];
          const d = (A.x - B.x) ** 2 + (A.y - B.y) ** 2;
          if (d < bd) { bd = d; best = [a, b]; }
        }
      }
      return best;
    };

    const addPing = (c: number, n: number, color: RGB, strength: number) => {
      pings.push({ c, n, born: simT, color, strength });
    };

    /** Next hop for a pulse sitting on (c, n), preferring bridges to other clusters. */
    const chooseNext = (c: number, n: number, pc: number, pn: number) => {
      const opts: { c: number; n: number; key: string | null; w: number }[] = [];
      for (const [x, y] of clusters[c].edges) {
        if (x === n) opts.push({ c, n: y, key: null, w: 1 });
        else if (y === n) opts.push({ c, n: x, key: null, w: 1 });
      }
      bridges.forEach((b, key) => {
        if (!b.linked || b.target !== 1) return;
        if (b.a === c && b.na === n) opts.push({ c: b.b, n: b.nb, key, w: 5 });
        else if (b.b === c && b.nb === n) opts.push({ c: b.a, n: b.na, key, w: 5 });
      });
      const fwd = opts.filter((o) => !(o.c === pc && o.n === pn));
      if (!fwd.length) return null;
      let total = 0;
      for (const o of fwd) total += o.w;
      let r = Math.random() * total;
      for (const o of fwd) {
        r -= o.w;
        if (r <= 0) return o;
      }
      return fwd[fwd.length - 1];
    };

    /* ── simulation ── */
    const step = (elapsed: number) => {
      const k = elapsed / 16.667;
      simT += elapsed;

      // Drift: a slowly wandering heading, reflected softly at the edges.
      const pad = 50 * scale;
      for (const c of clusters) {
        c.turn = clamp(c.turn + (Math.random() - 0.5) * 0.0006 * k, -0.0035, 0.0035);
        c.heading += c.turn * k;
        c.x += Math.cos(c.heading) * c.speed * k;
        c.y += Math.sin(c.heading) * c.speed * k;
        if ((c.x < -pad && Math.cos(c.heading) < 0) || (c.x > w + pad && Math.cos(c.heading) > 0)) {
          c.heading = Math.PI - c.heading;
        }
        if ((c.y < -pad && Math.sin(c.heading) < 0) || (c.y > h + pad && Math.sin(c.heading) > 0)) {
          c.heading = -c.heading;
        }
        c.angle += c.spin * k;
      }

      // Soft separation so clusters never merge into one blob.
      const sep = SEPARATION * scale;
      for (let i = 0; i < clusters.length; i++) {
        for (let j = i + 1; j < clusters.length; j++) {
          const A = clusters[i];
          const B = clusters[j];
          const dx = B.x - A.x;
          const dy = B.y - A.y;
          const d = Math.hypot(dx, dy);
          if (d < sep && d > 0.01) {
            const push = (sep - d) * 0.004 * k;
            A.x -= (dx / d) * push; A.y -= (dy / d) * push;
            B.x += (dx / d) * push; B.y += (dy / d) * push;
          }
        }
      }

      layout();

      // Bridges: reach out, hold for a while, then let go.
      const links = new Array(clusters.length).fill(0);
      bridges.forEach((b) => { links[b.a]++; links[b.b]++; });
      const linkD = LINK_DIST * scale;
      const breakD = BREAK_DIST * scale;
      for (let i = 0; i < clusters.length; i++) {
        for (let j = i + 1; j < clusters.length; j++) {
          const key = `${i}:${j}`;
          const d = Math.hypot(clusters[j].x - clusters[i].x, clusters[j].y - clusters[i].y);
          const b = bridges.get(key);
          if (!b) {
            if (
              d < linkD &&
              links[i] < MAX_LINKS &&
              links[j] < MAX_LINKS &&
              (cooldown.get(key) ?? 0) < simT &&
              Math.random() < 0.01 * k
            ) {
              // Randomise which side reaches out.
              const flip = Math.random() < 0.5;
              const [ca, cb] = flip ? [j, i] : [i, j];
              const [na, nb] = nearestPair(ca, cb);
              bridges.set(key, { a: ca, na, b: cb, nb, s: 0, target: 1, life: rand(4500, 11000), linked: false });
              links[i]++; links[j]++;
            }
            continue;
          }
          if (d > breakD * 1.6) {
            bridges.delete(key);
            cooldown.set(key, simT + 3000);
            continue;
          }
          if (b.target === 1) {
            if (d > breakD) b.target = 0;
            else if (b.s < 1) {
              b.s = Math.min(1, b.s + elapsed * GROW_PER_MS);
              if (b.s === 1 && !b.linked) {
                b.linked = true;
                addPing(b.a, b.na, GOLD, 0.55);
                addPing(b.b, b.nb, GOLD, 0.55);
              }
            } else {
              b.life -= elapsed;
              if (b.life <= 0) b.target = 0;
            }
          } else {
            b.s = Math.max(0, b.s - elapsed * RETRACT_PER_MS);
            if (b.s === 0) {
              bridges.delete(key);
              cooldown.set(key, simT + rand(4000, 10000));
            }
          }
        }
      }

      // Pulses: a signal starts somewhere, hops along edges (preferring bridges),
      // and leaves a small "write" ping where it comes to rest.
      if (simT > nextSpawn && pulses.length < MAX_PULSES && clusters.length) {
        nextSpawn = simT + rand(650, 1700);
        const live: Bridge[] = [];
        bridges.forEach((b) => { if (b.linked && b.target === 1) live.push(b); });
        let fc: number;
        let fn: number;
        if (live.length && Math.random() < 0.7) {
          const b = live[randInt(live.length)];
          if (Math.random() < 0.5) { fc = b.a; fn = b.na; } else { fc = b.b; fn = b.nb; }
        } else {
          fc = randInt(clusters.length);
          fn = randInt(clusters[fc].nodes.length);
        }
        const next = chooseNext(fc, fn, -1, -1);
        if (next) {
          pulses.push({
            fc, fn, tc: next.c, tn: next.n, t: 0,
            hops: 3 + randInt(5),
            color: Math.random() < 0.6 ? AMBER : GOLD,
            bridgeKey: next.key,
          });
        }
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        if (p.bridgeKey) {
          const b = bridges.get(p.bridgeKey);
          if (!b || b.target !== 1) { pulses.splice(i, 1); continue; }
        }
        const A = clusters[p.fc].nodes[p.fn];
        const B = clusters[p.tc].nodes[p.tn];
        const len = Math.hypot(B.x - A.x, B.y - A.y) || 1;
        p.t += (PULSE_PX_PER_MS * elapsed) / len;
        if (p.t >= 1) {
          p.hops--;
          const next = p.hops > 0 ? chooseNext(p.tc, p.tn, p.fc, p.fn) : null;
          if (!next) {
            addPing(p.tc, p.tn, p.color, 1);
            pulses.splice(i, 1);
            continue;
          }
          p.fc = p.tc; p.fn = p.tn;
          p.tc = next.c; p.tn = next.n;
          p.bridgeKey = next.key;
          p.t = 0;
        }
      }

      pings = pings.filter((pg) => simT - pg.born < PING_MS);
    };

    /** For reduced motion: link every eligible pair at once and draw one frame. */
    const settle = () => {
      layout();
      bridges.clear();
      pulses = [];
      pings = [];
      const links = new Array(clusters.length).fill(0);
      for (let i = 0; i < clusters.length; i++) {
        for (let j = i + 1; j < clusters.length; j++) {
          const d = Math.hypot(clusters[j].x - clusters[i].x, clusters[j].y - clusters[i].y);
          if (d < LINK_DIST * scale && links[i] < MAX_LINKS && links[j] < MAX_LINKS) {
            const [na, nb] = nearestPair(i, j);
            bridges.set(`${i}:${j}`, { a: i, na, b: j, nb, s: 1, target: 1, life: Infinity, linked: true });
            links[i]++; links[j]++;
          }
        }
      }
    };

    /* ── rendering ── */
    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const fade = reduce ? 1 : easeInOut(clamp(simT / FADE_IN_MS, 0, 1));
      const I = intensity * fade;
      if (I <= 0) return;
      ctx.lineCap = "round";

      // Bridges (under everything else).
      bridges.forEach((b) => {
        const A = clusters[b.a].nodes[b.na];
        const B = clusters[b.b].nodes[b.nb];
        const e = easeInOut(b.s);
        ctx.lineWidth = 1;
        if (b.target === 1 || !b.linked) {
          // Reaching out: grows from A toward B, with a bright tip.
          const tx = A.x + (B.x - A.x) * e;
          const ty = A.y + (B.y - A.y) * e;
          ctx.strokeStyle = rgba(GOLD, 0.2 * I * (b.linked ? 1 : 0.55 + 0.45 * e));
          ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(tx, ty); ctx.stroke();
          if (!b.linked && b.s > 0.02) {
            ctx.fillStyle = rgba(AMBER, 0.45 * I);
            ctx.fillRect(tx - 1.2, ty - 1.2, 2.4, 2.4);
          }
        } else {
          // Letting go: snaps at the midpoint, each half retracts home.
          const half = e * 0.5;
          ctx.strokeStyle = rgba(GOLD, 0.2 * I * (0.35 + 0.65 * e));
          ctx.beginPath();
          ctx.moveTo(A.x, A.y); ctx.lineTo(A.x + (B.x - A.x) * half, A.y + (B.y - A.y) * half);
          ctx.moveTo(B.x, B.y); ctx.lineTo(B.x + (A.x - B.x) * half, B.y + (A.y - B.y) * half);
          ctx.stroke();
        }
      });

      // Internal cluster edges.
      ctx.strokeStyle = rgba(INK, 0.11 * I);
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const c of clusters) {
        for (const [i, j] of c.edges) {
          ctx.moveTo(c.nodes[i].x, c.nodes[i].y);
          ctx.lineTo(c.nodes[j].x, c.nodes[j].y);
        }
      }
      ctx.stroke();

      // Pulse trails: the edge "lights up" behind the travelling signal.
      for (const p of pulses) {
        const A = clusters[p.fc].nodes[p.fn];
        const B = clusters[p.tc].nodes[p.tn];
        const t0 = Math.max(0, p.t - 0.45);
        const x0 = A.x + (B.x - A.x) * t0;
        const y0 = A.y + (B.y - A.y) * t0;
        const x1 = A.x + (B.x - A.x) * p.t;
        const y1 = A.y + (B.y - A.y) * p.t;
        const g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, rgba(p.color, 0));
        g.addColorStop(1, rgba(p.color, 0.42 * I));
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.25;
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      }

      // Bridge endpoints glow faintly while linked.
      bridges.forEach((b) => {
        if (!b.linked) return;
        const a = 0.1 * I * easeInOut(b.s);
        ctx.fillStyle = rgba(GOLD, a);
        for (const [c, n] of [[b.a, b.na], [b.b, b.nb]] as const) {
          const N = clusters[c].nodes[n];
          ctx.fillRect(N.x - 5, N.y - 5, 10, 10);
        }
      });

      // Nodes: sharp squares, matching the brand's square markers.
      for (const c of clusters) {
        for (let i = 0; i < c.nodes.length; i++) {
          const n = c.nodes[i];
          const s = n.size;
          if (i === 0 && c.accent) {
            ctx.fillStyle = rgba(c.accent, 0.1 * I);
            ctx.fillRect(n.x - s - 3, n.y - s - 3, (s + 3) * 2, (s + 3) * 2);
            ctx.fillStyle = rgba(c.accent, 0.7 * I);
          } else {
            ctx.fillStyle = rgba(NODE, (i === 0 ? 0.6 : 0.45) * I);
          }
          ctx.fillRect(n.x - s, n.y - s, s * 2, s * 2);
        }
      }

      // Pulse heads.
      for (const p of pulses) {
        const A = clusters[p.fc].nodes[p.fn];
        const B = clusters[p.tc].nodes[p.tn];
        const x = A.x + (B.x - A.x) * p.t;
        const y = A.y + (B.y - A.y) * p.t;
        ctx.fillStyle = rgba(p.color, 0.14 * I);
        ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = rgba(p.color, 0.8 * I);
        ctx.beginPath(); ctx.arc(x, y, 1.8, 0, Math.PI * 2); ctx.fill();
      }

      // Pings: an expanding square outline where context is written/linked.
      ctx.lineWidth = 1;
      for (const pg of pings) {
        const N = clusters[pg.c]?.nodes[pg.n];
        if (!N) continue;
        const t = (simT - pg.born) / PING_MS;
        const r = 3 + easeInOut(t) * 11;
        ctx.strokeStyle = rgba(pg.color, (1 - t) * 0.38 * pg.strength * I);
        ctx.strokeRect(N.x - r, N.y - r, r * 2, r * 2);
      }
    };

    /* ── loop / lifecycle ── */
    const frame = (now: number) => {
      raf = 0;
      const elapsed = last ? Math.min(now - last, 64) : 16.667;
      last = now;
      step(elapsed);
      draw();
      schedule();
    };
    const schedule = () => {
      if (!raf && inView && pageVisible && !reduce && w > 0) raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const nw = Math.round(rect.width);
      const nh = Math.round(rect.height);
      if (!nw || !nh) return;
      const changed = nw !== w || nh !== h;
      w = nw;
      h = nh;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      if (!changed && clusters.length) return;
      scale = clamp(Math.min(w, h * 1.6) / 1200, 0.65, 1);
      const n = clamp(Math.round(((w * h) / 100_000) * density), minClusters, maxClusters);
      if (!clusters.length || Math.abs(n - clusters.length) > 2) seed(n);
      if (reduce) {
        settle();
        draw();
      } else {
        layout();
        draw();
        schedule();
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) schedule();
        else stop();
      },
      { rootMargin: "120px 0px" },
    );
    io.observe(wrap);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) schedule();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onMotion = () => {
      reduce = mq.matches;
      if (reduce) {
        stop();
        settle();
        draw();
      } else {
        bridges.clear();
        schedule();
      }
    };
    mq.addEventListener("change", onMotion);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mq.removeEventListener("change", onMotion);
    };
  }, [density, minClusters, maxClusters, intensity]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
