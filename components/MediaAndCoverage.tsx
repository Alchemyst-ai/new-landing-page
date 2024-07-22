"use client";
import { motion } from "framer-motion";
import GridLayout from "./GridLayout";

const MediaAndCoverage: React.FC = () => {
  const mediaItems = [
    {
      title: "LAgMo - The Large Agent Model by Lyzr",
      date: "June 12, 2024",
      readingTime: "4 minutes",
      description: "As the agent",
      link: "#",
      imgSrc: "https://via.placeholder.com/150", // Replace with actual image source
    },
    {
      title: "Lyzr's Blueprint for Organizational General...",
      date: "May 13, 2024",
      readingTime: "4 minutes",
      description: "Task-specific Agents...",
      link: "#",
      imgSrc: "https://via.placeholder.com/150", // Replace with actual image source
    },
    {
      title: "27 Parameters, Techniques &...",
      date: "December 21, 2023",
      readingTime: "15 minutes",
      description: "Defining the Use",
      link: "#",
      imgSrc: "https://via.placeholder.com/150", // Replace with actual image source
    },
  ];

  return (
    <GridLayout>
    <motion.div
      initial={{ opacity: 0.6, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      viewport={{ once: false }}
      className="relative flex flex-col items-center justify-center my-20"
    >
      <h1 className="mb-10 text-4xl md:text-5xl flex flex-col md:flex-row">
        <span>Stay Updated&nbsp;</span>
        <span className="text-blue-500">with Coverages</span>
      </h1>
      <div className="flex flex-col justify-between lg:flex-row">
        <div className="lg:w-1/3 p-4">
          <h2 className="text-2xl font-bold mb-2">Media</h2>
          <p className="text-gray-600 mb-4">
            Publications highlighting Lyzr for simplifying AI agent creation
          </p>
          <button className="px-6 py-2 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition">
            View All Media
          </button>
        </div>
        <div className="lg:w-2/3 p-4">
          <h2 className="text-2xl font-bold mb-4">Media Coverage</h2>
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row mb-6 items-center"
            >
              <img
                src={item.imgSrc}
                alt={item.title}
                className="w-full lg:w-40 h-24 object-cover rounded-lg mb-4 lg:mb-0 lg:mr-4"
              />
              <div className="flex flex-col">
                <p className="text-gray-500">{item.date}</p>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{`Estimated reading time: ${item.readingTime}`}</p>
                <p className="text-purple-600 hover:underline">
                  <a href={item.link}>Read More →</a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
    </GridLayout>
  );
};

export default MediaAndCoverage;
