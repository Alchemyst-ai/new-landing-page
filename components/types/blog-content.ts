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
    keywords: string[];
}
