import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type BenchmarkPoint, benchmarkData } from "@/lib/data";
import { useMemo } from "react";
import {
  Area,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";


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
    return frontier;
  }, []);

  const minPrice = Math.min(...benchmarkData.map(d => d.price));
  const maxPrice = Math.max(...benchmarkData.map(d => d.price));

  // Get Alchemyst and Hindsight data for the connection line
  const alchemyst = benchmarkData.find(d => d.highlight);
  const hindsight = benchmarkData.find(d => d.name === "Hindsight GPT OSS 120B");
  const alchemystToHindsight = useMemo(() => {
    if (alchemyst && hindsight) {
      return [
        { price: alchemyst.price, performance: alchemyst.performance },
        { price: hindsight.price, performance: hindsight.performance }
      ];
    }
    return [];
  }, [alchemyst, hindsight]);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden relative">
      <CardHeader className="py-4 border-b border-border/50 mb-4 bg-muted/10">
        <CardTitle className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-foreground">
          <div className="w-1 h-3 bg-primary" />
          Efficiency Frontier Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="h-[400px] w-full min-h-[400px]">
          <ResponsiveContainer width="100%" height="100%" minHeight={400}>
            <ComposedChart
              margin={{ top: 20, right: 30, bottom: 20, left: 10 }}
            >
              <defs>
                <linearGradient id="frontierGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="alchemystHindsightGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59025" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#f59025" stopOpacity={0}/>
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={true} horizontal={true} />
              
              <XAxis
                type="number"
                dataKey="price"
                name="Price"
                scale="log"
                domain={[minPrice * 0.5, maxPrice * 1.5]}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8" }}
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: "#94a3b8", strokeWidth: 1 }}
              />
              
              <YAxis
                type="number"
                dataKey="performance"
                name="Performance"
                domain={[0, 1.1]}
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8" }}
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: "#94a3b8", strokeWidth: 1 }}
                tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
              />
              
              <Tooltip
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '2 2', r: 15 }}
                content={({ active, payload }) => {
                  console.log('Tooltip triggered - active:', active);
                  console.log('Tooltip payload:', payload);
                  console.log('Payload length:', payload?.length);
                  
                  if (active && payload && payload.length) {
                    console.log('Payload[0]:', payload[0]);
                    console.log('Payload[0].payload:', payload[0]?.payload);
                    
                    const d = payload[0].payload;
                    console.log('Extracted data:', d);
                    console.log('Data name:', d?.name);
                    console.log('Data price:', d?.price);
                    console.log('Data performance:', d?.performance);
                    
                    if (!d || !d.name) {
                      console.log('No valid data found, returning null');
                      return null;
                    }
                    
                    console.log('Rendering tooltip for:', d.name);
                    return (
                      <div className="bg-background/95 border border-primary/50 p-3 rounded-none shadow-[4px_4px_0px_0px_rgba(255,128,0,0.2)] backdrop-blur-md z-50">
                        <p className="font-black text-primary uppercase tracking-tighter text-sm">{d.name}</p>
                        <div className="h-px bg-primary/20 my-2" />
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">
                          Cost: <span className="text-foreground font-mono ml-2">${(d.price || 0).toFixed(3)}</span>
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">
                          Perf: <span className="text-foreground font-mono ml-2">{(d.performance || 0).toFixed(3)}</span>
                        </p>
                        {d.latency && (
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">
                            Latency: <span className="text-foreground font-mono ml-2">{d.latency}ms</span>
                          </p>
                        )}
                      </div>
                    );
                  }
                  console.log('Tooltip not active or no payload');
                  return null;
                }}
              />

              <Area
                data={paretoFrontier}
                type="monotone"
                dataKey="performance"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fill="url(#frontierGradient)"
                name="Pareto Frontier"
                isAnimationActive={false}
                connectNulls
                style={{ pointerEvents: 'none' }}
              />

              {/* Alchemyst to Hindsight connection line with gradient */}
              {alchemystToHindsight.length === 2 && (
                <>
                  <Area
                    data={[
                      ...alchemystToHindsight,
                      { price: alchemystToHindsight[1].price, performance: 0 },
                      { price: alchemystToHindsight[0].price, performance: 0 }
                    ]}
                    type="linear"
                    dataKey="performance"
                    stroke="none"
                    fill="url(#alchemystHindsightGradient)"
                    isAnimationActive={false}
                    style={{ pointerEvents: 'none' }}
                  />
                  <Line
                    data={alchemystToHindsight}
                    type="linear"
                    dataKey="performance"
                    stroke="#f59025"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                    style={{ pointerEvents: 'none' }}
                  />
                </>
              )}

              <Scatter 
                name="Models" 
                data={benchmarkData}
                fill="#8884d8"
                shape="circle"
                isAnimationActive={false}
              >
                {benchmarkData.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}-${index}`}
                    fill={entry.highlight ? "#f59025" : "#94a3b8"}
                    stroke="#ffffff"
                    strokeWidth={2.5}
                    r={9}
                  />
                ))}
                <LabelList
                  dataKey="name"
                  position="top"
                  offset={15}
                  content={(props: any) => {
                    const { x, y, value, payload } = props;
                    if (!x || !y) return null;
                    const isHighlight = payload?.highlight;
                    const textColor = isHighlight ? "#f59025" : "#94a3b8";
                    return (
                      <text
                        x={x}
                        y={y - 12}
                        fill={textColor}
                        textAnchor="middle"
                        style={{
                          fontSize: 10,
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          pointerEvents: 'none'
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
