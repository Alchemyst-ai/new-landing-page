"use client";

import Button from "@/components/home/Button";
import EndingCard from "@/components/home/EndingCard";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface FAQItem {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItem & { isOpen: boolean; toggle: () => void }> = ({
  question,
  answer,
  isOpen,
  toggle,
}) => {
  return (
    <div className="mb-4">
      <button
        className="w-full text-left bg-orange-400 text-black p-4 rounded-lg flex justify-between items-center"
        onClick={toggle}
        aria-expanded={isOpen}
      >
        <span className="font-semibold flex-grow pr-4">{question}</span>
        <span className="flex-shrink-0">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="mt-2 p-4 bg-orange-200 text-black rounded-lg">
              <p>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MidmarketComponent = () => {
  const [openItems, setOpenItems] = useState<boolean[]>([false, false, false]);

  const faqData: FAQItem[] = [
    {
      question:
        "How does Alchemyst AI help mid-market businesses scale email campaigns?",
      answer:
        "Alchemyst AI boosts email campaign performance by up to 300% using advanced AI for hyper-personalization, automation, and optimization, helping mid-market businesses achieve scalable growth without extra resources.",
    },
    {
      question:
        "Can your solutions integrate with our current marketing stack?",
      answer:
        "Yes, Alchemyst AI integrates seamlessly with 95% of popular marketing tools, ensuring quick setup and compatibility for uninterrupted workflows and maximum ROI",
    },
    {
      question: "What kind of reporting and insights can we expect?",
      answer:
        "Expect detailed reports with 99% accuracy, covering audience segmentation, campaign engagement rates, and ROI analysis, empowering data-driven decision-making to enhance results",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItems(openItems.map((item, i) => (i === index ? !item : item)));
  };

  const features = [
    {
      icon: "/solutions/midmarket/card01.svg",
      title: "Agile Solutions",
      description:
        "Bridge startup agility with enterprise solutions, utilizing tools and strategies to improve efficiency, scalability, and long-term business success",
    },
    {
      icon: "/solutions/midmarket/card02.svg",
      title: "Inbox Impact",
      description:
        "Boost revenue and engagement by achieving optimal inbox placement, ensuring emails effectively reach audiences at the perfect time.",
    },
    {
      icon: "/solutions/midmarket/card03.svg",
      title: "Smart Emails",
      description:
        "Enhance email strategies with data insights and automation to deliver personalized campaigns, achieving impactful, measurable results ",
    },
  ];

  return (
    <div className="container mx-auto max-w-full">
      {/* Section 1 - Empowering Mid-Market Businesses */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-56"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Left Column */}
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0 text-center md:text-start">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Empowering Mid-Market Businesses
              </h1>
              <p className="text-2xl text-gray-300 mt-4">
                With Scalable Email Deliverability Solutions
              </p>
              <p className="text-lg text-gray-400 mt-4">
                Unlock the potential of your email campaigns with Alchemyst AI’s
                advanced tools, tailored for fast-growing businesses
              </p>

              <div className="flex items-center justify-center md:justify-start space-x-4 mt-14">
                <Link
                  href="https://calendly.com/uttaran-getalchemystai/30min"
                  target="_blank"
                >
                  <Button variant="primary">Try Maya for Free</Button>
                </Link>
              </div>
            </div>
            {/* Right Column */}
            <div className="md:w-1/2 transition-all duration-500 ease-in-out hover:scale-105">
              <Image
                src="/solutions/midmarket/01.svg"
                alt="MidmarketComponent Image 01"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 2 - The Mid-Market Advantage with Alchemyst AI */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40"
      >
        <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            The <span className="text-orange-400">Mid-Market</span> Advantage with <span className="text-orange-400">Alchemyst AI</span>
          </h2>
          <p className="text-xl text-gray-300 text-center mb-8">Email Solutions Designed for Growth-Focused Businesses</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-950 border border-gray-700 p-6 rounded-2xl shadow-md transition-all duration-500 ease-in-out hover:scale-110"
              >
                <div className="flex items-center justify-center mb-4">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={24}
                    height={24}
                    className="w-14 h-14 mr-3 "
                  />
                </div>
                <h3 className="text-2xl text-center font-semibold mt-1 transition-all duration-500 ease-in-out hover:scale-105">
                  {feature.title}
                </h3>
                <p className="text-center text-gray-300 mt-4">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 2 - Alchemyst AI’s Tailored Solutions for Mid-Market Businesses */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mt-40"
      >
        <div>
          {/* Heading for the section */}
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-orange-400">Alchemyst AI&apos;s</span>{" "}
              Tailored Solutions for{" "}
              <span className="text-orange-400">Mid-Market </span>
              Businesses
            </h1>
          </div>

          {/* Content for the section */}
          <div className="w-full max-w-7xl mx-auto relative aspect-[4/3] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 lg:flex items-center justify-center hidden">
              <Image
                src="/solutions/midmarket/03.svg"
                alt="Background Pattern"
                className="object-cover"
                width={600}
                height={400}
                priority
              />
            </div>
            {/* Mobile Layout */}
            <div className="absolute inset-0 items-center justify-center flex lg:hidden">
              <Image
                src="/solutions/midmarket/03_mobile.svg"
                alt="Background Pattern"
                className="object-fit w-full h-full"
                width={200}
                height={400}
                priority
              />
            </div>

            {/* Content Container */}
            <div className="relative h-full transition-all duration-500 ease-in-out hover:scale-105 hidden lg:block">
              {/* Desktop Layout - Clock positions */}
              <div className="hidden lg:block">
                {/* 1 o'clock */}
                <div className="absolute top-[25%] right-[16%] max-w-[200px] text-left">
                  <h3 className="text-lg font-semibold mb-2">
                    Custom Playbooks
                  </h3>
                  <p className="text-sm text-gray-400">
                    Ensure strong sender reputation for high-volume campaigns
                  </p>
                </div>

                {/* 3 o'clock */}
                <div className="absolute top-[50%] right-[10%] -translate-y-1/2 max-w-[200px] text-left">
                  <h3 className="text-lg font-semibold mb-2">
                    Localized Data Integration
                  </h3>
                  <p className="text-sm text-gray-400">
                    Ensure strong sender reputation for high-volume campaigns.
                  </p>
                </div>

                {/* 5 o'clock */}
                <div className="absolute bottom-[27%] right-[16%] max-w-[200px] text-left">
                  <h3 className="text-lg font-semibold mb-2">Dedicated IPs</h3>
                  <p className="text-sm text-gray-400">
                    Maintain control over sending reputation
                  </p>
                </div>

                {/* 7 o'clock */}
                <div className="absolute bottom-[27%] left-[18%] max-w-[200px] text-right">
                  <h3 className="text-lg font-semibold mb-2">
                    Deliverability Tools
                  </h3>
                  <p className="text-sm text-gray-400">
                    Monitor and optimize email performance
                  </p>
                </div>

                {/* 9 o'clock */}
                <div className="absolute top-[50%] left-[10%] -translate-y-1/2 max-w-[200px] text-right">
                  <h3 className="text-lg font-semibold mb-2">
                    Automated Warmup
                  </h3>
                  <p className="text-sm text-gray-400">
                    Gradually increase sending volume for optimal delivery
                  </p>
                </div>

                {/* 11 o'clock */}
                <div className="absolute top-[26%] left-[18%] max-w-[200px] text-right">
                  <h3 className="text-lg font-semibold mb-2">
                    Real-time Analytics
                  </h3>
                  <p className="text-sm text-gray-400">
                    Track delivery rates and engagement metrics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 4 - Challenges Mid-Market Businesses Face */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Left Column */}
            <div className="md:w-1/2 transition-all duration-500 ease-in-out hover:scale-105 md:pr-14 md:p-0 p-10">
              <Image
                src="/solutions/midmarket/04.svg"
                alt="MidmarketComponent Image 01"
                width={600}
                height={400}
              />
            </div>
            {/* Right Column */}
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0 text-center md:text-start">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Challenges <span className="text-orange-400">Mid-Market </span>
                Businesses Face
              </h1>
              <h3 className="text-2xl md:text-2xl text-white">
                Overcome Common Email Deliverability Challenges
              </h3>
              <p className="text-xl text-gray-400 mt-4">
                As mid-market businesses scale, maintaining high email
                deliverability rates becomes crucial to maximizing ROI.
                Challenges like inconsistent inbox placement, sender reputation
                management, and adapting to increasing email volumes can hinder
                growth. Alchemyst AI provides the solutions you need to keep up
                with your expanding operations.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 5 - Why Choose Alchemyst AI */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-36"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Left Column */}
            <div className="md:w-3/4 md:pr-8 mb-8 md:mb-0 text-center md:text-start">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose <span className="text-orange-400">Alchemyst AI</span>
              </h1>
              <p className="text-xl text-gray-400 mt-4 md:w-3/4">
                The Deliverability Partner Mid-Market Businesses Trust
              </p>

              <p className="mt-4 md:w-3/4">
                At Alchemyst AI, we specialize in bridging the gap between
                startups and enterprises by offering solutions tailored to the
                unique needs of mid-market businesses. From scalable tools to
                hands-on support, we empower businesses like yours to achieve
                better engagement, higher conversions, and sustained growth.
              </p>
            </div>
            {/* Right Column */}
            <div className="md:w-1/2 transition-all duration-500 ease-in-out hover:scale-105 md:pl-20">
              <Image
                src="/solutions/midmarket/05.svg"
                alt="MidmarketComponent Image 01"
                width={500}
                height={400}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 5 - FAQ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className=""
      >
        <div className="max-w-2xl mx-auto p-4">
          <h2 className="text-6xl font-bold mb-2 text-center">FAQ</h2>
          <p className="text-lg mb-8 text-center">Your Questions, Answered</p>
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openItems[index]}
              toggle={() => toggleItem(index)}
            />
          ))}
          <p className="text-center">
            Still have questions?{" "}
            <span className="text-orange-400">
              <a href="mailto:uttaran@getalchemystai.com" target="_blank">
                Contact Us
              </a>
            </span>
          </p>
        </div>
      </motion.section>

      {/* Section 6 - Ending Card */}
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
};

export default MidmarketComponent;
