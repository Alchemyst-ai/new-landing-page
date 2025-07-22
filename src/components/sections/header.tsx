"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import GitHubButtonWithStars from "./Navbar/GithubButtonWithStars";


// Temporary type definition
interface MenuObject {
  title: string;
  link?: string;
  icon?: string;
  style?: Record<string, string>;
  children?: MenuObject[];
}

export function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const [showUseCasesDropdown, setShowUseCasesDropdown] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
      if (useCasesRef.current && !useCasesRef.current.contains(event.target as Node)) {
        setShowUseCasesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setOpenSubmenus([]);
  };

  const handleMouseEnter = (title: string) => {
    setActiveMenu(title);
  };

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const useCasesItems = [
    { title: "Finance", href: "/use-cases/finance" },
    { title: "Customer Support", href: "/use-cases/customer-support" },
    { title: "EdTech", href: "/use-cases/edtech" },
    { title: "Healthcare", href: "/use-cases/healthcare" }
  ];

  const renderMobileMenuItem = (subItem: MenuObject, depth: number = 0) => {
    const isSubmenuOpen = openSubmenus.includes(subItem.title);

    return (
      <div key={subItem.title} className={`w-full ${depth > 0 ? "ml-4" : ""}`}>
        <div className="flex items-center justify-between w-full">
          <Link
            href={subItem.link ? `/agents${subItem.link}` : "#"}
            className={`flex items-center py-2 text-white hover:text-orange-00 transition-colors duration-200 ${subItem.style
              ? Object.entries(subItem.style)
                .map(([k, v]) => `${k}:${v}`)
                .join(";")
              : ""
              }`}
            onClick={toggleMenu}
          >
            {subItem.icon && (
              <Image
                src={subItem.icon || "/placeholder.svg"}
                alt={subItem.title}
                width={24}
                height={24}
                className="mr-3"
              />
            )}
            <span>{subItem.title}</span>
          </Link>
          {subItem.children && (
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu(subItem.title);
              }}
              className="p-2"
            >
              {isSubmenuOpen ? (
                <ChevronUp className="w-4 h-4 text-white" />
              ) : (
                <ChevronDown className="w-4 h-4 text-white" />
              )}
            </button>
          )}
        </div>
        <AnimatePresence>
          {isSubmenuOpen && subItem.children && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {subItem.children.map((childItem) =>
                renderMobileMenuItem(childItem, depth + 1)
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center">
      <nav
        ref={navRef}
        className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl flex justify-between items-center w-[90%] px-6 py-4"
      >
        {/* Alchemyst Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="mr-4 -mt-2 -ml-2">
            <Image
              src="/logo.png"
              alt="Alchemyst AI"
              width={200}
              height={200}
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Centered Navigation Sections */}
        <div className="flex items-center space-x-6">
          {/* Use Cases Dropdown */}
          <div 
            ref={useCasesRef}
            className="relative"
            onMouseEnter={() => setShowUseCasesDropdown(true)}
            onMouseLeave={() => setShowUseCasesDropdown(false)}
          >
            <button className="relative text-white/80 hover:text-white transition-colors duration-200 text-base group flex items-center">
              <span className="relative pb-1">
                Use Cases
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
              <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-200" style={{
                transform: showUseCasesDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
              }} />
            </button>

            <AnimatePresence>
              {showUseCasesDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-80 bg-black/90 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="p-4 space-y-3">
                    {useCasesItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
                      >
                        <div className="flex-1">
                          <h3 className="text-white font-medium group-hover:text-orange-400 transition-colors duration-200">
                            {item.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            href="/research" 
            className="relative text-white/80 hover:text-white transition-colors duration-200 text-base group"
          >
            <span className="relative pb-1">
              Research
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          <Link 
            href="/security" 
            className="relative text-white/80 hover:text-white transition-colors duration-200 text-base group"
          >
            <span className="relative pb-1">
              Security
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          <Link 
            href="/pricing" 
            className="relative text-white/80 hover:text-white transition-colors duration-200 text-base group"
          >
            <span className="relative pb-1">
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          {/* <Link 
            href="#" 
            className="relative text-white/80 hover:text-white transition-colors duration-200 text-base group"
          >
            <span className="relative pb-1">
              Docs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link> */}
        </div>

        {/* Partner with us button and Book a Demo */}
        <div className="flex items-center space-x-3">
          {/* <TwitterButtonWithFollowers /> */}
          <GitHubButtonWithStars />
        </div>

        {/* Mobile Menu */}
        {mounted && (
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="md:hidden fixed top-[70px] inset-x-4 bg-black/90 backdrop-blur-md border border-white/10 rounded-xl shadow-lg flex flex-col items-start p-6 space-y-4 overflow-y-auto"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Use Cases in Mobile */}
                <div className="w-full">
                  <button
                    onClick={() => toggleSubmenu("Use Cases")}
                    className="flex items-center justify-between w-full py-3 text-white hover:text-orange-400 transition-colors duration-200 text-lg"
                  >
                    Use Cases
                    {openSubmenus.includes("Use Cases") ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openSubmenus.includes("Use Cases") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2 ml-4"
                      >
                        {useCasesItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="block py-2 text-white/80 hover:text-white transition-colors duration-200"
                            onClick={toggleMenu}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Pricing Link */}
                <Link
                  href="/pricing"
                  className="block py-3 text-white hover:text-orange-400 transition-colors duration-200 text-lg"
                  onClick={toggleMenu}
                >
                  Pricing
                </Link>
                
                {/* Get in Touch */}
                <Link
                  href="mailto:getalchemystai@gmail.com?cc=uttaran@getalchemystai.com,anuran@getalchemystai.com"
                  className="block py-3 text-white hover:text-orange-400 transition-colors duration-200 text-lg"
                  onClick={toggleMenu}
                >
                  Get in Touch
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
    </div>
  );
}
