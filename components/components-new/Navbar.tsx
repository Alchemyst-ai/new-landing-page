"use client";

import { useState } from 'react';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

// Feature dropdown content
const FeaturesDropdown = () => (
  <div className="grid grid-cols-2 gap-4 p-4 min-w-[500px]">
    <div className="space-y-4">
      <div className="flex items-start space-x-3 rounded-lg p-2 hover:bg-white/5 transition-colors cursor-pointer">
        <div className="bg-white/10 p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </div>
        <div>
          <h3 className="font-medium text-white">Call Transfer</h3>
          <p className="text-sm text-gray-400">Warm transfer with handoff message</p>
        </div>
      </div>
      <div className="flex items-start space-x-3 rounded-lg p-2 hover:bg-white/5 transition-colors cursor-pointer">
        <div className="bg-white/10 p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        </div>
        <div>
          <h3 className="font-medium text-white">Book Appointments</h3>
          <p className="text-sm text-gray-400">Native integration with Cal.com</p>
        </div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="flex items-start space-x-3 rounded-lg p-2 hover:bg-white/5 transition-colors cursor-pointer">
        <div className="bg-white/10 p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3v18m0 0h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H9"></path><path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4"></path></svg>
        </div>
        <div>
          <h3 className="font-medium text-white">Knowledge Base</h3>
          <p className="text-sm text-gray-400">Auto-sync websites or documents</p>
        </div>
      </div>
      <div className="flex items-start space-x-3 rounded-lg p-2 hover:bg-white/5 transition-colors cursor-pointer">
        <div className="bg-white/10 p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
        </div>
        <div>
          <h3 className="font-medium text-white">Navigate IVR</h3>
          <p className="text-sm text-gray-400">Ability to press digits to navigate IVR</p>
        </div>
      </div>
    </div>
  </div>
);

// Solutions dropdown content
const SolutionsDropdown = () => (
  <div className="grid grid-cols-2 gap-4 p-4 min-w-[500px]">
    <div className="space-y-4">
      <div className="flex items-start space-x-3 rounded-lg p-2 hover:bg-white/5 transition-colors cursor-pointer">
        <div className="bg-white/10 p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path><path d="M12 13v8"></path><path d="M12 3v3"></path></svg>
        </div>
        <div>
          <h3 className="font-medium text-white">Customer Support</h3>
          <p className="text-sm text-gray-400">Reduce wait times and improve satisfaction</p>
        </div>
      </div>
      <div className="flex items-start space-x-3 rounded-lg p-2 hover:bg-white/5 transition-colors cursor-pointer">
        <div className="bg-white/10 p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
        </div>
        <div>
          <h3 className="font-medium text-white">Sales</h3>
          <p className="text-sm text-gray-400">Qualify leads and book meetings</p>
        </div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="flex items-start space-x-3 rounded-lg p-2 hover:bg-white/5 transition-colors cursor-pointer">
        <div className="bg-white/10 p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
        </div>
        <div>
          <h3 className="font-medium text-white">Education</h3>
          <p className="text-sm text-gray-400">Personalized tutoring and support</p>
        </div>
      </div>
      <div className="flex items-start space-x-3 rounded-lg p-2 hover:bg-white/5 transition-colors cursor-pointer">
        <div className="bg-white/10 p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path><path d="M12 3v6"></path></svg>
        </div>
        <div>
          <h3 className="font-medium text-white">Healthcare</h3>
          <p className="text-sm text-gray-400">Appointment scheduling and patient intake</p>
        </div>
      </div>
    </div>
  </div>
);

