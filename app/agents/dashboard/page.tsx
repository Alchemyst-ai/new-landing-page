"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/components-new/Footer";
import DashboardToggle from "@/components/dashboard/DashboardToggle";
import CopilotContent from "@/components/dashboard/CopilotContent";
import AutopilotContent from "@/components/dashboard/AutopilotContent";

export default function Dashboard() {
  const [mode, setMode] = useState<"copilot" | "autopilot">("copilot");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Content mode={mode} setMode={setMode} />
    </Suspense>
  );
}

function Content({ mode, setMode }: { mode: "copilot" | "autopilot"; setMode: React.Dispatch<React.SetStateAction<"copilot" | "autopilot">> }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialMode = searchParams.get("mode");
    if (initialMode === "autopilot") {
      setMode("autopilot");
    }
  }, [searchParams, setMode]);

  return (
    <div>
      <header className="fixed top-0 z-40 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
        <Navbar />
        <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
      </header>
      <div className="min-h-screen mt-36">
        <DashboardToggle mode={mode} setMode={setMode} />
        {mode === "copilot" ? <CopilotContent /> : <AutopilotContent />}
      </div>
      <Footer />
    </div>
  );
}

