"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import Button from "../Button";
import DropdownMenu from "./DropdownMenu";
import { menuData, MenuObject } from "../../types/menu";
import { FaGithub } from "react-icons/fa";
import GitHubButtonWithStars from "./GithubButtonWithStars";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
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

  const renderMobileMenuItem = (item: MenuObject, depth: number = 0) => {
    const isSubmenuOpen = openSubmenus.includes(item.title);

    return (
      <div key={item.title} className={`w-full ${depth > 0 ? "ml-4" : ""}`}>
        <div className="flex items-center justify-between w-full">
          <Link
            href={item.link ? `/agents${item.link}` : "#"}
            className={`flex items-center py-2 text-white hover:text-orange-00 transition-colors duration-200 ${item.style
              ? Object.entries(item.style)
                .map(([k, v]) => `${k}:${v}`)
                .join(";")
              : ""
              }`}
            onClick={toggleMenu}
          >
            {item.icon && (
              <Image
                src={item.icon || "/placeholder.svg"}
                alt={item.title}
                width={24}
                height={24}
                className="mr-3"
              />
            )}
            <span>{item.title}</span>
          </Link>
          {item.children && (
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu(item.title);
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
          {isSubmenuOpen && item.children && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {item.children.map((subItem) =>
                renderMobileMenuItem(subItem, depth + 1)
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
        className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl shadow-lg py-3 px-6 flex justify-between items-center w-full md:w-[80%] max-w-6xl"
      >
        {/* Alchemyst Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="mr-4 -mt-2 -ml-2">
            <Image
              src="/logo/Group 79.png"
              alt="Alchemyst AI"
              width={160}
              height={160}
              className="h-7 w-auto object-contain"
            />
          </Link>

          {/* Nav Items Dropdown */}
          {/* <div className="hidden md:flex items-center space-x-6"> */}
            {/* {menuData.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.title)}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.children ? (
                    <div
                      className={`flex items-center space-x-1 text-white/80 hover:text-white transition-colors duration-200 text-sm cursor-pointer ${activeMenu === item.title ? "text-white" : ""
                        }`}
                    >
                      <span>{item.title}</span>
                      <motion.div
                        animate={{ rotate: activeMenu === item.title ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3 h-3 opacity-60" />
                      </motion.div>
                    </div>
                  ) : (
                    <Link
                      href={"/agents" + (item.link || "")}
                      className={`flex items-center space-x-1 text-white/80 hover:text-white transition-colors duration-200 text-sm ${activeMenu === item.title ? "text-white" : ""
                        }`}
                    >
                      <span>{item.title}</span>
                    </Link>
                  )}
                </motion.div>
              </div>
            ))} */}


          {/* </div> */}

          {/* Centralized Dropdown Menu */}
          <AnimatePresence>
            {activeMenu && (
              <DropdownMenu
                item={menuData.find((item) => item.title === activeMenu)!}
                isOpen={!!activeMenu}
                onClose={() => setActiveMenu(null)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Partner with us button and Book a Demo */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-3">
            {/* Pricing Link */}
            <Link href="/pricing">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm mr-4"
              >
                Pricing
              </motion.div>
            </Link>
            <Link
              href="mailto:getalchemystai@gmail.com?cc=uttaran@getalchemystai.com,anuran@getalchemystai.com"
              target="_blank"
            >
              <Button
                variant="secondary"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0V11.25"
                    />
                  </svg>
                }
                className="text-sm h-8 px-3 border-white/50"
              >
                Get in Touch
              </Button>
            </Link>
            <GitHubButtonWithStars />
            {/* <Link
              href="https://github.com/alchemyst-ai/awesome-saas"
              target="_blank"
            >
              <Button variant="secondaryNoHover" className="bg-transparent py-2 mx-2 text-4xl hover:scale-[1.1] rounded-full"><FaGithub /></Button>
            </Link> */}
          </div>
          <button
            className="md:hidden focus:outline-none p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
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
                {/* <div className="flex space-x-2 w-full mb-6">
                  <Link href="https://tripetto.app/run/60HWNW0WQN" className="flex-1">
                    <Button variant="secondary" className="w-full text-sm py-2 border-white/10">
                      Get in Touch
                    </Button>
                  </Link>
                  <Link
                    href="https://calendly.com/uttaran-getalchemystai/30min"
                    className="flex-1"
                  >
                    <Button variant="primary" className="w-full text-sm py-2">
                      Book a demo
                    </Button>
                  </Link>
                </div> */}
                <motion.div
                  key="mainmenu"
                  initial={{ opacity: 0, x: "-100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "-100%" }}
                  transition={{ duration: 0.3 }}
                  className="w-full space-y-4"
                >
                  {/* {menuData.map((item) => renderMobileMenuItem(item))} */}
                  
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
                  
                  {/* GitHub Link */}
                  {/* <Link
                    href="https://github.com/alchemyst-ai/awesome-saas"
                    target="_blank"
                    className="flex items-center py-3 text-white hover:text-orange-400 transition-colors duration-200 text-lg"
                    onClick={toggleMenu}
                  >
                    <FaGithub className="mr-3 text-xl" />
                    GitHub
                  </Link> */}
                  <GitHubButtonWithStars />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