// Resources dropdown content
const ResourcesDropdown = () => (
  <div className="grid grid-cols-2 gap-4 p-4 min-w-[500px]">
    <div className="space-y-4">
      <div className="flex items-start space-x-3 rounded-lg p-2 hover:bg-white/5 transition-colors cursor-pointer">
        <div className="bg-white/10 p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
        </div>
        <div>
          <h3 className="font-medium text-white">Blog</h3>
          <p className="text-sm text-gray-400">Latest articles and insights</p>
        </div>
      </div>
      <div className="flex items-start space-x-3 rounded-lg p-2 hover:bg-white/5 transition-colors cursor-pointer">
        <div className="bg-white/10 p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        </div>
        <div>
          <h3 className="font-medium text-white">Case Studies</h3>
          <p className="text-sm text-gray-400">Customer success stories</p>
        </div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="flex items-start space-x-3 rounded-lg p-2 hover:bg-white/5 transition-colors cursor-pointer">
        <div className="bg-white/10 p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="4"></circle>
            <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
            <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
            <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
            <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-white">Support</h3>
          <p className="text-sm text-gray-400">Get help with your integration</p>
        </div>
      </div>
      <div className="flex items-start space-x-3 rounded-lg p-2 hover:bg-white/5 transition-colors cursor-pointer">
        <div className="bg-white/10 p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
        </div>
        <div>
          <h3 className="font-medium text-white">API Documentation</h3>
          <p className="text-sm text-gray-400">Technical guides and references</p>
        </div>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);

  const toggleMobileDropdown = (dropdown: string) => {
    setMobileOpenDropdown(mobileOpenDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-6xl mx-auto">
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl shadow-lg px-4 py-2">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/Group 79.png"
                  alt="Alchemyst AI"
                  width={100}
                  height={28}
                  className="h-7 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-4">
              <div className="flex space-x-6 items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-white/80 hover:text-white flex items-center gap-1 transition-colors text-sm">
                      Features <span className="text-xs opacity-60">▾</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl rounded-xl shadow-lg border border-white/10 p-0 w-auto">
                    <FeaturesDropdown />
                  </PopoverContent>
                </Popover>
                <Link href="/pricing" className="text-white/80 hover:text-white transition-colors text-sm">Pricing</Link>
                <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">Documentation</a>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-white/80 hover:text-white flex items-center gap-1 transition-colors text-sm">
                      Solutions <span className="text-xs opacity-60">▾</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl rounded-xl shadow-lg border border-white/10 p-0 w-auto">
                    <SolutionsDropdown />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-white/80 hover:text-white flex items-center gap-1 transition-colors text-sm">
                      Resources <span className="text-xs opacity-60">▾</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl rounded-xl shadow-lg border border-white/10 p-0 w-auto">
                    <ResourcesDropdown />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Login/Contact Buttons */}
            {/* <div className="hidden md:flex items-center">
              <Button variant="outline" className="text-white/80 border-white/50 hover:text-white mr-2 transition-colors text-sm h-8 px-3">
                Book a Demo
              </Button>
              <Button className="bg-gradient-to-br from-gray-200 to-white text-black hover:opacity-90 rounded-full transition-opacity text-sm h-8 px-4">
                Get Started
              </Button>
            </div> */}

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-4 top-[60px] bg-black/30 backdrop-blur-md border border-white/10 rounded-xl shadow-lg transition-all duration-300 ease-in-out",
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="px-4 py-6 space-y-4">
          <div className="border-b border-white/10 pb-3">
            <button
              onClick={() => toggleMobileDropdown('features')}
              className="flex items-center justify-between w-full text-white py-1"
            >
              <span>Features</span>
              {mobileOpenDropdown === 'features' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {mobileOpenDropdown === 'features' && (
              <div className="mt-2 ml-4 space-y-2">
                <a href="#" className="block py-1 text-white/70 hover:text-white">Call Transfer</a>
                <a href="#" className="block py-1 text-white/70 hover:text-white">Book Appointments</a>
                <a href="#" className="block py-1 text-white/70 hover:text-white">Knowledge Base</a>
                <a href="#" className="block py-1 text-white/70 hover:text-white">Navigate IVR</a>
              </div>
            )}
          </div>

          <div className="border-b border-white/10 pb-3">
            <Link
              href="/pricing"
              className="text-white/80 hover:text-white transition-colors text-lg"
              onClick={() => setMobileOpenDropdown(null)}
            >
              Pricing
            </Link>
          </div>

          <div className="border-b border-white/10 pb-3">
            <a href="#" className="block py-1 text-white">Documentation</a>
          </div>

          <div className="border-b border-white/10 pb-3">
            <button
              onClick={() => toggleMobileDropdown('solutions')}
              className="flex items-center justify-between w-full text-white py-1"
            >
              <span>Solutions</span>
              {mobileOpenDropdown === 'solutions' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {mobileOpenDropdown === 'solutions' && (
              <div className="mt-2 ml-4 space-y-2">
                <a href="#" className="block py-1 text-white/70 hover:text-white">Customer Support</a>
                <a href="#" className="block py-1 text-white/70 hover:text-white">Sales</a>
                <a href="#" className="block py-1 text-white/70 hover:text-white">Education</a>
                <a href="#" className="block py-1 text-white/70 hover:text-white">Healthcare</a>
              </div>
            )}
          </div>

          <div className="border-b border-white/10 pb-3">
            <button
              onClick={() => toggleMobileDropdown('resources')}
              className="flex items-center justify-between w-full text-white py-1"
            >
              <span>Resources</span>
              {mobileOpenDropdown === 'resources' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {mobileOpenDropdown === 'resources' && (
              <div className="mt-2 ml-4 space-y-2">
                <a href="#" className="block py-1 text-white/70 hover:text-white">Blog</a>
                <a href="#" className="block py-1 text-white/70 hover:text-white">Case Studies</a>
                <a href="#" className="block py-1 text-white/70 hover:text-white">Support</a>
                <a href="#" className="block py-1 text-white/70 hover:text-white">API Documentation</a>
              </div>
            )}
          </div>

          {/* <div className="pt-2 space-y-3">
            <Button variant="outline" className="w-full border-white/10 justify-center">Book a Demo</Button>
            <Button className="w-full justify-center bg-gradient-to-br from-gray-200 to-white text-black">
              Get Started
            </Button>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 