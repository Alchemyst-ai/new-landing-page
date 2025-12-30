import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { benchmarkData } from "@/lib/data";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export function EfficiencyRatioChart() {
  const data = useMemo(() => {
    return benchmarkData.map(d => ({
      ...d,
      // Efficiency Ratio: Performance / Price (using 1/Price for Alchemyst to avoid division by near-zero making it infinite,
      // but here we just use direct Performance/Price to show the massive gap)
      ratio: d.performance / d.price
    })).sort((a, b) => b.ratio - a.ratio);
  }, []);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 relative overflow-hidden group">
      <CardHeader className="py-4">
        <CardTitle className="text-base flex items-center gap-2">
          Value Index (Performance/Cost)
        </CardTitle>
        <CardDescription className="text-xs">
          Amount of intelligence delivered per dollar spent.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 40, right: 80 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#fffeee" opacity={0.2} />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#ffffff"
                fontSize={12}
                width={100}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--primary))', opacity: 0.05 }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-card border border-primary/30 p-3 rounded shadow-xl">
                        <p className="font-bold text-primary">{d.name}</p>
                        <p className="text-sm">Value Score: {d.ratio.toFixed(2)}x</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="ratio" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.highlight ? "url(#orangeGradient)" : "gray"}
                  />
                ))}
                <LabelList
                    dataKey="ratio"
                    position="right"
                    formatter={(val) => (typeof val === "number" ? `${val.toFixed(1)}x` : "")}
                    style={{ fill: 'hsl(var(--foreground))', fontWeight: 'bold', fontSize: '14px' }}
                />
              </Bar>
              <defs>
                <linearGradient id="orangeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f59025" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#f59025" stopOpacity={1}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-4 bg-primary/5 border border-primary/10 rounded-lg">
            <p className="text-sm text-primary font-medium italic">
              "Alchemyst delivers over 12x more performance value per dollar compared to the nearest competitor."
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
