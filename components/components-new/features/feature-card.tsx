import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  href,
  className,
}: FeatureCardProps) {
  const Card = href ? Link : "div";
  
  return (
    <Card
      href={href || "#"}
      className={cn(
        "group relative overflow-hidden rounded-lg border p-6 hover:border-foreground/20 hover:shadow-md transition-all",
        href && "cursor-pointer",
        className
      )}
    >
      {icon && <div className="mb-4 text-primary">{icon}</div>}
      <h3 className="mb-2 text-xl font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      {href && (
        <div className="mt-4 flex items-center text-sm font-medium text-primary">
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      )}
    </Card>
  );
} 