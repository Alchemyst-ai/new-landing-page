import { Check } from "lucide-react";

export default function EnterpriseCard() {
  const features = [
    "Custom AI model training",
    "Dedicated account manager",
    "Onsite training and support",
    "Advanced analytics and reporting",
    "Unlimited API access",
    "Custom integrations",
    "24/7 priority support",
    "Customizable dashboards",
    "Multi-user collaboration",
    "Bulk data processing",
    "Advanced security features",
    "Compliance assistance",
  ];

  return (
    <div className="mt-20 w-full px-4 sm:px-6 lg:px-8">
      <div className="bg-orange-500 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_20px_rgba(255,165,0,0.5)] hover:scale-110 border border-yellow-400">
        <div className="p-8 sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/3">
            <h3 className="text-7xl font-bold text-black mb-8">Enterprise</h3>
            <p className="text-2xl text-gray-800 mb-2">Unlimited Leads</p>
            <p className="text-2xl text-gray-800 mb-16">Unlimited Emails</p>
            <button className="min-w-80 bg-white text-orange-500 font-semibold py-3 px-4 rounded-xl hover:bg-purple-800 hover:text-white transition-colors duration-300">
              Start now
            </button>
          </div>
          <div className="mt-8 lg:mt-0 lg:w-2/3 lg:flex">
            <ul className="space-y-4 lg:w-1/2 lg:flex-grow">
              {features.slice(0, 8).map((feature, index) => (
                <li key={index} className="flex items-center text-white">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <ul className="mt-8 space-y-4 lg:mt-0 lg:w-1/2 lg:flex-grow">
              {features.slice(8).map((feature, index) => (
                <li key={index} className="flex items-center text-white">
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
