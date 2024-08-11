"use client";
import { motion } from "framer-motion";

const Announcement: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center my-20">
      <motion.div
        className="bg-gray-200 text-black p-4 py-2 w-full md:w-fit rounded-full shadow-announcement"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="text-center px-8 py-1 text-xs md:text-base">
          🎉 Alchemyst raised its pre-seed round, led by Inflection Point
          Ventures, along with 100Unicorns & Early Seed Ventures! 🎉
        </p>
      </motion.div>
    </div>
  );
};

export default Announcement;
