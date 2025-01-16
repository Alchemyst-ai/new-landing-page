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

const B2BComponent = () => {
  const features = [
    {
      icon: "/b2b/card01.svg",
      title: "AI Data Enrichment",
      description:
        "Discover which prospects are actively searching for your products or services with intent data insights. By understanding the purchasing signals of your audience, you can prioritize high-value leads and approach them with tailored messaging at the right time.",
    },
    {
      icon: "/b2b/card02.svg",
      title: "Intent Data Analysis",
      description:
        "Discover which prospects are actively searching for your products or services with intent data insights. By understanding the purchasing signals of your audience, you can prioritize high-value leads and approach them with tailored messaging at the right time.",
    },
    {
      icon: "/b2b/card03.svg",
      title: "Technographic Insights",
      description:
        "Gain a competitive edge by learning about the technology stacks your prospects are using. Use this information to tailor your outreach strategies, positioning your offerings as complementary solutions to their existing tools and workflows.",
    },
    {
      icon: "/b2b/card04.svg",
      title: "Comprehensive Coverage",
      description:
        "Access a vast database of millions of contacts across industries and regions. Our platform provides you with detailed profiles, including job roles, company ",
    },
    {
      icon: "/b2b/card05.svg",
      title: "Customizable Workflows",
      description:
        "Automate repetitive tasks like lead qualification and data segmentation. Our platform enables you to build workflows that align with your unique business processes, ensuring efficiency and scalability.",
    },
    {
      icon: "/b2b/card06.svg",
      title: "Customizable Workflows",
      description:
        "Automate repetitive tasks like lead qualification and data segmentation. Our platform enables you to build workflows that align with your unique business processes, ensuring efficiency and scalability.",
    },
  ];

  const reasons = [
    {
      icon: "/b2b/card07.svg",
      title: "Save Time",
      description:
        "Our platform eliminates the need for manual data collection and verification, saving countless hours for your team. Instead of spending time cleaning spreadsheets or sourcing information, your sales and marketing teams can focus on closing deals and creating impactful campaigns.",
    },
    {
      icon: "/b2b/card08.svg",
      title: "Target High-Value Prospects",
      description:
        "Precision targeting is the cornerstone of our platform. By leveraging accurate data, your team can focus on prospects that are more likely to convert. This ensures that resources are spent wisely, maximizing the effectiveness of every campaign.",
    },
    {
      icon: "/b2b/card09.svg",
      title: "Boost ROI",
      description:
        "With actionable insights derived from our advanced analytics, you can make smarter investments in your outreach efforts. Businesses that use our platform report a significant increase in their return on investment by achieving better results",
    },
    {
      icon: "/b2b/card10.svg",
      title: "Improve Efficiency",
      description:
        "Our platform is designed to streamline your operations. From automated workflows to predictive analytics, every feature is aimed at enhancing productivity. This allows your team to achieve more in less time, setting the stage for sustained growth.",
    },
  ];

  const solutions = [
    {
      icon: "/b2b/b2blast01.svg",
      title: "Sales Teams:",
      description:
        "Equip your sales team with data that matters. With enriched profiles and lead scoring tools, they can focus their efforts on the most promising prospects, shortening the sales cycle and increasing win rates.",
    },
    {
      icon: "/b2b/b2blast02.svg",
      title: "Marketing Professionals:",
      description:
        "Create hyper-personalized campaigns that resonate with your audience. By using demographic, firmographic, and intent data, your marketing team can deliver the right message to the right people at the right time.",
    },
    {
      icon: "/b2b/b2blast03.svg",
      title: "Business Analysts:",
      description:
        "Unlock deeper market insights and identify emerging trends. With a comprehensive view of industry movements and customer behaviors, analysts can make data-driven decisions that align with business goals.",
    },
  ];

  return (
    <div className="container mx-auto max-w-full">
      {/* Section 1 - Empower Your Business with Reliable B2B Data */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40 pl-0 md:pl-32"
      >
        <div className="flex flex-col md:flex-row items-center p-5 md:p-10">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0 text-center md:text-start">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Empower Your Business with{" "}
              <span className="text-orange-400">Reliable B2B Data</span>
            </h1>
            <h2 className="text-xl md:text-2xl md:w-3/4 mb-4 mt-14">
              Access Accurate, Real-Time Insights to Drive Your Sales and
              Marketing Strategies
            </h2>
            <p className="text-lg text-gray-400">
              Access Accurate, Real-Time Insights to Drive Your Sales and
              Marketing Strategies
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
          <div className="md:w-1/2 transition-all duration-500 ease-in-out hover:scale-105">
            <Image
              src="/b2b/b2b-01.svg"
              alt="B2B DATA IMAGE"
              width={600}
              height={400}
            />
          </div>
        </div>
      </motion.section>

      {/* Section 2 - Transform Your Outreach with Actionable B2B Data */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40 pl-0 md:pl-32"
      >
        <div className="flex flex-col md:flex-row items-center md:p-10 p-5">
          <div className="md:w-1/2 transition-all duration-500 ease-in-out hover:scale-105 mb-10 md:mb-0">
            <Image
              src="/b2b/b2b-02.svg"
              alt="B2B IMAGE"
              width={600}
              height={400}
            />
          </div>
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl mb-4 text-center md:text-left">
              Transform Your Outreach with{" "}
              <span className="text-orange-400">Actionable B2B Data</span>
            </h1>
            <p className="text-lg text-gray-400 text-center md:text-left">
              Maya is your dedicated, virtual AI employee, designed to simplify
              and enhance your business operations. From administrative support
              to data analysis and customer service, Maya adapts to your needs,
              ensuring seamless execution of everyday tasks. <br /> <br />
              Imagine an AI employee who never sleeps, learns continuously, and
              delivers results you can count on. Maya is here to transform the
              way you work, one task at a time.
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

      {/* Section 3 - Key Features of Our B2B Data Platform */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40"
      >
        <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Key Features of Our B2B Data Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-950 border border-gray-700 p-6 rounded-2xl shadow-md"
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
                <p className="text-gray-400 mt-4">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 4 - Why Choose Our B2B Data Solution? */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40 py-12 px-4 md:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Our B2B Data Solution?
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
                  <h3 className="text-3xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                    {reason.title}
                  </h3>
                  <p className="text-gray-400 text-md">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://calendly.com/uttaran-getalchemystai/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" className="text-nowrap">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 5 - Tailored Solutions for Your Business Needs */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40 p-5 md:p-0"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
          Tailored Solutions for Your Business Needs
        </h2>
        <div className="flex flex-col md:flex-row items-center md:pl-32 md:pr-32">
          <div className="md:w-1/2 transition-all duration-500 ease-in-out hover:scale-105">
            <Image
              src="/b2b/b2blast.svg"
              alt="B2B DATA IMAGE"
              width={900}
              height={900}
            />
          </div>
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
              Intent Data Analysis
            </h1>
            <div className="grid grid-cols-1 gap-8 mt-12 mb-12">
              {solutions.map((solutions, index) => (
                <div
                  key={index}
                  className="flex items-start rounded-lg shadow-sm transition-all duration-500 ease-in-out hover:scale-105"
                >
                  <Image
                    src={solutions.icon}
                    alt={solutions.title}
                    width={12}
                    height={12}
                    className="w-12 h-12 mr-4 transition-all duration-500 ease-in-out hover:scale-125"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 transition-all duration-500 ease-in-out hover:scale-105">
                      {solutions.title}
                    </h3>
                    <p className="text-gray-400 text-md">
                      {solutions.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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

export default B2BComponent;
