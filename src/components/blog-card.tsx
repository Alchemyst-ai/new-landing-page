import { Post } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BlogCard({
  data,
  priority,
  featured,
}: {
  data: Post;
  priority?: boolean;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${data.slug}`}
      className={cn(
        "block overflow-hidden rounded-xl transition-all duration-200",
        featured
          ? "bg-white/10 hover:bg-white/20"
          : "bg-white/5 hover:bg-white/10",
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
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-900" />
        )}
      </div>
      <div className="p-6">
        <p className="mb-4">
          <time
            dateTime={data.publishedAt}
            className="text-sm text-gray-400"
          >
            {formatDate(data.publishedAt)}
          </time>
        </p>
        <h3 className={cn(
          "font-bold mb-4 text-white",
          featured ? "text-3xl" : "text-xl"
        )}>
          {data.title}
        </h3>
        <p className="text-gray-400 line-clamp-3">{data.summary}</p>
        
        {featured && (
          <div className="mt-6 inline-flex items-center text-white hover:text-gray-300">
            Read More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </Link>
  );
}
