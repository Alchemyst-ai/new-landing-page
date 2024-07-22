"use client";
import Feature from "@/app/types/feature";
import { motion } from "framer-motion";
import GridLayout from "./GridLayout";

interface FeatureProps {
  features: Feature[];
}

const Features: React.FC<FeatureProps> = ({ features }) => {
  return (
    <GridLayout>
      <motion.div
        initial={{ opacity: 0.6, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="relative flex flex-col items-center justify-center my-20"
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
        <div className="relative flex justify-center">
          <motion.div
            className="absolute w-20 h-20 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full flex items-center justify-center"
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <motion.div
            className="absolute top-28 left-48 w-20 h-20 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full flex items-center justify-center"
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-60 right-52 w-20 h-20 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full flex items-center justify-center"
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
              delay: 2,
            }}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 rounded-lg">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#1C1C1A] relative p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center border border-gray-800 text-gray-400"
                drag
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
        </div>
      </motion.div>
    </GridLayout>
  );
};

export default Features;
