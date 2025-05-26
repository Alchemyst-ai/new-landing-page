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

const SandC_Component = () => {
  const reasons = [
    {
      icon: "/SandC/kf_01.svg",
      title: "GDPR",
      description:
        "Ensure your emails comply with the General Data Protection Regulation for secure data handling within the EU",
    },
    {
      icon: "/SandC/kf_02.svg",
      title: "HIPAA",
      description:
        "Safeguard Protected Health Information (PHI) with email solutions tailored to HIPAA compliance requirements.",
    },
    {
      icon: "/SandC/kf_03.svg",
      title: "SOC 2",
      description:
        "Achieve SOC 2 readiness by aligning your email security protocols with industry best practices.",
    },
    {
      icon: "/SandC/kf_04.svg",
      title: "ISO/IEC 27001",
      description:
        "Adhere to international information security standards for robust and scalable compliance.",
    },
    {
      icon: "/SandC/kf_05.svg",
      title: "CAN-SPAM Act",
      description:
        "Stay compliant with the US CAN-SPAM Act to ensure responsible email marketing practices.",
    },
    {
      icon: "/SandC/kf_06.svg",
      title: "CCPA",
      description:
        "Meet California Consumer Privacy Act requirements for secure and transparent data processing.",
    },
  ];

  const features = [
    {
      icon: "/b2b/card01.svg",
      title: "Automated Compliance Audits",
      description:
        "Real-time compliance checks for all your email communications.",
    },
    {
      icon: "/b2b/card02.svg",
      title: "Policy Enforcement Tools",
      description:
        "Ensure every email follows your organization's security policies.",
    },
    {
      icon: "/b2b/card03.svg",
      title: "Risk Assessment and Alerts",
      description:
        "Receive instant alerts for potential security and compliance risks.",
    },
    {
      icon: "/b2b/card04.svg",
      title: "Global Standards Database",
      description:
        "Continuously updated database of global compliance regulations.",
    },
    {
      icon: "/b2b/card05.svg",
      title: "Data Encryption",
      description:
        "End-to-end encryption to protect sensitive email content from unauthorized access.",
    },
    {
      icon: "/b2b/card06.svg",
      title: "Audit Trails and Reporting",
      description:
        "Detailed logs for audits, ensuring accountability and transparency.",
    },
  ];

  const howitworks = [
    {
      icon: "/SandC/hiw_01.svg",
      title: "Scan and Analyze",
      description:
        "AI scans outgoing emails for compliance with all relevant standards.",
    },
    {
      icon: "/SandC/hiw_02.svg",
      title: "Identify Risks",
      description:
        "Flag potential violations and recommend solutions in real-time.",
    },
    {
      icon: "/SandC/hiw_03.svg",
      title: "Implement Policies",
      description:
        "Enforce company-specific compliance policies across all teams.",
    },
    {
      icon: "/SandC/hiw_04.svg",
      title: "Generate Reports",
      description: "Generate audit-ready reports for compliance verification.",
    },
  ];

  return (
    <div className="container mx-auto px-4 max-w-full">
      {/* Section 1 - Secure, Compliant, and Hassle-Free */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40 md:pl-32"
      >
        <div className="flex flex-col md:flex-row items-center md:p-10">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-orange-400 text-4xl md:text-6xl font-bold mb-4 text-center md:text-left">
              Secure, Compliant, and Hassle-Free
            </h1>
            <h2 className="text-2xl md:text-2xl mb-4 text-center md:text-left mt-14">
              Simplify Your Email Security Compliance Today
            </h2>
            <p className="text-lg text-gray-400 text-center md:text-left">
              Achieve bulletproof email compliance with AI-powered solutions
              that align with global standards like{" "}
              <span className="text-orange-400">GDPR, HIPAA, SOC 2,</span> and
              more—without compromising performance.
            </p>

            <div className="flex items-center justify-center md:justify-start md:items-start space-x-4 mt-14">
              <div className="flex items-center space-x-4">
                <Link
                  href="https://calendly.com/uttaran-getalchemystai/30min"
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
          </div>
          <div className="md:w-1/2 pl-12 md:pl-20 transition-all duration-500 ease-in-out hover:scale-105">
            <Image
              src="/SandC/img01.svg"
              alt="SandC_IMAGE"
              width={500}
              height={400}
            />
          </div>
        </div>
      </motion.section>

      {/* Section 2 - Stay Compliant, Stay Secure, Stay Ahead */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40 pl-0 md:pl-32"
      >
        <div className="flex flex-col md:flex-row items-center md:p-10">
          <div className="md:w-1/2 transition-all duration-500 ease-in-out hover:scale-105">
            <Image
              src="/SandC/img02.svg"
              alt="SandC_IMAGE"
              width={600}
              height={400}
              className=""
            />
          </div>
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-orange-400 text-4xl md:text-6xl font-bold mb-4 text-center md:text-left">
              Stay Compliant, Stay Secure, Stay Ahead
            </h1>
            <p className="text-lg text-gray-400 text-center md:text-left">
              Security compliance is no longer optional-it&#39;s a business
              necessity. With increasing regulatory requirements and threats of
              breaches, ensuring your email communications meet global security
              standards protects your business reputation and customer trust.
            </p>

            <div className="flex items-center justify-center md:justify-start md:items-start space-x-4 mt-14">
              <div className="flex items-center space-x-4">
                <Link
                  href="https://calendly.com/uttaran-getalchemystai/30min"
                  target="_blank"
                >
                  <Button variant="primary">Meet Your AI Employee</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 3 - Stay Compliant, Stay Secure, Stay Ahead */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40"
      >
        <div>
          <div className="flex justify-center mb-12">
            <div className="px-6 py-1 bg-gray-900 text-orange-400 text-xl font-semibold rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.3)] transition-all duration-500 ease-in-out transform hover:scale-110 border border-orange-400">
              Key Features
            </div>
          </div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Certifications and Standards We Support
            </h2>
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
                    <h3 className="text-2xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                      {reason.title}
                    </h3>
                    <p className="text-gray-500 text-md">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center p-6 md:pl-52 rounded-lg shadow-sm transition-all duration-500 ease-in-out hover:scale-105">
              <Image
                src="/SandC/kf_07.svg"
                alt="PCI-DSS Compliance"
                width={48}
                height={48}
                className="w-20 h-20 mr-4 transition-all duration-500 ease-in-out hover:scale-110"
              />
              <div>
                <h3 className="text-2xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                  PCI-DSS
                </h3>
                <p className="text-gray-500 text-md w-3/4">
                  Secure payment-related data with compliance measures aligned
                  to PCI standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 4 - AI-Powered Features to Simplify Compliance */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40"
      >
        <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            AI-Powered Features to Simplify Compliance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-950 border border-gray-700 p-6 rounded-2xl shadow-md transition-all duration-500 ease-in-out hover:scale-110"
              >
                <div className="flex items-start mb-4">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={24}
                    height={24}
                    className="w-10 h-10 mr-3 "
                  />
                </div>
                <h3 className="text-2xl font-semibold mt-1 transition-all duration-500 ease-in-out hover:scale-105">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-4">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 5 - Compliance Made Simple, Secure, and Scalable */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40"
      >
        <div>
          <div className="flex justify-center mb-12">
            <div className="px-6 py-1 bg-gray-900 text-orange-400 text-xl font-semibold rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.3)] transition-all duration-500 ease-in-out transform hover:scale-110 border border-orange-400">
              Key Features
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Compliance Made Simple, Secure, and Scalable
            </h2>
            <div className="flex flex-col md:flex-row items-center md:p-20">
              <div className="md:w-3/4 transition-all duration-500 ease-in-out hover:scale-105">
                <Image
                  src="/SandC/img03.svg"
                  alt="Benefits"
                  width={600}
                  height={400}
                  className=""
                />
              </div>
              <div className="md:w-3/4 md:pr-8 md:pl-8 mb-8 md:mb-0">
                <h2 className="text-2xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                  Reduce Risks
                </h2>
                <p className="text-gray-400">
                  Minimize the risk of regulatory fines and data breaches with
                  proactive compliance solutions.
                </p>
                <h2 className="mt-10 text-2xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                  Protect Your Reputation
                </h2>
                <p className="text-gray-400">
                  Safeguard Protected Health Information (PHI) with email
                  solutions tailored to HIPAA compliance requirements.
                </p>
                <h2 className="mt-10 text-2xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                  Save Time and Resources
                </h2>
                <p className="text-gray-400">
                  Automate manual compliance processes, freeing up your team to
                  focus on core objectives.
                </p>
                <h2 className="mt-10 text-2xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                  Stay Ahead of Regulations
                </h2>
                <p className="text-gray-400">
                  Always stay compliant with evolving global standards through
                  continuous updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 6 - How Alchemyst aI Keeps Your Emails Compliant */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40 md:pl-20 md:pr-20" 
      >
        <div>
          <div className="flex justify-center mb-12">
            <div className="px-6 py-1 bg-gray-900 text-orange-400 text-xl font-semibold rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.3)] transition-all duration-500 ease-in-out transform hover:scale-110 border border-orange-400">
              How it works
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              How Alchemyst AI Keeps Your Emails Compliant
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center md:p-10">
            <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 mb-12">
              {howitworks.map((howitwork, index) => (
                <div
                  key={index}
                  className="flex items-start p-6 rounded-lg shadow-sm transition-all duration-500 ease-in-out hover:scale-105"
                >
                  <Image
                    src={howitwork.icon}
                    alt={howitwork.title}
                    width={48}
                    height={48}
                    className="w-20 h-20 mr-4 transition-all duration-500 ease-in-out hover:scale-110"
                  />
                  <div>
                    <h3 className="text-3xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                      {howitwork.title}
                    </h3>
                    <p className="text-gray-500 text-md">
                      {howitwork.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:w-1/2 md:pl-10 transition-all duration-500 ease-in-out hover:scale-105">
              <Image
                src="/SandC/img04.svg"
                alt="SandC_IMAGE"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </motion.section>

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
};

export default SandC_Component;
