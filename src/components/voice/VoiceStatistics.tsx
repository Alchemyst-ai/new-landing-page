"use client";

import { motion } from "framer-motion";

const stats = [
  {
    title: "+40%",
    subtitle: "Conversion rates",
  },
  {
    title: "+50%",
    subtitle: "Connection rates",
  },
  {
    title: "+20%",
    subtitle: "Insurance renewal rates",
  },
  {
    title: "+35%",
    subtitle: "Customer satisfaction",
  },
];

const VoiceStatistics = () => {
  return (
    <section className="relative py-12" style={{ background: '#0d0d0f' }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-4"
      >
        <h2 className="text-4xl sm:text-5xl font-semibold text-foreground mb-4">
          Real businesses.
          <br />
          Real conversations.
          <br />
          <span className="text-orange-400">Real results</span>
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
                className="flex flex-col items-center justify-center py-16 px-4 border-b border-r border-gray-800 sm:border-b-0 last:border-b-0 md:[&:nth-child(2n)]:border-r md:[&:nth-child(4n)]:border-r-0 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r relative group overflow-hidden"
              >
                <div className="text-center relative">
                  <div className="text-[3rem] sm:text-[4rem] font-bold mb-2" style={{
                    background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.3))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    {stat.title}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {stat.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Parallel horizontal lines with vertical lines in between */}
      <div className="relative h-40 overflow-visible">
        {/* Top horizontal line */}
        <div
          className="absolute top-4 left-0 right-0 h-px z-10"
          style={{ background: 'rgba(255,255,255,0.12)' }}
        />
        {/* Bottom horizontal line */}
        <div
          className="absolute bottom-4 left-0 right-0 h-px z-10"
          style={{ background: 'rgba(255,255,255,0.12)' }}
        />
        {/* Vertical lines between horizontal parallels */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 200 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px"
              style={{
                left: `${(i / 199) * 100}%`,
                height: "calc(100% - 2rem)",
                marginTop: "1rem",
                marginBottom: "1rem",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.10) 25%, rgba(255,255,255,0.06) 75%)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceStatistics;

