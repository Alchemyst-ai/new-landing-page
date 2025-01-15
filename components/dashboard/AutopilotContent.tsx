"use client";

import { motion } from "framer-motion";
import EndingCard from "@/components/home/EndingCard";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/home/Button";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AutopilotContent() {
  return (
    <div className="container mx-auto px-4 max-w-full">
      {/* Section 1 - Your Virtual AI Employee */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20"
      >
        <div className="flex flex-col md:flex-row items-center md:p-10">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center md:text-left">
              Your Virtual AI Employee
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center md:text-left">
              Efficient, Reliable, and Always Learning
            </h2>
            <p className="text-lg w-3/4 text-gray-400 text-center md:text-left">
              Alchemyst AI empowers your team with an AI-powered sales platform
              that automates lead generation, outreach, and personalization -
              boosting productivity and driving growth.
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
              src="/dashboard/yourvirtualaiempployee.svg"
              alt="Autopilot Mode"
              width={600}
              height={400}
              className="w-full h-full"
            />
          </div>
        </div>
      </motion.section>

      {/* Section 2 - Meet Your Virtual AI Employee */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20"
      >
        <div className="flex flex-col md:flex-row items-center md:p-10">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center md:text-left text-white">
              Meet Your Virtual AI Employee
            </h2>
            <ul className="list-disc list-inside text-lg text-gray-400 text-center md:text-left mt-14">
              <li className="mb-8">
                Maya is your dedicated, virtual AI employee, designed to
                simplify and enhance your business operations. From
                administrative support to data analysis and customer service,
                Maya adapts to your needs, ensuring seamless execution of
                everyday tasks.
              </li>
              <li className="mb-2">
                Imagine an AI employee who never sleeps, learns continuously,
                and delivers results you can count on. Maya is here to transform
                the way you work, one task at a time.
              </li>
            </ul>

            <div className="flex items-center justify-center md:justify-start md:items-start space-x-4 mt-14">
              <div className="flex items-center space-x-4">
                <Link
                  href="https://calendly.com/uttaran-getalchemystai/30min"
                  target="_blank"
                >
                  <Button variant="primary">Request a Demo</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg border border-orange-400">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/QQiZEo-S3po"
                title="Alchemyst AI - Meet Your Virtual AI Employee"
                // @ts-ignore
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 3 - Key Capabilities */}
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
          Key Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Task Automation and Scheduling",
              description:
                "Stay organized effortlessly with advanced automation.",
              image: "/dashboard/keycapabilities_01.svg",
            },
            {
              title: "Seamless Integrations",
              description:
                "Connect Maya with tools like Slack, Jira, and more for a unified experience.",
              image: "/dashboard/keycapabilities_02.svg",
            },
            {
              title: "Sentiment Analysis",
              description:
                "Improve customer interactions with intelligent emotion tracking.",
              image: "/dashboard/keycapabilities_03.svg",
            },
            {
              title: "Data Entry and Reporting",
              description: "Turn raw data into meaningful insights in seconds.",
              image: "/dashboard/keycapabilities_04.svg",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-black border border-gray-800 rounded-3xl p-6 h-60 md:h-80 relative transition-all duration-500 ease-in-out hover:scale-105 ${
                index % 2 === 0 ? "md:col-span-1" : "md:col-span-1"
              }`}
            >
              <Image
                src={feature.image}
                alt="Key Capabilities Image"
                className="absolute top-0 bottom-0 left-0 right-0 w-full h-full pt-20 "
                layout="fill"
                objectFit="fit"
              />

              {/* <div className="absolute inset-0 rounded-3xl bg-black bg-opacity-0"></div> */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-black to-transparent opacity-90 md:opacity-60"></div>

              <div className="absolute flex flex-col left-4 right-4 items-center text-center transition-all duration-500 ease-in-out hover:scale-105">
                <h3 className="text-3xl md:text-4xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Section 4 - How Maya Transforms Your Workflow */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-16 px-4 md:px-20"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-14 text-center">
          How Maya Transforms Your Workflow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Boost Productivity",
              description:
                "Always available, delivering uninterrupted support 24/7.",
              image: "/dashboard/50xboost.svg",
            },
            {
              title: "Eliminate Repetition",
              description:
                "Automate mundane tasks and free up human resources for innovation.",
              image: "/dashboard/eliminaterepetition.svg",
            },
            {
              title: "Enhance Decision-Making",
              description:
                "Leverage real-time analytics to make informed choices.",
              image: "/dashboard/enhancedecisionmaking.svg",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-black border border-gray-800 rounded-3xl p-6 h-60 md:h-80 relative transition-all duration-500 ease-in-out hover:scale-105"
            >
              <Image
                src={feature.image}
                alt={`${feature.title} Image`}
                className="absolute w-full h-full"
                layout="fill"
              />

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black to-transparent opacity-90 md:opacity-100"></div>

              <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center text-center transition-all duration-500 ease-in-out hover:scale-105">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Section 5 - Make Maya Your Own */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20"
      >
        <div className="flex flex-col md:flex-row items-center p-10 ">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center md:text-left">
              Make Maya Your Own
            </h2>
            <ul className="list-disc list-inside text-lg text-gray-400 text-center md:text-left">
              <li className="mb-2">
                Every business is unique, and Maya adapts to fit your needs
                perfectly. Personalize workflows, train Maya to match your
                goals, and integrate your favorite tools for a seamless
                experience.
              </li>
              <li className="mb-2">
                Experience firsthand how customizable and intuitive Maya is,
                tailored for your business.
              </li>
            </ul>
            <div className="flex items-center justify-center md:justify-start md:items-start space-x-4 mt-8">
              <div className="flex items-center space-x-4">
                <Link
                  href="https://calendly.com/uttaran-getalchemystai/30min"
                  target="_blank"
                >
                  <Button variant="primary">Request a Demo</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg border border-orange-400">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/gJ3GpD-PUAY"
                title="Alchemyst AI - PRODUCT DEMO VIDEO"
                // @ts-ignore
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
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
}
