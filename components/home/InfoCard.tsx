"use client";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import Image from "next/image";
import Button from "./Button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function InfoCard() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-6xl text-center md:mt-8 mb-24 font-bold">
        Product Information
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 justify-center">
        <CardSpotlight className="w-full lg:w-[400px] transition-all duration-500 ease-in-out hover:scale-105 relative z-20">
          {/* <p className="text-2xl font-bold relative z-20 mt-2 text-[#fe9833]">
            Smarter Sales, Every Step of the Way with AI Sales Automation
          </p>
          <p className="text-gray-500 relative z-20 text-sm mt-2">
            Discover how Maya&#39;s AI-powered sales automation tools can
            transform your B2B sales strategy for better results.
          </p> */}
          <div className="text-neutral-200 mt-4 relative z-20 ">
            <ul className="list-item mt-2">
              <li className="font-semibold">
                Smarter Sales with AI Automation:
              </li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Automate outreach, follow-ups, and lead qualification to boost
                efficiency and results.
              </p>
              <li className="font-semibold">Seamless Omni-Channel Outreach:</li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Connect on email, WhatsApp, Telegram, and more from one
                platform.
              </p>
              <li className="font-semibold">Boost Email Deliverability:</li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Improve open rates and engagement with Maya&apos;s email warm-up
                tool.
              </p>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <motion.div
              className="relative z-30 pt-4 md:mt-32 md:pt-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={"https://tripetto.app/run/60HWNW0WQN"}
                target="_blank noopen"
                className="block pointer-events-auto"
              >
                <Button
                  variant="primary"
                  className="w-full md:w-fit text-nowrap"
                >
                  Automate Sales Today
                </Button>
              </Link>
            </motion.div>
          </div>
          <div className=" relative z-20 mt-8">
            <Image
              src="/media/cardleft.png"
              alt="AI Sales Automation"
              width={350}
              height={200}
              className="rounded-md hidden md:block"
            />
          </div>
        </CardSpotlight>

        <CardSpotlight className="w-full lg:w-[400px] transition-all duration-500 ease-in-out hover:scale-105 relative z-20">
          {/* <p className="text-2xl font-bold relative z-20 mt-2 text-[#fe9833]">
            Quality B2B Leads, Powered by AI for Sales Success
          </p>
          <p className="text-gray-500 relative z-20 text-sm mt-2">
            Transform your B2B sales process with AI-powered tools designed for
            lead quality, scalability, and conversion success.
          </p> */}
          <div className="text-neutral-200 mt-4 relative z-20">
            <ul className="list-item  mt-2">
              <li className="font-semibold">
                AI-Driven B2B Lead Generation for Sales Success:
              </li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Access a 300M+ verified B2B sales lead database, tailored to
                your ICP for faster, smarter connections.
              </p>
              <li className="font-semibold">
                Hyper-Personalized Prospecting with AI:
              </li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Use advanced AI tools for highly-targeted, precision-driven B2B
                prospecting and lead generation.
              </p>
              <li className="font-semibold">
                Affordable, Accurate, and Scalable Solutions:
              </li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Maximize ROI with cost-effective, AI-powered B2B sales tools
                that deliver unmatched accuracy and personalization.
              </p>
            </ul>
          </div>
          <motion.div
            className="relative z-30 flex items-center justify-center mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={"https://tripetto.app/run/60HWNW0WQN"}
              target="_blank noopen"
              className="block pointer-events-auto"
            >
              <Button variant="primary" className="w-full md:w-fit text-nowrap">
                Find Leads Now
              </Button>
            </Link>
          </motion.div>
          <div className="mt-12 relative z-20">
            <Image
              src="/media/cardmiddleee.png"
              alt="B2B Leads"
              width={350}
              height={200}
              className="rounded-md hidden md:block"
            />
          </div>
        </CardSpotlight>

        <CardSpotlight className="w-full lg:w-[400px] transition-all duration-500 ease-in-out hover:scale-105 relative z-20">
          {/* <p className="text-2xl font-bold relative z-20 mt-2 text-[#fe9833]">
            Built on Trust: Secure, Compliant, and Scalable B2B Sales Platform
          </p>
          <p className="text-gray-500 relative z-20 text-sm mt-2">
            Discover how Alchemyst.ai delivers secure, scalable, and compliant
            sales automation tools for unmatched performance and trust.
          </p> */}

          <div className="text-neutral-200 mt-4 relative z-20">
            <ul className="list-item  mt-2">
              <li className="font-semibold">
                Secure and Scalable B2B Sales Platform:
              </li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Protect your data with SOC 2, ISO 27001, and PCI-DSS certified
                security while scaling your B2B sales operations seamlessly.
              </p>
              <li className="font-semibold">
                Enterprise-Grade Security and Compliance:
              </li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Ensure data security and compliance with industry-leading
                certifications for safe, reliable B2B sales.
              </p>
              <li className="font-semibold">
                AI-Powered Email Deliverability and Spam Protection:
              </li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Boost email success with AI-driven safeguards that ensure higher
                inbox placement and prevent spam issues.
              </p>
            </ul>
          </div>
          <motion.div
            className="relative z-30 flex justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={"https://tripetto.app/run/60HWNW0WQN"}
              target="_blank noopen"
              className="block pointer-events-auto"
            >
              <Button variant="primary" className="w-full md:w-fit text-nowrap">
                Explore Security Features
              </Button>
            </Link>
          </motion.div>
          <div className="mt-4 relative z-20 pl-6">
            <Image
              src="/media/cardright.png"
              alt="Secure B2B Platform"
              width={250}
              height={200}
              className="rounded-md hidden md:block"
            />
          </div>
        </CardSpotlight>
      </div>
    </div>
  );
}
