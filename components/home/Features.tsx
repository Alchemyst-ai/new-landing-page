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
      className={`bg-gradient-to-br from-black via-black to-teal-950 rounded-lg p-6 flex flex-col border border-gray-700 ${
        isLarge ? 'h-full' : ''
      }`}
      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(4,44,43,255)' }}
      transition={{ duration: 0.3 }}
    >
      <h3 className={`font-bold text-white mb-4 ${isLarge ? 'text-3xl' : 'text-2xl'}`}>{title}</h3>
      <p className={`text-gray-500 mb-6 flex-grow ${isLarge ? 'text-lg' : 'text-base'}`}>{description}</p>
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
    <div className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-400 mb-12 text-center">Features</h2>
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

