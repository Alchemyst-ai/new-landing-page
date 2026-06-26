// AlchemystFixesSection - "What Alchemyst Does" (Server Component)
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    num: "01",
    title: "Context Arithmetic - the core primitive",
    body: "Context arithmetic is the foundational primitive: dynamic set algebra over meaning, computed at query time. Instead of naïve top-K similarity, Alchemyst intersects to narrow scope, unions to widen recall, subtracts superseded or out-of-scope content, and ranks what remains - so only the right context survives into the window.",
    code: `// Set algebra over meaning, at query time
const window = alchemyst.context.search({
  query: userMessage,
  groupName: ["sales", "emea"],   // ∩ narrow scope
  metadata: { version: "v2" },     // ∩ filter
});
// − superseded / deduped  → rank → top-K`,
  },
  {
    num: "02",
    title: "Institutional knowledge graph + context traces",
    body: "What you store is an institutional knowledge graph of your organization's context, fully traceable. Memory isn't three hard-coded layers - by applying context arithmetic over the graph you can derive the behaviors people expect from memory: recall what happened, resolve what it means, and inform how to act. The memory types are outcomes of the primitive, not separate modules.",
    code: `// One graph + arithmetic → derived "memories"
const whatHappened = ctx.search({ groupName: [session_id] });
const whatItMeans  = ctx.search({ query: term })
                        .subtract(deprecated);
// "how to act" falls out of ranked, in-scope context`,
  },
  {
    num: "03",
    title: "Context Traces for full auditability",
    body: "Every agent decision is traceable back to the exact context it had - at a query level. Not a summary, but the exact data points, scores, and rules that went into the model's context window. Debug in minutes, not days.",
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
  { value: "< 300ms", label: "context retrieval latency", sub: "p95 across all query types" },
  { value: "99.7%", label: "reduction in hallucinations", sub: "on domain-specific tasks" },
  { value: "20×", label: "faster agent debugging", sub: "with context traces vs raw logs" },
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
              fontFamily: "'Sora', sans-serif",
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
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
              fontSize: "1.0625rem",
              lineHeight: 1.65,
              color: "#64748B",
              maxWidth: "540px",
              margin: "20px auto 0",
            }}
          >
            One API call. Context arithmetic over your institutional knowledge graph. Every
            decision traceable back to its source - without managing a single vector database or
            graph store.
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
                      fontFamily: "'Sora', sans-serif",
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
                    fontFamily: "'Sora', sans-serif",
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
                  fontFamily: "'Sora', sans-serif",
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
                  fontFamily: "'Sora', sans-serif",
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
                fontFamily: "'Sora', sans-serif",
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
                fontFamily: "'Sora', sans-serif",
                fontWeight: 400,
                fontSize: "0.9375rem",
                lineHeight: 1.65,
                color: "#94A3B8",
                maxWidth: "560px",
              }}
            >
              Pairing Alchemyst&apos;s Context Traces with Euphony - OpenAI&apos;s open-source conversation
              visualizer - creates an end-to-end debugging workflow. Every agent failure is now
              diagnosable in minutes: was it a retrieval problem, a configuration problem, or a
              model problem?
            </p>
          </div>
          <Button asChild variant="orange" size="brand" className="whitespace-nowrap">
            <a
              href="https://getalchemystai.com/blog/context-tracing-for-ai-agents-with-openai-euphony"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the walkthrough
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
