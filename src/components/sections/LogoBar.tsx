// LogoBar — social proof marquee strip (Server Component)

const COMPANIES = [
  "Unacademy", "Sberbank", "Y Combinator", "Google DeepMind",
  "Sequoia", "Accel", "500 Startups", "Antler",
];

export default function LogoBar() {
  const doubled = [...COMPANIES, ...COMPANIES];
  return (
    <div
      style={{
        background: "#0A0F1E",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 0",
        overflow: "hidden",
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#334155",
          marginBottom: "16px",
        }}
      >
        Trusted by builders at
      </p>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div
          className="animate-marquee"
          style={{ display: "flex", gap: "56px", width: "max-content" }}
        >
          {doubled.map((name, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 600,
                fontSize: "0.9375rem",
                color: "#334155",
                whiteSpace: "nowrap",
                letterSpacing: "-0.01em",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
