import Link from "next/link";
import Image from "next/image";

const IndiaAI: React.FC = () => {
  return (
    <div className="w-full mx-auto p-6">
      <div className="relative overflow-hidden rounded-lg shadow-xl bg-gradient-to-b from-[#0A0A0A] via-[#0E0E0C] to-[#A05E03] border border-[#FE9833] hover:shadow-[0_0_15px_5px_rgba(254,152,51,0.3)] transition-all duration-500">
        {/* <div className="absolute inset-0 z-0">
          <Image
            src="/media/india-map-outline.svg"
            alt="India map outline"
            layout="fill"
            objectFit="contain"
            quality={90}
            className="opacity-10"
            priority
          />
        </div> */}
        <div className="relative z-10 p-8 text-center text-gray-300">
          <h2 className="text-4xl font-bold mt-8 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FE9833] to-[#FFCC80]">
            Experience the Power of AI in India
          </h2>
          <h3 className="text-xl font-semibold mt-4 mb-4 text-white">
            Alchemyst AI is leading the AI sales revolution in India
          </h3>
          <p className="text-sm max-w-2xl mx-auto mt-8 mb-8">
            Whether you need a{" "}
            <span className="font-semibold text-[#FE9833]">
              WhatsApp AI agent
            </span>
            ,<span className="font-semibold text-[#FE9833]"> AI SDRs</span>, or
            <span className="font-semibold text-[#FE9833]">
              {" "}
              AI-driven automation
            </span>
            , we&apos;ve got you covered. Our solutions help businesses scale
            faster than ever before, with technology tailored for the Indian
            market.
          </p>
          <Link
            href="https://calendly.com/uttaran-getalchemystai/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="inline-block px-10 py-3 mt-4 mb-8 text-black font-semibold text-center rounded-full bg-[#fe9833] transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-[0_0_15px_5px_rgba(254,152,51,0.5)]">
              Get a Free Demo Today
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndiaAI;
