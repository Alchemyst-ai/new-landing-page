"use client";
import { trustedby } from "@/app/constants/trustedby";
import { motion } from "framer-motion";
import Image from "next/image";

const Benefits: React.FC = () => {
  return (
    <div className="md:w-2/3 flex flex-col justify-center items-center">
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        <motion.div
          className="border p-2 w-[80vw] md:w-[25vw] h-[15vh] md:h-[20vh] rounded-tl-3xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          <div className="border border-dashed rounded-tl-3xl p-4 md:p-8 w-[80vw] md:w-[25vw] h-[15vh] md:h-[20vh] bg-[#1F1F1C] flex flex-col justify-center items-center">
            <p className="text-base md:text-xl text-gray-300">
              Trustlessly access all historical data
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold text-blue-300 mt-3">
              Data
            </h1>
          </div>
        </motion.div>
        <motion.div
          className="border p-2 w-[80vw] md:w-[25vw] h-[15vh] md:h-[20vh] rounded-br-3xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          <div className="border border-dashed rounded-br-3xl p-4 md:p-8 w-[80vw] md:w-[25vw] h-[15vh] md:h-[20vh] bg-[#1F1F1C] flex flex-col justify-center items-center">
            <p className="text-base md:text-xl text-gray-300">
              Utilize our Quantum SDK to express your
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold text-blue-300 mt-3">
              Compute
            </h1>
          </div>
        </motion.div>
      </div>
      <Image
        className="hidden md:block"
        src="/benefits/joinlines-lg.webp"
        alt="ethereum"
        width={450}
        height={450}
      />
      <motion.h1
        className="text-3xl mt-8 md:mt-auto md:text-5xl w-3/4 md:w-1/2 text-center text-gray-300"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        Data-enriched <span className="text-blue-400">autonomous</span>{" "}
        applications
      </motion.h1>
      <div className="w-full bg-radial-gradient rounded-full"></div>
      <div className="flex w-full mt-40 justify-center items-center">
        <div className="w-full bg-gradient-to-r from-[#0b0b09] to-[#ffffff42]  h-[2px]"></div>
        <h1 className="text-base text-nowrap mx-3">BACKED BY</h1>
        <div className="w-full bg-gradient-to-r to-[#0b0b09] from-[#ffffff42]  h-[2px]"></div>
      </div>
      <motion.div
        className="flex flex-col md:flex-row justify-center items-center mt-8 gap-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        {trustedby.map((company, index) => (
          <Image
            key={index}
            src={company.image}
            alt={company.image}
            width={250}
            height={250}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Benefits;
