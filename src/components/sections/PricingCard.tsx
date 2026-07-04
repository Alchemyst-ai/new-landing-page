import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PricingFeature {
  text: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: PricingFeature[];
  ctaText: string;
  ctaLink?: string;
  popular?: boolean;
  customColor?: string;
}

const PricingCard = ({
  title,
  price,
  originalPrice,
  description,
  features,
  ctaText,
  ctaLink,
  popular = false,
  customColor,
}: PricingCardProps) => {
  return (
    <div
      className="pricing-card"
      style={{
        background: "#FFFFFF",
        border: popular
          ? `1px solid ${customColor || "#F49025"}`
          : "1px solid #E5E7EB",
        borderTop: popular ? `3px solid ${customColor || "#F49025"}` : undefined,
        borderRadius: "0",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        boxShadow: popular ? "0 8px 32px -12px rgba(244,144,37,0.25)" : undefined,
      }}
    >
      {popular && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            backgroundColor: customColor || "#F49025",
            color: "#0A0F1E",
            padding: "3px 10px",
            borderRadius: "0",
            fontSize: "10px",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          POPULAR
        </div>
      )}
      <h3
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 800,
          fontSize: "1.875rem",
          color: "#0F172A",
          marginBottom: "8px",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h3>
      <div style={{ display: "flex", alignItems: "baseline", marginBottom: "24px" }}>
        <span
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            fontSize: "1.5rem",
            color: "#0F172A",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {price}
        </span>
        {originalPrice && (
          <span
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "0.875rem",
              color: "#94A3B8",
              marginLeft: "8px",
              textDecoration: "line-through",
            }}
          >
            {originalPrice}
          </span>
        )}
      </div>
      <p
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "0.9375rem",
          color: "#64748B",
          marginBottom: "24px",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px", flex: 1 }}>
        {features.map((feature, index) => (
          <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <div
              style={{
                color: popular ? (customColor || "#F49025") : "#128F8B",
                flexShrink: 0,
                marginTop: "2px",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="M7.5 12.5L10.5 15.5L16 10"></path>
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "0.875rem",
                color: "#475569",
                lineHeight: 1.5,
              }}
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      {ctaLink ? (
        <Link href={ctaLink} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button
            style={{
              borderColor: popular ? customColor || "#F49025" : undefined,
              backgroundColor: popular ? customColor || "#F49025" : undefined,
              color: popular ? "#0A0F1E" : undefined,
            }}
            className={popular ? "w-full" : "w-full"}
            variant={popular ? "default" : "outline"}
          >
            {ctaText}
          </Button>
        </Link>
      ) : (
        <Button
          style={{
            borderColor: popular ? customColor || "#F49025" : undefined,
            backgroundColor: popular ? customColor || "#F49025" : undefined,
            color: popular ? "#0A0F1E" : undefined,
          }}
          className={popular ? "w-full" : "w-full"}
          variant={popular ? "default" : "outline"}
        >
          {ctaText}
        </Button>
      )}
    </div>
  );
};

export default PricingCard;
