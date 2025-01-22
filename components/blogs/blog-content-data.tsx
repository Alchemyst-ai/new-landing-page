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
  content: string;
}

export const blogContents: BlogContent[] = [
  {
    id: "1",
    title: "How AI Will Change B2B Lead Generation",
    image: "/blogs/ai-will-change-b2b-lead.svg",
    authorImage: "/blogs/authors/uttaran.jpg",
    authorName: "Uttaran Nayak",
    blogCategory: "Sales",
    dateOfBlog: "Jan 20th, 2025",
    readTime: "5 min",
    redirectLink: "/blogs/ai-will-change-b2b-lead",
    content: `

Artificial Intelligence (AI) is reshaping industries, and B2B lead generation is no exception. By enhancing efficiency, targeting accuracy, and lead quality, AI is transforming how businesses connect with potential clients. At Alchemyst AI, we specialize in leveraging AI to optimize every stage of the lead generation process. Here's how we do it -

## 1. AI-Powered Lead Identification

Finding high-potential leads has traditionally been time-intensive. AI streamlines this by analyzing vast datasets to identify and prioritize leads.

### Key Insights

- AI can increase lead identification efficiency by **up to 60%.**
- Behavioral data, such as website visits and interactions, reveals high-interest prospects.

### Our Solution

At Alchemyst AI, we utilize advanced algorithms to analyze user behavior, enabling businesses to discover prospects ready to engage. And, We have an ocean of 300M leads which we update on a weekly basis.

## 2. Enhanced Lead Scoring

Traditional lead scoring often relies on static parameters. AI offers dynamic, real-time scoring that adapts to changes in lead behavior.

### Results:

- Improved sales productivity **by 20%.**
- Higher lead conversion rates.

### [Alchemyst Advantage](https://calendly.com/uttaran-getalchemystai/30min)

Our platform dynamically scores leads based on engagement history, demographics, and intent signals, ensuring your team focuses on high-value prospects.

## Conclusion

AI is revolutionizing B2B lead generation by enabling smarter, faster, and more personalized strategies. At Alchemyst AI, we empower businesses to:

- Identify high-potential leads with precision. 
- Nurture relationships through automated, personalized engagement.
- Optimize every step of the lead generation process with real-time insights.

Ready to supercharge your B2B lead generation? [Contact Alchemyst AI](https://calendly.com/uttaran-getalchemystai/30min) today to explore how our AI solutions can drive better leads and higher conversions for your business. Learn more about our services and start transforming your lead generation strategy now!
    `,
  },
  {
    id: "2",
    title: "The Future of AI in Marketing",
    image: "/blogStudio/blog1.jpg",
    authorImage: "/blogs/authors/jane.jpg",
    authorName: "Jane Smith",
    blogCategory: "Marketing",
    dateOfBlog: "Feb 5th, 2025",
    readTime: "4 min",
    redirectLink: "/blogs/future-ai-marketing",
    content: `
# The Future of AI in Marketing

Artificial Intelligence is revolutionizing the marketing landscape. Here's how:

- Personalized customer experiences
- Predictive analytics for better targeting
- Automated content creation and curation

As AI continues to evolve, marketers must adapt to stay ahead of the curve.
    `,
  },
  // Add more blog entries here to have at least 17 entries for testing the load more functionality
  // ... (add 15 more entries with similar structure)
  {
    id: "3",
    title: "Blog Post 3",
    image: "/blogStudio/blog3.jpg",
    authorName: "Author 3",
    blogCategory: "Category 3",
    dateOfBlog: "March 10th, 2025",
    readTime: "6 min",
    redirectLink: "/blogs/blog-post-3",
    content: "Content for Blog Post 3",
  },
  {
    id: "4",
    title: "Blog Post 4",
    image: "/blogStudio/blog4.jpg",
    authorName: "Author 4",
    blogCategory: "Category 4",
    dateOfBlog: "April 15th, 2025",
    readTime: "7 min",
    redirectLink: "/blogs/blog-post-4",
    content: "Content for Blog Post 4",
  },
  {
    id: "5",
    title: "Blog Post 5",
    image: "/blogStudio/blog5.jpg",
    authorName: "Author 5",
    blogCategory: "Category 5",
    dateOfBlog: "May 20th, 2025",
    readTime: "8 min",
    redirectLink: "/blogs/blog-post-5",
    content: "Content for Blog Post 5",
  },
  {
    id: "6",
    title: "Blog Post 6",
    image: "/blogStudio/blog6.jpg",
    authorName: "Author 6",
    blogCategory: "Category 6",
    dateOfBlog: "June 25th, 2025",
    readTime: "9 min",
    redirectLink: "/blogs/blog-post-6",
    content: "Content for Blog Post 6",
  },
  {
    id: "7",
    title: "Blog Post 7",
    image: "/blogStudio/blog7.jpg",
    authorName: "Author 7",
    blogCategory: "Category 7",
    dateOfBlog: "July 30th, 2025",
    readTime: "10 min",
    redirectLink: "/blogs/blog-post-7",
    content: "Content for Blog Post 7",
  },
  {
    id: "8",
    title: "Blog Post 8",
    image: "/blogStudio/blog8.jpg",
    authorName: "Author 8",
    blogCategory: "Category 8",
    dateOfBlog: "August 5th, 2025",
    readTime: "11 min",
    redirectLink: "/blogs/blog-post-8",
    content: "Content for Blog Post 8",
  },
  {
    id: "9",
    title: "Blog Post 9",
    image: "/blogStudio/blog9.jpg",
    authorName: "Author 9",
    blogCategory: "Category 9",
    dateOfBlog: "September 10th, 2025",
    readTime: "12 min",
    redirectLink: "/blogs/blog-post-9",
    content: "Content for Blog Post 9",
  },
  {
    id: "10",
    title: "Blog Post 10",
    image: "/blogStudio/blog10.jpg",
    authorName: "Author 10",
    blogCategory: "Category 10",
    dateOfBlog: "October 15th, 2025",
    readTime: "13 min",
    redirectLink: "/blogs/blog-post-10",
    content: "Content for Blog Post 10",
  },
  {
    id: "11",
    title: "Blog Post 11",
    image: "/blogStudio/blog11.jpg",
    authorName: "Author 11",
    blogCategory: "Category 11",
    dateOfBlog: "November 20th, 2025",
    readTime: "14 min",
    redirectLink: "/blogs/blog-post-11",
    content: "Content for Blog Post 11",
  },
  {
    id: "12",
    title: "Blog Post 12",
    image: "/blogStudio/blog12.jpg",
    authorName: "Author 12",
    blogCategory: "Category 12",
    dateOfBlog: "December 25th, 2025",
    readTime: "15 min",
    redirectLink: "/blogs/blog-post-12",
    content: "Content for Blog Post 12",
  },
  {
    id: "13",
    title: "Blog Post 13",
    image: "/blogStudio/blog13.jpg",
    authorName: "Author 13",
    blogCategory: "Category 13",
    dateOfBlog: "January 30th, 2026",
    readTime: "16 min",
    redirectLink: "/blogs/blog-post-13",
    content: "Content for Blog Post 13",
  },
  {
    id: "14",
    title: "Blog Post 14",
    image: "/blogStudio/blog14.jpg",
    authorName: "Author 14",
    blogCategory: "Category 14",
    dateOfBlog: "February 5th, 2026",
    readTime: "17 min",
    redirectLink: "/blogs/blog-post-14",
    content: "Content for Blog Post 14",
  },
  {
    id: "15",
    title: "Blog Post 15",
    image: "/blogStudio/blog15.jpg",
    authorName: "Author 15",
    blogCategory: "Category 15",
    dateOfBlog: "March 10th, 2026",
    readTime: "18 min",
    redirectLink: "/blogs/blog-post-15",
    content: "Content for Blog Post 15",
  },
  {
    id: "16",
    title: "Blog Post 16",
    image: "/blogStudio/blog16.jpg",
    authorName: "Author 16",
    blogCategory: "Category 16",
    dateOfBlog: "April 15th, 2026",
    readTime: "19 min",
    redirectLink: "/blogs/blog-post-16",
    content: "Content for Blog Post 16",
  },
  {
    id: "17",
    title: "Blog Post 17",
    image: "/blogStudio/blog17.jpg",
    authorName: "Author 17",
    blogCategory: "Category 17",
    dateOfBlog: "May 20th, 2026",
    readTime: "20 min",
    redirectLink: "/blogs/blog-post-17",
    content: "Content for Blog Post 17",
  },
];
