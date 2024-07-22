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
      className="relative flex flex-col items-center justify-center md:w-2/3 my-20"
    >
      <h1 className="mb-10 text-4xl md:text-5xl flex flex-col md:flex-row">
        <span>Our customers&nbsp;</span>
        <span className="text-blue-500">love us</span>
      </h1>
      <div className="w-full px-4 md:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.8, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: false }}
            className="bg-[#1C1C1A] p-6 rounded-lg shadow-lg"
          >
            <div className="flex flex-col md:flex-row gap-2 mb-4">
              <img
                src={testimonial.profileImage}
                alt={testimonial.name}
                className="w-8 h-8 rounded-full"
              />
              <h2 className="text-lg text-center font-semibold mb-2">
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
