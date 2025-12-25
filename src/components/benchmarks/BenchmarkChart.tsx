import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type BenchmarkPoint, benchmarkData } from "@/lib/data";
import { useMemo } from "react";
import {
  Area,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (!data.name) return null;

    return (
      <div className="bg-background/95 border border-primary/50 p-3 rounded-none shadow-[4px_4px_0px_0px_rgba(255,128,0,0.2)] backdrop-blur-md">
        <p className="font-black text-primary uppercase tracking-tighter text-sm">{data.name}</p>
        <div className="h-px bg-primary/20 my-2" />
        <p className="text-[10px] text-muted-foreground uppercase font-bold">
          Cost: <span className="text-foreground font-mono ml-2">${data.price.toFixed(3)}</span>
        </p>
        <p className="text-[10px] text-muted-foreground uppercase font-bold">
          Perf: <span className="text-foreground font-mono ml-2">{data.performance.toFixed(3)}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function BenchmarkChart() {
  const paretoFrontier = useMemo(() => {
    const sorted = [...benchmarkData].sort((a, b) => a.price - b.price);
    const frontier: BenchmarkPoint[] = [];
    let bestPerf = -Infinity;

    for (const p of sorted) {
      if (p.performance > bestPerf) {
        frontier.push(p);
        bestPerf = p.performance;
      }
    }
    // Add a point at the end to close the area to the bottom-right if needed,
    // or just ensure the last point is at the max price but same performance.
    return frontier;
  }, []);

  const minPrice = Math.min(...benchmarkData.map(d => d.price));
  const maxPrice = Math.max(...benchmarkData.map(d => d.price));

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden relative group">
      <CardHeader className="py-4 border-b border-border/50 mb-4 bg-muted/10">
        <CardTitle className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-foreground">
          <div className="w-1 h-3 bg-primary" />
          Efficiency Frontier Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              margin={{ top: 20, right: 30, bottom: 20, left: 10 }}
            >
              <defs>
                <linearGradient id="frontierGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" opacity={0.15} vertical={false} />
              <XAxis
                type="number"
                dataKey="price"
                name="Price"
                scale="log"
                domain={[minPrice * 0.5, maxPrice * 1.5]}
                tickFormatter={(value) => `$${value}`}
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="number"
                dataKey="performance"
                name="Performance"
                domain={[0, 1.1]}
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }} />

              <Area
                data={paretoFrontier}
                type="monotone"
                dataKey="performance"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fill="url(#frontierGradient)"
                name="Pareto Frontier"
                animationDuration={1500}
                connectNulls
              />

              <Scatter name="Models" data={benchmarkData}>
                {benchmarkData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.highlight ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  />
                ))}
                <LabelList
                  dataKey="name"
                  position="top"
                  offset={12}
                  content={(props: any) => {
                    const { x, y, value } = props;
                    return (
                      <text
                        x={x}
                        y={y - 10}
                        fill="#FFFFFF"
                        textAnchor="middle"
                        style={{
                          fontSize: 10,
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {value}
                      </text>
                    );
                  }}
                />
              </Scatter>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between items-center mt-4 text-[9px] font-bold text-muted-foreground tracking-widest uppercase">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Alchemyst</span>
              </div>
              <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  <span>Competitors</span>
              </div>
            </div>
            <div className="italic text-primary/60">Logarithmic Cost Projection</div>
        </div>
      </CardContent>
    </Card>
  );
}
