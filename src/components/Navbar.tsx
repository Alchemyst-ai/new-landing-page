// Navbar - glassmorphism design with centered layout and backdrop blur
"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Primary navigation links
  const NAV_LINKS = [
    { label: "Case Studies", href: "/case-study" },
    { label: "Security", href: "/security" },
    { label: "Blog", href: "/blog" },
    { label: "Docs", href: "https://docs.getalchemystai.com", external: true },
    { label: "Pricing", href: "/pricing" },
  ];

  const toggleMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center">
      <nav className="bg-card/30 backdrop-blur-md border border-border rounded-xl flex justify-between items-center w-[70%] px-6 py-2">
        {/* Alchemyst Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Alchemyst AI"
            width={160}
            height={160}
            className="h-7 w-auto object-contain"
          />
        </Link>

        {/* Centered Navigation Sections */}
        <div className="hidden md:flex items-center space-x-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="relative text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm group"
            >
              <span className="relative pb-1">
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          ))}
        </div>

        {/* Sign In button */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/platform/signin"
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex items-center justify-center p-1 text-white"
              >
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-l border-white/10 bg-[rgba(10,15,30,0.99)] p-0 text-slate-200 backdrop-blur-xl"
            >
              <SheetHeader className="border-b border-white/10 px-6 py-4">
                <SheetTitle className="text-left">
                  <Image
                    src="/logo.png"
                    alt="Alchemyst AI"
                    width={140}
                    height={20}
                    style={{ height: "20px", width: "auto" }}
                  />
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col overflow-y-auto px-6 pb-8">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="border-b border-white/5 py-3 text-base font-medium text-slate-300 no-underline transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}

                <div className="mt-4 flex flex-col gap-2.5">
                  <SheetClose asChild>
                    <Link
                      href="/platform/signin"
                      className="block py-3 px-4 text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200 text-lg font-medium text-center"
                    >
                      Sign In
                    </Link>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}