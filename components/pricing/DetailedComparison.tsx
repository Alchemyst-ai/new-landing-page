"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Check, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ComparisonData {
  parameter: string;
  saleshandy: string | boolean;
  aisdr: string | boolean | JSX.Element;
  maya: string | boolean | JSX.Element;
}

const comparisonData: ComparisonData[] = [
  {
    parameter: "Outreach & Quantity",
    saleshandy: "SalesHandy and Co.",
    aisdr: "AISDR & Co.",
    maya: "Maya",
  },
  {
    parameter: "Medium",
    saleshandy: "Text/Emails",
    aisdr: "Text/Emails/LinkedIn",
    maya: "Text/Emails/LinkedIn/Voice",
  },
  {
    parameter: "Leads",
    saleshandy: false,
    aisdr: "Unlimited (Capped by Emails)",
    maya: "750 (Exportable)",
  },
  {
    parameter: "Outreach & Deliverability",
    saleshandy: true,
    aisdr: true,
    maya: true,
  },
  {
    parameter: "Privacy",
    saleshandy: false,
    aisdr: false,
    maya: true,
  },
  {
    parameter: "Org. Context",
    saleshandy: false,
    aisdr: false,
    maya: true,
  },
  {
    parameter: "AI Personalization",
    saleshandy: false,
    aisdr: (
      <>
        <div className="flex flex-col items-center">
          <div className="flex justify-center p-2 mb-2">
            <span className="rounded-full bg-green-500/20 p-1">
              <Check className="h-6 w-6 text-green-500" />
            </span>
          </div>
          <div className="text-center">(Manual Instruction)</div>
        </div>
      </>
    ),
    maya: (
      <>
        <div className="flex flex-col items-center">
          <div className="flex justify-center p-2 mb-2">
            <span className="rounded-full bg-green-500/20 p-1">
              <Check className="h-6 w-6 text-green-500" />
            </span>
          </div>
          <div className="text-center">(Instructions + Auto Learning)</div>
        </div>
      </>
    ),
  },
  {
    parameter: "Pricing",
    saleshandy: "$200/month",
    aisdr: "$400/month",
    maya: "$400/month",
  },
];

export default function DetailedComparison() {
  const [isOpen, setIsOpen] = useState(false);

  const renderCell = (value: string | boolean | JSX.Element) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="flex justify-center p-2">
          <span className="rounded-full bg-green-500/20 p-1">
            <Check className="h-6 w-6 text-green-500" />
          </span>
        </div>
      ) : (
        <div className="flex justify-center p-2">
          <span className="rounded-full bg-red-500/20 p-1">
            <X className="h-6 w-6 text-red-500" />
          </span>
        </div>
      );
    }
    return <div className="text-center p-2">{value}</div>;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-center gap-2 mb-6">
            <h2 className="text-2xl font-semibold">Detailed Comparison</h2>
            {isOpen ? (
              <ChevronUp className="h-6 w-6" />
            ) : (
              <ChevronDown className="h-6 w-6" />
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="w-full overflow-x-auto rounded-lg border bg-card">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-semibold bg-gray-200/10 text-primary border-r text-xl">
                    Parameters
                  </th>
                  <th className="p-4 text-center font-semibold bg-gray-200/10 text-primary border-r min-w-[200px] text-xl">
                    SalesHandy and Co.
                  </th>
                  <th className="p-4 text-center font-semibold bg-gray-200/10 text-primary border-r min-w-[200px] text-xl">
                    AISDR & Co.
                  </th>
                  <th className="p-4 text-center font-semibold bg-gray-200/10 text-primary min-w-[200px] text-xl">
                    Maya
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={row.parameter}
                    className={`border-b ${
                      index === comparisonData.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="p-4 font-medium bg-gray-200/10 text-primary border-r text-xl">
                      {row.parameter}
                    </td>
                    <td className="p-4 border-r">
                      {renderCell(row.saleshandy)}
                    </td>
                    <td className="p-4 border-r">{renderCell(row.aisdr)}</td>
                    <td className="p-4">{renderCell(row.maya)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
