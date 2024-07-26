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

      <div className="w-full px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {["Product Hunt Award", "G2 High Performer"].map((title, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.6, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: false }}
            className="w-full p-4 border border-[#2d2d2da1] rounded-2xl bg-white shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/golden.png"
              alt={`${title} award`}
              className="animate-pulse w-16 h-16 mx-auto"
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
