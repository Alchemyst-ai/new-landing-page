import type React from "react";

export interface BlogContent {
  id: string;
  title: string;
  image: string;
  authorImage?: string;
  authorName: string;
	blogCategory: string;
	dateOfBlog: string;
  readTime: string;
  redirectLink: string;
}

export const blogContents: BlogContent[] = [
  {
    id: "featured",
    title: "How AI Will Change B2B Lead Generation",
    image: "/blogs/ai-will-change-b2b-lead.svg",
    authorImage: "/blogs/authors/uttaran.jpg",
    authorName: "Uttaran Nayak",
    blogCategory: "Sales",
    dateOfBlog: "Jan 20th, 2025",
    readTime: "5 min",
    redirectLink: "/blogs/ai-will-change-b2b-lead",
  },
  {
    id: "1",
    title: "The Future of AI in Marketing",
    image: "/blogStudio/blog1.jpg",
    authorName: "Jane Smith",
    blogCategory: "Sales",
    dateOfBlog: "20th January, 2025",
    readTime: "4 min",
    redirectLink: "/blogs/future-ai-marketing",
  },
];
