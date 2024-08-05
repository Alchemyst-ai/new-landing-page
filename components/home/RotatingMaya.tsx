/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import React from "react";

const RotatingMaya: React.FC = () => {
  const features: string[] = [
    "/svg/graph.svg",
    "/svg/leads.svg",
    "/svg/mail.svg",
    "/svg/privacy.svg",
    "/svg/stack.svg",
    "/svg/target.svg",
    "/svg/sparkle.svg",
    "/svg/time.svg",
  ];
  const horizontalRadius = 45;
  const verticalRadius = 45;
  const center = { top: "25%", left: "25%" };

  const centerCircle = (
    <div style={center} className="absolute h-60 w-60 ">
      <img
        src="/logo/maya.svg"
        alt="Maya"
        className="orange-shadow rounded-full"
      />
    </div>
  );

  const positions = features.map((_, index) => {
    const angle = (index / features.length) * 2 * Math.PI;
    const top = 43 + verticalRadius * Math.sin(angle) + "%";
    const left = 43 + horizontalRadius * Math.cos(angle) + "%";

    return { top, left };
  });

  return (
    <div className="relative w-[25vw] h-[25vw] hidden md:block">
      {centerCircle}
      <img src="/svg/dotted-circle.svg" alt="Circle" className="absolute h-full w-full p-7 opacity-50" />
      <div className="relative w-full h-full animate-spin-slow">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className=" animate-spin-slow-reverse absolute"
            style={{
              top: positions[index].top,
              left: positions[index].left,
            }}
          >
            <div className="w-14 h-14 m-1">
              <img src={feature} alt="Feature" />
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default RotatingMaya;
