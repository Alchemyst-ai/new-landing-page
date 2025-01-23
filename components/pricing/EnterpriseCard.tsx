import { Check } from "lucide-react";
import Link from "next/link";

export default function EnterpriseCard() {
  const features = [
    "All core Maya Features",
    "CRM Integration",
    "Remove Alchemyst Branding",
    "Email warm-up",
    "1-1 White Glove Human",
    "Onboarding",
    "Premium Support",
    "Accounts Manager",
    "For 5+ Person Sales Team",
    "Advanced and Custom Features",
    "Dedicated account manager",
    "Direct Slack Connection",
  ];

  return (
    <div className="mt-20 w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-orange-400 via-orange-400 to-orange-700 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_20px_rgba(255,165,0,0.5)] hover:scale-110 border border-yellow-400">
        <div className="p-8 sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div className=" lg:w-1/3">
            <h3 className="text-6xl md:text-7xl font-bold text-gray-700 mb-8">Enterprise</h3>
            <p className="text-2xl text-gray-700 mb-2">Unlimited Leads</p>
            <p className="text-2xl text-gray-700 mb-16">Unlimited Emails</p>
            <Link
              href="https://calendly.com/uttaran-getalchemystai/30min"
              target="_blank"
            >
              <button className="w-full sm:min-w-80 bg-white text-orange-500 font-semibold py-3 px-4 rounded-xl hover:bg-purple-800 hover:text-white transition-colors duration-300">
                Talk to us
              </button>
            </Link>
          </div>
          <div className="mt-8 lg:mt-0 lg:w-2/3 lg:flex">
            <ul className="space-y-4 lg:w-1/2 lg:flex-grow">
              {features.slice(0, 8).map((feature, index) => (
                <li key={index} className="flex items-center text-black">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <ul className="mt-8 space-y-4 lg:mt-0 lg:w-1/2 lg:flex-grow">
              {features.slice(8).map((feature, index) => (
                <li key={index} className="flex items-center text-black">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
