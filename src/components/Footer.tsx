// Footer — dark ink, amber accent (Server Component)

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: "#0F172A",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: "64px",
        paddingBottom: "48px",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <polygon points="14,2 25,8 25,20 14,26 3,20 3,8" fill="#F49025" opacity="0.15" />
                <polygon points="14,2 25,8 25,20 14,26 3,20 3,8" fill="none" stroke="#F49025" strokeWidth="1.5" />
                <circle cx="14" cy="14" r="3.5" fill="#F49025" />
              </svg>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.9375rem", color: "#FFFFFF" }}>Alchemyst AI</span>
                <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.625rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#F49025", marginTop: "2px" }}>Context Layer</span>
              </div>
            </div>
            <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: "0.9375rem", lineHeight: 1.65, color: "#64748B", maxWidth: "320px" }}>
              Persistent, traceable context and semantic retrieval for AI agents — over your institutional knowledge graph. One API. Zero infrastructure.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#475569", marginBottom: "16px" }}>Product</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Context Layer", href: "#" },
                { label: "Thesis", href: "/thesis" },
                { label: "Kathan Voice AI", href: "https://getalchemystai.com/kathan" },
                { label: "Agent Builder", href: "https://getalchemystai.com/agents" },
                { label: "Pricing", href: "https://getalchemystai.com/pricing" },
                { label: "Changelog", href: "https://getalchemystai.com/changelog" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.9rem", color: "#64748B", textDecoration: "none" }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#475569", marginBottom: "16px" }}>Developers</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Documentation", href: "https://docs.getalchemystai.com" },
                { label: "API Reference", href: "https://docs.getalchemystai.com/api" },
                { label: "Python SDK", href: "https://docs.getalchemystai.com/sdk/python" },
                { label: "Node.js SDK", href: "https://docs.getalchemystai.com/sdk/node" },
                { label: "Status", href: "https://status.getalchemystai.com" },
                { label: "llms.txt", href: "/llms.txt" },
                { label: "llms-full.txt", href: "/llms-full.txt" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.9rem", color: "#64748B", textDecoration: "none" }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.06em", color: "#475569" }}>
            © {year} Alchemyst AI Pvt. Ltd. · Bangalore, India
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {[
              { label: "Privacy", href: "https://getalchemystai.com/privacy" },
              { label: "Terms", href: "https://getalchemystai.com/terms" },
              { label: "Contact", href: "mailto:hello@getalchemystai.com" },
            ].map((l) => (
              <a key={l.label} href={l.href} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.06em", color: "#475569", textDecoration: "none" }}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
