"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
  children?: ReactNode;
}

const FeatureCard = ({ title, description, className, children }: FeatureCardProps) => {
  return (
    <div className={cn("p-6 rounded-xl", className)}>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="opacity-80 text-sm">{description}</p>
      {children}
    </div>
  );
};

export default FeatureCard; 