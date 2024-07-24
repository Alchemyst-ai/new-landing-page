"use client";
import Testimonial from "@/app/types/testimonials";
import { motion } from "framer-motion";

interface TestimonialProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialProps> = ({ testimonials }) => {
  return (
    <motion.div
      initial={{ opacity: 0.6, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      viewport={{ once: false }}
      className="relative flex flex-col items-center justify-center md:w-[60vw] my-20"
    >
      <h1 className="mb-10 text-4xl md:text-5xl flex flex-col md:flex-row text-center">
        <span>Our customers&nbsp;</span>
        <span className="text-[#21dbd8]">love us</span>
      </h1>
      <div className="w-full px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 mb-4 gap-4">
        {["Product Hunt Award", "G2 High Performer"].map((title, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.6, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: false }}
            className="w-full p-4 clear-start border border-[#2d2d2da1] rounded-2xl"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/golden.png" alt="Golden" className="animate-pulse" />
            <h1 className="text-xl">{title}</h1>
            <p className="text-sm text-gray-500 w-3/4 mt-2">
              {title === "Product Hunt Award"
                ? "We placed 2nd in the no-code product category and have received numerous daily and monthly awards."
                : "With a 4.5 out of 5 average rating we’re a high performer on G2."}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="w-full px-4 md:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.8, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: false }}
            className="bg-[#1C1C1A] p-4 rounded-2xl shadow-lg"
          >
            <div className="flex flex-col md:flex-row md:gap-2 mb-4">
              <img
                src={testimonial.profileImage}
                alt={testimonial.name}
                className="w-7 h-7 rounded-full"
              />
              <h2 className="text-lg mt-2 md:mt-auto font-semibold mb-2">
                {testimonial.name}
              </h2>
            </div>
            <p className="text-gray-400">{testimonial.message}</p>
          </motion.div>
        ))}
      </div>
      <div className="absolute -bottom-10  h-40 w-full bg-gradient-to-b from-[#0b0b090e] via-[#0b0b09d3] to-[#0b0b09]"></div>
    </motion.div>
  );
};

export default Testimonials;
