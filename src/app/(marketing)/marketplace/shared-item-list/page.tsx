"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Search,
  Key,
  Check,
  Sparkles,
  Loader2,
  Quote,
  RefreshCcw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import type { SharedItem } from "@/lib/supabase";

export type SharedItem = {
  id: string;
  title: string;
  description: string | null;
  content_type: 'document' | 'website' | 'slides' | 'video' | 'image' | 'audio' | 'data';
  thumbnail_url: string | null;
  preview_url: string | null;
  magic_key: string;
  author_name: string;
  author_avatar: string | null;
  views_count: number;
  likes_count: number;
  tags: string[] | null;
  metadata: Record<string, unknown>;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};

const CATEGORIES = [
  { id: "recommend", label: "Recommend", icon: <RefreshCcw className="h-4 w-4" /> },
  { id: "featured", label: "Featured", icon: <Sparkles className="h-4 w-4" /> },
  { id: "life", label: "Life" },
  { id: "research", label: "Research" },
  { id: "edu", label: "Edu" },
  { id: "data", label: "Data Analysis" },
  { id: "productivity", label: "Productivity" },
  { id: "creator", label: "Content Creator" },
  { id: "programming", label: "Programming" },
];

export function SharedItemList() {
  const [items, setItems] = React.useState<SharedItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState("featured");
  const [search, setSearch] = React.useState("");
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const [hasMore, setHasMore] = React.useState(true);
  const [offset, setOffset] = React.useState(0);

  const ITEMS_PER_PAGE = 12;

  const { ref, inView } = useInView({
    threshold: 0,
    skip: !hasMore || loadingMore,
  });

  const fetchItems = React.useCallback(async (currentOffset: number, isInitial: boolean = false) => {
    if (isInitial) setLoading(true);
    else setLoadingMore(true);

    try {
      const params = new URLSearchParams({
        limit: ITEMS_PER_PAGE.toString(),
        offset: currentOffset.toString(),
      });
      
      // Map category to type or search if needed
      if (activeCategory !== "recommend" && activeCategory !== "featured") {
        params.set("search", activeCategory);
      }
      if (search) params.set("search", search);

      const res = await fetch(`/api/items?${params}`);
      const data = await res.json();
      
      if (Array.isArray(data)) {
        if (isInitial) {
          setItems(data);
        } else {
          setItems((prev) => [...prev, ...data]);
        }
        setHasMore(data.length === ITEMS_PER_PAGE);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [activeCategory, search]);

  React.useEffect(() => {
    setOffset(0);
    fetchItems(0, true);
  }, [activeCategory, search, fetchItems]);

  React.useEffect(() => {
    if (inView && hasMore && !loadingMore && items.length > 0) {
      const nextOffset = offset + ITEMS_PER_PAGE;
      setOffset(nextOffset);
      fetchItems(nextOffset);
    }
  }, [inView, hasMore, loadingMore, offset, fetchItems, items.length]);

  const copyMagicKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Category Filter Bar */}
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-foreground/[0.03] rounded-full border border-border overflow-x-auto max-w-full no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                activeCategory === cat.id
                  ? "bg-foreground text-background shadow-lg"
                  : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
              )}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
          <Input
            placeholder="Search all tasks and websites..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-full bg-foreground/[0.02] border-border text-sm placeholder:text-foreground/30 focus:ring-primary/20"
          />
        </div>
        
        <p className="text-xs text-foreground/40 text-center max-w-2xl leading-relaxed">
          All tasks and websites shown in the community are voluntarily shared by users. 
          The platform does not display any content without user consent.
        </p>
      </div>

      {loading && items.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-[4/5] rounded-2xl bg-foreground/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Card className="group flex flex-col h-full overflow-hidden rounded-2xl border-none bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-all duration-300">
                  {/* Top Content Area */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-background">
                    {item.thumbnail_url ? (
                      <Image
                        src={item.thumbnail_url}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 p-6 flex flex-col gap-3">
                        <Quote className="h-6 w-6 text-foreground/10" />
                        <p className="text-sm text-foreground/70 leading-relaxed line-clamp-5">
                          {item.description}
                        </p>
                      </div>
                    )}
                    
                    {/* Hover Overlay for Magic Key */}
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => copyMagicKey(item.magic_key)}
                        className="rounded-full bg-background border-border shadow-sm text-xs h-9 px-4"
                      >
                        {copiedKey === item.magic_key ? (
                          <><Check className="h-3 w-3 mr-2 text-emerald-500" /> Copied!</>
                        ) : (
                          <><Key className="h-3 w-3 mr-2" /> {item.magic_key}</>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Bottom Meta Area */}
                  <div className="p-4 flex flex-col gap-1.5">
                    <h3 className="text-[15px] font-medium text-foreground line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-foreground/40">
                        {item.author_name.split(" ").map(n => n[0]).join(". ")}.
                      </p>
                      {item.is_featured && (
                        <Sparkles className="h-3 w-3 text-primary/40" />
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {hasMore && (
        <div ref={ref} className="flex justify-center py-12">
          {loadingMore && (
            <Loader2 className="h-6 w-6 animate-spin text-foreground/20" />
          )}
        </div>
      )}
      
      <div className="flex justify-center pt-20 border-t border-border">
        <a 
          href="https://getalchemystai.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-30 hover:opacity-100"
        >
          <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/60">Powered by</span>
          <span className="font-bold text-base text-foreground">Alchemyst AI</span>
        </a>
      </div>
    </div>
  );
}