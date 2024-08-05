"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LinkedIn } from "../IconComponent/Linkedin";
import { Twitter } from "../IconComponent/Twitter";
import Button from "./Button";

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex justify-center items-center text-white">
      <div className="py-6 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center md:w-2/3">
        <motion.div
          className="flex flex-col items-start mb-4 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            width={200}
            height={200}
            src="/logo/alchemyst_long_dark.svg"
            alt="Alchemyst AI logo"
            className="h-16"
          />
          <p className="text-sm text-gray-400 mt-4">
            © {new Date().getFullYear()} XAlchemyst Lab Pvt. Ltd. All rights reserved.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="primary" className="w-full md:w-fit text-nowrap">
                Get in touch
              </Button>
            </motion.div>
            <Link href="/docs" className="mt-8 md:mt-auto w-full">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="w-full md:w-auto"
                  variant="secondary"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  }
                >
                  <span>Book A Demo</span>
                </Button>
              </motion.div>
            </Link>
          </div>

          <motion.div
            className="flex items-center justify-center md:justify-normal space-x-5 mt-8 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="#" aria-label="Twitter" className="h-6 w-6">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Twitter />
              </motion.div>
            </Link>
            <Link href="#" aria-label="LinkedIn" className="h-6 w-6">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <LinkedIn />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
