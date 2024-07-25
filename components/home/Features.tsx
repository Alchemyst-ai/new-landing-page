"use client";
import Feature from "@/app/types/feature";
import { motion } from "framer-motion";
import GridLayout from "../GridLayout";

interface FeatureProps {
  features: Feature[];
}

const Features: React.FC<FeatureProps> = ({ features }) => {
  const horizontalRadius = 30;
  const verticalRadius = 40;
  const distortion = 0;
  const center = { top: "47%", left: "46%" };

  const centerCircle = (
    <div
      style={center}
      className="absolute shadow-2xl shadow-pink-400 w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center"
    >
      {/* Center Circle Content */}
    </div>
  );

  const positions = features.map((_, index) => {
    const angle = (index / features.length) * 2 * Math.PI;
    const distortionFactor = 1 + Math.random() * distortion - distortion / 2;
    const top = 41 - verticalRadius * distortionFactor * Math.sin(angle) + "%";
    const left =
      41 + horizontalRadius * distortionFactor * Math.cos(angle) + "%";

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
          <h1 className="mb-20 text-4xl md:text-5xl text-center mx-4">
            <span className="text-lg text-gray-400">
              Grow your Organization&apos;s
            </span>
            <br />
            Central Intelligence with
            <br />
            <span className="text-[#21dbd8]">Alchemyst&apos;s AgentMesh</span>
          </h1>
          <div className="relative w-[80vw] h-[70vh] hidden md:block">
            {centerCircle}
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#1C1C1A] min-w-60 absolute p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center border border-gray-800 text-gray-400"
                drag
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                style={center}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  top: positions[index].top,
                  left: positions[index].left,
                }}
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
          <div className="grid grid-cols-2 mx-2 md:hidden">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#1C1C1A] m-2 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center border border-gray-800 text-gray-400"
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
