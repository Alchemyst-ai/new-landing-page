import { Post } from "@/lib/blog";
import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export type CardPost = Pick<
  Post,
  "title" | "slug" | "summary" | "publishedAt" | "image" | "readTime"
> & {
  description?: string;
};

export default function BlogCard({
  data,
  priority,
  featured,
}: {
  data: CardPost;
  priority?: boolean;
  featured?: boolean;
}) {

  // console.log("THE BLOG DATA", data)

  const summary = (data as any).summary ?? (data as any).description ?? "";

  return (
    <Link
      href={`/blog/${data.slug}`}
      className={cn(
        "block overflow-hidden rounded-xl transition-all duration-200",
        featured
          ? "bg-card hover:bg-card/90 border"
          : "bg-card hover:bg-card/90 border",
        featured ? "lg:grid lg:grid-cols-2 lg:gap-8" : ""
      )}
    >
      <div className={cn(
        "relative overflow-hidden",
        featured ? "lg:h-[400px]" : "h-[200px]"
      )}>
        {data.image ? (
          <Image
            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
            src={data.image}
            width={1200}
            height={630}
            alt={data.title}
            priority={priority}
          />
          // <img
          //   className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
          //   src={data.image}
          //   width={1200}
          //   height={630}
          //   alt={data.title}
          // />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={data.publishedAt}>
            {formatDate(data.publishedAt)}
          </time>
          {data.readTime && (
            <>
              <span>•</span>
              <span>{data.readTime} min read</span>
            </>
          )}
        </div>
        <h3 className={cn(
          "font-bold mb-4 text-foreground",
          featured ? "text-3xl" : "text-xl"
        )}>
          {data.title}
        </h3>
        <p className="text-muted-foreground line-clamp-3">{summary}</p>

        {featured && (
          <button
            type="button"
            className="mt-6 inline-flex items-center text-foreground hover:text-muted-foreground focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== "undefined") {
          const dialog = document.createElement("dialog");
          dialog.style.padding = "2rem";
          dialog.innerHTML = `
            <div style="font-size:1.2rem;">Loading Blog...</div>
            <form method="dialog">
              <button style="margin-top:1.5rem;padding:0.5rem 1rem;border-radius:0.5rem;background:#eee;">Close</button>
            </form>
          `;
          document.body.appendChild(dialog);
          dialog.showModal();
          dialog.addEventListener("close", () => {
            dialog.remove();
          });
              }
            }}
          >
            Read More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </Link>
  );
}