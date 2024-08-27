"use client";
import integrations from "@/app/constants/integrations";
import { motion } from "framer-motion";
import Image from "next/image"; // Import for optimized images
import GridLayout from "../GridLayout";

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
        <h2 className="text-[#21dbd8] mb-20 text-4xl md:text-5xl text-center mx-4">
          {/* <span className="text-[#21dbd8]"> */}
          One-minute integrations
          {/* </span> */}
          {/* <br /> */}
        </h2>
        <h3 className="mb-20 text-3xl md:text-3xl text-center mx-4">
          Alchemysts work wherever you work.
        </h3>
        <div className="flex flex-wrap gap-28 w-2/3 justify-center items-center">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              className="h-16 w-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
            >
              <Image
                src={integration}
                alt={`Integration ${index}`}
                width={150}
                height={150}
                className="h-14 w-auto"
              />
            </motion.div>
          ))}
          <motion.div
            className="h-16 flex justify-center items-center w-auto text-gray-500 text-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: integrations.length * 0.1,
              type: "spring",
              stiffness: 200,
            }}
          >
            + 200 Pre-built integrations
          </motion.div>
        </div>
      </motion.div>
    </GridLayout>
  );
};

export default Integrations;
