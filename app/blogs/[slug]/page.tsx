"use client";

// Import necessary components and hooks
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { fetchBlogs } from "@/components/blogs/blog-content-data";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CustomCursor from "@/components/home/CustomCursor";
import EndingCard from "@/components/home/EndingCard";
import { useState } from "react";
import { ClipboardIcon } from "@heroicons/react/outline";

// Component to copy blog link to clipboard
const BlogLinkCopy = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={copyToClipboard}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          copyToClipboard();
        }
      }}
    >
      <ClipboardIcon className="h-6 w-6 text-gray-500 hover:text-teal-700" />
      {copied && <span className="text-sm text-teal-700">Link copied!</span>}
    </div>
  );
};

// Main component for the blog page
export default function BlogPage() {
  // Get the slug from the URL
  const params = useParams();
  const slug = params.slug as string;

  // Find the blog content from the database
  interface Blog {
    redirectLink: string;
    blogCategory: string;
    title: string;
    authorImage?: string;
    authorName: string;
    readTime: string;
    image?: string;
    content: string;
  }

  const [blog, setBlog] = useState<Blog | undefined>(undefined);

  useEffect(() => {
    const fetchBlogData = async () => {
      const blogs = await fetchBlogs();
      const foundBlog = blogs.find((b: Blog) => b.redirectLink.endsWith(slug));
      setBlog(foundBlog);
    };

    fetchBlogData();
  }, [slug]);

  // If the blog is not found, render a 404 page
  if (!blog) {
    return <div>Blog not found</div>;
  }

  // JSX for the blog page
  return (
    <div className="relative flex flex-col min-h-screen max-w-screen overflow-x-hidden">
      {/* Custom cursor for large screens */}
      <div className="hidden lg:block">
        <CustomCursor />
      </div>

      {/* Header with navigation */}
      <header className="fixed top-0 z-40 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
        <Navbar />
        <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <div className="text-xl p-5 mt-16 md:mt-0 md:p-52 md:max-w-[90%] mx-auto">
          {/* Blog category */}
          <p className="text-teal-700">{blog.blogCategory}</p>

          {/* Blog title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>

          {/* Blog author and read time */}
          <div className="flex items-center mt-8">
            {/* Blog author image and name */}
            {blog.authorImage && (
              <Image
                src={blog.authorImage || "/placeholder.svg"}
                alt={blog.authorName}
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
            )}
            <div className="ml-4 flex gap-2">
              <p className="text-lg font-bold">{blog.authorName}</p>
              <p className="text-gray-400">| {blog.readTime} read |</p>
            </div>

            {/* Link copy component */}
            <div className="pl-1">
              <BlogLinkCopy />
            </div>
          </div>

          {/* Blog image */}
          <div className="overflow-hidden w-full mt-8">
            <Image
              src={blog.image || "/placeholder.svg"}
              alt={blog.title}
              width={800}
              height={400}
              className="w-full rounded-3xl object-cover"
            />
          </div>

          {/* Blog content */}
          <div className="mt-8 prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              // Custom components for code blocks, links, images, paragraphs, headings, lists, and blockquotes
              components={{
                code({ className, children, ...props }) {
                  // Use Prism syntax highlighter for code blocks
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  );
                },
                a: ({ ...props }) => (
                  <a {...props} className="text-blue-400 hover:text-blue-300" />
                ),
                img: ({ ...props }) => (
                  <img {...props} className="max-w-full h-auto" />
                ),
                p: ({ ...props }) => <p {...props} className="mb-4" />,
                h1: ({ ...props }) => (
                  <h1 {...props} className="text-4xl font-bold mt-8 mb-4" />
                ),
                h2: ({ ...props }) => (
                  <h2 {...props} className="text-3xl font-bold mt-6 mb-3" />
                ),
                h3: ({ ...props }) => (
                  <h3 {...props} className="text-2xl font-bold mt-4 mb-2" />
                ),
                ul: ({ ...props }) => (
                  <ul {...props} className="list-disc pl-6 mb-4" />
                ),
                ol: ({ ...props }) => (
                  <ol {...props} className="list-decimal pl-6 mb-4" />
                ),
                li: ({ ...props }) => <li {...props} className="mb-2" />,
                blockquote: ({ ...props }) => (
                  <blockquote
                    {...props}
                    className="border-l-4 border-gray-500 pl-4 italic my-4"
                  />
                ),
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </div>
      </main>

      {/* Call-to-action card */}
      <EndingCard />

      {/* Footer */}
      <Footer />
    </div>
  );
}
