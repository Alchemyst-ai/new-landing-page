"use client";
import Application from "@/app/types/applications"; // Assuming Application type exists
import { motion } from "framer-motion";
import React from "react";

interface ApplicationProps {
  applications: Application[];
}

const Applications: React.FC<ApplicationProps> = ({ applications }) => {
  const appCardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="flex flex-col items-center w-4/5 md:w-2/3"
      initial="initial"
      animate="animate"
      variants={appCardVariants}
    >
      <h1 className="text-3xl font-bold mb-8 text-start w-full text-[#cecec5]">
        Applications
      </h1>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {applications.map((app, index) => (
          <motion.div
            key={index}
            className={`${app.bgColor} ${app.round} p-10`}
            variants={{
              initial: { opacity: 0, scale: 0.95 },
              animate: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.3, delay: index * 0.1 },
              },
              exit: { opacity: 0, scale: 0.95 },
            }}
          >
            {app.svg}
            <h2 className="text-3xl font-semibold my-5">{app.title}</h2>
            <p className="text-lg">{app.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Applications;
