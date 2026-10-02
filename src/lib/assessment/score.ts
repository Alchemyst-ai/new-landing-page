import type { Role } from "@/lib/assessment/schema";

export type ScoreBand = "Nascent" | "Emerging" | "Scaling" | "Leading";

const BANDS: { max: number; band: ScoreBand; meaning: string }[] = [
  { max: 25, band: "Nascent", meaning: "Ad hoc agents with no shared context. Start by making context visible." },
  { max: 50, band: "Emerging", meaning: "Logging or pilots exist, but memory does not compound across runs." },
  { max: 75, band: "Scaling", meaning: "Observability exists. Cross agent collaboration is the next gap to close." },
  { max: 100, band: "Leading", meaning: "Shared context plus an improvement loop. Optimize for measured ROI." },
];

export function scoreBand(score: number): { band: ScoreBand; meaning: string } {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  const entry = BANDS.find((b) => clamped <= b.max) ?? BANDS[BANDS.length - 1];
  return { band: entry.band, meaning: entry.meaning };
}

const ROLE_HINT: Record<Role, string> = {
  builder: "your team ships agents",
  manager: "your team coordinates agents",
  stakeholder: "your organization scales AI",
};

export function scoreBridgeLine(score: number, role: Role, focusTheme: string): string {
  const { band } = scoreBand(score);
  return `Scored ${Math.round(score)} (${band}) for how ${ROLE_HINT[role]}. The next lever is ${focusTheme}.`;
}
