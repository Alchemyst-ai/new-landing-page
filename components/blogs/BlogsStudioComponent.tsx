"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/home/Button";
import EndingCard from "@/components/home/EndingCard";
import { motion } from "framer-motion";
import Newsletter from "@/components/home/Newsletter";
import {
  blogContents,
  type BlogContent as BlogContentType,
} from "./blog-content-data";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// BlogCard Component
function BlogCard({
  data,
  onClick,
}: {
  data: BlogContentType;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="rounded-2xl border border-gray-500 overflow-hidden shadow-md cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <Image
        src={data.image || "/placeholder.svg"}
        alt={data.title}
        width={400}
        height={200}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <p className="text-teal-700 text-lg">{data.blogCategory}</p>
        <h3 className="font-semibold text-2xl mb-2 transition-all duration-300 hover:text-teal-600">
          {data.title}
        </h3>
        <div className="flex md:flex-row md:items-center md:justify-between flex-col items-start">
          <div className="flex items-center">
            {data.authorImage && (
              <Image
                src={data.authorImage || "/placeholder.svg"}
                alt={data.authorName}
                width={32}
                height={32}
                className="rounded-full mr-2"
              />
            )}
            <span className="text-lg text-gray-500">{data.authorName}</span>
          </div>
          <span className="text-lg text-gray-500">
            {data.dateOfBlog} | {data.readTime} read
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Main BlogsStudioComponent
export default function BlogsStudioComponent() {
  const [blogs] = useState<BlogContentType[]>(blogContents);
  const featuredBlog = blogs.find((blog) => blog.id === "featured") || blogs[0];
  const [selectedBlog, setSelectedBlog] = useState<BlogContentType | null>(
    null
  );

  const handleBlogClick = (blog: BlogContentType) => {
    setSelectedBlog(blog);
  };

  const handleCloseBlog = () => {
    setSelectedBlog(null);
  };

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
                <div className="text-center md:text-start md:pl-20 md:mt-28">
                  <h1 className="text-5xl md:text-8xl font-bold mb-4">
                    Blogs Studio
                  </h1>
                  <p className="text-xl mb-6">
                    Discover Insights and Trends in AI and B2B Lead Generation
                  </p>
                </div>
                <div className="flex items-center justify-center md:justify-start md:items-start space-x-4 md:pl-20">
                  <div className="flex items-center space-x-4">
                    <Link
                      href="https://calendly.com/uttaran-getalchemystai/30min"
                      target="_blank"
                    >
                      <Button variant="primary">Book a demo</Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <Link href={`${featuredBlog.redirectLink}`}>
                  <BlogCard data={featuredBlog} onClick={() => {}} />
                </Link>
              </div>
            </div>
          </div>

          {/* Blogs Grid Section
          <div id="blogs" className="container mx-auto px-4 py-8">
            <div>
              <p className="text-4xl text-center font-bold mt-16 mb-16">
                Browse All Blogs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs
                .filter((blog) => blog.id !== "featured")
                .map((item) => (
                  <Link href={`${item.redirectLink}`}>
                    <BlogCard data={featuredBlog} onClick={() => {}} />
                  </Link>
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
