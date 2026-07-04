import Link from "next/link";
export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--paper)", color: "var(--ink)", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: 800, color: "#F49025" }}>404</h1>
        <p style={{ color: "#64748B", marginTop: "8px" }}>Page not found</p>
        <Link href="/" style={{ color: "#F49025", marginTop: "16px", display: "inline-block" }}>← Back to home</Link>
      </div>
    </div>
  );
}
