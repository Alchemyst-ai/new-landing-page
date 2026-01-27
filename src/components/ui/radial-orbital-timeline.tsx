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

// Define a set of orbits
const ORBIT_RADII = [120, 180, 240];
const ORBIT_ROTATION_OFFSETS = [0, 120, 240]; // Stagger starting angles for visual balance
const GLOBAL_ROTATION_SPEED = 0.1; // Single speed for the whole system

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Group nodes by their assigned orbit
  const nodesByOrbit = ORBIT_RADII.map(() => [] as { item: TimelineItem; originalIndex: number }[]);
  timelineData.forEach((item, index) => {
    const orbitIndex = index % ORBIT_RADII.length;
    nodesByOrbit[orbitIndex].push({ item, originalIndex: index });
  });

  // Auto-rotation loop for the entire system
  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;
    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prevAngle) => (prevAngle + GLOBAL_ROTATION_SPEED) % 360);
      }, 30);
    }
    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, [autoRotate]);

  const calculateNodePosition = (
    orbitIndex: number,
    nodeIndexInOrbit: number,
    nodesInOrbit: number
  ) => {
    const radius = ORBIT_RADII[orbitIndex];
    const angleStep = 360 / nodesInOrbit;
    const baseAngle = nodeIndexInOrbit * angleStep;
    const orbitOffset = ORBIT_ROTATION_OFFSETS[orbitIndex % ORBIT_ROTATION_OFFSETS.length];
    
    const angle = (baseAngle + orbitOffset + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + radius / 5 + 20 * Math.sin(radian));
    const opacity = Math.max(
      0.5,
      Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity, radius };
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        // Using specific orange shade #f59025
        return "bg-[#f59025]/20 text-[#f59025] border-[#f59025]/50";
      // case "in-progress":
      //   return "bg-yellow-500/20 text-yellow-200 border-yellow-500/50";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/50";
    }
  };

  return (
    <div
      className="w-full h-[600px] flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at center, #101010 0%, #15151500 70%)",
      }}
      ref={containerRef}
    >
      <div className="relative w-full max-w-2xl h-full flex items-center justify-center perspective-1000">
        
        {/* Central Sun/Core */}
        <div className="absolute z-10 flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-[#f59025]/20 blur-xl animate-pulse"></div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f59025] to-[#a34603] shadow-[0_0_30px_rgba(245,144,37,0.6)] flex items-center justify-center z-20 relative">
             <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-20 duration-1000"></div>
          </div>
        </div>
        {/* Orbit Rings */}
         {ORBIT_RADII.map((radius, i) => (
          <div
            key={`orbit-${i}`}
            className="absolute rounded-full border border-[#f5a44e]/20"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
            }}
          ></div>
        ))}
        <div className="absolute w-[560px] h-[560px] rounded-full border border-white/5 opacity-50"></div>

        {/* Orbiting Nodes */}
        <div className="absolute inset-0 flex items-center justify-center">
          {nodesByOrbit.map((orbitNodes, orbitIndex) =>
            orbitNodes.map(({ item, originalIndex }, nodeIndexInOrbit) => {
              const position = calculateNodePosition(
                orbitIndex,
                nodeIndexInOrbit,
                orbitNodes.length
              );
              const isActive = activeNodeId === item.id;
              const Icon = item.icon;

              const nodeStyle = {
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isActive ? 50 : 30,
                opacity: isActive ? 1 : 0.8,
              };
              // Determine card position based on node angle.
              // Angles 90-270 are the left half, others are the right half.
               const isLeftSide = position.angle > 90 && position.angle < 270;
              const cardPositionClasses = isLeftSide
                ?  "right-16 origin-right"  // Opens to the right of the node
                :  "left-16 origin-left";      

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
                      "absolute h-[1px] bg-gradient-to-r from-transparent to-[#f59025]/30 origin-right right-1/2 top-1/2 -z-10 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                    style={{
                      width: `${position.radius}px`,
                      transform: `rotate(${position.angle}deg) translateX(-50%)`,
                    }}
                  />

                  {/* Node Circle */}
                  <div
                    className={cn(
                      "relative w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-sm",
                      isActive 
                        ? "bg-[#151515] border-[#f59025] scale-110 shadow-[0_0_20px_rgba(245,144,37,0.5)]" 
                        : "bg-[#151515]/80 border-white/50 hover:border-[#f59025]/50"
                    )}
                  >
                    <Icon size={18} className={cn("transition-colors", isActive ? "text-[#f59025]" : "text-white/80")} />
                    
                    {/* Label under node */}
                    {!isActive && (
                      <div className="absolute w-20 text-center top-14 text-[10px] font-medium uppercase tracking-widest text-white/90 pointer-events-none cursor-pointer leading-tight">
                        {item.title}
                      </div>
                    )}
                  </div>

                  {/* Hover Card */}
                  <div
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 w-72 transition-all duration-300 transform",
                      cardPositionClasses, // Apply dynamic position classes
                      isActive
                        ? "opacity-100 scale-100 translate-x-0 pointer-events-auto" 
                        : "opacity-0 scale-95 pointer-events-none",
                      // Adjust starting position for transition based on direction
                      isLeftSide ? (isActive ? "translate-x-0" : "-translate-x-4") :  (isActive ? "translate-x-0" : "translate-x-4")
                    )}
                  >
                    {/* Updated Card colors: bg-[#1a1a1a] ensures it stands out against #151515 body */}
                    <Card className="bg-[#1a1a1a] backdrop-blur-xl border-[#f59025]/30 shadow-2xl">
                        {/* Little arrow pointing towards the node */}
                        <div className={cn(
                            "absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#f59025]/30 blur-[2px] rotate-45",
                             isLeftSide ? "left-0 -ml-2" : "right-0 -mr-2"
                        )}></div>
                        
                        <CardHeader className="pb-2 pt-4">
                            <div className="flex justify-between items-start">
                                <Badge variant="outline" className={cn("text-[10px] border-none px-2", getStatusStyles(item.status))}>
                                    {item.category.toUpperCase()}
                                </Badge>
                                <span className="text-[10px] text-muted-foreground font-mono">{item.date}</span>
                            </div>
                            <CardTitle className="text-base text-[#f59025] mt-1">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {item.content}
                            </p>
                            
                            {/* <div className="space-y-1.5 pt-2 border-t border-white/10">
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
                            </div> */}
                        </CardContent>
                    </Card>
                  </div>

              </div>
            )
          })
        )}
        </div>
      </div>
    </div>
  );
}
