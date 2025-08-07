import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface BlogHeaderProps {
  title: string;
  category?: string;
  subcategory?: string;
  publishedAt: string;
  author: {
    name: string;
    image: string;
  };
  reviewer?: {
    name: string;
    image: string;
  };
  featuredImage?: string;
  readTime?: number;
}

export default function BlogHeader({
  title,
  category = "Trading",
  subcategory = "Market Analysis",
  publishedAt,
  author,
  reviewer,
  featuredImage,
  readTime = 5
}: BlogHeaderProps) {
  return (
    <div className="w-full bg-background">
      <div className="w-full lg:w-[800px] px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
          {title}
        </h1>

        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Bravos
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href={`/category/${category.toLowerCase()}`} className="hover:text-foreground transition-colors">
            {category}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-foreground">{subcategory}</span>
        </nav>

        {/* Featured Image */}
        {featuredImage && (
          <div className="w-full rounded-xl overflow-hidden mb-8 bg-muted">
            <Image
              src={featuredImage}
              alt={title}
              width={800}
              height={420}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {/* Author Info Row */}
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
          {/* Written by */}
          <div className="flex items-center gap-2">
            <Image
              src={author.image}
              alt={author.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span>Written by <span className="text-foreground font-medium">{author.name}</span></span>
          </div>

          {/* Reviewed by */}
          {reviewer && (
            <div className="flex items-center gap-2">
              <Image
                src={reviewer.image}
                alt={reviewer.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span>Reviewed by <span className="text-foreground font-medium">{reviewer.name}</span></span>
            </div>
          )}
          
          {/* Read time */}
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{readTime} min read</span>
          </div>
          
          {/* Update date */}
          <div>
            Updated on {formatDate(publishedAt)}
          </div>
        </div>
      </div>
    </div>
  );
} 