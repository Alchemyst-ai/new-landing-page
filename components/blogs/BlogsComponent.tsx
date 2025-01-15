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
interface BlogCardData {
  id: string;
  image: string;
  title: string;
  authorImage: string;
  articleLink: string;
  authorName: string;
  readTime: string;
}

// NewsCard Component
function BlogsCard({ data }: { data: BlogCardData }) {
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
        <h3 className="font-semibold text-xl mb-2 transition-all duration-300 hover:text-orange-400">
          <Link href={`${data.articleLink}`} target="_blank">
            {data.title}
          </Link>
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={data.authorImage || "/placeholder.svg"}
              alt={data.authorName}
              width={32}
              height={32}
              className="rounded-full mr-2"
            />
            <span className="text-sm text-gray-600">{data.authorName}</span>
          </div>
          <span className="text-sm text-gray-500">{data.readTime} read</span>
        </div>
      </div>
    </motion.div>
  );
}

// Sample Data
const featuredBlog: BlogCardData = {
  id: "featured",
  image: "/placeholder.svg?height=400&width=800",
  title: "Featured Article: The Rise of AI in Modern Journalism",
  articleLink: "/articles/featured",
  authorImage: "/placeholder.svg?height=100&width=100",
  authorName: "John Doe",
  readTime: "5 min",
};

const blogData: BlogCardData[] = [
  {
    id: "1",
    image: "/placeholder.svg?height=400&width=800",
    title: "AI Revolutionizes Content Creation",
    articleLink: "/articles/featured",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorName: "Alice Johnson",
    readTime: "3 min",
  },
];

// Main NewsStudioComponent
export default function NewsStudioComponent() {
  const [news] = useState<BlogCardData[]>(blogData);

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
                  <h1 className="md:text-8xl font-bold mb-4">Blogs Studio</h1>
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

              {/* <div className="md:w-1/2">
                <BlogsCard data={featuredBlog} />
              </div> */}
            </div>
          </div>

          {/* News Grid Section */}
          {/* <div className="container mx-auto px-4 py-8">
            <div>
              <p className="text-4xl text-center font-bold mt-16 mb-16">
                Browse All Posts
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map((item) => (
                <BlogsCard key={item.id} data={item} />
              ))}
            </div>
          </div> */}
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
