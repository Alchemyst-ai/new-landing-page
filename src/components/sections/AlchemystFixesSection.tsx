// AlchemystFixesSection — "What Alchemyst Does" (Server Component)

const STEPS = [
  {
    num: "01",
    title: "Three-layer context architecture",
    body: "Episodic memory (what happened), semantic memory (what it means), and procedural memory (how to act) — all queryable through a single API. Your agent always has the right layer for the right task.",
    code: `const ctx = await alchemyst.context.get({
  episodic: { session_id, last_n: 10 },
  semantic: { query: userMessage },
  procedural: { task: "outbound_call" }
});`,
  },
  {
    num: "02",
    title: "Context Arithmetic — not just RAG",
    body: "Instead of naïve top-K similarity search, Alchemyst performs set operations on your data: union across sources, intersection across relevance criteria, and explicit subtraction of stale or irrelevant context.",
    code: `// Union: merge user history + live CRM data
// Intersect: only what satisfies both criteria
// Subtract: exclude superseded decisions
const window = ctx.union(history, crm)
  .intersect(relevantToQuery)
  .subtract(outdatedPricing);`,
  },
  {
    num: "03",
    title: "Context Traces for full auditability",
    body: "Every agent decision is traceable back to the exact context it had. Not a summary — the exact data points, ranked and filtered, that went into the model's context window. Debug in minutes, not days.",
    code: `const trace = await alchemyst.trace.get(
  session_id, turn_id
);
// Returns: sources[], scores[], rules_applied[]
// Pairs with Euphony for visual debugging`,
  },
  {
    num: "04",
    title: "Semantic consensus enforcement",
    body: 'Define canonical term definitions at the org level. When "revenue" means different things to different teams, Alchemyst resolves the ambiguity before it reaches the model.',
    code: `await alchemyst.ontology.define({
  term: "revenue",
  canonical: "ARR as reported to board",
  aliases: ["sales", "bookings", "ARR"],
  owner: "finance",
  updated_at: new Date()
});`,
  },
];

const METRICS = [
  { value: "< 50ms", label: "context retrieval latency", sub: "p99 across all query types" },
  { value: "94%", label: "reduction in hallucinations", sub: "on domain-specific tasks" },
  { value: "3×", label: "faster agent debugging", sub: "with context traces vs raw logs" },
  { value: "1 API", label: "replaces 4 infra pieces", sub: "vector DB, graph DB, cache, logger" },
];

export default function AlchemystFixesSection() {
  return (
    <section
      id="how-it-works"
      style={{ background: "#F7F4EE", paddingTop: "96px", paddingBottom: "96px" }}
      aria-labelledby="fixes-heading"
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p className="eyebrow" style={{ marginBottom: "16px" }}>What does Alchemyst do?</p>
          <h2
            id="fixes-heading"
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.875rem, 3.5vw, 3rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#0F172A",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            A context layer that keeps your AI{" "}
            <span style={{ color: "#F49025", fontStyle: "italic" }}>current, traceable,</span> and
            semantically consistent.
          </h2>
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 400,
              fontSize: "1.0625rem",
              lineHeight: 1.65,
              color: "#64748B",
              maxWidth: "540px",
              margin: "20px auto 0",
            }}
          >
            One API call. Three memory layers. Full context arithmetic. Every decision traceable
            back to its source — without managing a single vector database or graph store.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "80px" }}>
          {STEPS.map((step) => (
            <div
              key={step.num}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "40px",
                alignItems: "start",
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                padding: "36px",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      letterSpacing: "0.12em",
                      color: "#F49025",
                      background: "rgba(244,144,37,0.08)",
                      border: "1px solid rgba(244,144,37,0.22)",
                      borderRadius: "4px",
                      padding: "2px 8px",
                    }}
                  >
                    {step.num}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.0625rem",
                      letterSpacing: "-0.01em",
                      color: "#0F172A",
                    }}
                  >
                    {step.title}
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.9375rem",
                    lineHeight: 1.65,
                    color: "#64748B",
                  }}
                >
                  {step.body}
                </p>
              </div>
              <pre
                style={{
                  background: "#0F172A",
                  borderRadius: "8px",
                  padding: "20px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.8125rem",
                  lineHeight: 1.7,
                  color: "#94A3B8",
                  overflowX: "auto",
                  margin: 0,
                }}
              >
                <code>{step.code}</code>
              </pre>
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1px",
            background: "#E5E7EB",
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "64px",
          }}
        >
          {METRICS.map((m) => (
            <div
              key={m.label}
              style={{
                background: "#FFFFFF",
                padding: "28px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                  letterSpacing: "-0.04em",
                  color: "#F49025",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  color: "#0F172A",
                  marginTop: "4px",
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  color: "#94A3B8",
                  marginTop: "4px",
                }}
              >
                {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Euphony callout */}
        <div
          style={{
            background: "#0F172A",
            borderRadius: "8px",
            padding: "40px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "32px",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#F49025",
                marginBottom: "10px",
              }}
            >
              Example Use Case
            </p>
            <h3
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 700,
                fontSize: "1.25rem",
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                marginBottom: "12px",
              }}
            >
              How do you debug what an agent can&apos;t see? Context Tracing with OpenAI Euphony
            </h3>
            <p
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 400,
                fontSize: "0.9375rem",
                lineHeight: 1.65,
                color: "#94A3B8",
                maxWidth: "560px",
              }}
            >
              Pairing Alchemyst&apos;s Context Traces with Euphony — OpenAI&apos;s open-source conversation
              visualizer — creates an end-to-end debugging workflow. Every agent failure is now
              diagnosable in minutes: was it a retrieval problem, a configuration problem, or a
              model problem?
            </p>
          </div>
          <a
            href="https://getalchemystai.com/blog/context-tracing-for-ai-agents-with-openai-euphony"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ whiteSpace: "nowrap" }}
          >
            Read the walkthrough
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
