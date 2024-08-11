"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./Button";

const navItems: { name: string; link: string }[] = [
  { name: "Product", link: "/product" },
  // { name: "Industries", link: "/industries" },
  { name: "Team", link: "/#team" },
  { name: "Docs", link: "https://docs.getalchemystai.com" },
  { name: "Partner With Us", link: "https://tripetto.app/run/60HWNW0WQN" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="top-0 py-2 px-8 flex justify-between items-center w-full md:w-[70%]">
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
        <div className="hidden md:flex items-center space-x-4">
          {navItems.slice(0, -1).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item.link}
                className="hover:text-gray-400 transition-colors duration-200 opacity-80"
              >
                {item.name}
              </Link>
            </motion.div>
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
            <Button variant="primary">Book A Demo</Button>
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
      {mounted && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center pt-20 space-y-4"
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
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.link}
                    className="hover:text-gray-400 transition-colors duration-200 opacity-80 text-xl"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <Link href="/docs" onClick={toggleMenu}>
                <Button variant="primary">Book A Demo</Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </nav>
  );
};

export default Navbar;
