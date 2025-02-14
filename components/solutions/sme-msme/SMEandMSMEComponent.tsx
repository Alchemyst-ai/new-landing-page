"use client";

import Button from "@/components/home/Button";
import EndingCard from "@/components/home/EndingCard";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SMEandMSMEComponent = () => {
  const reasons = [
    {
      icon: "/deliverability/feature_01.svg",
      title: "Warmups",
      description:
        "Build trust with ISPs by gradually increasing sending volume for new domains and IPs",
    },
    {
      icon: "/deliverability/feature_02.svg",
      title: "DNS Optimization",
      description:
        "Ensure your SPF, DKIM, and DMARC records are configured for maximum deliverability.",
    },
    {
      icon: "/deliverability/feature_03.svg",
      title: "Mailbox Health Monitoring",
      description:
        "Stay ahead with real-time reputation insights for your domain and IPs.",
    },
    {
      icon: "/deliverability/feature_04.svg",
      title: "Placement Tests",
      description:
        "Measure inbox versus spam placement and optimize campaigns for better results",
    },
  ];

  const features = [
    {
      title: "Domain and IP Warmups",
      description: "Boost your sender reputation to ensure inbox placement.",
      image: "/solutions/startups/feature01.svg",
    },
    {
      title: "Placement Tests",
      description:
        "Identify and fix deliverability issues before launching campaigns.",
      image: "/solutions/startups/feature02.svg",
    },
    {
      title: "Custom Playbooks",
      description: "Personalized strategies to maximize your early outreach.",
      image: "/solutions/startups/feature03.svg",
    },
    {
      title: "Real-Time Analytics",
      description: "Get actionable insights to refine your campaigns.",
      image: "/solutions/startups/feature04.svg",
    },
  ];

  return (
    <div className="container mx-auto max-w-full">
      {/* Section 1 - Empowering Indian SMEs and MSMEs with Email Solutions That Work */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Left Column */}
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0 text-center md:text-start">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Empowering Indian <span className="text-orange-400">SMEs</span>{" "}
                and <span className="text-orange-400">MSMEs</span> with Email
                Solutions That Work
              </h1>
              <p className="text-xl text-gray-400 mt-4">
                Localized data, multilingual support, and custom strategies for
                small and medium businesses.
              </p>

              <div className="flex items-center justify-center md:justify-start space-x-4 mt-14">
                <Link
                  href="https://calendly.com/sid-bains-alchemystai"
                  target="_blank"
                >
                  <Button variant="primary">Try Maya for Free</Button>
                </Link>
              </div>
            </div>
            {/* Right Column */}
            <div className="md:w-1/2 transition-all duration-500 ease-in-out hover:scale-105">
              <Image
                src="/solutions/sme-msme/01.svg"
                alt="StartupComponent Image 01"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 2 - Challenges Faced by SMEs */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40"
      >
        <div>
          <div>
            <div className="flex flex-col items-center text-center ">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="text-orange-400"> Challenges </span>Faced by
                <span className="text-orange-400"> SMEs</span>
              </h1>
              <h3 className="text-2xl md:text-2xl font-bold mb-4">
                Overcome the Unique Challenges of Indian SMEs
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5 md:pl-32 md:pr-32">
            {[
              {
                title: "Limited resources for email deliverability.",
                image: "/solutions/startups/card01.svg", // remember to change these images - jan 4th
              },
              {
                title: "Difficulty accessing localized and relevant data.",
                image: "/solutions/startups/card02.svg",
              },
              {
                title: "Lack of compliance with global email standards.",
                image: "/solutions/startups/card03.svg",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-black border border-gray-800 rounded-3xl p-6 h-60 md:h-72 relative transition-all duration-500 ease-in-out hover:scale-105"
              >
                <Image
                  src={feature.image}
                  alt="feature Image"
                  className="absolute w-full h-full p-2"
                  layout="fill"
                  objectFit="contain"
                />

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black to-transparent opacity-90 md:opacity-100"></div>

                <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center text-center transition-all duration-500 ease-in-out hover:scale-105">
                  <h3 className="text-lg md:text-2xl font-bold mb-2">
                    {feature.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 3 - Alchemyst AI’s SME Solutions */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center">
            <span className="text-orange-400">Alchemyst</span> AI&apos;s
            <span className="text-orange-400"> SME </span>
            Solutions
          </h2>
          <p className="text-xl md:text-2xl text-center text-gray-400 mt-4">
            Tools Built for Indian SMEs
          </p>
          <div className="flex flex-col md:flex-row items-center md:p-20">
            <div className="p-5 md:p-0 md:w-3/4 transition-all duration-500 ease-in-out hover:scale-105">
              <Image
                src="/solutions/sme-msme/02.svg"
                alt="Benefits"
                width={700}
                height={500}
                loading="lazy"
              />
            </div>
            <div className="md:w-3/4 p-5 md:pl-6 md:p-0 mb-8 md:mb-0">
              <h2 className="mt-4 text-2xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                Localized B2B Data
              </h2>
              <p className="text-gray-400">
                Access region-specific data to improve outreach and engagement
              </p>
              <h2 className="mt-12 text-2xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                Mailbox Health Monitoring
              </h2>
              <p className="text-gray-400">
                Ensure optimal deliverability with regular health checks
              </p>
              <h2 className="mt-14 text-2xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                Custom Playbooks
              </h2>
              <p className="text-gray-400">
                Receive personalized strategies tailored to your business goals
              </p>
              <h2 className="mt-10 text-2xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                Indian Language Support
              </h2>
              <p className="text-gray-400">
                Communicate seamlessly in Hindi, Tamil, Telugu, and more
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 4 - Ending Card */}
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

export default SMEandMSMEComponent;
