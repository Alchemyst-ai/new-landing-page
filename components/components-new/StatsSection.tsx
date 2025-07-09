"use client";

import { useEffect, useState } from "react";

export default function StatsSection() {
  return (
    <div className="flex justify-center items-center gap-16 py-8">
      <StatItem end={5000} label="Developers" />
      <StatItem end={400000} label="Queries" />
      <StatItem end={60000000} label="Documents" />
      <StatItem end={30000000000} label="Tokens" />
    </div>
  );
}

function StatItem({ end, label }: { end: number; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.floor(end * eased);
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [end]);

  const formatAbbreviated = (num: number) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(0) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(0) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(0) + "K";
    return num.toString();
  };

  return (
    <span className="text-center">
      <p className="text-6xl font-semibold">{formatAbbreviated(count)}</p>
      <p className="text-lg">{label}</p>
    </span>
  );
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
