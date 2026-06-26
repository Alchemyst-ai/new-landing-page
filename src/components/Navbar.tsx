// Navbar — sticky dark header with in-page anchor links (Server Component)
// Hover effects handled via CSS class in globals.css — no event handlers needed
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Why Context", href: "/#why-context" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Thesis", href: "/thesis" },
  { label: "Blog", href: "/blog" },
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
        {/* Brand — actual Alchemyst logo */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          aria-label="Alchemyst AI home"
        >
          <Image
            src="/logo.png"
            alt="Alchemyst AI"
            width={150}
            height={22}
            priority
            style={{ height: "22px", width: "auto" }}
          />
          <span
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: "0.625rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0E9594",
              borderLeft: "1px solid rgba(255,255,255,0.15)",
              paddingLeft: "10px",
            }}
          >
            Context Layer
          </span>
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

        {/* CTAs — shadcn Button (asChild keeps them as links) */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Button
            asChild
            variant="ghost"
            size="brand-sm"
            className="text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Link href="/platform/signin">Sign in</Link>
          </Button>
          <Button asChild variant="orange" size="brand-sm">
            <a href="/#get-access">Get API Access</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
