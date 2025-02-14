"use client";

import EndingCard from "@/components/home/EndingCard";
import Button from "@/components/home/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Team from "./Team";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function CopilotContent() {
  return (
    <div>
      <div className="container mt-32 mx-auto px-4 md:max-w-[90%] flex flex-col items-center">
        {/* Section 1 - Our Vision */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 2.0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold md:mt-8 mb-4">
            Our Vision
          </h1>
          <p className="text-gray-400 text-center text-xl md:text-lg mb-8 md:w-3/4 mx-auto">
            At Alchemyst AI, our vision is to transform industries by unlocking
            the limitless potential of artificial intelligence. We strive to
            empower organizations with innovative AI solutions that enhance
            decision-making, drive growth, and shape a smarter future.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="flex items-center space-x-4">
              <Link
                href="https://calendly.com/sid-bains-alchemystai"
                target="_blank"
              >
                <Button variant="primary">Meet Your AI Employee</Button>
              </Link>

              <Link
                href="https://www.youtube.com/watch?v=m7qiEo9AXT8"
                target="_blank"
              >
                <Button
                  variant="secondary"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0V11.25"
                      />
                    </svg>
                  }
                >
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
          <Image
            src="/about-us/01.svg"
            alt="About Us"
            width={1000}
            height={1000}
            className="mx-auto transition-all duration-500 ease-in-out hover:scale-110 max-w-full h-auto mt-8"
            loading="lazy"
          />
        </motion.section>

        {/* Section 2 - Our Mission */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 2.0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold md:mt-16 mb-4">
            Our Mission
          </h1>
          <p className="text-gray-400 text-center text-xl md:text-lg mb-8 md:w-3/4 mx-auto">
            Our mission is to deliver cutting-edge AI technologies that are
            accessible, scalable, and impactful. Through relentless innovation
            and collaboration, we aim to solve real-world problems, foster
            sustainability, and create value for our clients and society at
            large.
          </p>
          <Image
            src="/about-us/02.svg"
            alt="About Us"
            width={1000}
            height={1000}
            className="mx-auto transition-all duration-500 ease-in-out hover:scale-110 max-w-full h-auto mt-8"
            loading="lazy"
          />
        </motion.section>

        {/* Section 3 - The Team */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 2.0 }}
          className="mb-16"
        >
          <Team />
        </motion.section>
      </div>
      {/* Section 7 - Ending Card */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-16"
      >
        <EndingCard />
      </motion.section>
    </div>
  );
}
