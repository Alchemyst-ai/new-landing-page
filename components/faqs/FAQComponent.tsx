"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "@/components/home/Button";
import EndingCard from "../home/EndingCard";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
interface FAQItem {
  question: string;
  answer: string | JSX.Element;
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
        className="w-full text-left bg-black text-white border rounded-xl p-4 flex justify-between items-center"
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
            <div className="mt-2 p-4 bg-teal-300 text-black rounded-lg">
              {typeof answer === "string" ? <p>{answer}</p> : answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQComponent = () => {
  const faqData: FAQItem[] = [
    {
      question:
        "1. What is Alchemyst AI, and how is it different from other AI platforms?",
      answer:
        "Alchemyst AI is a B2B SaaS platform that creates generative AI digital employees to perform tasks autonomously. Unlike others, it uses proprietary in-house models, ensuring data privacy, reliability, and customization without third-party dependencies.",
    },
    {
      question: "2. What roles do Alchemysts perform?",
      answer:
        "Alchemysts handle tasks in sales (Maya), marketing (Moh), HR (Leela), customer support (Ron), and analytics (Sam), streamlining workflows and improving productivity across departments.",
    },
    {
      question: "3. How does Maya enhance sales workflows?",
      answer:
        "Maya automates lead generation, enrichment, personalized communication, follow-ups, and meeting scheduling, operating autonomously to keep the sales pipeline active 24/7.",
    },
    {
      question: "4. How secure is Alchemyst AI for enterprises?",
      answer:
        "Alchemyst AI ensures enterprise-grade security with proprietary infrastructure, data encryption, and compliance with frameworks like GDPR, HIPAA, and SOC2 to safeguard sensitive information",
    },
    {
      question: "5. Can Alchemyst AI integrate with existing systems?",
      answer:
        "Yes, Alchemyst AI offers seamless integration with CRMs, HR systems, and marketing tools through APIs, enabling easy customization for your business needs.",
    },
    {
      question: "6. Can we customize Alchemyst AI?",
      answer:
        "Absolutely! Enterprises can tailor workflows, use proprietary models, and configure outputs to align with their specific objectives and requirements.",
    },
    {
      question: "7. What are the key benefits of using Alchemyst AI?",
      answer:
        "Alchemyst AI delivers higher productivity, cost efficiency, and reliable AI-driven automation with robust security, enabling teams to focus on high-value tasks.",
    },
    {
      question: "8. How do I get started with Alchemyst AI?",
      answer:
        "Sign up, configure your workflows, and integrate your systems using our step-by-step setup guide or support resources for a quick start.",
    },
  ];

  // General FAQ
  const generalfaqData: FAQItem[] = [
    {
      question:
        "1. What is Alchemyst AI, and how is it different from other AI platforms?",
      answer:
        "Alchemyst AI is a B2B SaaS platform offering proprietary AI-powered digital employees for productivity and automation. Unlike others, we prioritize data privacy and customization without relying on third-party models.",
    },
    {
      question: "2. What makes Alchemyst AI unique?",
      answer: (
        <ul className="list-disc pl-5">
          <li>Proprietary AI models (e.g., AlchemystX1, Alchemyst C1)</li>
          <li>Robust data security with GDPR, HIPAA, SOC2 compliance</li>
          <li>Fully customizable for enterprise needs</li>
        </ul>
      ),
    },
  ];

  // Roles and Capabilities FAQ
  const randcfaqData: FAQItem[] = [
    {
      question: "1. What roles do Alchemysts perform?",
      answer: (
        <div>
          <p>
            Alchemysts are generative AI digital employees designed for specific
            roles:
          </p>
          <ul className="list-disc pl-5">
            <li>Maya (Sales): Automates lead generation and engagement.</li>
            <li>
              Moh (Marketing): Runs marketing campaigns and creates
              SEO-optimized content.
            </li>
            <li>Leela (HR): Manages hiring and employee workflows.</li>
            <li>
              Ron (Customer Support): Provides personalized customer service.
            </li>
            <li>
              Sam (Analytics): Simplifies data analysis for actionable insights.
            </li>
          </ul>
        </div>
      ),
    },
    {
      question: "2. Can Alchemysts work autonomously?",
      answer:
        "Yes, Alchemysts operate 24/7, managing tasks like lead enrichment, follow-ups, and meeting scheduling without manual intervention.",
    },
  ];

  // Security and Privacy FAQ
  const sandpfaqData: FAQItem[] = [
    {
      question: "1. How does Alchemyst AI ensure enterprise data security?",
      answer: (
        <div>
          <p>We provide industry-leading security through:</p>
          <ul className="list-disc pl-5">
            <li>Proprietary AI infrastructure for full control over data</li>
            <li>Data + Security Mesh architecture for encrypted data flow</li>
            <li>Compliance with GDPR, HIPAA, and ISO27001 standards</li>
          </ul>
        </div>
      ),
    },
    {
      question: "2. Can we use our own AI models with Alchemyst AI?",
      answer:
        "Yes, enterprises can Bring Your Own Model (BYOM) within our secure infrastructure for greater flexibility and security.",
    },
  ];

  // Integration and Setup FAQ
  const integrationSetupFaqData: FAQItem[] = [
    {
      question: "1. Can Alchemyst AI integrate with existing tools?",
      answer:
        "Alchemyst AI integrates seamlessly with CRMs, HR systems, and marketing platforms via APIs, ensuring smooth adoption into your existing workflows.",
    },
    {
      question: "2. How do I get started?",
      answer: (
        <div>
          <ul className="list-disc pl-5">
            <li>Sign up on our platform</li>
            <li>Customize workflows for your needs</li>
            <li>Integrate systems using our detailed guides</li>
          </ul>
        </div>
      ),
    },
  ];

  // Benefits and ROI FAQ
  const benefitsRoiFaqData: FAQItem[] = [
    {
      question: "1. What are the key benefits of using Alchemyst AI?",
      answer: (
        <div>
          <ul className="list-disc pl-5">
            <li>Enhanced productivity and efficiency</li>
            <li>Cost-effective automation for repetitive tasks</li>
            <li>Reliable AI solutions tailored to your business</li>
          </ul>
        </div>
      ),
    },
    {
      question: "2. Is Alchemyst AI suitable for small businesses?",
      answer:
        "Yes, we offer scalable solutions that cater to businesses of all sizes, ensuring affordability and effectiveness.",
    },
  ];

  // Support and Resources FAQ
  const supportResourcesFaqData: FAQItem[] = [
    {
      question: "1. What support options are available?",
      answer: (
        <div>
          <p>We offer:</p>
          <ul className="list-disc pl-5">
            <li>24/7 customer support via chat and email</li>
            <li>Comprehensive knowledge base</li>
            <li>Personalized onboarding assistance</li>
          </ul>
        </div>
      ),
    },
    {
      question: "2. Where can I learn more about Alchemyst AI?",
      answer:
        "Visit our Resources page for detailed guides, case studies, and insights on maximizing Alchemyst AI&'s potential.",
    },
  ];

  const [openItems, setOpenItems] = useState<boolean[]>(
    new Array(faqData.length).fill(false)
  );

  const [openGeneralItems, setOpenGeneralItems] = useState<boolean[]>(
    new Array(generalfaqData.length).fill(false)
  );

  const [openRandCItems, setOpenRandCItems] = useState<boolean[]>(
    new Array(randcfaqData.length).fill(false)
  );

  const [openSandPItems, setOpenSandPItems] = useState<boolean[]>(
    new Array(sandpfaqData.length).fill(false)
  );

  const [openIntegrationSetupItems, setOpenIntegrationSetupItems] = useState<
    boolean[]
  >(new Array(integrationSetupFaqData.length).fill(false));

  const [openBenefitsRoiItems, setOpenBenefitsRoiItems] = useState<boolean[]>(
    new Array(benefitsRoiFaqData.length).fill(false)
  );

  const [openSupportResourcesItems, setOpenSupportResourcesItems] = useState<
    boolean[]
  >(new Array(supportResourcesFaqData.length).fill(false));

  const toggleItem = (
    index: number,
    isGeneral: boolean,
    isRandC: boolean,
    isSandP: boolean,
    isIntegrationSetup: boolean,
    isBenefitsRoi: boolean,
    isSupportResources: boolean
  ) => {
    if (isGeneral) {
      setOpenGeneralItems(
        openGeneralItems.map((item, i) => (i === index ? !item : item))
      );
    } else if (isRandC) {
      setOpenRandCItems(
        openRandCItems.map((item, i) => (i === index ? !item : item))
      );
    } else if (isSandP) {
      setOpenSandPItems(
        openSandPItems.map((item, i) => (i === index ? !item : item))
      );
    } else if (isIntegrationSetup) {
      setOpenIntegrationSetupItems(
        openIntegrationSetupItems.map((item, i) => (i === index ? !item : item))
      );
    } else if (isBenefitsRoi) {
      setOpenBenefitsRoiItems(
        openBenefitsRoiItems.map((item, i) => (i === index ? !item : item))
      );
    } else if (isSupportResources) {
      setOpenSupportResourcesItems(
        openSupportResourcesItems.map((item, i) => (i === index ? !item : item))
      );
    } else {
      setOpenItems(openItems.map((item, i) => (i === index ? !item : item)));
    }
  };

  return (
    <div className="container mx-auto max-w-full">
      {/* TOP TEXT */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-10 mt-40"
      >
        <div className="flex flex-col items-center">
          {/* Headings */}
          <h1 className="text-4xl md:text-5xl text-center">
            <b>Welcome to Alchemyst AI&apos;s FAQ Section</b>
          </h1>
          <p className="text-semibold md:text-xl mt-2 md:w-1/2 text-center">
            Your quick guide to understanding how Alchemyst AI transforms
            productivity and ensures secure, efficient workflows.
          </p>
          {/* CTA buttons */}
          <div className="flex items-center justify-center md:justify-start md:items-start space-x-4 mt-14">
            <Link
              href="https://calendly.com/uttaran-getalchemystai/30min"
              target="_blank"
            >
              <Button variant="primary">I've got a question</Button>
            </Link>

            <Link href="https://tripetto.app/run/60HWNW0WQN" target="_blank">
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
                Chat with out team
              </Button>
            </Link>
          </div>
          <p className="mt-32 text-5xl">
            <b>FAQs</b>
          </p>
        </div>
      </motion.section>

      {/* FAQs */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20"
      >
        <div className="max-w-7xl mx-auto p-4">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openItems[index]}
              toggle={() =>
                toggleItem(index, false, false, false, false, false, false)
              }
            />
          ))}
        </div>
      </motion.section>

      {/* GENERAL FAQs */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20"
      >
        <div className="max-w-7xl mx-auto p-4">
          <p className="text-4xl mb-8">
            <b>1. General FAQs</b>
          </p>
          {generalfaqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openGeneralItems[index]}
              toggle={() =>
                toggleItem(index, true, false, false, false, false, false)
              }
            />
          ))}
        </div>
      </motion.section>

      {/* Roles and Capabilities */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20"
      >
        <div className="max-w-7xl mx-auto p-4">
          <p className="text-4xl mb-8">
            <b>2. Roles and Capabilities</b>
          </p>
          {randcfaqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openRandCItems[index]}
              toggle={() =>
                toggleItem(index, false, true, false, false, false, false)
              }
            />
          ))}
        </div>
      </motion.section>

      {/* 3. Security and Privacy */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20"
      >
        <div className="max-w-7xl mx-auto p-4">
          <p className="text-4xl mb-8">
            <b>3. Security and Privacy</b>
          </p>
          {sandpfaqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openSandPItems[index]}
              toggle={() =>
                toggleItem(index, false, false, true, false, false, false)
              }
            />
          ))}
        </div>
      </motion.section>

      {/* 4. Integration and Setup */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20"
      >
        <div className="max-w-7xl mx-auto p-4">
          <p className="text-4xl mb-8">
            <b>4. Integration and Setup</b>
          </p>
          {integrationSetupFaqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIntegrationSetupItems[index]}
              toggle={() =>
                toggleItem(index, false, false, false, true, false, false)
              }
            />
          ))}
        </div>
      </motion.section>

      {/* 5. Benefits and ROI */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20"
      >
        <div className="max-w-7xl mx-auto p-4">
          <p className="text-4xl mb-8">
            <b>5. Benefits and ROI</b>
          </p>
          {benefitsRoiFaqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openBenefitsRoiItems[index]}
              toggle={() =>
                toggleItem(index, false, false, false, false, true, false)
              }
            />
          ))}
        </div>
      </motion.section>

      {/* 6. Support and Resources */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
      >
        <div className="max-w-7xl mx-auto p-4">
          <p className="text-4xl mb-8">
            <b>6. Support and Resources</b>
          </p>
          {supportResourcesFaqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openSupportResourcesItems[index]}
              toggle={() =>
                toggleItem(index, false, false, false, false, false, true)
              }
            />
          ))}
        </div>
        <p className="text-center mb-20">
          Still have questions?{" "}
          <span className="text-orange-400">
            <a href="mailto:uttaran@getalchemystai.com" target="_blank">
              Contact Us
            </a>
          </span>
        </p>
      </motion.section>

      {/* Ending Card */}
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

export default FAQComponent;
