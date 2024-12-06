"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "../Button";
import DropdownMenu from "./DropdownMenu";
import { menuData, MenuObject } from "../../types/menu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
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
  };

  const handleMouseEnter = (title: string) => {
    setActiveMenu(title);
  };

  const handleMouseLeave = () => {
    // Remove this function as we'll handle closing in DropdownMenu
  };

  return (
    <nav
      ref={navRef}
      className="top-0 py-4 px-8 flex justify-between items-center w-full md:w-[70%]"
    >

      {/* Alchemyst Logo */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="mr-4 -ml-4">
          <Image
            src="/logo/alchemyst_long_dark.svg"
            alt="Alchemyst AI"
            width={200}
            height={200}
            className="h-11 w-auto -mt-4"
          />
        </Link>


        {/* Nav Items Dropdown */}
        <div className="hidden md:flex items-center space-x-4">
          {menuData.map((item, index) => (
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
                <Link
                  href={item.link || "#"}
                  className={`flex items-center space-x-1 hover:text-yellow-500 transition-colors duration-200 ${
                    activeMenu === item.title ? "text-yellow-500" : ""
                  }`}
                >
                  <span>{item.title}</span>
                  {item.children && (
                    <motion.div
                      animate={{ rotate: activeMenu === item.title ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  )}
                </Link>
              </motion.div>
            </div>
          ))}

          {/* Pricing Link */}
          <Link href="/pricing">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="hover:text-yellow-500 transition-colors duration-200"
            >
              Pricing
            </motion.div>
          </Link>
        </div>


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
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/partner-with-us">
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
            >
              Partner with us
            </Button>
          </Link>
          <Link href="https://calendly.com/uttaran-getalchemystai/30min">
            <Button variant="primary">Book a demo</Button>
          </Link>
        </div>
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mounted && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-start pt-20 px-8 space-y-4 overflow-y-auto"
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.5 }}
            >
              <button
                className="absolute top-4 right-4 focus:outline-none"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {menuData.map((item, index) => (
                <MobileMenuItem key={index} item={item} />
              ))}
              <Link
                href="https://calendly.com/uttaran-getalchemystai/30min"
                onClick={toggleMenu}
                className="mt-8"
              >
                <Button variant="primary">Book a demo</Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </nav>
  );
};

const MobileMenuItem: React.FC<{ item: MenuObject }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <button
        onClick={item.children ? toggleSubMenu : undefined}
        className="flex items-center justify-between w-full py-2 text-white hover:text-yellow-500 transition-colors duration-200"
      >
        <span>{item.title}</span>
        {item.children && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        )}
      </button>
      {item.children && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="ml-4 mt-2 space-y-2"
            >
              {item.children.map((child, index) => (
                <MobileMenuItem key={index} item={child} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Navbar;
