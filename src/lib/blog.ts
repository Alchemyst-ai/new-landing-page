import { siteConfig } from "@/lib/config";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export type Post = {
  title: string;
  publishedAt: string;
  summary: string;
  author: string;
  slug: string;
  image?: string;
  category?: string;
  subcategory?: string;
  authorImage?: string;
  authorRole?: string;
  authorTwitter?: string;
  authorBio?: string;
  reviewer?: string;
  reviewerImage?: string;
  reviewerRole?: string;
  reviewerBio?: string;
  draft?: boolean;
  lastModified?: string | null;
  readTime?: number;
};

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return readTime;
}

function getLastModifiedDate(filePath: string): string | null {
  try {
    const cmd = `git log -1 --pretty="format:%ci" "${filePath}"`;
    const result = execSync(cmd, { encoding: 'utf-8' }).trim();
    return result || null;
  } catch (error) {
    return null;
  }
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<Post> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");
    
    if (key.trim() === 'draft') {
      (metadata as any)[key.trim()] = value.toLowerCase() === 'true';
    } else {
      (metadata as any)[key.trim()] = value;
    }
  });

  return { data: metadata as Post, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  const htmlString = p.toString();
  const htmlWithIds = htmlString.replace(
    /<h([1-6])([^>]*)>(.*?)<\/h[1-6]>/g,
    (match, level, attributes, content) => {
      const id = content
        .replace(/<[^>]*>/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      
      return `<h${level}${attributes} id="${id}">${content}</h${level}>`;
    }
  );
  
  return htmlWithIds;
}

export async function getPost(slug: string) {
  const filePath = path.join("content", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: metadata } = parseFrontmatter(source);
  const content = await markdownToHTML(rawContent);
  const defaultImage = `${siteConfig.url}/og?title=${encodeURIComponent(
    metadata.title
  )}`;
  
  const lastModified = getLastModifiedDate(filePath);
  const readTime = calculateReadTime(rawContent);
  
  return {
    source: content,
    metadata: {
      ...metadata,
      image: metadata.image || defaultImage,
      lastModified,
      readTime,
    },
    slug,
  };
}

async function getAllPosts(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      const { metadata, source } = await getPost(slug);
      return {
        ...metadata,
        slug,
        source,
      };
    })
  );
  
  return posts.filter(post => !post.draft);
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), "content"));
}
