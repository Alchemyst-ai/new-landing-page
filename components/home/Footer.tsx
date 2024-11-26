"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LinkedIn } from "../IconComponent/Linkedin";
import { Twitter } from "../IconComponent/Twitter";
import Button from "./Button";

const Footer: React.FC = () => {

  return (
    <footer className="w-full flex justify-center items-center text-white border-t-[1px] border-t-[#1f1e1d] sm:border-none">
      <div className="py-6 px-4 md:px-8 flex flex-col gap-4 md:flex-row justify-between items-center md:w-2/3">
        <motion.div
          className="flex flex-col items-start mb-4 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center w-full sm:justify-start">
            <Image
              width={200}
              height={200}
              src="/logo/alchemyst_long_dark.svg"
              alt="Alchemyst AI logo"
              className="h-16"
            />
          </div>
          <p className="text-sm text-gray-400 mt-4 text-center sm:text-left">
            © {new Date().getFullYear()} XAlchemyst Technologies Pvt. Ltd. All
            rights reserved.
          </p>
          <div className="flex justify-center items-center gap-4 pt-4 text-gray-400 hover:text">
            {/* <Link href='../../public/doc/termsofuse.pdf' target="_blank" locale={false}>Terms of use</Link>
            <Link href='/privacy-policy' target="_blank" locale={false}>Privacy Policy</Link> */}
            {/* <p onClick={() => {
              window.open('/doc/termsofuse.pdf','_blank')
            }}>Terms of Use</p> */}
            <p onClick={() => {
                          window.open('/doc/termsofuse.pdf','_blank')
                        }} className="relative inline-block group">
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#3b3a3a] transition-all duration-300 group-hover:w-full"></span>
              Terms of Use
            </p>
            <p onClick={() => {
              window.open('/doc/privacypolicy.pdf','_blank')
            }} className="relative inline-block group">
              <span className="absolute left-0 bottom-0 w-0 h-[0.5px] bg-[#3b3a3a] transition-all duration-300 group-hover:w-full"></span>
              Privacy Policy
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-8  w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4 ">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={"https://tripetto.app/run/60HWNW0WQN"}
                target="_blank noopen"
              >
                <Button
                  variant="primary"
                  className="w-full md:w-fit text-nowrap"
                >
                  Get in touch
                </Button>
              </Link>
            </motion.div>
            <Link
              href="https://calendly.com/uttaran-getalchemystai/30min"
              className="mt-8 md:mt-auto w-full"
              target="_blank noopener noreferrer"
            >
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
                  <span>Book a demo</span>
                </Button>
              </motion.div>
            </Link>
          </div>

          <motion.div
            className="flex items-center justify-center md:justify-normal space-x-5 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="https://twitter.com/getalchemyst"
              target="_blank noopener"
              aria-label="Twitter"
              className="h-6 w-6"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Twitter />
              </motion.div>
            </Link>
            <Link
              href="https://www.linkedin.com/company/alchemystai/"
              aria-label="LinkedIn"
              className="h-6 w-6"
            >
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
