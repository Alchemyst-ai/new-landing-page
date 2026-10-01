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
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { benchmarkData } from "@/lib/benchmarks";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  ratio: { label: "Value score" },
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

export default function ValueIndexChart() {
  const data = useMemo(
    () =>
      benchmarkData
        .map((d) => {
          const key = keyFor(d.name);
          return {
            ...d,
            ratio: d.performance / d.price,
            fill: `var(--color-${key})`,
          };
        })
        .sort((a, b) => b.ratio - a.ratio),
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Value index</CardTitle>
        <CardDescription>
          Amount of intelligence delivered per dollar spent.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[280px] w-full">
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ left: 8, right: 72, top: 4, bottom: 4 }}
          >
            <CartesianGrid horizontal={false} />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              width={132}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="ratio" radius={4}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
              <LabelList
                dataKey="ratio"
                position="right"
                formatter={(v) =>
                  typeof v === "number" ? `${v.toFixed(1)}x` : ""
                }
                className="fill-foreground text-[13px] font-bold"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
        <p className="mt-6 border-t pt-4 text-sm italic text-muted-foreground">
          Alchemyst delivers over 12x more performance value per dollar
          compared to the nearest competitor.
        </p>
      </CardContent>
    </Card>
  );
}
