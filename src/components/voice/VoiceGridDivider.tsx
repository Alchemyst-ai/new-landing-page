import React from 'react';

interface VoiceGridDividerProps {
  className?: string;
}

const VoiceGridDivider: React.FC<VoiceGridDividerProps> = ({ className = '' }) => {
  return (
    <div className={`relative h-40 overflow-visible ${className}`}>
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
  );
};

export default VoiceGridDivider;

