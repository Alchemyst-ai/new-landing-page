/* eslint-disable @next/next/no-img-element */
"use client";
import Testimonial from "@/app/types/testimonials";
import { motion } from "framer-motion";

interface TestimonialProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialProps> = ({ testimonials }) => {
  return (
    <section
      id="testimonials"
      className="relative flex flex-col items-center justify-center my-20 md:w-[60vw]"
    >
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl flex flex-col md:flex-row">
          <span>Our customers&nbsp;</span>
          <span className="text-[#21dbd8]">love us</span>
        </h1>
      </header>

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
            <div className="flex flex-col md:flex-row md:gap-2 mb-4 items-center">
              <img
                src={testimonial.profileImage}
                alt={`${testimonial.name}'s profile`}
                className="w-12 h-12 rounded-full"
              />
              <h2 className="text-lg mt-2 md:mt-0 font-semibold mb-2">
                {testimonial.name}
              </h2>
            </div>
            <p className="text-gray-400">{testimonial.message}</p>
          </motion.div>
        ))}
      </div>

      <div className="absolute -bottom-10 h-40 w-full bg-gradient-to-b from-[#0b0b090e] via-[#0b0b09d3] to-[#0b0b09]"></div>
    </section>
  );
};

export default Testimonials;
