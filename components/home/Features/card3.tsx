import Image from "next/image";
import Link from "next/link";
import Button from "../Button";

export default function Card3() {
  return (
    <div className="bg-gradient-to-br from-[#9b4d00] via-black to-[#9b4d00] border border-gray-500 shadow-lg shadow-gray-600 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-500 h-full">
      <div className="p-6 md:p-8 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-6 text-white">
            AI-Powered Lead Generation & Personalized Outreach
          </h2>
          <ul className="space-y-4 mb-6 text-gray-400 pl-3">
            <li>
              <p className="font-semibold">
                Find the Best B2B Sales Leads Instantly:
              </p>
              <p>
                Leverage Alchemyst's AI for lead generation and access a
                database of over 300M+ B2B leads to identify perfect prospects
                faster.
              </p>
            </li>
            <li>
              <p className="font-semibold">
                Personalized Sales Automation for Higher Engagement:
              </p>
              <p>
                Say goodbye to low-response outreach! Alchemyst.ai uses
                AI-driven sales automation to create tailored campaigns that
                boost engagement and conversions.
              </p>
            </li>
          </ul>
          <Link
            href={"https://tripetto.app/run/60HWNW0WQN"}
            target="_blank noopen"
          >
            <Button
              variant="primary"
              className="w-full md:w-auto px-6 py-2 text-sm md:text-base mt-8"
            >
              Explore All Features
            </Button>
          </Link>
        </div>
        <div className="mt-6 md:mt-8 hidden md:block">
          <Image
            src="/media/ledgenandpersonal.png"
            alt="AI-Powered Lead Generation"
            width={500}
            height={300}
            className="w-full h-64 md:h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
