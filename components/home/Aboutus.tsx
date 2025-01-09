import Link from "next/link";
import Image from "next/image";

const AboutUs: React.FC = () => {
  return (
    <div className="w-full mx-auto p-6">
      <div className="relative overflow-hidden rounded-lg shadow-xl bg-gradient-to-b from-black via-black to-gray-900 border border-gray-700 transition duration-500 ease-in-out hover:scale-95">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/aboutcircle.svg"
            alt="Abstract background image"
            layout="fill"
            objectFit="cover"
            quality={80}
            priority
          />
        </div>
        <div className="relative z-10 p-8 text-center text-gray-400">
          <h2 className="text-3xl font-bold mt-8 mb-4">
            Meet the Team Driving AI Innovation in Sales
          </h2>
          <h3 className="text-xl font-semibold mt-4 mb-4">
            Driving sales innovation with AI
          </h3>
          <p className="text-sm max-w-md mx-auto mt-8">
            Join the revolution in AI-powered B2B sales automation with
            Alchemyst.ai - where technology meets results-driven innovation.
          </p>
          <Link href="/about-us">
            <button className="inline-block px-10 py-2 mt-8 text-black font-semibold text-center rounded-full bg-[#fe9833] transition-all duration-200 ease-in-out hover:scale-110">
              Connect Now!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

