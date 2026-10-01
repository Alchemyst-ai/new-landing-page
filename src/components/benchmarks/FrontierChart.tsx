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
  type ChartConfig,
} from "@/components/ui/chart";
import { benchmarkData } from "@/lib/benchmarks";
import { useMemo } from "react";
import {
  Area,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Scatter,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  performance: { label: "Pareto frontier", color: "var(--chart-1)" },
  alchemyst: { label: "Alchemyst", color: "var(--chart-1)" },
  hindsight: { label: "Hindsight GPT OSS 120B", color: "var(--chart-2)" },
  supermemory: { label: "Supermemory", color: "var(--chart-3)" },
  zep: { label: "Zep", color: "var(--chart-4)" },
} satisfies ChartConfig;

function keyFor(name: string) {
  if (name === "Alchemyst") return "alchemyst";
  if (name.includes("Hindsight")) return "hindsight";
  if (name === "Supermemory") return "supermemory";
  return "zep";
}

function FrontierTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload?: Record<string, unknown> }>;
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload as
    | { name?: string; price?: number; performance?: number; latency?: number }
    | undefined;
  if (!d?.name) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-xl">
      <p className="font-medium text-foreground">{d.name}</p>
      <p className="mt-1 text-muted-foreground">
        Cost:{" "}
        <span className="font-mono text-foreground">
          ${typeof d.price === "number" ? d.price.toFixed(3) : "n/a"}
        </span>
      </p>
      <p className="text-muted-foreground">
        Perf:{" "}
        <span className="font-mono text-foreground">
          {typeof d.performance === "number" ? d.performance.toFixed(3) : "n/a"}
        </span>
      </p>
      {typeof d.latency === "number" && (
        <p className="text-muted-foreground">
          Latency:{" "}
          <span className="font-mono text-foreground">{d.latency}ms</span>
        </p>
      )}
    </div>
  );
}

export default function FrontierChart() {
  const frontier = useMemo(
    () => [...benchmarkData].sort((a, b) => a.price - b.price),
    []
  );
  const minPrice = Math.min(...benchmarkData.map((d) => d.price));
  const maxPrice = Math.max(...benchmarkData.map((d) => d.price));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Efficiency frontier</CardTitle>
        <CardDescription>
          Logarithmic cost projection. Cheaper is left, better is up.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <ComposedChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="price"
              scale="log"
              domain={[minPrice * 0.5, maxPrice * 1.5]}
              tickFormatter={(value: number) => `$${value.toFixed(2)}`}
              tickLine={false}
              axisLine={false}
              fontSize={10}
            />
            <YAxis
              type="number"
              dataKey="performance"
              domain={[0, 1.1]}
              tickLine={false}
              axisLine={false}
              fontSize={10}
              tickFormatter={(val: number) => `${(val * 100).toFixed(0)}%`}
            />
            <ChartTooltip content={<FrontierTooltip />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              data={frontier}
              type="monotone"
              dataKey="performance"
              name="Pareto frontier"
              stroke="var(--color-performance)"
              fill="var(--color-performance)"
              fillOpacity={0.08}
              strokeWidth={2}
            />
            <Scatter name="Models" data={benchmarkData}>
              {benchmarkData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={`var(--color-${keyFor(entry.name)})`}
                />
              ))}
              <LabelList
                dataKey="name"
                position="top"
                offset={12}
                className="fill-foreground text-[10px] font-bold"
              />
            </Scatter>
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
