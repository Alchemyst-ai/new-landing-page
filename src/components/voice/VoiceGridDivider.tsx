import React from "react";

interface VoiceGridDividerProps {
  className?: string;
}

const VoiceGridDivider: React.FC<VoiceGridDividerProps> = ({ className = "" }) => {
  return (
    <div
      className={`
        relative 
        h-20 md:h-32 
        overflow-visible 
        ${className}
      `}
    >
      {/* Top horizontal line */}
      <div
        className="absolute top-3 md:top-4 left-0 right-0 h-px z-10"
        style={{ background: "rgba(255,255,255,0.12)" }}
      />

      {/* Bottom horizontal line */}
      <div
        className="absolute bottom-3 md:bottom-4 left-0 right-0 h-px z-10"
        style={{ background: "rgba(255,255,255,0.12)" }}
      />

      {/* Vertical grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px"
            style={{
              left: `${(i / 199) * 100}%`,
              height: "calc(100% - 1.5rem)",
              marginTop: "0.75rem",
              marginBottom: "0.75rem",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.10) 25%, rgba(255,255,255,0.06) 75%)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VoiceGridDivider;
