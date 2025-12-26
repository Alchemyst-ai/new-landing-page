import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { detailedCategories } from "@/lib/data";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export function CategoryPerformanceBar() {
  // We want to show how much Alchemyst wins or competes in each category
  const data = useMemo(() => {
    return detailedCategories.map(cat => {
      const alchemyst = cat.benchmarks.find(b => b.highlight)?.performance || 0;
      const bestCompetitor = Math.max(...cat.benchmarks.filter(b => !b.highlight).map(b => b.performance));

      return {
        category: cat.category,
        Alchemyst: alchemyst,
        Competitor: bestCompetitor,
        // Calculate the gap to show Alchemyst's competitive standing
        gap: alchemyst - bestCompetitor
      };
    });
  }, []);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="py-4">
        <CardTitle className="text-base font-black uppercase tracking-tight">Relative Performance Advantage</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ left: 20, right: 40, top: 10, bottom: 10 }}
              barGap={0}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" opacity={0.2} />
              <XAxis type="number" domain={[0, 1]} hide />
              <YAxis
                type="category"
                dataKey="category"
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                width={120}
                tickFormatter={(val) => val} // Show full labels
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--primary))', opacity: 0.05 }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-card border border-primary/30 p-2 rounded shadow-xl text-[10px]">
                        <p className="font-bold text-primary mb-1">{d.category}</p>
                        <p className="text-foreground">Alchemyst: <span className="font-mono">{d.Alchemyst.toFixed(3)}</span></p>
                        <p className="text-muted-foreground">Best Competitor: <span className="font-mono">{d.Competitor.toFixed(3)}</span></p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="Alchemyst" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={12}>
                <LabelList
                  dataKey="Alchemyst"
                  position="right"
                  formatter={(value) =>
                    typeof value === "number" ? value.toFixed(2) : ""
                  }
                  style={{
                    fill: "hsl(var(--primary))",
                    fontSize: "9px",
                    fontWeight: "bold"
                  }}
                />
              </Bar>
              <Bar dataKey="Competitor" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} barSize={12}>
                 <LabelList
                  dataKey="Competitor"
                  position="right"
                  formatter={(value) =>
                    typeof value === "number" ? value.toFixed(2) : ""
                  }
                  style={{
                    fill: 'hsl(var(--muted-foreground))',
                    fontSize: '9px'
                  }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-[10px] text-muted-foreground text-center font-mono">
            <span className="text-primary font-bold">ALCHEMIST</span> VS BEST-IN-CLASS COMPETITION
        </div>
      </CardContent>
    </Card>
  );
}
