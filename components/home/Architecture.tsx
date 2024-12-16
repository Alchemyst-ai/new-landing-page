"use client";
import { motion } from "framer-motion";
import React from "react";

const Architecture: React.FC = () => {
  const boxVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="flex w-full flex-col justify-center items-center p-4">
      <header className="mb-20 text-3xl md:text-4xl flex flex-col md:flex-row text-center text-gray-400">
        <span>Service Oriented Architecture</span>
      </header>

      <motion.div
        className="w-[80vw] md:w-[25vw] h-[10vh] md:h-[12vh] rounded-lg md:rounded-xl overflow-hidden "
        variants={boxVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        <div className="w-full h-full flex justify-center items-center bg-gradient-to-b from-black via-black to-[#fe9833]">
          <h2 className="text-3xl font-semibold text-gray-400">
            Gen-AI Employees
          </h2>
        </div>
      </motion.div>

      <div className="w-1 mt-3 border-l border-dashed h-8 border-gray-400"></div>
      <div className="h-8 w-4/5 md:w-3/5 border-x border-t rounded-t-full border-dashed border-gray-400"></div>

      <div className="flex flex-wrap justify-center gap-6 mt-4">
        {["Sales", "Marketing", "HR-Tech", "Customer Support", "Analytics"].map(
          (title, index) => (
            <motion.div
              key={index}
              className="w-[80vw] md:w-[15vw] h-[10vh] md:h-[8vh] rounded-lg md:rounded-xl overflow-hidden"
              variants={boxVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false }}
            >
              <div className="w-full h-full flex justify-center items-center bg-gradient-to-b from-black via-black to-[#1f9c9a]">
                <h2
                  className={`${
                    title === "Customer Support"
                      ? "text-sm md:text-xl"
                      : "text-xl"
                  } font-semibold text-gray-400 text-center`}
                >
                  {title}
                </h2>
              </div>
            </motion.div>
          )
        )}
      </div>

      <div className="h-8 w-4/5 md:w-3/5 border-x border-b rounded-b-full border-dashed border-gray-400 mt-3"></div>
      <div className="w-1 border-l border-dashed h-8 border-gray-400"></div>

      <div className="flex flex-wrap justify-center gap-6 mt-4">
        {[
          "Application Layer",
          "Security + Governance Layer",
          "Infrastructure Layer",
        ].map((title, index) => (
          <motion.div
            key={index}
            className="w-[80vw] md:w-[25vw] h-[12vh] md:h-[14vh] rounded-lg md:rounded-xl overflow-hidden"
            variants={boxVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: false }}
          >
            <div className="w-full h-full flex justify-center items-center bg-gradient-to-b from-black via-black to-[#1f9c9a]">
              <h2 className="text-2xl md:text-2xl font-semibold text-gray-400 text-center">
                {title}
              </h2>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Architecture;
