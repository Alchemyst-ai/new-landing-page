"use client";

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black pt-16 px-10 pb-8 border-t border-white/10">
      <div className="w-full mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
          <div>
            <div className="flex items-center mb-6">
              <Image
                src="/Group 79.png"
                alt="Alchemyst AI"
                className="h-7 w-auto object-contain"
                width={100}
                height={28}
              />
            </div>
            <p className="text-sm text-gray-400 mb-2">
              © 2025 XAlchemyst Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <Image
                src="/footer/ISO.png"
                alt="ISO Certification"
                width={100}
                height={100}
                className="h-20 w-auto object-contain"
              />
              <Image
                src="/footer/gdpr.webp"
                alt="GDPR Compliant"
                width={100}
                height={100}
                className="h-20 w-auto object-contain"
              />
              <Image
                src="/footer/aicpa.png"
                alt="AICPA Certification"
                width={100}
                height={100}
                className="h-20 w-auto object-contain"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/agents/dashboard?mode=copilot" className="text-gray-400 hover:text-white">Maya, Sales Platform</Link></li>
              <li><Link href="/agents/dashboard?mode=autopilot" className="text-gray-400 hover:text-white">Maya, The AI Sales Employee</Link></li>
              <li><Link href="/agents/products" className="text-gray-400 hover:text-white">Sales Automation</Link></li>
              <li><Link href="/agents/b2b-old" className="text-gray-400 hover:text-white">B2B Data</Link></li>
              <li><Link href="/agents/deliverability" className="text-gray-400 hover:text-white">Deliverability</Link></li>
              <li><Link href="/agents/security&compliance" className="text-gray-400 hover:text-white">Security and Compliance</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><Link href="/agents/solutions/startups" className="text-gray-400 hover:text-white">Startups</Link></li>
              <li><Link href="/agents/solutions/midmarket" className="text-gray-400 hover:text-white">Midmarket</Link></li>
              <li><Link href="/agents/solutions/enterprise" className="text-gray-400 hover:text-white">Enterprises</Link></li>
              <li><Link href="/agents/solutions/sme&msme" className="text-gray-400 hover:text-white">SMEs and MSMEs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {/* <li><Link href="#" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">News Studio</Link></li> */}
              <li>
                <div className="flex items-center">
                  <Link href="#" className="text-gray-400 hover:text-white">Alchemyst Labs</Link>
                  <span className="ml-2 px-2 py-0.5 bg-gray-700 text-xs rounded-full">Soon</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <Link href="#" className="text-gray-400 hover:text-white">ChangeLog</Link>
                  <span className="ml-2 px-2 py-0.5 bg-gray-700 text-xs rounded-full">Soon</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
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
              <span className="text-gray-400">sales@getalchemystai.com</span>
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
              <span className="text-gray-400">Bengaluru, Karnataka, India</span>
            </div>
            <div className="flex items-center space-x-4 mt-6">
              <Link
                href="https://x.com/getalchemyst"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/company/alchemystai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/alchemyst.ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 