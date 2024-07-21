"use client";
import Announcement from "@/components/Announcement";
import Button from "@/components/Button";
import GridLayout from "@/components/GridLayout";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -200]);

  const getRandomDelay = () => `${Math.random() * 5}s`;

  const verticalLines = Array.from({ length: 10 }).map((_, index) => (
    <motion.div
      key={`v-${index}`}
      className="h-screen absolute top-0 animated-line flex flex-col justify-end items-end"
      style={{
        right: `${20 + Math.random() * 20}%`,
        animationDelay: getRandomDelay(),
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: Math.random() * 2 }}
    >
      <div className="w-[1px] bg-gradient-to-b from-black via-gray-300 to-white h-64"></div>
    </motion.div>
  ));

  const horizontalLines = Array.from({ length: 10 }).map((_, index) => (
    <motion.div
      key={`h-${index}`}
      className="w-screen absolute right-0 animated-line-w flex flex-col justify-start items-start"
      style={{
        top: `${20 + Math.random() * 60}%`,
        animationDelay: getRandomDelay(),
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: Math.random() * 2 }}
    >
      <div className="h-[1px] w-32 bg-gradient-to-l from-black via-gray-300 to-white"></div>
    </motion.div>
  ));

  return (
    <GridLayout>
      <div className="relative z-20 flex h-full w-full items-center justify-center">
        {verticalLines}
        {horizontalLines}
        <motion.div
          className="relative my-40 w-full md:w-[70%] px-4 md:px-0"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ y: y1 }}
        >
          <h1 className="text-4xl md:w-3/4 md:text-6xl text-center md:text-start font-bold leading-tight md:leading-[1.1]">
            <span className="text-blue-">Revolutionize</span> Workflow with
            Cognitive <span className="text-blue-400">Systems</span> and Quantum
            Models
          </h1>
          <p className="my-6 w-full md:w-2/5 text-xl font-medium text-center md:text-start text-gray-400">
            Transform your business processes with cutting-edge cognitive
            automation. Harness the power of quantum models and AI workforces to
            achieve unparalleled efficiency and innovation.
          </p>
          <div className="flex flex-col md:flex-row gap-2">
            <Button variant={"primary"}>Developer Docs</Button>
            <Button
              variant={"secondary"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              }
            >
              Contact Us
            </Button>
          </div>
          <Announcement />
          <motion.div
            className="absolute top-5 right-28 hidden md:flex cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ y: y2 }}
          >
            <div className="flex h-6 w-6 items-center justify-center transition-all hover:animate-spin hover:border hover:border-blue-500">
              <div className="h-2 w-2 animate-spin bg-blue-500" />
            </div>
            <p className="-mt-4 ml-1">V2 MAINNET</p>
          </motion.div>
          <motion.div
            className="absolute top-32 right-5 hidden md:flex cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ y: y2 }}
          >
            <div className="hidden md:flex h-6 w-6 items-center justify-center transition-all hover:animate-spin hover:border hover:border-yellow-500">
              <div className="h-2 w-2 animate-spin bg-yellow-500" />
            </div>
            <p className="-mt-4 ml-1">AXIOM REPL</p>
          </motion.div>
          <motion.div
            className="absolute top-96 right-20 hidden md:flex cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ y: y2 }}
          >
            <div className="hidden md:flex h-6 w-6 items-center justify-center transition-all hover:animate-spin hover:border hover:border-purple-500">
              <div className="h-2 w-2 animate-spin bg-purple-500" />
            </div>
            <p className="mt-4 mr-1">READ OUR BLOG</p>
          </motion.div>
          <motion.div
            className="absolute top-80 right-72 hidden md:flex cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ y: y2 }}
          >
            <p className="mt-4 mr-1">JOIN US</p>
            <div className="flex h-6 w-6 items-center justify-center transition-all hover:animate-spin hover:border hover:border-[#06b3e8]">
              <div className="h-2 w-2 animate-spin bg-[#06b3e8]" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </GridLayout>
  );
};

export default Hero;
