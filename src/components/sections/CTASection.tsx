"use client";
// CTASection - email capture (Client Component for form interactivity)

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="get-access"
      style={{
        background: "#F7F4EE",
        paddingTop: "96px",
        paddingBottom: "96px",
        position: "relative",
        overflow: "hidden",
      }}
      aria-labelledby="cta-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(244,144,37,0.08) 0%, transparent 60%)`,
        }}
      />
      <div className="container relative" style={{ textAlign: "center" }}>
        <p className="eyebrow" style={{ marginBottom: "16px" }}>How do you get started?</p>
        <h2
          id="cta-heading"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#0F172A",
            maxWidth: "640px",
            margin: "0 auto 16px",
          }}
        >
          Give your AI agents the{" "}
          <span
            style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #F49025, #FDB560)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            memory they deserve.
          </span>
        </h2>
        <p
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 400,
            fontSize: "1.125rem",
            lineHeight: 1.6,
            color: "#64748B",
            maxWidth: "480px",
            margin: "0 auto 40px",
          }}
        >
          Join developers building the next generation of AI products with persistent context.
          Free tier available. No credit card required.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "0.9375rem",
                color: "#0F172A",
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                width: "100%",
                maxWidth: "300px",
                outline: "none",
              }}
            />
            <Button type="submit" disabled={loading} variant="orange" size="brand">
              {loading ? "Requesting..." : "Get API Access"}
            </Button>
          </form>
        ) : (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "#F0FDF4",
              border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: "8px",
              padding: "14px 24px",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: "0.9375rem",
                color: "#16A34A",
              }}
            >
              ✓ You&apos;re on the list! We&apos;ll be in touch shortly.
            </span>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <Button asChild variant="brand-outline" size="brand">
            <a
              href="https://docs.getalchemystai.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the Docs
            </a>
          </Button>
          <a
            href="https://getalchemystai.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 500,
              fontSize: "0.9375rem",
              color: "#64748B",
              textDecoration: "none",
            }}
          >
            Learn about Alchemyst AI →
          </a>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {[
            "Free tier - no credit card",
            "REST API + Python & Node SDKs",
            "99.9% uptime SLA",
            "SOC 2 in progress",
          ].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#F49025",
                  opacity: 0.6,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.06em",
                  color: "#94A3B8",
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
