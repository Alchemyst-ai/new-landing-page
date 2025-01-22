"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { blogContents } from "@/components/blogs/blog-content-data";
import Button from "@/components/home/Button";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CustomCursor from "@/components/home/CustomCursor";
import EndingCard from "@/components/home/EndingCard";
import { useState } from "react";
import { ClipboardIcon } from "@heroicons/react/outline";

const BlogLinkCopy = () => {
  const [copied, setCopied] = useState(false);
  const blogLink = process.env.NODE_ENV === "production" ? window.location.href : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(blogLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={copyToClipboard}
    >
      <ClipboardIcon className="h-6 w-6 text-gray-500 hover:text-teal-700" />
      {copied && <span className="text-sm text-teal-700">Link copied!</span>}
    </div>
  );
};

export default function BlogPage() {
  const params = useParams();
  const slug = params.slug as string;
  const blog = blogContents.find((b) => b.redirectLink.endsWith(slug));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="relative flex flex-col min-h-screen max-w-screen overflow-x-hidden">
      <div className="hidden lg:block">
        <CustomCursor />
      </div>
      <header className="fixed top-0 z-40 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
        <Navbar />
        <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
      </header>
      <main className="flex-grow">
        <div className="text-xl p-5 mt-16 md:mt-0 md:p-52 md:max-w-[90%] mx-auto">
          <p className="text-teal-700">{blog.blogCategory}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center mt-8">
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
            <div className="pl-1">
              <BlogLinkCopy />
            </div>
          </div>
          <div className="overflow-hidden w-full mt-8">
            <Image
              src={blog.image || "/placeholder.svg"}
              alt={blog.title}
              width={800}
              height={400}
              className="w-full rounded-3xl object-cover"
            />
          </div>
          <div className="mt-8 prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children, ...props }) {
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
      <EndingCard />
      <Footer />
    </div>
  );
}
