import { motion } from "framer-motion";

interface PricingToggleProps {
  billingCycle: "monthly" | "annually";
  setBillingCycle: (cycle: "monthly" | "annually") => void;
}

export default function PricingToggle({
  billingCycle,
  setBillingCycle,
}: PricingToggleProps) {
  return (
    <div className="flex justify-center">
      <div className="relative inline-flex bg-gray-900 p-1 rounded-full shadow-[0_0_20px_4px_rgba(255,165,0,0.5)] border border-orange-400">
        <button
          className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full focus:outline-none ${billingCycle === "monthly" ? "text-gray-900" : "text-white"}`}
          onClick={() => setBillingCycle("monthly")}
        >
          Monthly
        </button>
        <button
          className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full focus:outline-none ${billingCycle === "annually" ? "text-gray-900" : "text-white"}`}
          onClick={() => setBillingCycle("annually")}
        >
          Annually
        </button>
        <motion.div
          className="absolute inset-1 rounded-full bg-orange-400"
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          style={{
            width: "calc(50% - 0.25rem)",
            x: billingCycle === "annually" ? "calc(100%)" : "0%",
          }}
        />
      </div>
    </div>
  );
}
