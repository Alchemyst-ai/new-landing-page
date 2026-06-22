// Navbar — sticky dark header with in-page anchor links (Server Component)
// Hover effects handled via CSS class in globals.css — no event handlers needed
import Link from "next/link";

const NAV_LINKS = [
  { label: "Why Context", href: "#why-context" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Thesis", href: "#thesis" },
  { label: "Docs", href: "https://docs.getalchemystai.com" },
];

export default function Navbar() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(10,15,30,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <polygon points="14,2 25,8 25,20 14,26 3,20 3,8" fill="#F49025" opacity="0.15" />
            <polygon points="14,2 25,8 25,20 14,26 3,20 3,8" fill="none" stroke="#F49025" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="3.5" fill="#F49025" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "0.9375rem", color: "#FFFFFF", letterSpacing: "-0.01em" }}>
              Alchemyst AI
            </span>
            <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "0.625rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#F49025", marginTop: "1px" }}>
              Context Layer
            </span>
          </div>
        </Link>

        {/* Nav links — desktop */}
        <nav style={{ display: "flex", alignItems: "center", gap: "28px" }} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a
            href="https://docs.getalchemystai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-docs-btn"
          >
            Read Docs
          </a>
          <a
            href="#get-access"
            className="btn-primary"
            style={{ padding: "8px 18px", fontSize: "0.875rem" }}
          >
            Get API Access
          </a>
        </div>
      </div>
    </header>
  );
}
