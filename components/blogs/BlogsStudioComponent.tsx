"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/home/Button";
import EndingCard from "@/components/home/EndingCard";
import Newsletter from "@/components/home/Newsletter";
import { fetchBlogs } from "./blog-content-data";
import { BlogContent } from "../../app/types/blog-content";
// BlogCard Component
function BlogCard({ data }: { data: BlogContent }) {
  return (
    <div className="rounded-2xl border border-gray-500 overflow-hidden shadow-md cursor-pointer h-full">
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
        <div className="mx-2 my-2">
          {data.keywords.map(keyword => (
            <a
              key={`tags-${keyword}-${data.id}`}
              className="px-2 rounded-full"
              target="_blank"
              href={`/blogs/tags/${keyword.replace(" ", "-")}`}
            >
              {keyword}
            </a>
          ))
          }
        </div>
      </div>
    </div>
  );
}

// Main BlogsStudioComponent
export default function BlogsStudioComponent() {
  const [blogs, setBlogs] = useState<BlogContent[]>([]);
  const [visibleBlogs, setVisibleBlogs] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const loadMore = () => {
    setVisibleBlogs((prevVisible) => prevVisible + 8);
  };

  return (
    <div>
      <div className="mb-20 mt-40">
        <div className="min-h-screen">
          {/* Hero Section */}
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Blogs Studio
            </h1>
            <p className="text-xl mb-6">
              Discover Insights and Trends in AI and B2B Lead Generation
            </p>
            <div className="flex justify-center">
              <Link
                href="https://calendly.com/sid-bains-alchemystai"
                target="_blank"
              >
                <Button variant="primary">Book a demo</Button>
              </Link>
            </div>
          </div>

          {/* Blogs Grid Section */}
          <div id="blogs" className="container mx-auto px-4 py-8">
            {loading ? (
              <p className="text-center text-gray-500">Loading blogs...</p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogs.slice(0, visibleBlogs).map((blog) => (
                    <Link key={blog.id} href={blog.redirectLink}>
                      <BlogCard data={blog} />
                    </Link>
                  ))}
                </div>
                {visibleBlogs < blogs.length && (
                  <div className="text-center mt-8">
                    <Button variant="secondary" onClick={loadMore}>
                      Load More
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <Newsletter />
      </div>
      <div>
        <EndingCard />
      </div>
    </div>
  );
}