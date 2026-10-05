"use client";

import { motion } from "framer-motion";
import VoiceGridDivider from "./VoiceGridDivider";
import { Section } from "../section";

const stats = [
  {
    title: "+17%",
    subtitle: "Revenue boost",
  },
  {
    title: "+39%",
    subtitle: "Conversion rates",
  },
  {
    title: "+63%",
    subtitle: "Time Saved",
  },
  {
    title: "+33%",
    subtitle: "Customer satisfaction",
  },
];

const VoiceStatistics = () => {
  return (
    <section className="relative py-8 md:py-10 lg:py-12" style={{ background: '#151515' }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 md:mb-12 lg:mb-16 px-4"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2 md:mb-4 leading-tight">
        Real-world Conversations
          <br />
          Proven Outcomes
          <br />
          <span className="text-[#f59025]">Measure World Impacts</span>
        </h2>
      </motion.div>

      <div>
        <div className="border-t border-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col items-center justify-center py-10 sm:py-12 md:py-14 lg:py-16 px-4 border-b border-r border-gray-800 sm:border-b-0 last:border-b-0 md:[&:nth-child(2n)]:border-r md:[&:nth-child(4n)]:border-r-0 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r relative group overflow-hidden"
              >
                <div className="text-center relative">
                  <div className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] font-bold mb-1 sm:mb-2" style={{
                    background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.3))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    {stat.title}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {stat.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <VoiceGridDivider className="mt-0" />
    </section>
  );
};

export default VoiceStatistics;

