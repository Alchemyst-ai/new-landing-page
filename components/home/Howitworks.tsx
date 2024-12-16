"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "./Button";
import Link from "next/link";

import mayaicp from "/public/media/mayaicp.png";

const options = [
  "Define Your ICP",
  "Generate High-Quality Leads",
  "Automate Your Outreach",
];

const Howitworks: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="w-full py-16 bg-gradient-to-bl from-black via-black to-[#fe9833]">
      <h1 className="text-4xl font-bold text-center text-gray-400 mb-12">
        How It Works
      </h1>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between mb-12">
          {options.map((option) => (
            <motion.button
              key={option}
              className={`text-lg font-semibold px-4 py-2 rounded-full transition-colors duration-300 ${
                selectedOption === option
                  ? "bg-yellow-500 text-black"
                  : "text-gray-400 hover:text-yellow-500"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </motion.button>
          ))}
        </div>

        <div className="mt-8">
          {selectedOption === "Define Your ICP" && (
            <div className="flex items-center">
              <div className="w-1/2 pr-8">
                <h2 className="text-3xl font-bold mb-4 text-white">
                  Define Your ICP
                </h2>
                <p className="text-gray-300 mb-6">
                Maya&#39;s intuitive AI asks targeted questions to create a clear Ideal Customer Profile (ICP) for your business.
                </p>
                {/* enter your content here */}
                <Link href=""> 
                  <Button variant="primary">Chat with Maya</Button>
                </Link>
              </div>
              <div className="w-1/2">
                <Image
                  src="/public/media/mayaicp.png"
                  alt="Define Your ICP"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}

          {selectedOption === "Generate High-Quality Leads" && (
            <div>
              {/* Content for Generate High-Quality Leads */}
              {/* Add your content here later */}
            </div>
          )}

          {selectedOption === "Automate Your Outreach" && (
            <div>
              {/* Content for Automate Your Outreach */}
              {/* Add your content here later */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Howitworks;
