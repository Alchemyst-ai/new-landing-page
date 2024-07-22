"use client";
import Feature from "@/app/types/feature";
import { motion } from "framer-motion";
import GridLayout from "./GridLayout";

interface FeatureProps {
  features: Feature[];
}

const Features: React.FC<FeatureProps> = ({ features }) => {
  const horizontalRadius = 40; // Horizontal radius for the oval
  const verticalRadius = 40;   // Vertical radius for the oval
  const distortion = 0.5;       // Distortion factor to add some randomness
  const center = { top: "45%", left: "45%" }; 

  const positions = features.map((_, index) => {
    const angle = (index / features.length) * 2 * Math.PI; // Angle for the feature
    const distortionFactor = 1 + Math.random() * distortion - distortion / 2; // Random distortion
    const top = 45 - verticalRadius * distortionFactor * Math.sin(angle) + "%";
    const left = 45 + horizontalRadius * distortionFactor * Math.cos(angle) + "%";

    return { top, left };
  });

  return (
    <GridLayout>
      <div className="relative mb-40">
        <motion.div
          initial={{ opacity: 0.6, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="relative flex flex-col items-center justify-center"
        >
          <h1 className="mb-10 text-4xl md:text-5xl text-center">
            <span className="text-lg text-gray-400">
              Grow your Organization&apos;s
            </span>
            <br />
            Central Intelligence with
            <br />
            <span className="text-blue-500">Alchemyst&apos;s AgentMesh</span>
          </h1>
          <div className="relative w-[70vw] h-[70vh]">
            <div
              style={center}
              className="absolute shadow-2xl shadow-pink-400 w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center"
            >
              {/* Center Circle Content */}
            </div>

            {/* Dotted lines */}
            {features.map((_, index) => {
              const angle = (index / features.length) * 2 * Math.PI;
              const top = 45 - verticalRadius * Math.sin(angle) + "%";
              const left = 45 + horizontalRadius * Math.cos(angle) + "%";

              return (
                <svg
                  key={index}
                  className="absolute top-0 left-0 w-full p-20 h-full pointer-events-none -z-10"
                  style={{ overflow: "visible" }}
                >
                  <line
                    x1="50%"
                    y1="50%"
                    x2={left}
                    y2={top}
                    stroke="gray"
                    strokeWidth="1"
                    strokeDasharray="4"
                    className=""
                  />
                </svg>
              );
            })}

            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#1C1C1A] absolute p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center border border-gray-800 text-gray-400"
                drag
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                style={center} // Initially position at center
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, top: positions[index].top, left: positions[index].left }}
                transition={{ duration: 1, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: false }}
              >
                <div className="w-16 h-16 mb-1">{feature.icon}</div>
                <h2 className="text-lg font-semibold text-gray-300">
                  {feature.title}
                </h2>
                <motion.div
                  className="absolute -bottom-2.5 w-5 h-5 border-2 border-gray-800 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </GridLayout>
  );
};

export default Features;
