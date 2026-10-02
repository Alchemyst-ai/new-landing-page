"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  CreditCard,
  Home,
  Layers,
  MessageCircle,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

const SearchQueryHandling = dynamic(
  () =>
    import("./SearchQueryHandling").then(
      (module) => module.SearchQueryHandling,
    ),
  {
    loading: () => (
      <div role="status" className="flex flex-col gap-2 p-4">
        <span className="text-sm text-muted-foreground">
          Preparing your question…
        </span>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    ),
  },
);

const pages = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    keywords: ["context layer", "alchemyst"],
  },
  {
    label: "Developers",
    href: "/developers",
    icon: Code2,
    keywords: ["api", "sdk", "integration", "business knowledge"],
  },
  {
    label: "Documentation",
    href: "/docs",
    icon: BookOpen,
    keywords: ["docs", "quickstart", "reference"],
  },
  {
    label: "Pricing",
    href: "/pricing",
    icon: CreditCard,
    keywords: ["plans", "cost", "free", "enterprise"],
  },
  {
    label: "Use cases",
    href: "/use-cases",
    icon: Layers,
    keywords: ["agents", "support", "examples"],
  },
  {
    label: "Security",
    href: "/security",
    icon: ShieldCheck,
    keywords: ["privacy", "compliance"],
  },
  {
    label: "Blog",
    href: "/blog",
    icon: BookOpen,
    keywords: ["articles", "guides", "memory"],
  },
  {
    label: "Contact",
    href: "/contact",
    icon: MessageCircle,
    keywords: ["demo", "talk", "sales"],
  },
];

export function CustomCommandK() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [query] = useDebounce(value.trim(), 500);
  const [question, setQuestion] = useState<string | null>(null);
  const [shortcut, setShortcut] = useState("Ctrl K");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const terms = value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const visiblePages = pages.filter((page) =>
    terms.every((term) =>
      `${page.label} ${page.keywords.join(" ")}`.toLowerCase().includes(term),
    ),
  );

  useEffect(() => {
    setShortcut(/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘ K" : "Ctrl K");
    const handleKey = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k" &&
        !event.altKey &&
        !event.isComposing
      ) {
        event.preventDefault();
        if (!event.repeat) setOpen((current) => !current);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    setOpen(false);
    setValue("");
    setQuestion(null);
  }, [pathname]);

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 -translate-x-1/2 min-w-[30vw]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="light"
            size="brand"
            aria-label="Search pages or ask Alchemyst"
            aria-keyshortcuts="Meta+K Control+K"
          >
            <Search data-icon="mx-4 inline-start" />
            <span>Search or Ask &ldquo;How can Alchemyst help me with my HR mandates?&rdquo;</span>
            <kbd className="ml-4 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
              {shortcut}
            </kbd>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="center"
          sideOffset={12}
          avoidCollisions={false}
          className="w-[min(36rem,calc(100vw-2rem))] gap-0 overflow-hidden p-0"
          aria-label="Search pages or ask Alchemyst"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            inputRef.current?.focus();
          }}
          data-lenis-prevent
        >
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2">
            <h2 className="text-sm font-medium">Explore Alchemyst</h2>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Close search"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
          </div>
          <Command
            loop
            shouldFilter={false}
            label="Search Alchemyst"
            className="h-auto"
          >
            <CommandInput
              ref={inputRef}
              placeholder="Find a page or ask a question…"
              value={value}
              maxLength={2000}
              onValueChange={(next) => {
                setValue(next);
                setQuestion(null);
              }}
            />
            <CommandList className="max-h-[min(26rem,calc(100dvh-12rem))] overscroll-contain">
              {question === query ? (
                <SearchQueryHandling key={query} query={query} />
              ) : (
                <>
                  {visiblePages.length === 0 && (
                    <CommandEmpty>
                      {value.trim() !== query ? (
                        <p role="status" className="px-4 text-muted-foreground">
                          Waiting for your question…
                        </p>
                      ) : (
                        <SearchQueryHandling key={query} query={query} />
                      )}
                    </CommandEmpty>
                  )}
                  <CommandGroup heading="Quick links">
                    {visiblePages.map(
                      ({ label, href, icon: Icon, keywords }) => (
                        <CommandItem
                          key={href}
                          value={label}
                          keywords={keywords}
                          onSelect={() => {
                            setOpen(false);
                            router.push(href);
                          }}
                        >
                          <Icon />
                          <span>{label}</span>
                          <ArrowUpRight className="ml-auto text-muted-foreground" />
                        </CommandItem>
                      ),
                    )}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
          {query.length >= 5 &&
            value.trim() === query &&
            visiblePages.length > 0 &&
            question !== query && (
              <div className="border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setQuestion(question === query ? null : query)}
                >
                  <MessageCircle data-icon="inline-start" /> Ask about “
                  {query.length > 40 ? query.slice(0, 40) + "…" : query}”
                </Button>
              </div>
            )}
          <div className="flex justify-between gap-4 border-t border-border px-4 py-2 text-xs text-muted-foreground">
            <span>↑ ↓ navigate · Enter select</span>
            <span>Esc close</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default CustomCommandK;
