"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ROLE_LABELS, type Role } from "@/lib/assessment/schema";
import { scoreBand, scoreBridgeLine, type ScoreBand } from "@/lib/assessment/score";
import { cn } from "@/lib/utils";

const BAND_SCALE: { band: ScoreBand; from: number; to: number }[] = [
  { band: "Nascent", from: 0, to: 25 },
  { band: "Emerging", from: 26, to: 50 },
  { band: "Scaling", from: 51, to: 75 },
  { band: "Leading", from: 76, to: 100 },
];

export function ScoreCard({
  score,
  focusTheme,
  role,
  archetype,
}: {
  score: number;
  focusTheme: string;
  role: Role;
  archetype: string;
}) {
  const rounded = Math.max(0, Math.min(100, Math.round(score)));
  const { band, meaning } = scoreBand(score);
  return (
    <Card className="overflow-hidden">
      <CardHeader className="gap-4 sm:flex sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-2">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {ROLE_LABELS[role]} profile
          </p>
          <CardTitle className="text-2xl leading-tight md:text-3xl">{archetype}</CardTitle>
          <CardDescription className="leading-relaxed">{meaning}</CardDescription>
        </div>
        <div
          className="flex shrink-0 flex-col items-start gap-1 sm:items-end"
          aria-label={`Context maturity score ${rounded} out of 100, ${band}`}
          role="img"
        >
          <p className="flex items-baseline gap-1.5">
            <span className="text-5xl font-bold leading-none tabular-nums text-foreground md:text-6xl">
              {rounded}
            </span>
            <span className="text-base text-muted-foreground">/ 100</span>
          </p>
          <Badge>{band}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="relative">
            <Progress value={rounded} className="h-2" aria-hidden="true" />
            {[25, 50, 75].map((mark) => (
              <span
                key={mark}
                aria-hidden="true"
                className="absolute inset-y-0 w-0.5 bg-card"
                style={{ left: `${mark}%` }}
              />
            ))}
          </div>
          <ol className="grid grid-cols-4 gap-1 font-mono text-[10px] uppercase tracking-[0.12em]" aria-label="Score bands">
            {BAND_SCALE.map((entry) => (
              <li
                key={entry.band}
                aria-current={entry.band === band ? "true" : undefined}
                className={cn(
                  "flex flex-col",
                  entry.band === band ? "font-semibold text-primary" : "text-muted-foreground",
                )}
              >
                <span>{entry.band}</span>
                <span className="tabular-nums opacity-70">
                  {entry.from} to {entry.to}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <p className="border-l-2 border-primary pl-3 text-sm leading-relaxed">
          {scoreBridgeLine(score, role, focusTheme)}
        </p>
      </CardContent>
    </Card>
  );
}
