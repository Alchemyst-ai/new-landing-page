"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/home/Button";
import EndingCard from "../home/EndingCard";
import { motion } from "framer-motion";
import Newsletter from "@/components/home/Newsletter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Types
interface NewsCardData {
  id: string;
  image: string;
  title: string;
  authorImage?: string;
  articleLink: string;
  authorName: string;
  readTime: string;
}

// NewsCard Component
function NewsCard({ data }: { data: NewsCardData }) {
  return (
    <motion.div
      className="rounded-2xl border border-gray-500 overflow-hidden shadow-md"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={data.image || "/placeholder.svg"}
        alt={data.title}
        width={400}
        height={200}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-xl mb-2 transition-all duration-300 hover:text-teal-600">
          <Link href={`${data.articleLink}`} target="_blank">
            {data.title}
          </Link>
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {data.authorImage && (
              <Image
                src={data.authorImage}
                alt={data.authorName}
                width={32}
                height={32}
                className="rounded-full mr-2"
              />
            )}
            <span className="text-sm text-gray-500">{data.authorName}</span>
          </div>
          <span className="text-sm text-gray-500">{data.readTime} read</span>
        </div>
      </div>
    </motion.div>
  );
}

// Sample Data
const featuredNews: NewsCardData = {
  id: "featured",
  image: "/newsStudio/01.png",
  title:
    "AI startup Alchemyst raises pre-seed round led by Inflection Point Ventures, others",
  articleLink:
    "https://economictimes.indiatimes.com/tech/funding/alchemyst-ai-has-raised-funding-in-a-pre-seed-round-led-by-inflection-point-ventures-along-with-100-unicorns-and-early-seed-ventures/articleshow/114288876.cms?from=mdr",
  authorName: "The Economic Times | tech",
  readTime: "1 min",
};

const newsData: NewsCardData[] = [
  {
    id: "1",
    image: "/newsStudio/02.svg",
    title:
      "This Bengaluru Startup Secures $300K to Build AI Employees for Enterprises",
    articleLink:
      "https://analyticsindiamag.com/ai-startups/this-bengaluru-startup-secures-300k-to-build-ai-employees-for-enterprises/",
    authorName: "aim",
    readTime: "3 min",
  },
  {
    id: "2",
    image: "/newsStudio/03.svg",
    title:
      "Alchemyst AI raises $300K to drive AI-powered digital workforce solutions",
    articleLink:
      "https://www.financialexpress.com/business/brandwagon-alchemyst-ai-raises-300k-to-drive-ai-powered-digital-workforce-solutions-3641283/",
    authorName: "FINANCIAL EXPRESS | BRANDWAGON",
    readTime: "2 min",
  },
  {
    id: "3",
    image: "/newsStudio/04.svg",
    title: "India&apos;s genAI startup secures $300k pre-seed funding",
    articleLink:
      "https://www.techinasia.com/news/indias-genai-startup-secures-300k-preseed-funding",
    authorName: "Techinasia",
    readTime: "2 min",
  },
  {
    id: "4",
    image: "/newsStudio/05.svg",
    title: "Alchemyst AI Raise Early-Stage Funding",
    articleLink:
      "https://www.entrepreneur.com/en-in/news-and-trends/tablesprint-and-alchemyst-ai-raise-early-stage-funding/481385",
    authorName: "Entrepreneur",
    readTime: "4 min",
  },
  {
    id: "5",
    image: "/newsStudio/06.svg",
    title:
      "Alchemyst AI Bags $300K In Pre-Seed Round Led By Inflection Point Ventures, Others",
    articleLink:
      "https://bwdisrupt.com/article/alchemyst-ai-bags-300k-in-pre-seed-round-led-by-inflection-point-ventures-others-536393",
    authorName: "BwDisrupt",
    readTime: "4 min",
  },
];

// Main NewsStudioComponent
export default function NewsStudioComponent() {
  const [news] = useState<NewsCardData[]>(newsData);

  return (
    <div>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
        className="mb-20 mt-40"
      >
        <div className="min-h-screen">
          {/* Hero Section */}
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="text-center md:text-start md:pl-20 md:mt-16">
                  <h1 className="text-5xl md:text-8xl font-bold mb-4">News Studio</h1>
                  <p className="text-xl mb-6">
                    Your Gateway to Insights, Trends, and Stories from Alchemyst
                    AI
                  </p>
                </div>
                <div className="flex items-center justify-center md:justify-start md:items-start space-x-4 md:pl-20">
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

              <div className="md:w-1/2">
                <NewsCard data={featuredNews} />
              </div>
            </div>
          </div>

          {/* News Grid Section */}
          <div className="container mx-auto px-4 py-8">
            <div>
              <p className="text-4xl text-center font-bold mt-16 mb-16">
                Browse All Posts
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map((item) => (
                <NewsCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
      >
        <Newsletter />
      </motion.section>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 2.0 }}
      >
        <EndingCard />
      </motion.section>
    </div>
  );
}
