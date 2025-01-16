"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/home/Button";
import EndingCard from "@/components/home/EndingCard";
import { motion } from "framer-motion";
import Newsletter from "@/components/home/Newsletter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Types
interface DemoCardData {
  id: string;
  youtubeLink: string;
  title: string;
}

// DemoCard Component
function DemoCard({ data }: { data: DemoCardData }) {
  return (
    <motion.div
      className="rounded-2xl border border-gray-500 overflow-hidden shadow-md"
      style={{ height: "400px" }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-full">
        <iframe
          src={`https://www.youtube.com/embed/${data.youtubeLink}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-xl mb-2">{data.title}</h3>
      </div>
    </motion.div>
  );
}

// Sample Data
const demoData: DemoCardData[] = [
  {
    id: "1",
    youtubeLink: "CMVdgsqSu90",
    title: "Intro Video - Alchemyst AI",
  },
  {
    id: "2",
    youtubeLink: "gJ3GpD-PUAY",
    title: "Product Demo - Maya",
  },
  {
    id: "3",
    youtubeLink: "38B9lgEM_Es",
    title: "Beta Product (Live Voice Agents) Coversational AI",
  },
  {
    id: "4",
    youtubeLink: "gMERx3B5YDg",
    title: "Founder's Introduction",
  },
];

// Main DemoPageComponent
export default function DemoPageComponent() {
  const [demos] = useState<DemoCardData[]>(demoData);

  return (
    <div>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-32"
      >
        <div className="min-h-screen">
          {/* Hero Section */}
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Demo Studio</h1>
            <p className="text-lg mb-6">
              Explore the Power of AI with Our Interactive Demos
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Link
                href="https://calendly.com/uttaran-getalchemystai/30min"
                target="_blank"
              >
                <Button variant="primary">Schedule a Demo</Button>
              </Link>
            </div>
          </div>

          {/* Demo Grid Section */}
          <div id="demos" className="container mx-auto px-4 py-8">
            <h2 className="text-4xl text-center font-bold mt-16 mb-16">
              Our Recent Demos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {demos.map((item) => (
                <div key={item.id} className="flex flex-col">
                  <DemoCard data={item} />
                  <h3 className="font-semibold text-xl mt-4 text-center">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
      >
        <Newsletter />
      </motion.section>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
      >
        <EndingCard />
      </motion.section>
    </div>
  );
}

