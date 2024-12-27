"use client";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import Image from "next/image";
import Button from "./Button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function InfoCard() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl text-center text-gray-400 mt-4 md:mt-16 mb-16">
        Product Information
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 justify-center">
        <CardSpotlight className="w-full lg:w-[400px] transition-all duration-500 ease-in-out hover:scale-105 relative z-20">
          <div className="mb-14 relative z-20">
            <Image
              src="/media/cardleft.png"
              alt="AI Sales Automation"
              width={350}
              height={200}
              className="rounded-md"
            />
          </div>
          <p className="text-2xl font-bold relative z-20 mt-2 text-[#fe9833]">
            Smarter Sales, Every Step of the Way with AI Sales Automation
          </p>
          <p className="text-gray-500 relative z-20 text-sm mt-2">
            Discover how Maya&#39;s AI-powered sales automation tools can
            transform your B2B sales strategy for better results.
          </p>
          <div className="text-neutral-200 mt-4 relative z-20 ">
            <ul className="list-item mt-2">
              <li>End-to-End Automation:</li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Revolutionize your process with AI-driven B2B sales automation
                that takes care of everything—from outreach and follow-ups to
                lead qualification. Say goodbye to manual tasks and hello to
                effortless efficiency.
              </p>
              <li>Omni-Channel Reach:</li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Reach your prospects wherever they are. Maya integrates
                seamlessly across email, WhatsApp, Telegram, and more, enabling
                a unified omni-channel sales strategy from one platform.
              </p>
              <li>Boost Deliverability:</li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Maximize the impact of your campaigns with Maya&#39;s email
                warm-up tool, designed to improve deliverability, prevent spam
                issues, and ensure higher engagement for your sales emails.
              </p>
            </ul>
          </div>
          <motion.div
            className="relative z-30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={"https://tripetto.app/run/60HWNW0WQN"}
              target="_blank noopen"
              className="block pointer-events-auto"
            >
              <Button variant="primary" className="w-full md:w-fit text-nowrap">
                Automate Sales Today
              </Button>
            </Link>
          </motion.div>
        </CardSpotlight>

        <CardSpotlight className="w-full lg:w-[400px] transition-all duration-500 ease-in-out hover:scale-105 relative z-20">
          <p className="text-2xl font-bold relative z-20 mt-2 text-[#fe9833]">
            Quality B2B Leads, Powered by AI for Sales Success
          </p>
          <p className="text-gray-500 relative z-20 text-sm mt-2">
            Transform your B2B sales process with AI-powered tools designed for
            lead quality, scalability, and conversion success.
          </p>
          <div className="text-neutral-200 mt-4 relative z-20">
            <ul className="list-item  mt-2">
              <li>Tap Into a 300M+ Verified B2B Sales Leads Database:</li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Access one of the world&#39;s largest and most reliable B2B
                sales lead databases, tailored to your Ideal Customer Profile
                (ICP). Maya&#39;s AI ensures you connect with the right
                prospects, faster.
              </p>
              <li>AI-Powered Web Search for Hyper-Personalized Prospecting:</li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Maya uses advanced AI-driven web search tools to create a
                hyper-personalized prospect list, combining precision and
                relevance to fuel your B2B lead generation strategy.
              </p>
              <li>Affordable, Accurate, and Results-Driven Solutions:</li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Maximize your ROI with Alchemyst.ai&#39;s cost-effective B2B
                sales tools that deliver unmatched accuracy and personalization,
                outperforming traditional lead generation platforms.
              </p>
            </ul>
          </div>
          <motion.div
            className="relative z-30"
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
          <div className="mt-20 relative z-20">
            <Image
              src="/media/cardmiddleee.png"
              alt="B2B Leads"
              width={350}
              height={200}
              className="rounded-md"
            />
          </div>
        </CardSpotlight>

        <CardSpotlight className="w-full lg:w-[400px] transition-all duration-500 ease-in-out hover:scale-105 relative z-20">
          <p className="text-2xl font-bold relative z-20 mt-2 text-[#fe9833]">
            Built on Trust: Secure, Compliant, and Scalable B2B Sales Platform
          </p>
          <p className="text-gray-500 relative z-20 text-sm mt-2">
            Discover how Alchemyst.ai delivers secure, scalable, and compliant
            sales automation tools for unmatched performance and trust.
          </p>

          <div className="text-neutral-200 mt-4 relative z-20">
            <ul className="list-item  mt-2">
              <li>Enterprise-Grade Security for Your Data:</li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Protect your business with industry-leading SOC 2, ISO 27001,
                and PCI-DSS certifications. Alchemyst.ai ensures data security
                and compliance at every level, so your sensitive information
                stays safe.
              </p>
              <li>High-Performance Scalability for B2B Sales:</li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Scale your sales operations effortlessly with a platform
                designed for high performance and reliability. Alchemyst.ai
                supports large-scale lead generation and outreach without
                downtime, enabling consistent growth.
              </p>
              <li>Spam-Free Email Deliverability with AI Safeguards:</li>
              <p className="text-gray-500 pt-2 pl-4 relative pb-4">
                Increase your email success rates with AI-driven spam
                protection. Maya optimizes email deliverability for higher inbox
                placement and prevents campaigns from landing in spam folders.
              </p>
            </ul>
          </div>
          <motion.div
            className="relative z-30"
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
          <div className="mt-4 relative z-20">
            <Image
              src="/media/cardright.png"
              alt="Secure B2B Platform"
              width={350}
              height={200}
              className="rounded-md"
            />
          </div>
        </CardSpotlight>
      </div>
    </div>
  );
}
