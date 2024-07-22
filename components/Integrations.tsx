"use client";
import integrations from "@/app/constants/integrations";
import { motion } from "framer-motion";
import GridLayout from "./GridLayout";

const Integrations: React.FC = () => {
  return (
    <GridLayout>
      <motion.div
        initial={{ opacity: 0.6, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: false }}
        className="relative flex flex-col items-center justify-center my-20"
      >
        <h1 className="mb-10 text-4xl md:text-5xl text-center">
          Integrates with Leading LLMs, <br />
          <span className="text-blue-500">Vector Databases</span>
          <span className="text-blue-500">and Cloud Platforms</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {integrations.map((integration, index) => (
            <motion.img
              key={index}
              src={integration}
              alt="integration"
              className="w-1/2 mx-auto mb-10 invert"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.05,
              }}
            />
          ))}
        </div>
      </motion.div>
    </GridLayout>
  );
};
export default Integrations;
