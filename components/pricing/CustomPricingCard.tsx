import { useEffect , useState } from "react";
import { Check } from "lucide-react";

// Define the props interface for the component
interface CustomPricingCardProps {
  country: string;
  emails: number;
  setEmails: React.Dispatch<React.SetStateAction<number>>;
  leads: number;
  setLeads: React.Dispatch<React.SetStateAction<number>>;
  enrichments: number;
  setEnrichments: React.Dispatch<React.SetStateAction<number>>;
}

export default function CustomPricingCard({
  country,
  emails,
  setEmails,
  leads,
  setLeads,
  enrichments,
  setEnrichments,
}: CustomPricingCardProps) {
  // Calculate the total number of tokens
  const calculateTokens = () => {
    return emails * 2 + leads * 3 + enrichments * 2;
  };

  // Calculate the price based on the country and number of tokens
  const calculatePrice = () => {
    const tokens = calculateTokens();
    const pricePerToken = country === "IN" ? 0.00876 : 0.02347;
    const monthlyPrice = tokens * pricePerToken;
    const yearlyPrice = monthlyPrice * 12;
    return {
      monthly: monthlyPrice.toFixed(2),
      yearly: yearlyPrice.toFixed(2),
    };
  };

  // State for price
  const [price, setPrice] = useState(calculatePrice());

  // Update price when slider values or country changes
  useEffect(() => {
    setPrice(calculatePrice());
  }, [emails, leads, enrichments, country]);

  // Handle slider change
  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>,
    min: number,
    max: number,
    step: number
  ) => {
    const value = Math.min(Math.max(parseInt(event.target.value), min), max);
    setter(Math.round(value / step) * step);
  };

  // Features list
  const features = [
    "All core Maya Features",
    "CRM Integration",
    "Domain warm-up",
    "Email warm-up",
    "Unlimited mailboxes",
    "Onboarding",
    "Premium Support",
    "Accounts Manager",
  ];

  return (
    <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_10px_rgba(255,165,0,0.5)] hover:border-yellow-400 hover:border-2 hover:scale-105 group">
      <div className="p-8 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 pr-0 lg:pr-4 mb-8 lg:mb-0">
          <h3 className="text-2xl font-bold text-white mb-6">
            Customize Your Plan
          </h3>
          <p className="mb-8 text-gray-400">
            Please choose the number of emails, leads and enrichments you would
            like and we will make a customized plan just for you:{" "}
          </p>
          <div className="space-y-6">
            {[
              {
                label: "Emails",
                value: emails,
                setter: setEmails,
                min: 7000,
                max: 32000,
                step: 500,
              },
              {
                label: "Leads",
                value: leads,
                setter: setLeads,
                min: 750,
                max: 10000,
                step: 50,
              },
              {
                label: "Enrichments",
                value: enrichments,
                setter: setEnrichments,
                min: 375,
                max: 3000,
                step: 25,
              },
            ].map((item) => (
              <div key={item.label} className="bg-gray-800 rounded-lg p-4">
                <label
                  htmlFor={item.label.toLowerCase()}
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  {item.label}: {item.value}
                </label>
                <input
                  type="range"
                  id={item.label.toLowerCase()}
                  min={item.min}
                  max={item.max}
                  step={item.step}
                  value={item.value}
                  onChange={(e) =>
                    handleSliderChange(
                      e,
                      item.setter,
                      item.min,
                      item.max,
                      item.step
                    )
                  }
                  className="w-full accent-orange-400"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2 pl-0 lg:pl-4">
          <h3 className="text-6xl font-bold text-white mb-4">Custom Plan</h3>
          <p className="text-2xl font-bold text-white mb-6">
            ${price.monthly}
            <span className="text-gray-400 text-lg">/mo</span> = ${price.yearly}<span className="text-gray-400 text-lg">/yr</span>
          </p>
          <button className="w-full bg-white text-gray-900 font-semibold py-3 px-4 rounded-xl hover:bg-purple-600 hover:text-white transition-colors duration-300 mb-6">
            Start now
          </button>
          <div className="flex flex-col md:flex-row">
            <ul className="space-y-2 md:w-1/2">
              <li className="flex items-center text-gray-400">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                {emails} Emails
              </li>
              <li className="flex items-center text-gray-400">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                {leads} Verified Leads
              </li>
              <li className="flex items-center text-gray-400">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                {enrichments} Lead Enrichments
              </li>
              {features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-center text-gray-400">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <ul className="space-y-2 md:w-1/2 mt-4 md:mt-0">
              {features.slice(4).map((feature, index) => (
                <li key={index} className="flex items-center text-gray-400">
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
