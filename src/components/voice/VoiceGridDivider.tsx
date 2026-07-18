import React from "react";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { cn } from "@/lib/utils";

interface VoiceGridDividerProps {
  className?: string;
}

const VoiceGridDivider: React.FC<VoiceGridDividerProps> = ({ className = "" }) => {
  return (
    <div
      className={cn(
        "relative w-full max-w-full",
        className
      )}
    >
      <div className="relative h-16 md:h-20 overflow-hidden">
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px z-10"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(245,144,37,0.24) 15%, rgba(245,144,37,0.24) 85%, transparent)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 md:w-56 h-px bg-[#f59025]/30 blur-md z-10" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-full w-full bg-gradient-to-t from-background dark:from-background -z-10 from-50%" />
        <FlickeringGrid
          squareSize={4}
          gridGap={4}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.1}
          className="-z-20 absolute inset-0 size-full"
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full flex items-center justify-around opacity-30">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-px h-8 md:h-10 bg-gradient-to-b from-transparent via-white/15 to-transparent"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceGridDivider;
