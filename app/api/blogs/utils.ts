import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import YAML from 'yaml'
import { execSync } from 'child_process'
import { ProcessedFile } from '@/app/types/blog-api';

const BLOGS_DIR = join(process.cwd(), "/public/blogs/content");
const WORDS_PER_MIN = 200;

console.log("BLOGS_DIR: ", BLOGS_DIR);

/**
 * Parsing the md file by splitting metadata and content
 * @param {string} fileContent
 * @returns {{metadata: object, content: string}}
 */
function parseFile(fileContent: string) {
    const [metadataBlock, ...contentParts] = fileContent.split("---").map(part => part.trim());

    let metadata: Record<string, any> = {}

    try {
        metadata = YAML.parse(metadataBlock);
        // console.log("Metadata: ");
        // console.log(metadata);
    } catch (error) {
        console.error("Error parsing metadata block: ", error);
        return { metadata: {}, content: "" };
    }

    if (!metadataBlock || contentParts.length === 0) {
        console.warn("Files Missing in Markdown. Skipping...");
        return { metadata: {}, content: "" };
    }


    const content = contentParts.join("\n");

    return { metadata, content };
}

/**
 * Parses metadata values by handling the arrays and the quotes of title
 * @param {string} value 
 * @returns {string | string[]}
 */
function parseMetadataValue(value: string) {
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
function getUrlFromFileName(fileName: string) {
    return fileName.replace(/\.md$/, "");
}

/**
 * Calculates the estimated reading time
 * @param {string} text
 * @returns {string}
 */
function calculateReadTime(text: string) {
    const wordCount = text.split(/\s+/).length;
    return `${Math.ceil(wordCount / WORDS_PER_MIN)} min`;
}

export function processFile(fileName: string): ProcessedFile | null {
    const filePath = join(BLOGS_DIR, fileName);
    const fileContent = readFileSync(filePath, "utf-8");
    let { metadata, content } = parseFile(fileContent);

    const cmd = `echo $(git log -1 --pretty="format:%ci" "${filePath}")`
    console.log("Generated CMD = \n", cmd);
    try {
        let lastModifiedDate = execSync(cmd);
        metadata.lastModifiedDate = lastModifiedDate.toString().trim();
        console.log("Last Modified Date: ", metadata.lastModifiedDate);
    } catch (err) {
        console.error("Error getting last modified date: ", err);
    }

    const id = getUrlFromFileName(fileName);
    const title = metadata.title || "Untitled";
    const image = metadata.image || "";
    const authorImage = metadata.authorImage || "";
    const draftStatus = metadata.draft || false;
    const authorName = metadata.authorName || "Team Alchemyst";
    const blogCategory = metadata.category || "General";
    const dateOfBlog = metadata.date ?? new Date().toUTCString();
    const keywords = metadata.keywords || [];
    const readTime = calculateReadTime(content);
    const redirectLink = metadata.redirectLink;
    const lastModifiedDate = metadata.lastModifiedDate;

    if (!metadata.title || !metadata.authorName || !metadata.date) {
        console.warn(`Skipping file ${fileName} due to missing important metadata.`);
        return null;
    }

    return {
        id,
        title,
        image,
        draftStatus,
        authorImage,
        authorName,
        blogCategory,
        dateOfBlog,
        keywords,
        readTime,
        redirectLink,
        content,
        lastModified: lastModifiedDate
    };
}

/**
 * Reads Markdown blog files from the `blogs` folder and extracts content into an array.
 * @returns {Array}
 */
export function getBlogContents() {
    try {
        console.log("Reading Blog Content...");
        console.log("BLOGS_DIR: ", BLOGS_DIR);
        const blogFiles = readdirSync(BLOGS_DIR).filter(file => file.endsWith(".md")).sort();
        console.log("Blog Files: ", blogFiles);

        return blogFiles.map((fileName) => processFile(fileName)).filter(entry => !!entry).filter(entry => !entry.draftStatus);
    } catch (error) {
        console.error("Error reading Blog Content: ", error)
    }
}