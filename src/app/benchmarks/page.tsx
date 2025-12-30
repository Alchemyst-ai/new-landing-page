"use client";

import { BenchmarkChart } from "@/components/benchmarks/BenchmarkChart";
import { ComparisonTable } from "@/components/benchmarks/ComparisonTable";
import { EfficiencyRatioChart } from "@/components/benchmarks/EfficiencyRatioChart";
import { OverallComparisonRadar } from "@/components/benchmarks/OverallComparisonRadar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BarChart3, ChevronDown, Clock, Database, Zap } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [showArchive, setShowArchive] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 overflow-x-hidden">
      {/* Dynamic Background Noise/Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <main className="container mx-auto px-6 py-8 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-5xl mx-auto pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20 animate-in fade-in slide-in-from-top-4 duration-500 uppercase tracking-widest">
            <Zap className="w-3 h-3" />
            <span>Tested in December 2025</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-heading font-black tracking-tighter leading-[0.85] animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100 uppercase">
              Beyond <br />
                <span className="text-[#f59025] italic">Chat Sessions.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 font-medium">
              Introducing the new Pareto Frontier for Context.
              <span className="text-foreground block mt-1">170ms P50 Latency. $0.06/1M tokens.</span>
            </p>
          </div>

        </section>

        {/* High Impact Visual Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="p-6 border border-border bg-card/20 backdrop-blur-md hover:border-primary/50 transition-colors">
             <Clock className="w-5 h-5 text-primary mb-4" />
             <div className="text-4xl font-heading font-black mb-1 tracking-tighter">170<span className="text-base">ms</span></div>
             <div className="text-muted-foreground text-[10px] uppercase tracking-tighter font-bold">P50 Latency</div>
           </div>
           <div className="p-6 border border-border bg-card/20 backdrop-blur-md hover:border-primary/50 transition-colors">
             <Zap className="w-5 h-5 text-primary mb-4" />
             <div className="text-4xl font-heading font-black mb-1 tracking-tighter">12<span className="text-base">X</span></div>
             <div className="text-muted-foreground text-[10px] uppercase tracking-tighter font-bold">Value Ratio</div>
           </div>
           <div className="p-6 border border-border bg-card/20 backdrop-blur-md hover:border-primary/50 transition-colors">
             <Database className="w-5 h-5 text-primary mb-4" />
             <div className="text-4xl font-heading font-black mb-1 tracking-tighter">83<span className="text-base">%</span></div>
             <div className="text-muted-foreground text-[10px] uppercase tracking-tighter font-bold">Cost Savings</div>
           </div>
           <div className="p-6 border border-border bg-card/20 backdrop-blur-md hover:border-primary/50 transition-colors">
             <BarChart3 className="w-5 h-5 text-primary mb-4" />
             <div className="text-4xl font-heading font-black mb-1 tracking-tighter">0.76</div>
             <div className="text-muted-foreground text-[10px] uppercase tracking-tighter font-bold">Memory F1</div>
           </div>
        </section>

        {/* Comparative Analysis Block */}
        <section className="space-y-8">
           <div className="grid lg:grid-cols-2 gap-6">
              <EfficiencyRatioChart />
              <OverallComparisonRadar />
           </div>
        </section>

        {/* Pareto Visualization */}
        <section className="space-y-6">
           <div className="flex items-end justify-between border-b border-primary/20 pb-2">
              <h2 className="text-xl font-heading font-black tracking-tight uppercase">Efficiency Frontier</h2>
           </div>
           <div className="pb-1">
            <BenchmarkChart />
           </div>
        </section>

        {/* Hidden Data Archive */}
        <section className="pt-8">
           <Collapsible open={showArchive} onOpenChange={setShowArchive} className="space-y-4">
              <div className="flex flex-col items-center">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="group text-muted-foreground hover:text-primary gap-2 text-xs">
                    {showArchive ? "CONCEAL RAW DATA" : "ACCESS FULL DATA ARCHIVE"}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showArchive ? "rotate-180" : ""}`} />
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="animate-in fade-in slide-in-from-top-4 duration-500">
                 <div className="space-y-6">
                    <ComparisonTable />
                 </div>
              </CollapsibleContent>
           </Collapsible>
        </section>
      </main>
    </div>
  );
}
