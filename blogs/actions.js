import fs from 'fs';
import path from "path";


const BLOGS_DIR = path.resolve("./blogs");
const WORDS_PER_MIN = 200;

/**
 * Parsing the md file by splitting metadata and content
 * @param {string} fileContent
 * @returns {{metadata: object, content: string}}
 */

function parseFile(fileContent) {
  const [metadataBlock, ...contentParts] = fileContent.split("---").map(part => part.trim());

  if (!metadataBlock || contentParts.length === 0) {
    console.warn("Files Missing in Markdown. Skipping...");
    return { metadata: {}, content: "" };
  }

  const content = contentParts.join("\n");
  const metadata = {};

  metadataBlock.split("\n").forEach(line => {
    const [key, value] = line.split(":").map(item => item.trim());
    if (key && value) {
      metadata[key] = parseMetadataValue(value);
    }
  })
  return { metadata, content };
}

/**
 * Parses metadata values by handling the arrays and the quotes of title
 * @param {string} value 
 * @returns {string | string[]}
 */

function parseMetadataValue(value) {
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map(item => item.trim().replace(/["']/g, ""));
  }
  return value.replace(/["']/g, "");
}

/**
 * Generates a URL from a file name 
 * @param {string} fileName
 * @returns {string}
 */

function getUrlFromFileName(fileName) {
  return fileName.replace(/\.md$/, "");
}

/**
 * Calculates the estimated reading time
 * @param {string} text
 * @returns {string}
 */

function calculateReadTime(text) {
  const wordCount = text.split(/\s+/).length;
  return `${Math.ceil(wordCount / WORDS_PER_MIN)} min`;
}

/**
 * Reads Markdown blog files from the `blogs` folder and extracts content into an array.
 * @returns {Array}
 */

export function getBlogContents() {
  try {
    const blogFiles = fs.readdirSync(BLOGS_DIR).filter(file => file.endsWith(".md")).sort();

    return blogFiles.map((fileName) => {
      const filePath = path.join(BLOGS_DIR, fileName);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { metadata, content } = parseFile(fileContent);

      const id = getUrlFromFileName(fileName);
      const title = metadata.title || "Untitled";
      const image = metadata.image;
      const authorImage = metadata.authorImage;
      const authorName = metadata.author;
      const blogCategory = metadata.category || "General";
      const dateOfBlog = metadata.date;
      const keywords = metadata.keywords || "";
      const readTime = calculateReadTime(content);
      const redirectLink = getUrlFromFileName(fileName);

      if (!metadata.title || !metadata.author || !metadata.date) {
        console.warn(`Skipping file ${fileName} due to missing important metadata.`);
        return null;
      }

      return {
        id,
        title,
        image,
        authorImage,
        authorName,
        blogCategory,
        dateOfBlog,
        keywords,
        readTime,
        redirectLink,
        content,
      };
    }).filter(Boolean);
  } catch(error){
    console.error("Error reading Blog Content: ", error)
  }
}