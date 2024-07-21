"use client";
import Application from "@/app/types/applications";
import { motion } from "framer-motion";

interface ApplicationProps {
  applications: Application[];
}

const Applications: React.FC<ApplicationProps> = ({ applications }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5}}
      viewport={{ once: false }}
      className="flex flex-col items-center w-4/5 md:w-2/3"
    >
      <h1 className="text-3xl font-bold mb-8 text-start w-full text-[#cecec5]">
        Applications
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {applications.map((app, index) => (
          <motion.div
            key={index}
            className={`${app.bgColor} ${app.round} p-10`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{
              scale: 1.05,
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="flex justify-center mb-4">{app.svg}</div>
            <h2 className="text-3xl font-semibold my-5">{app.title}</h2>
            <p className="text-lg">{app.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Applications;
