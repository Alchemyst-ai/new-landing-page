// LogoBar - "Trusted by" social-proof marquee (Server Component)
// Uniform monochrome (muted-white) wordmarks/glyphs for visual consistency
// on the dark background. Logos scroll horizontally to the left in a
// seamless loop (list is duplicated for continuity).

const LOGO_COLOR = "#94A3B8";

type Logo = { name: string; node: React.ReactNode };

const LOGOS: Logo[] = [
  {
    name: "Veranda Learning",
    node: (
      <svg height="22" viewBox="0 0 200 28" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Veranda Learning">
        <path d="M2 6l7 16 7-16h-4l-3 8-3-8H2z" fill={LOGO_COLOR} />
        <text x="22" y="21" fontFamily="'Sora', sans-serif" fontSize="19" fontWeight="600" fill={LOGO_COLOR} letterSpacing="-0.5">Veranda</text>
      </svg>
    ),
  },
  {
    name: "Unacademy",
    node: (
      <svg height="22" viewBox="0 0 150 28" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Unacademy">
        <text x="0" y="21" fontFamily="'Sora', sans-serif" fontSize="20" fontWeight="700" fill={LOGO_COLOR} letterSpacing="-0.5">Unacademy</text>
      </svg>
    ),
  },
  {
    name: "PhysicsWallah",
    node: (
      <svg height="24" viewBox="0 0 190 28" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PhysicsWallah">
        <circle cx="13" cy="14" r="12" stroke={LOGO_COLOR} strokeWidth="1.6" fill="none" />
        <text x="13" y="19" textAnchor="middle" fontFamily="'Sora', sans-serif" fontSize="12" fontWeight="800" fill={LOGO_COLOR}>PW</text>
        <text x="32" y="19" fontFamily="'Sora', sans-serif" fontSize="16" fontWeight="700" fill={LOGO_COLOR} letterSpacing="-0.5">PhysicsWallah</text>
      </svg>
    ),
  },
  {
    name: "Y Combinator",
    node: (
      <svg height="24" viewBox="0 0 170 28" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Y Combinator">
        <rect x="2" y="2" width="24" height="24" rx="4" fill={LOGO_COLOR} />
        <text x="14" y="20" textAnchor="middle" fontFamily="'Sora', sans-serif" fontSize="16" fontWeight="800" fill="#0A0F1E">Y</text>
        <text x="33" y="20" fontFamily="'Sora', sans-serif" fontSize="16" fontWeight="600" fill={LOGO_COLOR} letterSpacing="-0.3">Combinator</text>
      </svg>
    ),
  },
  {
    name: "Entrepreneur First",
    node: (
      <svg height="22" viewBox="0 0 90 28" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Entrepreneur First">
        <text x="0" y="22" fontFamily="'Sora', sans-serif" fontSize="22" fontWeight="800" fill={LOGO_COLOR} letterSpacing="-1">EF</text>
        <text x="34" y="13" fontFamily="'Sora', sans-serif" fontSize="9" fontWeight="700" fill={LOGO_COLOR} letterSpacing="0.5">ENTREPRENEUR</text>
        <text x="34" y="24" fontFamily="'Sora', sans-serif" fontSize="9" fontWeight="700" fill={LOGO_COLOR} letterSpacing="0.5">FIRST</text>
      </svg>
    ),
  },
  {
    name: "Microsoft",
    node: (
      <svg height="22" viewBox="0 0 140 28" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Microsoft">
        <rect x="1" y="3" width="10" height="10" fill={LOGO_COLOR} />
        <rect x="13" y="3" width="10" height="10" fill={LOGO_COLOR} />
        <rect x="1" y="15" width="10" height="10" fill={LOGO_COLOR} />
        <rect x="13" y="15" width="10" height="10" fill={LOGO_COLOR} />
        <text x="30" y="20" fontFamily="'Sora', sans-serif" fontSize="17" fontWeight="600" fill={LOGO_COLOR} letterSpacing="-0.3">Microsoft</text>
      </svg>
    ),
  },
  {
    name: "Google",
    node: (
      <svg height="22" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Google">
        <text x="0" y="21" fontFamily="'Sora', sans-serif" fontSize="20" fontWeight="600" fill={LOGO_COLOR} letterSpacing="-0.5">Google</text>
      </svg>
    ),
  },
  {
    name: "Meta",
    node: (
      <svg height="22" viewBox="0 0 90 28" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Meta">
        <path d="M2 20c2.5 0 4-2 6-5s3.5-6 6-6 4 2 6 5 3.5 6 6 6" stroke={LOGO_COLOR} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="36" y="21" fontFamily="'Sora', sans-serif" fontSize="20" fontWeight="700" fill={LOGO_COLOR} letterSpacing="-0.5">Meta</text>
      </svg>
    ),
  },
];

export default function LogoBar() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section
      aria-label="Trusted by"
      style={{
        background: "#0A0F1E",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "32px 0",
        overflow: "hidden",
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#475569",
          marginBottom: "24px",
        }}
      >
        Trusted by
      </p>
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          // Soft fade on both edges
          maskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div
          className="animate-marquee"
          style={{ display: "flex", alignItems: "center", gap: "72px", width: "max-content" }}
        >
          {doubled.map((logo, i) => (
            <span
              key={`${logo.name}-${i}`}
              aria-hidden={i >= LOGOS.length ? true : undefined}
              style={{
                display: "inline-flex",
                alignItems: "center",
                opacity: 0.75,
                flex: "0 0 auto",
              }}
            >
              {logo.node}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
