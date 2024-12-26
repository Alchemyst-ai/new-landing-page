"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LinkedIn } from "../IconComponent/Linkedin";
import { Twitter } from "../IconComponent/Twitter";
import Button from "./Button";
import { Facebook, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full flex justify-center items-start text-white border-t-[1px] border-t-[#1f1e1d] sm:border-none bg-black mt-16">
      <div className="py-6 px-4 md:px-8 flex flex-col md:flex-row gap-8 justify-between items-start w-full">
        {/* Column 1 - Always visible */}
        <div className="w-full md:w-1/6 mb-8 md:mb-0 flex items-center justify-center md:justify-start">
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              width={200}
              height={50}
              src="/logo/alchemyst_long_dark.svg"
              alt="Alchemyst AI logo"
              className="h-16 w-auto"
            />
            <p className="text-sm text-gray-400 mt-4 text-center md:text-left">
              © {currentYear} XAlchemyst Technologies Pvt. Ltd. All rights
              reserved.
            </p>
            <div className="flex flex-col items-center md:items-start gap-2 pt-4 text-gray-400">
              <Link
                href="/terms-of-use"
                className="hover:text-white transition-colors"
              >
                Terms of use
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="flex flex-col gap-4 mt-4 w-full items-center md:items-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="https://tripetto.app/run/60HWNW0WQN"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" className="w-full text-nowrap">
                    Get in touch
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="https://calendly.com/uttaran-getalchemystai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="w-full"
                    variant="secondary"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    }
                  >
                    <span>Book a demo</span>
                  </Button>
                </Link>
              </motion.div>
            </div>
            <motion.div
              className="flex items-center space-x-5 mt-4 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="https://twitter.com/getalchemyst"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="h-6 w-6"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter />
                </motion.div>
              </Link>
              <Link
                href="https://www.linkedin.com/company/alchemystai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-6 w-6"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <LinkedIn />
                </motion.div>
              </Link>
              <Link
                href="https://www.facebook.com/getalchemyst"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-6 w-6"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook />
                </motion.div>
              </Link>
              <Link
                href="https://instagram.com/getalchemyst"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-6 w-6"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Columns 2-6 - Hidden on mobile */}
        <div className="hidden md:flex w-5/6 justify-between gap-8">
          {/* Column 2 - Product */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-2">Product</h3>
            {[
              "Maya, Sales Platform",
              "Maya, The AI Sales Employee",
              "Sales Automation",
              "B2B Data",
              "Deliverability",
              "Security and Compliance",
            ].map((item, index) => (
              <Link
                key={index}
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Column 3 - Solutions */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-2">Solutions</h3>
            {["Startups", "Midmarket", "Enterprises", "SMEs and MSMEs"].map(
              (item, index) => (
                <Link
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              )
            )}
          </div>

          {/* Column 4 - Resources */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-2">Resources</h3>
            {[
              "About Us",
              "Careers",
              "Alchemyst Labs",
              "Demo",
              "Support",
              "FAQs",
              "Case Study",
              "ChangeLog",
            ].map((item, index) => (
              <Link
                key={index}
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Column 5 - Pricing */}
          <div className="flex flex-col gap-2">
            <Link
              href="/pricing"
              className="font-bold text-lg hover:text-gray-300 transition-colors"
            >
              Pricing
            </Link>
          </div>

          {/* Column 6 - Contact */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-2">Contact</h3>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <span className="text-gray-400">(033)12345678</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <span className="text-gray-400">
                gethelpalchemustai@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span className="text-gray-400">
                123 1st lane, 2nd road, 3rd city, 4th state, india-998877
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
