import { Check } from "lucide-react";

interface PricingCardProps {
  plan: {
    tier: string;
    originalPrice?: number;
    price: number;
    info: string[];
    features: string[];
  };
  billingCycle: "monthly" | "annually";
}

export default function PricingCard({ plan, billingCycle }: PricingCardProps) {
  return (
    // card container
    <div className=" bg-gray-900 hover:bg-orange-400 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_10px_rgba(255,165,0,0.5)] hover:border-yellow-400 hover:border-2 hover:scale-105 group">
      <div className="px-6 py-8">
        {/* header */}
        <h2 className="text-6xl font-bold text-white mb-8 group-hover:text-white">
          {plan.tier}
        </h2>

        {/* price */}
        <p className="text-4xl font-bold text-white mb-6 group-hover:text-white">
          {billingCycle === "annually" ? (
            <>
              <span className="text-2xl line-through text-gray-400 mr-2">
                ${plan.originalPrice}
              </span>
              ${plan.price}
            </>
          ) : (
            `$${plan.price}`
          )}
          <span className="text-xl font-normal text-gray-400 group-hover:text-white">
            /{billingCycle === "monthly" ? "mo" : "yr"}
          </span>
        </p>

        {/* price features */}
        {plan.info.map((item, index) => (
          <p key={index} className="text-gray-400 mb-1 group-hover:text-white">
            {item}
          </p>
        ))}

        {/* start now button */}
        <button className="mt-8 w-full bg-white text-gray-900 font-semibold py-3 px-4 rounded-xl hover:bg-purple-600 hover:text-white transition-colors duration-300 group-hover:bg-white group-hover:text-orange-400 group-hover:hover:bg-purple-800 group-hover:hover:text-white">
          Start now
        </button>
      </div>

      {/* features */}
      <div className="px-6 pb-8">
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center text-gray-400 group-hover:text-white"
            >
              <Check className="h-5 w-5 text-green-500 group-hover:text-white mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}