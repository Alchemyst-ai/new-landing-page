import React from "react";
import { Button } from "./ui/button";

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
    <div className="bg-[#0f1419] rounded-xl p-8 flex flex-col h-full relative" style={{ cursor: 'auto' }}>
      {popular && (
        <div 
          style={{ 
            backgroundColor: customColor || '#ED9F36' 
          }} 
          className="absolute top-3 right-3 text-black px-3 py-1 rounded-md text-xs font-medium"
        >
          POPULAR
        </div>
      )}
      <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
      <div className="flex items-baseline mb-6">
        <span className="text-2xl font-bold text-white">{price}</span>
        {originalPrice && (
          <span className="text-gray-400 text-sm ml-2 line-through">
            {originalPrice}
          </span>
        )}
      </div>
      <p className="text-gray-300 mb-8">{description}</p>
      
      <div className="flex flex-col gap-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <div style={{ 
              color: popular ? (customColor || '#ED9F36') : '#ffffff' 
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="M7.5 12.5L10.5 15.5L16 10"></path>
              </svg>
            </div>
            <span className="text-gray-300 text-sm">{feature.text}</span>
          </div>
        ))}
      </div>
      
      <Button 
        style={{ 
          borderColor: popular ? customColor || '#ED9F36' : undefined,
          backgroundColor: popular ? customColor || '#ED9F36' : undefined,
          color: popular ? '#000000' : undefined,
        }}
        className={popular ? "border-2 hover:opacity-90" : ""}
        variant={popular ? "default" : "outline"}
        onClick={() => ctaLink && window.open(ctaLink, '_blank')}
      >
        {ctaText}
      </Button>
    </div>
  );
};

export default PricingCard; 