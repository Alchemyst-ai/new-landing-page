"use client";
import { trustedby } from "@/app/constants/trustedby";
import { motion } from "framer-motion";
import Image from "next/image";

const BackedBy: React.FC = () => {
  return (
    <section className="mt-20">
      <div className="flex w-full justify-center items-center">
        <div className="w-full bg-gradient-to-r from-[#0b0b09] to-[#ffffff42] h-[2px]"></div>
        <h1
          className="text-base text-nowrap mx-3"
          aria-label="Backed by the best"
        >
          BACKED BY THE BEST INVESTORS
        </h1>
        <div className="w-full bg-gradient-to-r to-[#0b0b09] from-[#ffffff42] h-[2px]"></div>
      </div>
      <motion.div
        className="flex flex-col md:flex-row justify-center items-center gap-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        {trustedby.map((company, index) => (
          <Image
            key={index}
            src={company.image}
            alt={`Logo of ${company.image}`} // More descriptive alt text
            width={index === 1 ? 160 : 220}
            height={index === 1 ? 160 : 220}
            className={`${company.image.includes("earlyseed") ? "invert" : ""}`}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default BackedBy;
