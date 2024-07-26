"use client";
import { models } from "@/app/constants/models";
import Model from "@/app/types/model";
import { motion } from "framer-motion";
import { useState } from "react";

const ModelsIntro: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<Model>(models[0]);

  // Variants for animations
  const containerVariants = {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1 },
    }),
  };

  const popupVariants = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false }}
      className="w-4/5 md:w-2/3 mx-auto mb-20"
    >
      <motion.h1
        className="text-4xl mb-8 text-[#cecec5]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        Explore the next-gen{" "}
        <span className="text-[#21dbd8]">AI digital employee</span>
      </motion.h1>
      <div className="flex flex-col-reverse md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8">
        <motion.div
          className="flex flex-col space-y-6 w-full md:w-1/3 mt-8 md:mt-auto"
          initial="initial"
          whileInView="whileInView"
          variants={containerVariants}
          viewport={{ once: false }}
        >
          {models.map((model, index) => (
            <motion.button
              key={index}
              className={`flex items-center space-x-4 p-5 rounded-lg bg-[#ffffff10] rounded-tl-3xl rounded-br-3xl ${
                model.disabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              } ${
                selectedModel.name === model.name
                  ? "text-cyan-100"
                  : "text-gray-600"
              }`}
              onClick={() => !model.disabled && setSelectedModel(model)}
              disabled={model.disabled}
              custom={index}
              initial="initial"
              whileInView="whileInView"
              variants={buttonVariants}
              aria-selected={selectedModel.name === model.name}
              aria-disabled={model.disabled}
            >
              <span>{model.icon}</span>
              <span className="font-medium">{model.name}</span>
            </motion.button>
          ))}
        </motion.div>
        <motion.div
          className="w-full md:w-2/3"
          initial="initial"
          whileInView="whileInView"
          variants={popupVariants}
          viewport={{ once: false }}
        >
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={selectedModel.video}
              title={selectedModel.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[36vh] rounded-lg"
            ></iframe>
          </div>
          <h2 className="text-2xl font-bold mt-4">{selectedModel.title}</h2>
          <p className="mt-2 text-[#5d5d55]">{selectedModel.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ModelsIntro;
