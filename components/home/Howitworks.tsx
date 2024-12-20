"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import Link from "next/link";

const options = [
  {
    title: "Define Your ICP",
    description:
      "Maya's intuitive AI asks targeted questions to create a clear Ideal Customer Profile (ICP) for your business.",
    image: "/media/define-icp.png",
  },
  {
    title: "Generate High-Quality Leads",
    description:
      "Using your ICP, Maya identifies and generates a list of high-quality leads tailored to your business needs.",
    image: "/media/generate-leads.png",
  },
  {
    title: "Automate Your Outreach",
    description:
      "Maya automates your outreach process, sending personalized messages to your leads and following up at optimal times.",
    image: "/media/automate-outreach.png",
  },
];

const Howitworks: React.FC = () => {
  const [activeOption, setActiveOption] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll through options every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOption((prev) => (prev + 1) % options.length);
      if (containerRef.current) {
        const nextScroll =
          (containerRef.current.scrollWidth / options.length) *
          ((activeOption + 1) % options.length);
        containerRef.current.scrollTo({
          left: nextScroll,
          behavior: "smooth",
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeOption]);

  return (
    <div className="w-full bg-gradient-to-bl from-black via-black to-[#9b4d00] py-16">
      {/* Title */}
      

      {/* Horizontal Scrollable Options */}
      <div
        ref={containerRef}
        className="w-full max-w-6xl mx-auto flex items-center justify-between overflow-x-auto scrollbar-none px-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            {/* Option */}
            <div
              onClick={() => setActiveOption(index)}
              className={`flex-shrink-0 flex items-center justify-center w-48 h-20 px-4 py-2 cursor-pointer border-2 border-dashed rounded-full transition duration-300 ${
                activeOption === index
                  ? "text-yellow-700 border-yellow-700 drop-shadow-[0_0_10px_rgba(255,255,0,0.6)]"
                  : "text-gray-400 border-gray-600 hover:text-yellow-700 hover:border-yellow-700"
              }`}
            >
              <span className="text-lg font-semibold text-center">
                {option.title}
              </span>
            </div>

            {/* Arrow (except the last option) */}
            {index < options.length - 1 && (
              <div className="flex items-center mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="20"
                  viewBox="0 0 48 20"
                  fill="none"
                >
                  <line
                    x1="0"
                    y1="10"
                    x2="40"
                    y2="10"
                    stroke="gray"
                    strokeWidth="2"
                    strokeDasharray="5, 5"
                  />
                  <polygon
                    points="40,5 48,10 40,15"
                    fill="#c77626"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dynamic Content with Animation */}
      <div className="relative max-w-6xl mx-auto mt-16 px-4 h-96 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeOption}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-full h-full flex items-center"
          >
            <div className="md:flex items-center">
              <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                <h2 className="text-4xl font-bold mb-4 text-white">
                  {options[activeOption].title}
                </h2>
                <p className="text-gray-400 mb-6">
                  {options[activeOption].description}
                </p>
                <Link href="/chat-with-maya">
                  <Button variant="primary">Chat with Maya</Button>
                </Link>
              </div>
              <div className="md:w-1/2">
                <Image
                  src={options[activeOption].image}
                  alt={options[activeOption].title}
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Howitworks;