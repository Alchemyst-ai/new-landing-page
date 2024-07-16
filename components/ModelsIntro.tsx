"use client";
import React, { useState } from "react";

import { models } from "@/app/constants/models";
import Model from "@/app/types/model";

const ModelsIntro: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<Model>(models[0]);

  return (
    <div className="w-4/5 md:w-2/3 mx-auto mb-20">
      <h1 className="text-4xl mb-8 text-[#cecec5]">
        Explore the next-gen <span className="text-[#F1A334]">AI digital employee</span>
      </h1>
      <div className="flex flex-col-reverse md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8">
        <div className="flex flex-col space-y-6 w-full md:w-1/3 mt-8 md:mt-auto">
          {models.map((model, index) => (
            <button
              key={index}
              className={`flex items-center space-x-4 p-5 rounded-lg bg-[#ffffff10] rounded-tl-3xl rounded-br-3xl ${
                model.disabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              } ${
                selectedModel.name === model.name
                  ? "text-[#cecec5]"
                  : "text-[#5f5f56]"
              }`}
              onClick={() => !model.disabled && setSelectedModel(model)}
              disabled={model.disabled}
            >
              <span>{model.icon}</span>
              <span className="font-medium">{model.name}</span>
            </button>
          ))}
        </div>
        <div className="w-full md:w-2/3">
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
        </div>
      </div>
    </div>
  );
};

export default ModelsIntro;
