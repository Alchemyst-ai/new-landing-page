"use client";

import Button from "@/components/home/Button";
import EndingCard from "../home/EndingCard";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const DeliverabilityComponent = () => {

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

  return (
    <div className="container mx-auto max-w-full">
      {/* Section 1 - Land Every Email in the Inbox, Every Time */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-20 md:mt-40 pl-0 md:pl-32"
      >
        <div className="flex flex-col md:flex-row items-center p-5 md:p-10">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0 text-center md:text-start">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Land <span className="text-orange-400">Every Email</span> in the
              Inbox, <span className="text-orange-400">Every Time</span>
            </h1>
            <p className="text-lg text-gray-400 mt-8">
              Empower your campaigns with cutting-edge email deliverability
              solutions. Maximize visibility, safeguard your reputation, and
              drive unparalleled engagement
            </p>

            <div className="flex items-center justify-center md:justify-start md:items-start space-x-4 mt-14">
              <div className="flex flex-col md:flex-row gap-7 md:gap-0 items-center space-x-4">
                <Link
                  href="https://calendly.com/uttaran-getalchemystai/30min"
                  target="_blank"
                >
                  <Button variant="primary">Start Optimizing Now</Button>
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
                    Request Your Free Deliverability Audit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 transition-all duration-500 ease-in-out hover:scale-105">
            <Image
              src="/deliverability/d_01.svg"
              alt="DELIVERABILITY IMAGE"
              width={600}
              height={400}
            />
          </div>
        </div>
      </motion.section>

      {/* Section 2 - Why Your Emails Aren’t Reaching the Inbox */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40"
      >
        <div>
          <div>
            <div className="flex flex-col items-center text-center p-4 md:p-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Why Your{" "}
                <span className="text-orange-400">
                  Emails Aren&apos;t Reaching
                </span>{" "}
                the Inbox
              </h1>
              <h3 className="text-2xl md:text-2xl font-bold mb-4">
                Deliverability challenges can cost you customers, revenue, and
                trust
              </h3>
              <p className="text-lg text-gray-400 text-center md:w-[40%]">
                Getting emails delivered is harder than ever. Spam filters, poor
                domain reputation, and invalid contacts prevent your emails from
                reaching the right people. Without effective solutions, your
                campaigns fail to deliver results.
              </p>
            </div>
            <div className="flex items-center justify-center mt-8 mb-8">
              <div className="flex items-center space-x-4">
                <Link
                  href="https://calendly.com/uttaran-getalchemystai/30min"
                  target="_blank"
                >
                  <Button variant="primary">Meet your AI Employee</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5 md:pl-32 md:pr-32">
            {[
              {
                title: "1 in 5 emails never makes it to the inbox.",
                image: "/deliverability/card01.svg",
              },
              {
                title:
                  "68% of customers lose trust after receiving spam-marked emails.",
                image: "/deliverability/card02.svg",
              },
              {
                title:
                  "Poor deliverability can reduce campaign ROI by up to 50%.",
                image: "/deliverability/card03.svg",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-black border border-gray-800 rounded-3xl h-60 md:h-80 relative"
              >
                <Image
                  src={feature.image}
                  alt={`${feature.title} Image`}
                  className="absolute w-full h-full p-2 pb-10"
                  layout="fill"
                  objectFit = "cover"
                />

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black to-transparent opacity-90 md:opacity-100"></div>

                <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center text-center transition-all duration-500 ease-in-out hover:scale-105">
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    {feature.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 3 - Features Designed to Guarantee Deliverability */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40 py-12 px-4 md:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Features Designed to Guarantee{" "}
            <span className="text-orange-400">Deliverability</span>
          </h2>
          <p className="text-lg md:text-2xl font-bold text-center mb-12">
            Explore how Alchemyst AI ensures your campaigns always hit the mark.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-start p-6 rounded-lg shadow-sm transition-all duration-500 ease-in-out hover:scale-105"
              >
                <Image
                  src={reason.icon}
                  alt={reason.title}
                  width={48}
                  height={48}
                  className="w-20 h-20 mr-4 transition-all duration-500 ease-in-out hover:scale-110"
                />
                <div>
                  <h3 className="text-3xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                    {reason.title}
                  </h3>
                  <p className="text-gray-400 text-md">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center p-6 rounded-lg shadow-sm transition-all duration-500 ease-in-out hover:scale-105">
            <Image
              src="/deliverability/feature_05.svg"
              alt="feature_icon"
              width={48}
              height={48}
              className="w-20 h-20 mr-4 transition-all duration-500 ease-in-out hover:scale-110"
            />
            <div>
              <h3 className="text-3xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                Spam Filter Optimization
              </h3>
              <p className="text-gray-500 text-md">
                Avoid common spam triggers with AI-guided content improvements
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 4 - Deliverability That Works for You */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center">
            Deliverability That Works for You
          </h2>
          <p className="text-xl md:text-2xl text-center text-gray-400 mt-4">
            Results you can count on with every email campaign
          </p>
          <div className="flex flex-col md:flex-row items-center md:p-20">
            <div className="p-5 md:p-0 md:w-3/4 transition-all duration-500 ease-in-out hover:scale-105">
              <Image
                src="/deliverability/d_05.svg"
                alt="Benefits"
                width={600}
                height={400}
                loading="lazy"
              />
            </div>
            <div className="md:w-3/4 p-5 md:pr-8 md:pl-4 mb-8 md:mb-0">
              <h2 className="text-2xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                Higher Inbox Rates
              </h2>
              <p className="text-gray-400">
                Improve open rates by ensuring your emails consistently land in
                the inbox
              </p>
              <h2 className="mt-12 text-2xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                Increased ROI
              </h2>
              <p className="text-gray-400">
                Maximize campaign success with fewer bounces and better
                engagement.
              </p>
              <h2 className="mt-12 text-2xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                Reputation Protection
              </h2>
              <p className="text-gray-400">
                Build long-term trust with your audience and ISPs.
              </p>
              <h2 className="mt-12 text-2xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                Ease of Use
              </h2>
              <p className="text-gray-400">
                Automated tools and seamless integration for hassle-free
                deliverability management.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 5 - How Alchemyst AI Works */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40"
      >
        <div>
          <div>
            <div className="flex flex-col items-center p-2">
              <h1 className="text-3xl md:text-6xl font-bold mb-4 text-center">
                How Alchemyst AI Works
              </h1>
              <h3 className="text-xl md:text-3xl font-bold mb-4 text-center">
                Your Path to Email Deliverability Excellence
              </h3>
              <p className="text-lg text-gray-400 md:mt-8 text-center md:w-1/2 w-3/4">
                Here&apos;s how we make your emails impossible to ignore
              </p>
            </div>
            <div className="flex items-center justify-center mt-8 mb-8">
              <div className="flex items-center space-x-4">
                <Link
                  href="https://calendly.com/uttaran-getalchemystai/30min"
                  target="_blank"
                >
                  <Button variant="primary">Meet your AI Employee</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 md:p-10 md:pl-32 md:pr-32">
            {[
              {
                title: "Audit Your Current Deliverability",
                description:
                  "Automated tools and seamless integration for hassle-free deliverability management.",
                image: "/deliverability/card04.svg",
              },
              {
                title: "Optimize Content and Strategy",
                description:
                  "Leverage AI insights to create spam-proof and engaging campaigns",
                image: "/deliverability/card05.svg",
              },
              {
                title: "Track Performance in Real Time",
                description:
                  "Adapt on the go with actionable analytics and monitoring tools.",
                image: "/deliverability/card06_2.svg",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-black border border-gray-800 rounded-3xl p-6 h-60 md:h-72 relative transition-all duration-500 ease-in-out hover:scale-105"
              >
                <Image
                  src={feature.image}
                  alt={`${feature.title} Image`}
                  className="absolute max-w-full max-h-full pb-10"
                  layout="fill"
                />

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black to-transparent opacity-90 md:opacity-100"></div>

                <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center text-center">
                  <h3 className="text-lg md:text-2xl font-bold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-sm transition-all duration-500 ease-in-out hover:scale-105">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
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

export default DeliverabilityComponent;
