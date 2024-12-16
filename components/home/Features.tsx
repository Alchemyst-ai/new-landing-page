"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  isLarge?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageSrc, isLarge = false }) => {
  return (
    <motion.div
      className={`bg-gradient-to-br from-black to-teal-900 rounded-lg p-6 flex flex-col ${
        isLarge ? 'h-full' : ''
      }`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className={`font-bold text-white mb-4 ${isLarge ? 'text-3xl' : 'text-2xl'}`}>{title}</h3>
      <p className={`text-gray-300 mb-6 flex-grow ${isLarge ? 'text-lg' : 'text-base'}`}>{description}</p>
      <div className={`relative w-full ${isLarge ? 'h-64' : 'h-14'}`}>
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: "AI-Powered Insights",
      description: "Leverage cutting-edge AI to gain deep insights into your customer base and market trends.",
      imageSrc: "/images/ai-insights.jpg"
    },
    {
      title: "Automated Outreach",
      description: "Streamline your sales process with intelligent automation tools designed for maximum efficiency.",
      imageSrc: "/images/automated-outreach.jpg"
    },
    {
      title: "AI for Lead Generation",
      description: "Find your perfect prospects instantly. With access to a database of 300M+ B2B sales leads, Maya simplifies the hunt for new opportunities.",
      imageSrc: "/images/analytics-dashboard.jpg"
    }
  ];

  return (
    <div className="w-full py-16 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-500 mb-12 text-center">Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <FeatureCard {...features[0]} />
            <FeatureCard {...features[1]} />
          </div>
          <div className="md:row-span-2">
            <FeatureCard {...features[2]} isLarge={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

