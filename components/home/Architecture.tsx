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
      <header className="font-base-neue font-bold mb-20 text-3xl md:text-5xl flex flex-col md:flex-row text-center bg-gradient-to-r text-[#8f8f8f] bg-clip-text">
        <span>Service Oriented Architecture</span>
      </header>

      <motion.div
        className="w-[80vw] md:w-[25vw] h-[10vh] md:h-[12vh] rounded-lg md:rounded-2xl overflow-hidden border border-gray-600 shadow-md"
        style={{ boxShadow: "0 0 10px 1px rgba(255,165,0,0.5)" }}
        variants={boxVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        <div className="w-full h-full flex justify-center items-center bg-gradient-to-br from-black via-black to-[#9e671a] transform transition-all duration-500 hover:scale-110">
          <h2 className="text-3xl text-gray-400">Gen-AI Employees</h2>
        </div>
      </motion.div>

      <div className="w-1 mt-3 border-l border-dashed h-8 border-gray-400"></div>
      <div className="h-8 w-4/5 md:w-3/5 border-x border-t rounded-t-full border-dashed border-gray-400"></div>

      <div className="flex flex-wrap justify-center gap-6 mt-4">
        {["Sales", "Marketing", "HR-Tech", "Customer Support", "Analytics"].map(
          (title, index) => (
            <motion.div
              key={index}
              className="w-[80vw] md:w-[15vw] h-[10vh] md:h-[8vh] rounded-lg md:rounded-2xl overflow-hidden border border-gray-600"
              variants={boxVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false }}
            >
              <div className="w-full h-full flex justify-center items-center bg-gradient-to-b from-black via-black to-[#004746] transform transition-all duration-500 hover:scale-110">
                <h2
                  className={`${
                    title === "Customer Support"
                      ? "text-sm md:text-xl"
                      : "text-xl"
                  } text-gray-400 text-center `}
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
            className="w-[80vw] md:w-[20vw] h-[12vh] md:h-[10vh] rounded-lg md:rounded-2xl overflow-hidden border border-gray-600"
            variants={boxVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: false }}
          >
            <div className="w-full h-full flex justify-center items-center bg-gradient-to-b from-black via-black to-[#004746] transform transition-all duration-500 hover:scale-110">
              <h2 className="text-2xl md:text-xl text-gray-400 text-center">
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
