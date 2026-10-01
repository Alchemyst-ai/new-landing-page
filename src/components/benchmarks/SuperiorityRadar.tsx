"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { detailedCategories } from "@/lib/benchmarks";
import { useMemo } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";

const chartConfig = {
  alchemyst: { label: "Alchemyst", color: "var(--chart-1)" },
  supermemory: { label: "Supermemory", color: "var(--chart-2)" },
  zep: { label: "Zep", color: "var(--chart-3)" },
  hindsight: { label: "Hindsight GPT", color: "var(--chart-4)" },
} satisfies ChartConfig;

function keyFor(name: string) {
  if (name.includes("Hindsight")) return "hindsight";
  if (name.includes("Zep")) return "zep";
  if (name.includes("Supermemory")) return "supermemory";
  return "alchemyst";
}

export default function SuperiorityRadar() {
  const radarData = useMemo(
    () =>
      detailedCategories.map((cat) => {
        const point: Record<string, string | number> = {
          subject: cat.category,
        };
        for (const b of cat.benchmarks) {
          point[keyFor(b.name)] = b.performance;
        }
        return point;
      }),
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relative superiority</CardTitle>
        <CardDescription>
          Head-to-head F1 across six memory dimensions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <RadarChart accessibilityLayer cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} />
            <PolarRadiusAxis domain={[0, 1]} tick={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Radar
              name="Alchemyst"
              dataKey="alchemyst"
              stroke="var(--color-alchemyst)"
              fill="var(--color-alchemyst)"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Supermemory"
              dataKey="supermemory"
              stroke="var(--color-supermemory)"
              fill="var(--color-supermemory)"
              fillOpacity={0.08}
            />
            <Radar
              name="Zep"
              dataKey="zep"
              stroke="var(--color-zep)"
              fill="var(--color-zep)"
              fillOpacity={0.08}
            />
            <Radar
              name="Hindsight GPT"
              dataKey="hindsight"
              stroke="var(--color-hindsight)"
              fill="var(--color-hindsight)"
              fillOpacity={0.08}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
