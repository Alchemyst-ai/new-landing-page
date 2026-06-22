// ThesisSection — "The Context Thesis" (Server Component)

const THESES = [
  {
    num: "I",
    title: "Intelligence without memory is performance, not understanding.",
    body: "A model that can answer any question but remembers nothing is a search engine, not an agent. True intelligence requires the ability to learn from experience — to carry forward what was said, decided, and discovered.",
  },
  {
    num: "II",
    title: "Context is the compound interest of AI interactions.",
    body: "Every interaction is an investment. Without context, that investment expires at the end of the session. With context, each interaction builds on the last — the agent gets smarter, more personalized, and more valuable with every use.",
  },
  {
    num: "III",
    title: "The model is not the bottleneck. The infrastructure is.",
    body: "GPT-4, Gemini, Claude — they're all capable enough. The gap between a capable model and a truly intelligent product is the layer that gives it memory, continuity, and awareness of the world it operates in.",
  },
  {
    num: "IV",
    title: "Context should be a primitive, not an afterthought.",
    body: "Developers shouldn't have to build context management from scratch for every AI product. It should be as simple as calling an API — ingest, retrieve, and let intelligence compound.",
  },
];

export default function ThesisSection() {
  return (
    <section
      id="thesis"
      style={{
        background: "#0A0F1E",
        paddingTop: "96px",
        paddingBottom: "96px",
        position: "relative",
        overflow: "hidden",
      }}
      aria-labelledby="thesis-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="container relative">
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p className="eyebrow" style={{ marginBottom: "16px" }}>The Context Thesis</p>
          <h2
            id="thesis-heading"
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.875rem, 3.5vw, 3rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            Why we&apos;re building the{" "}
            <span style={{ color: "#F49025", fontStyle: "italic" }}>memory layer</span> for AI.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "64px",
          }}
        >
          {THESES.map((t) => (
            <div
              key={t.num}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "8px",
                padding: "28px",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  color: "#F49025",
                  marginBottom: "12px",
                }}
              >
                {t.num}
              </div>
              <h3
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "-0.01em",
                  color: "#FFFFFF",
                  marginBottom: "10px",
                  lineHeight: 1.4,
                }}
              >
                {t.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.9375rem",
                  lineHeight: 1.65,
                  color: "#64748B",
                }}
              >
                {t.body}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <blockquote
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
              lineHeight: 1.35,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              maxWidth: "600px",
              margin: "0 auto",
              fontStyle: "italic",
            }}
          >
            &ldquo;The model is the engine.{" "}
            <span style={{ color: "#F49025" }}>Context is the fuel.</span>
            <br />
            Without it, you&apos;re not going anywhere.&rdquo;
          </blockquote>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#475569",
              marginTop: "16px",
            }}
          >
            — Alchemyst AI, Context Thesis
          </p>
        </div>
      </div>
    </section>
  );
}
