import Navbar from "@/components/home/Navbar";
import Image from "next/image";

export default function WaitlistPage() {
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

          {/* Text content */}
          <div className="text-center -mt-4">
            <h2 className="text-white text-3xl md:text-5xl font-helvetica mb-4">
              Step into the Top 1% Club of AI Users.
            </h2>
            <h3 className="text-4xl md:text-6xl font- font-bold mb-8 bg-gradient-to-r from-[#FF6A00] to-[#FF9A35] bg-clip-text text-transparent">
              Join the Waitlist Now!
            </h3>
          </div>

          {/* Form */}
          <form className="w-full max-w-md space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-[#FF9A35] focus:outline-none"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-[#FF9A35] focus:outline-none"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="One Pain Point you want alchemyst to solve"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-[#FF9A35] focus:outline-none resize-none h-24"
                required
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
    </div>
  );
}
