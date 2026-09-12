import Link from "next/link";
export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--paper)", color: "var(--ink)", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ textAlign: "center", maxWidth: "640px" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: 800, color: "#F49025" }}>404</h1>
        <p style={{ color: "#64748B", marginTop: "8px" }}>Page not found</p>
        <p style={{ color: "#64748B", marginTop: "12px", fontSize: "0.875rem", lineHeight: 1.6 }}>
          {/* Agent recovery hint — plain-text markdown-style index for crawlers and AI agents */}
          # Page not found. Try these public indexes instead:
          - Homepage: https://getalchemystai.com/
          - Sitemap: https://getalchemystai.com/sitemap.xml
          - LLM index: https://getalchemystai.com/llms.txt
          - Full content: https://getalchemystai.com/llms-full.txt
          - Docs: https://getalchemystai.com/docs
          - API spec: https://getalchemystai.com/openapi.json
          - About: https://getalchemystai.com/about
          - Contact: https://getalchemystai.com/contact
          - Privacy: https://getalchemystai.com/privacy
        </p>
        <nav aria-label="404 recovery" style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", fontSize: "0.875rem" }}>
          <Link href="/" style={{ color: "#F49025", display: "inline-block" }}>← Back to home</Link>
          <Link href="/sitemap.xml" style={{ color: "#F49025", display: "inline-block" }}>Sitemap</Link>
          <Link href="/llms.txt" style={{ color: "#F49025", display: "inline-block" }}>llms.txt</Link>
          <Link href="/llms-full.txt" style={{ color: "#F49025", display: "inline-block" }}>llms-full.txt</Link>
          <Link href="/openapi.json" style={{ color: "#F49025", display: "inline-block" }}>API spec</Link>
          <Link href="/about" style={{ color: "#F49025", display: "inline-block" }}>About</Link>
          <Link href="/contact" style={{ color: "#F49025", display: "inline-block" }}>Contact</Link>
          <Link href="/privacy" style={{ color: "#F49025", display: "inline-block" }}>Privacy</Link>
        </nav>
      </div>
    </div>
  );
}
