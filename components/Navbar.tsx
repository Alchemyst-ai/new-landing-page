"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Button from "./Button";

const navItems: { name: string; link: string }[] = [
  { name: "Explorer", link: "/explorer" },
  { name: "REPL", link: "/repl" },
  { name: "Docs", link: "/docs" },
  { name: "Talks", link: "/talks" },
  { name: "Blog", link: "/blog" },
  { name: "Careers", link: "/careers" },
  { name: "Partner With Us", link: "/partner" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="py-2 px-8 flex justify-between items-center w-full md:w-[70%]">
      <div className="flex items-center space-x-4">
        <Link href="/" className="mr-4 -ml-4">
          <Image
            src="/logo/alchemyst.webp"
            alt="Alchemyst AI"
            width={200}
            height={200}
          />
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {navItems.slice(0, -1).map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="hover:text-gray-400 transition-colors duration-200 opacity-80"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-4">
          <Link href={navItems[navItems.length - 1].link}>
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
              {navItems[navItems.length - 1].name}
            </Button>
          </Link>
          <Link href="/docs">
            <Button variant="primary">Developer Docs</Button>
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
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center pt-20 space-y-4">
          <button
            className="absolute top-4 right-4 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Close menu"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="hover:text-gray-400 transition-colors duration-200 opacity-80 text-xl"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/docs" onClick={toggleMenu}>
            <Button variant="primary">Developer Docs</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;