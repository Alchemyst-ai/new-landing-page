"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import gsap from "gsap";

const tabs = [
  { id: "loan", label: "Loan Sales" },
  { id: "collections", label: "Collections" },
  { id: "renewals", label: "Renewals" },
  { id: "insurance", label: "Insurance Sales" },
];

const languageBlips = [
  { id: "english", label: "English", ring: 1, angle: -55 },
  { id: "hindi", label: "Hindi", ring: 2, angle: 165 },
  { id: "tamil", label: "Tamil", ring: 3, angle: -30 },
  { id: "spanish", label: "Spanish", ring: 4, angle: 120 },
];

const ConcentricPlayer = ({ 
  activeLanguage, 
  onLanguageChange,
  isPlaying,
  progress // 0 to 1 representing audio progress
}: { 
  activeLanguage: string;
  onLanguageChange: (id: string) => void;
  isPlaying: boolean;
  progress: number;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const waveformRefs = useRef<(SVGPathElement | null)[]>([]);
  const connectionRef = useRef<SVGLineElement>(null);
  const blipRefs = useRef<Map<string, SVGCircleElement>>(new Map());
  const glowRefs = useRef<Map<string, SVGCircleElement>>(new Map());
  
  const size = 700;
  const center = size / 2;
  const ringRadii = [120, 175, 230, 285];

  const activeBlipData = languageBlips.find(b => b.id === activeLanguage);
  const activeRingIndex = activeBlipData ? activeBlipData.ring - 1 : 0;
  const activeAngle = activeBlipData ? activeBlipData.angle : 0;
  const activeRadius = ringRadii[activeRingIndex];

  const blipPositions = languageBlips.map((blip) => {
    const radius = ringRadii[blip.ring - 1];
    const angleRad = (blip.angle * Math.PI) / 180;
    return {
      ...blip,
      x: center + radius * Math.cos(angleRad),
      y: center + radius * Math.sin(angleRad),
    };
  });

  const activeBlip = blipPositions.find(b => b.id === activeLanguage);

  // Calculate progress pointer position - starts from active language position
  const progressAngle = activeAngle + (progress * 360);
  const progressPosition = useMemo(() => {
    const angleRad = (progressAngle * Math.PI) / 180;
    return {
      x: center + activeRadius * Math.cos(angleRad),
      y: center + activeRadius * Math.sin(angleRad),
    };
  }, [progressAngle, activeRadius, center]);

  // Generate progress arc path (from start to current progress)
  const generateProgressArc = useCallback(() => {
    if (progress <= 0) return "";
    
    const startAngle = activeAngle;
    const endAngle = activeAngle + (progress * 360);
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = center + activeRadius * Math.cos(startRad);
    const y1 = center + activeRadius * Math.sin(startRad);
    const x2 = center + activeRadius * Math.cos(endRad);
    const y2 = center + activeRadius * Math.sin(endRad);
    
    const largeArc = progress > 0.5 ? 1 : 0;
    
    return `M ${x1} ${y1} A ${activeRadius} ${activeRadius} 0 ${largeArc} 1 ${x2} ${y2}`;
  }, [progress, activeAngle, activeRadius, center]);

  // Generate gradient ring segments - now follows progress pointer when playing
  const gradientRingSegments = useMemo(() => {
    const segments = [];
    const numSegments = 36;
    const radius = ringRadii[activeRingIndex];
    const targetAngle = isPlaying ? progressAngle : activeAngle;
    
    for (let i = 0; i < numSegments; i++) {
      const segmentAngle = (i / numSegments) * 360;
      const startAngle = segmentAngle - 180;
      const endAngle = startAngle + (360 / numSegments) + 1;
      
      let angleDiff = Math.abs(startAngle - targetAngle);
      if (angleDiff > 180) angleDiff = 360 - angleDiff;
      
      const brightness = Math.max(0, 1 - (angleDiff / 180));
      const opacity = 0.15 + brightness * 0.7;
      const whiteAmount = brightness;
      
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      const x1 = center + radius * Math.cos(startRad);
      const y1 = center + radius * Math.sin(startRad);
      const x2 = center + radius * Math.cos(endRad);
      const y2 = center + radius * Math.sin(endRad);
      
      segments.push({
        d: `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`,
        opacity,
        whiteAmount,
        brightness,
      });
    }
    return segments;
  }, [activeRingIndex, activeAngle, progressAngle, isPlaying, ringRadii, center]);

  // Generate smooth hexagonal flower shape - 6 soft lobes
  const generateWaveformPath = useCallback((baseRadius: number, audioData: number[]) => {
    let path = "";
    const points = 60; // Smooth curve
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;
      // Create 6 smooth lobes using sine wave
      const lobeIndex = Math.floor((i / points) * 6) % 6;
      const audioValue = audioData[lobeIndex] || 0;
      const hexShape = Math.sin(angle * 3) * audioValue; // 6 lobes (sin * 3 = 6 peaks)
      const r = baseRadius + hexShape;
      const x = center + r * Math.cos(angle - Math.PI / 2);
      const y = center + r * Math.sin(angle - Math.PI / 2);
      path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    }
    return path + " Z";
  }, [center]);

  // Audio data for 6 lobes
  const audioDataRef = useRef<number[]>(Array(6).fill(8));
  const targetDataRef = useRef<number[]>(Array(6).fill(8));

  // Static calm hexagonal shape for idle state
  const idleWaveShape = useMemo(() => {
    return Array(6).fill(10); // Simple uniform hexagonal flower
  }, []);

  useEffect(() => {
    let time = 0;
    let updateCounter = 0;
    
    const updateWaveforms = () => {
      time += 0.016;
      updateCounter++;
      
      if (isPlaying) {
        // Update target values for smooth flowing animation
        if (updateCounter % 6 === 0) {
          targetDataRef.current = targetDataRef.current.map((_, i) => {
            // Gentle flowing waves - each lobe pulses independently
            const wave1 = Math.sin(time * 0.6 + i * 1.2) * 6;
            const wave2 = Math.sin(time * 0.4 + i * 0.8) * 4;
            return 10 + wave1 + wave2;
          });
        }
        
        // Smoothly interpolate for water-like movement
        audioDataRef.current = audioDataRef.current.map((current, i) => {
          const target = targetDataRef.current[i];
          return current + (target - current) * 0.06;
        });
      } else {
        // When paused - smoothly settle to calm hexagonal shape
        audioDataRef.current = audioDataRef.current.map((current, i) => {
          const target = idleWaveShape[i];
          return current + (target - current) * 0.04;
        });
      }
      
      const ref = waveformRefs.current[0];
      if (ref) {
        const newPath = generateWaveformPath(55, audioDataRef.current);
        gsap.set(ref, { attr: { d: newPath } });
      }
    };

    gsap.ticker.add(updateWaveforms);
    return () => gsap.ticker.remove(updateWaveforms);
  }, [generateWaveformPath, isPlaying, idleWaveShape]);

  useEffect(() => {
    if (connectionRef.current && activeBlip) {
      gsap.fromTo(connectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );

      const blipEl = blipRefs.current.get(activeLanguage);
      const glowEl = glowRefs.current.get(activeLanguage);
      
      if (blipEl) {
        gsap.to(blipEl, {
          attr: { r: 9 },
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (glowEl) {
        gsap.to(glowEl, { opacity: 0.7, attr: { r: 20 }, duration: 0.3 });
      }

      blipPositions.forEach((blip) => {
        if (blip.id !== activeLanguage) {
          const el = blipRefs.current.get(blip.id);
          const gEl = glowRefs.current.get(blip.id);
          if (el) {
            gsap.killTweensOf(el);
            gsap.set(el, { attr: { r: 5 } });
          }
          if (gEl) gsap.to(gEl, { opacity: 0, duration: 0.2 });
        }
      });
    }
  }, [activeLanguage, activeBlip, blipPositions]);

  // Calculate gradient direction based on pointer position
  const gradientAngle = useMemo(() => {
    const currentAngle = isPlaying ? progressAngle : activeAngle;
    return currentAngle + 90; // Offset for CSS gradient direction
  }, [isPlaying, progressAngle, activeAngle]);

  return (
    <div className="relative w-full max-w-3xl mx-auto" style={{ aspectRatio: '1/1' }}>
      {/* Central radial glow - contained within circular area */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-100"
        style={{
          background: `conic-gradient(from ${gradientAngle}deg at 50% 50%, 
            rgba(251, 146, 60, 0.25) 0deg,
            rgba(249, 115, 22, 0.18) 30deg,
            rgba(234, 88, 12, 0.08) 60deg,
            transparent 120deg,
            transparent 240deg,
            rgba(234, 88, 12, 0.08) 300deg,
            rgba(249, 115, 22, 0.18) 330deg,
            rgba(251, 146, 60, 0.25) 360deg
          )`,
          clipPath: 'circle(42% at 50% 50%)',
        }}
      />
      {/* Layered radial glow for depth - also clipped */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.15) 0%, rgba(249, 115, 22, 0.08) 15%, transparent 40%)',
          clipPath: 'circle(42% at 50% 50%)',
        }}
      />

      <svg ref={svgRef} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="brightGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pointerGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="5" result="blur1" />
            <feGaussianBlur stdDeviation="10" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Progress arc gradient */}
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(251, 146, 60, 0.3)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.8)" />
          </linearGradient>
          
          <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(251, 146, 60, 0.95)" />
            <stop offset="100%" stopColor="rgba(249, 115, 22, 0.5)" />
          </linearGradient>
        </defs>

        {/* Non-active rings */}
        {ringRadii.map((radius, i) => (
          i !== activeRingIndex && (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="rgba(249, 115, 22, 0.25)"
              strokeWidth={1}
              filter="url(#ringGlow)"
            />
          )
        ))}

        {/* Active ring with gradient segments */}
        <g>
          {gradientRingSegments.map((segment, i) => {
            const r = Math.round(249 + (255 - 249) * segment.whiteAmount);
            const g = Math.round(115 + (255 - 115) * segment.whiteAmount);
            const b = Math.round(22 + (255 - 22) * segment.whiteAmount);
            const strokeColor = `rgba(${r}, ${g}, ${b}, ${segment.opacity})`;
            
            return (
              <path
                key={i}
                d={segment.d}
                fill="none"
                stroke={strokeColor}
                strokeWidth={segment.brightness > 0.7 ? 2.5 : segment.brightness > 0.3 ? 1.8 : 1.2}
                strokeLinecap="round"
                filter={segment.brightness > 0.5 ? "url(#brightGlow)" : "url(#ringGlow)"}
              />
            );
          })}
        </g>

        {/* Progress arc - shows played portion */}
        {isPlaying && progress > 0 && (
          <path
            d={generateProgressArc()}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth={3}
            strokeLinecap="round"
            filter="url(#brightGlow)"
          />
        )}

        {/* Progress pointer - only visible when playing */}
        {isPlaying && (
          <g>
            {/* Outer glow halo */}
            <circle
              cx={progressPosition.x}
              cy={progressPosition.y}
              r={18}
              fill="rgba(255, 255, 255, 0.15)"
              filter="url(#pointerGlow)"
            />
            {/* Middle glow */}
            <circle
              cx={progressPosition.x}
              cy={progressPosition.y}
              r={10}
              fill="rgba(255, 255, 255, 0.3)"
              filter="url(#pointerGlow)"
            />
            {/* Main pointer */}
            <circle
              cx={progressPosition.x}
              cy={progressPosition.y}
              r={6}
              fill="white"
              filter="url(#brightGlow)"
            />
            {/* Bright core */}
            <circle
              cx={progressPosition.x}
              cy={progressPosition.y}
              r={3}
              fill="white"
            />
          </g>
        )}

        {/* Connection line - follows progress pointer when playing, brighter when moving */}
        <line
          ref={connectionRef}
          x1={center}
          y1={center}
          x2={isPlaying ? progressPosition.x : (activeBlip?.x || center)}
          y2={isPlaying ? progressPosition.y : (activeBlip?.y || center)}
          stroke={isPlaying ? "rgba(255, 255, 255, 0.6)" : "url(#connectionGrad)"}
          strokeWidth={isPlaying ? 1.2 : 1}
          filter={isPlaying ? "url(#pointerGlow)" : "url(#strongGlow)"}
          opacity={1}
        />
        
        {/* Extra glow line when playing */}
        {isPlaying && (
          <line
            x1={center}
            y1={center}
            x2={progressPosition.x}
            y2={progressPosition.y}
            stroke="rgba(251, 146, 60, 0.4)"
            strokeWidth={2}
            filter="url(#pointerGlow)"
            opacity={0.5}
          />
        )}

        {/* Single organic waveform - audio visualizer style */}
        <path
          ref={(el) => { waveformRefs.current[0] = el; }}
          d=""
          fill="rgba(120, 53, 15, 0.2)"
          stroke="rgba(251, 146, 60, 0.8)"
          strokeWidth={2.5}
          filter="url(#brightGlow)"
        />
        
        {/* Dark inner ring - semi-transparent to show orange behind */}
        <circle
          cx={center}
          cy={center}
          r={38}
          fill="rgba(30, 20, 15, 0.75)"
          stroke="rgba(249, 115, 22, 0.5)"
          strokeWidth={1.5}
        />

        {/* Language blips */}
        {blipPositions.map((blip) => {
          const isActive = blip.id === activeLanguage;
          const labelOffset = 20;
          const angleRad = (blip.angle * Math.PI) / 180;
          const labelX = blip.x + labelOffset * Math.cos(angleRad);
          const labelY = blip.y + labelOffset * Math.sin(angleRad);
          const textAnchor = blip.angle > 90 || blip.angle < -90 ? "end" : "start";

          return (
            <g 
              key={blip.id} 
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onLanguageChange(blip.id);
              }}
            >
              <circle
                ref={(el) => { if (el) glowRefs.current.set(blip.id, el); }}
                cx={blip.x}
                cy={blip.y}
                r={0}
                fill="rgba(255, 255, 255, 0.35)"
                opacity={0}
                filter="url(#brightGlow)"
              />
              
              <circle
                ref={(el) => { if (el) blipRefs.current.set(blip.id, el); }}
                cx={blip.x}
                cy={blip.y}
                r={isActive ? 7 : 5}
                fill={isActive ? "#FED7AA" : "rgba(249, 115, 22, 0.7)"}
                filter={isActive ? "url(#brightGlow)" : "url(#ringGlow)"}
              />

              {isActive && !isPlaying && (
                <motion.circle
                  cx={blip.x}
                  cy={blip.y}
                  r={3.5}
                  fill="white"
                  animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              <text
                x={labelX}
                y={labelY}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                fill={isActive ? "#F5F3FF" : "rgba(200, 200, 210, 0.7)"}
                fontSize="13"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight={isActive ? "500" : "400"}
                className="pointer-events-none select-none"
              >
                {blip.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Center play button - layered structure */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        {/* Orange circle button */}
        <motion.div
          className="relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #FB923C 0%, #F97316 50%, #EA580C 100%)',
            boxShadow: isPlaying 
              ? '0 0 40px rgba(249, 115, 22, 0.7), 0 0 80px rgba(251, 146, 60, 0.4)'
              : '0 0 25px rgba(249, 115, 22, 0.5), 0 0 50px rgba(251, 146, 60, 0.25)',
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={isPlaying ? {
            boxShadow: [
              '0 0 40px rgba(249, 115, 22, 0.7), 0 0 80px rgba(251, 146, 60, 0.4)',
              '0 0 55px rgba(249, 115, 22, 0.85), 0 0 100px rgba(251, 146, 60, 0.5)',
              '0 0 40px rgba(249, 115, 22, 0.7), 0 0 80px rgba(251, 146, 60, 0.4)',
            ],
          } : {}}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                <Pause className="w-5 h-5 text-[#1a1a2e] fill-[#1a1a2e]" />
              </motion.div>
            ) : (
              <motion.div key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                <Play className="w-5 h-5 text-[#1a1a2e] fill-[#1a1a2e] ml-0.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

const RealCustomerCalls = () => {
  const [activeTab, setActiveTab] = useState("loan");
  const [activeLanguage, setActiveLanguage] = useState("english");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<gsap.core.Tween | null>(null);

  // GSAP animation for progress when playing
  useEffect(() => {
    if (isPlaying) {
      // Animate progress from current position to 1 (full circle)
      const obj = { value: progress };
      progressRef.current = gsap.to(obj, {
        value: 1,
        duration: 15 * (1 - progress), // 15 seconds for full circle, adjusted for current progress
        ease: "none",
        onUpdate: () => {
          setProgress(obj.value);
        },
        onComplete: () => {
          // Stop at the starting position (where it began)
          setProgress(0);
          setIsPlaying(false);
        }
      });
    } else {
      // Pause the animation
      if (progressRef.current) {
        progressRef.current.pause();
      }
    }

    return () => {
      if (progressRef.current) {
        progressRef.current.kill();
      }
    };
  }, [isPlaying]);

  // Reset progress when language changes
  useEffect(() => {
    setProgress(0);
    if (progressRef.current) {
      progressRef.current.kill();
    }
    if (isPlaying) {
      const obj = { value: 0 };
      progressRef.current = gsap.to(obj, {
        value: 1,
        duration: 15,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          setProgress(obj.value);
        },
      });
    }
  }, [activeLanguage]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="calls" className="relative py-8 overflow-hidden" style={{ background: '#0d0d0f' }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-4"
      >
        <h2 className="text-4xl sm:text-5xl font-semibold mb-4">
          <span className="text-orange-400">Hear real customer calls</span>
          <br />
          <span className="text-foreground">Across industries. Across languages.</span>
        </h2>
      </motion.div>

      <div className="relative z-10 mx-auto px-4 max-w-7xl">
        {/* Segment tabs - above orbits */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center -mb-2"
        >
          <div 
            className="inline-flex rounded-full p-1.5 gap-1"
            style={{
              background: 'rgba(18, 18, 24, 0.95)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 sm:px-6 py-2 text-sm sm:text-base font-medium rounded-full transition-colors duration-200 ${
                  activeTab === tab.id ? "text-white" : "text-gray-500 hover:text-gray-400"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(154, 52, 18, 0.8) 0%, rgba(249, 115, 22, 0.6) 100%)',
                      boxShadow: '0 0 18px rgba(249, 115, 22, 0.5)',
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          {/* Metric badge - positioned on outer orbit */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[8%] z-30">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div 
                className="px-6 py-3 rounded-full text-base sm:text-lg font-semibold text-orange-200/90"
                style={{
                  background: 'linear-gradient(90deg, rgba(154, 52, 18, 0.6) 0%, rgba(249, 115, 22, 0.4) 100%)',
                  border: '1px solid rgba(249, 115, 22, 0.5)',
                  boxShadow: '0 0 25px rgba(249, 115, 22, 0.3)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                80%+ increase in conversion vs. humans
              </div>
            </motion.div>
          </div>

          {/* Concentric Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={handlePlayPause}
          >
            <ConcentricPlayer 
              activeLanguage={activeLanguage}
              onLanguageChange={setActiveLanguage}
              isPlaying={isPlaying}
              progress={progress}
            />
          </motion.div>
        </div>
      </div>

      {/* Star accent */}
      <motion.div
        className="absolute bottom-6 right-6 text-gray-500/35"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
        </svg>
      </motion.div>

      {/* Parallel horizontal lines with vertical lines in between */}
      <div className="relative h-40 overflow-visible mt-12">
        {/* Top horizontal line */}
        <div
          className="absolute top-4 left-0 right-0 h-px z-10"
          style={{ background: 'rgba(255,255,255,0.12)' }}
        />
        {/* Bottom horizontal line */}
        <div
          className="absolute bottom-4 left-0 right-0 h-px z-10"
          style={{ background: 'rgba(255,255,255,0.12)' }}
        />
        {/* Vertical lines between horizontal parallels */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 200 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px"
              style={{
                left: `${(i / 199) * 100}%`,
                height: "calc(100% - 2rem)",
                marginTop: "1rem",
                marginBottom: "1rem",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.10) 25%, rgba(255,255,255,0.06) 75%)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealCustomerCalls;