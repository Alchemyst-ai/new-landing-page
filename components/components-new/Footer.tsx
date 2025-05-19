"use client";

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black pt-16 px-10 pb-8 border-t border-white/10">
      <div className="w-full mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
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
              <li><Link href="#" className="text-gray-400 hover:text-white">Maya, Sales Platform</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Maya, The AI Sales Employee</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Sales Automation</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">B2B Data</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Deliverability</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Security and Compliance</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white">Startups</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Midmarket</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Enterprises</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">SMEs and MSMEs</Link></li>
            </ul>
            <h3 className="text-lg font-semibold mt-6 mb-4">Pricing</h3>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">News Studio</Link></li>
              <li>
                <div className="flex items-center">
                  <Link href="#" className="text-gray-400 hover:text-white">Alchemyst Labs</Link>
                  <span className="ml-2 px-2 py-0.5 bg-gray-700 text-xs rounded-full">Soon</span>
                </div>
              </li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Demo</Link></li>
              <li>
                <div className="flex items-center">
                  <Link href="#" className="text-gray-400 hover:text-white">Support</Link>
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
        </div>
      </div>
    </footer>
  );
};

export default Footer; 