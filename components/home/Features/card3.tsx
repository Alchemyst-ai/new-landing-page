import Image from "next/image";
import Link from "next/link";
import Button from "../Button";

export default function Card3() {
  return (
    <div className="bg-gradient-to-r from-black to-[#272727] border border-gray-600 shadow-[0_5px_20px_1px_rgba(255,153,153,0.2)] rounded-3xl overflow-hidden h-full">
      <div className="p-6 md:p-8 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-6 text-white">
            AI-Powered Lead Generation & Personalized Outreach
          </h2>
          <ul className="space-y-4 mb-6 text-gray-400 pl-3">
            <li>
              <p className="font-semibold text-white text-xl text-md">
                Find the Best B2B Sales Leads Instantly:
              </p>
              <p className="text-lg">
                Leverage Alchemyst&apos;s AI for lead generation and access a
                database of over{" "}
                <span className="text-orange-400">300M+ B2B leads</span> to
                identify perfect prospects faster.
              </p>
            </li>
            <li>
              <p className="font-semibold text-white text-xl">
                Personalized Sales Automation for Higher Engagement:
              </p>
              <p className="text-lg">
                Say goodbye to low-response outreach! Alchemyst.ai uses{" "}
                <span className="text-orange-400">
                  AI-driven sales automation to create tailored campaigns{" "}
                </span>that boost engagement and conversions.
              </p>
            </li>
          </ul>
          <Link
            href={"https://tripetto.app/run/60HWNW0WQN"}
            target="_blank noopen"
          >
            <Button
              variant="primary"
              className="w-full md:w-auto px-6 py-2 text-sm md:text-base"
            >
              Explore All Features
            </Button>
          </Link>
        </div>
        <div className="relative">
          <Image
            src="/media/ledgenandpersonal.png"
            alt="AI-Powered Lead Generation"
            width={500}
            height={300}
            className="w-[86%] h-full mx-auto my-auto object-cover rounded-lg"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}

