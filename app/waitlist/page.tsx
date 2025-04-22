"use client";

import Navbar from "@/components/home/Navbar";
import Image from "next/image";
import { useState } from "react";
import WaitlistModal from "@/components/WaitlistModal";

export default function WaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show the modal after form submission
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 z-40 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
        <Navbar />
        <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
      </header>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center pt-[10vh]">
          {/* Maya Image */}
          <div className="w-full max-w-[800px] relative">
            <Image
              src="/waitlist/waitlist.png"
              alt="Maya"
              width={800}
              height={400}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Text content - increased negative margin to create more overlap */}
          <div className="text-center -mt-28 relative z-10">
            <h2 className="text-white text-xl md:text-5xl font-helvetica mb-4">
              Step into the Top 1% Club of AI Users.
            </h2>
            <h3 className="text-3xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-[#FF6A00] to-[#FF9A35] bg-clip-text text-transparent">
              Join the Waitlist Now!
            </h3>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 relative z-10 bg-black/80 p-6 rounded-lg shadow-lg">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                    fill="#4A4A4A"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Full Name..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#0E0E0C] text-white border border-white/20 focus:border-[#FF9A35] focus:outline-none"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                    fill="#4A4A4A"
                  />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Email Address..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#0E0E0C] text-white border border-white/20 focus:border-[#FF9A35] focus:outline-none"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute top-3 left-3 flex items-center pointer-events-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z"
                    fill="#4A4A4A"
                  />
                </svg>
              </div>
              <textarea
                placeholder="One dire pain point you want us to solve..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#0E0E0C] text-white border border-white/20 focus:border-[#FF9A35] focus:outline-none resize-none h-24"
                required
                value={painPoint}
                onChange={(e) => setPainPoint(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#FF6A00] to-[#FF9A35] hover:opacity-90 transition-opacity"
            >
              Get an Invite
            </button>
          </form>
        </div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        email={email} 
      />
    </div>
  );
}
