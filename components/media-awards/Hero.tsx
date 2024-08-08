/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import GridLayout from "../GridLayout";
const Hero: React.FC = () => {
  return (
    <section
      id="media"
      className="relative flex flex-col items-center justify-center my-20 md:w-[60vw]"
    >
      <GridLayout>
        <header className="text-center mb-10 h-[40vh] flex justify-center items-center">
          <h1 className="text-4xl md:text-5xl text-center">
            <span>Alchemyst AI Awarded by&nbsp;</span>
            <br />
            <span className="text-[#21dbd8]">
              Leading Organizations and Industries
            </span>
          </h1>
        </header>
      </GridLayout>
      <div className="w-full px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {["Product Hunt Award", "G2 High Performer"].map((title, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.6, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: false }}
            className="w-full p-4 border border-[#2d2d2da1] bg-[#1C1C1A] rounded-2xl shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/golden.png"
              alt={`${title} award`}
              className="w-auto h-40 mx-auto"
            />
            <h2 className="text-xl text-center mt-4">{title}</h2>
            <p className="text-sm text-gray-500 text-center mt-2">
              {title === "Product Hunt Award"
                ? "We placed 2nd in the no-code product category and have received numerous daily and monthly awards."
                : "With a 4.5 out of 5 average rating, we’re a high performer on G2."}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default Hero;
