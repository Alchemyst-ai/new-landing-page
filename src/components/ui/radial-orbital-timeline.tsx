"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotation loop
  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.2) % 360; // Slower, smoother rotation
          return Number(newAngle.toFixed(3));
        });
      }, 30);
    }

    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    // slightly reduced radius to fit better
    const radius = 180;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    // smoother opacity curve
    const opacity = Math.max(
      0.5,
      Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        // Using specific orange shade #f59025
        return "bg-[#f59025]/20 text-[#f59025] border-[#f59025]/50";
      case "in-progress":
        return "bg-blue-500/20 text-blue-200 border-blue-500/50";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/50";
    }
  };

  return (
    <div
      className="w-full h-[500px] flex flex-col items-center justify-center relative overflow-visible"
      ref={containerRef}
    >
      <div className="relative w-full max-w-2xl h-full flex items-center justify-center perspective-1000">
        
        {/* Central Sun/Core */}
        <div className="absolute z-10 flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-[#f59025]/20 blur-xl animate-pulse"></div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f59025] to-[#d06010] shadow-[0_0_30px_rgba(245,144,37,0.6)] flex items-center justify-center z-20 relative">
             <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-20 duration-1000"></div>
          </div>
        </div>

        {/* Orbit Rings */}
        <div className="absolute w-[360px] h-[360px] rounded-full border border-[#f59025]/10 shadow-[0_0_40px_rgba(245,144,37,0.1)_inset]"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full border border-white/5 opacity-50"></div>

        {/* Orbiting Nodes */}
        <div className="absolute inset-0 flex items-center justify-center">
            {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isActive = activeNodeId === item.id;
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isActive ? 50 : 20,
              opacity: isActive ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                className="absolute flex items-center justify-center transition-all duration-300 ease-out"
                style={nodeStyle}
                onMouseEnter={() => {
                  setActiveNodeId(item.id);
                  setAutoRotate(false);
                }}
                onMouseLeave={() => {
                  setActiveNodeId(null);
                  setAutoRotate(true);
                }}
              >
                {/* Connection Line to Center (Optional visual aid) */}
                <div 
                   className={cn(
                       "absolute w-[180px] h-[1px] bg-gradient-to-r from-transparent to-[#f59025]/30 origin-right right-1/2 top-1/2 -z-10 transition-opacity duration-300",
                       isActive ? "opacity-100" : "opacity-0"
                   )}
                   style={{ 
                       transform: `rotate(${Math.atan2(position.y, position.x) * 180 / Math.PI}deg) translateX(-50%) width` 
                   }} 
                />

                {/* Node Circle */}
                <div
                  className={cn(
                    "relative w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-sm",
                    isActive 
                      ? "bg-[#151515] border-[#f59025] scale-110 shadow-[0_0_20px_rgba(245,144,37,0.5)]" 
                      : "bg-[#151515]/80 border-white/20 hover:border-[#f59025]/50"
                  )}
                >
                  <Icon size={18} className={cn("transition-colors", isActive ? "text-[#f59025]" : "text-white/70")} />
                  
                  {/* Label under node */}
                  {!isActive && (
                    <div className="absolute top-14 text-[10px] font-medium uppercase tracking-widest text-white/50 whitespace-nowrap pointer-events-none">
                        {item.title}
                    </div>
                  )}
                </div>

                {/* Hover Card */}
                <div
                    className={cn(
                        "absolute top-16 left-1/2 -translate-x-1/2 w-72 transition-all duration-300 origin-top transform",
                        isActive 
                            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto z-100" 
                            : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
                    )}
                >
                    {/* Updated Card colors: bg-[#1a1a1a] ensures it stands out against #151515 body */}
                    <Card className="bg-[#1a1a1a] backdrop-blur-xl border-[#f59025]/30 shadow-2xl">
                        {/* Little arrow pointing up */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#f59025]/30 blur-[2px] rotate-45"></div>
                        
                        <CardHeader className="pb-2 pt-4">
                            <div className="flex justify-between items-start">
                                <Badge variant="outline" className={cn("text-[10px] border-none px-2", getStatusStyles(item.status))}>
                                    {item.status.toUpperCase()}
                                </Badge>
                                <span className="text-[10px] text-muted-foreground font-mono">{item.date}</span>
                            </div>
                            <CardTitle className="text-base text-[#f59025] mt-1">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {item.content}
                            </p>
                            
                            <div className="space-y-1.5 pt-2 border-t border-white/10">
                                <div className="flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                                    <span className="flex items-center gap-1"><Zap size={10} className="text-[#f59025]"/> Energy</span>
                                    <span>{item.energy}%</span>
                                </div>
                                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-[#d06010] to-[#f59025]" 
                                        style={{ width: `${item.energy}%`}}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
