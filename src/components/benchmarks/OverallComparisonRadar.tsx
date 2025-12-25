import { detailedCategories } from "@/lib/data";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from "recharts";

export function OverallComparisonRadar() {
  // Transform data for Radar Chart
  // We want categories as axes, and models as series
  const models = ["Alchemyst", "Supermemory", "Zep", "Hindsight GPT"];

  const radarData = detailedCategories.map(cat => {
    const dataPoint: any = {
      subject: cat.category,
      fullMark: 1,
    };

    cat.benchmarks.forEach(b => {
      // Mapping from data to radar keys
      let name = b.name;
      if (name.includes("Hindsight")) name = "Hindsight GPT OSS 120B";
      if (name.includes("Zep")) name = "Zep";
      if (name.includes("Supermemory")) name = "Supermemory";

      dataPoint[name] = b.performance;
    });

    return dataPoint;
  });

  return (
    <div className="border border-border bg-card/10 backdrop-blur-md p-8 relative overflow-hidden group">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30" />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-heading font-black uppercase tracking-tighter leading-none mb-2">
            Relative <span className="text-primary italic">Superiority</span>
          </h3>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            Head-to-Head Performance across 5 core memory dimensions
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {[
            { name: "Alchemyst", color: "bg-[#ff8000]" },
            { name: "Supermemory", color: "bg-blue-500" },
            { name: "Zep", color: "bg-purple-500" },
            { name: "Hindsight GPT OSS 120B", color: "bg-emerald-500" }
          ].map((m) => (
            <div key={m.name} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${m.color}`} />
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{m.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[400px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.05)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={(props) => {
                const { x, y, payload } = props;
                return (
                  <text
                    x={x}
                    y={y}
                    fill="#FFFFFF"
                    fontSize={9}
                    fontWeight={900}
                    textAnchor="middle"
                    className="uppercase tracking-widest"
                  >
                    {payload.value}
                  </text>
                );
              }}
            />
            <PolarRadiusAxis domain={[0, 1]} tick={false} axisLine={false} />

            <Radar
              name="Alchemyst"
              dataKey="Alchemyst"
              stroke="#ff8000"
              fill="#ff8000"
              fillOpacity={0.6}
              strokeWidth={3}
              animationDuration={2000}
            />
            <Radar
              name="Hindsight GPT OSS 120B"
              dataKey="Hindsight GPT OSS 120B"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.1}
              strokeWidth={1}
            />
             <Radar
              name="Supermemory"
              dataKey="Supermemory"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.1}
              strokeWidth={1}
            />
            <Radar
              name="Zep"
              dataKey="Zep"
              stroke="#a855f7"
              fill="#a855f7"
              fillOpacity={0.1}
              strokeWidth={1}
            />

            <RechartsTooltip
              contentStyle={{
                backgroundColor: "#0d0d0d",
                border: "1px solid #ff8000",
                borderRadius: "0px",
                fontSize: "10px",
                fontFamily: "var(--font-heading)"
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
