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
          ? `1px solid ${customColor || "#B45309"}`
          : "1px solid #E4D9BC",
        borderTop: popular ? `3px solid ${customColor || "#B45309"}` : undefined,
        borderRadius: "var(--radius)",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        boxShadow: popular ? "0 8px 32px -12px rgba(180, 83, 9,0.25)" : "var(--shadow-soft)",
      }}
    >
      {popular && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            backgroundColor: customColor || "#B45309",
            color: "#FFFFFF",
            padding: "3px 10px",
            borderRadius: "var(--radius)",
            fontSize: "10px",
            fontFamily: "var(--font-jetbrains-mono), monospace",
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
          fontFamily: "var(--font-merriweather), Georgia, serif",
          fontWeight: 900,
          fontSize: "1.875rem",
          color: "#4A3B33",
          marginBottom: "8px",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h3>
      <div style={{ display: "flex", alignItems: "baseline", marginBottom: "24px" }}>
        <span
          style={{
            fontFamily: "var(--font-merriweather), Georgia, serif",
            fontWeight: 900,
            fontSize: "1.5rem",
            color: "#4A3B33",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {price}
        </span>
        {originalPrice && (
          <span
            style={{
              fontFamily: "var(--font-merriweather), Georgia, serif",
              fontSize: "0.875rem",
              color: "#A8A29E",
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
          fontFamily: "var(--font-merriweather), Georgia, serif",
          fontSize: "0.9375rem",
          color: "#78716C",
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
                color: popular ? (customColor || "#B45309") : "#A16207",
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
                fontFamily: "var(--font-merriweather), Georgia, serif",
                fontSize: "0.875rem",
                color: "#57534E",
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
              borderColor: popular ? customColor || "#B45309" : undefined,
              backgroundColor: popular ? customColor || "#B45309" : undefined,
              color: popular ? "#FFFFFF" : undefined,
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
            borderColor: popular ? customColor || "#B45309" : undefined,
            backgroundColor: popular ? customColor || "#B45309" : undefined,
            color: popular ? "#FFFFFF" : undefined,
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
