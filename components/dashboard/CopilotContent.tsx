"use client";

import EndingCard from "@/components/home/EndingCard";
import "slick-carousel/slick/slick-theme.css";
import Button from "@/components/home/Button";
import "slick-carousel/slick/slick.css";
import { motion } from "framer-motion";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import Howitworks from "./Howitworks";
import flows from "@/components/types/dashboard_Howitworks";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function CopilotContent() {

  return (
    <div className="container mx-auto px-4 max-w-full">
      {/* Section 1 - Maya, The Sales Platform */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mt-8 md:mt-16 mb-4">
          <span className="text-orange-400">Maya</span>, The Sales Platform
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Empower Your Sales Strategy with Intelligent Automation
        </p>
        <Image
          src="/dashboard/dashboard_01.svg"
          alt="Maya Platform"
          width={700}
          height={700}
          className="mx-auto transition-all duration-500 ease-in-out hover:scale-110 max-w-full h-auto"
          loading="lazy"
        />
      </motion.section>

      {/* Section 3 - 50x Sales - Card */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-16 p-4 md:p-20"
      >
        <motion.div
          className="bg-gradient-to-b from-[#311203] to-black flex flex-col md:flex-row items-center rounded-xl overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:w-2/3 p-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8 md:w-2/3">
              50x Your Sales Pipeline with Maya
            </h2>
            <p className="text-base md:text-lg md:w-2/3">
              Unleash the power of AI to redefine how your sales team works.
              Maya empowers you with{" "}
              <span className="text-orange-400">automated workflows</span>,{" "}
              <span className="text-orange-400">intelligent lead scoring</span>,
              and <span className="text-orange-400">actionable insights </span>
              that drive conversions. Whether you&apos;re looking to boost efficiency
              or close deals faster, Maya delivers the tools you need to grow.
            </p>
          </div>
          <div className="md:w-1/3 pt-10 hidden md:block">
            <Image
              src="/maya_sales_employee/img08.svg"
              alt="Circle"
              width={200}
              height={200}
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Section 4 - Key Features of Alchemyst Sales Platoform */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-16 px-4 md:px-20"
      >
        <div className="flex justify-center mb-12">
          <div className="px-6 py-1 bg-gray-900 text-orange-400 text-xl font-semibold rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.3)] transition-all duration-500 ease-in-out transform hover:scale-110 border border-orange-400">
            Core Features
          </div>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-14 text-center">
          Key Features of Alchemyst Sales Platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "AI-Driven Lead Scoring ",
              description: "Focus on high-value opportunities with precision.",
              image: "/maya_sales_rep/img01.svg",
            },
            {
              title: "Automated Follow-Ups",
              description:
                "Never miss a deal with timely, personalized reminders.",
              image: "/maya_sales_rep/img02.svg",
            },
            {
              title: "CRM Integration",
              description:
                "Keep your tools connected for a streamlined workflow.",
              image: "/maya_sales_rep/img03.svg",
            },
            {
              title: "Predictive Analytics",
              description:
                "Plan ahead with accurate forecasts powered by data.",
              image: "/maya_sales_rep/img04.svg",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-black border border-gray-800 rounded-3xl p-6 h-60 md:h-80 relative ${
                index % 2 === 0 ? "md:col-span-1" : "md:col-span-1"
              }`}
            >
              <Image
                src={feature.image}
                alt="Circle"
                className="absolute top-0 bottom-0 left-0 right-0 p-10 pt-0"
                layout="fill"
                objectFit="cover"
              />

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black to-transparent bg-opacity-100"></div>

              <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center transition-all duration-500 ease-in-out hover:scale-105">
                <h3 className="text-3xl md:text-5xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Section 5 - Why choose Maya */}
      <motion.section
        id="why-choose-maya"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-16 p-4 md:p-20"
      >
        <div className="flex flex-col md:flex-row items-center overflow-hidden">
          <div className="md:w-1/2 p-4 md:p-8">
            <h2 className="text-center md:text-start text-4xl md:text-6xl font-bold mb-4 md:pl-20">
              Why Choose MAYA
            </h2>
            <p className="text-center md:text-start mb-4 md:w-3/2 md:pl-20 text-gray-400">
              Maya transforms how sales teams work by automating repetitive
              tasks, offering predictive insights, and enhancing overall
              productivity. With Maya, you save time, target the right
              customers, and see a measurable ROI increase.
            </p>

            <div className="flex flex-col items-center md:items-start md:flex-row">
              <div className="md:pl-20 mt-6 md:mt-10">
                <Link
                  href="https://calendly.com/uttaran-getalchemystai/30min"
                  className="flex-1"
                >
                  <Button variant="primary" className="text-sm py-2">
                    Request a demo
                  </Button>
                </Link>
              </div>
              <div className="mt-6 md:mt-0">
                <Image
                  src="/maya_sales_rep/img05.svg"
                  alt="Sales Process Transformation"
                  width={300}
                  height={600}
                  className="md:pl-10 md:mt-12 transition-all duration-500 ease-in-out hover:scale-110 mx-auto md:mx-0"
                />
              </div>
            </div>
          </div>
          <div className="md:w-1/2 p-4 md:p-8 mt-8 md:mt-0">
            <Image
              src="/dashboard/dashboard_07.svg"
              alt="Sales Process Transformation"
              className="transition-all duration-500 ease-in-out hover:scale-105 max-w-full h-auto"
              width={500}
              height={600}
            />
          </div>
        </div>
      </motion.section>

      {/* Section 6 -How to Get Started Section */}
      <Howitworks/>

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

