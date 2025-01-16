import React from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CustomCursor from "@/components/home/CustomCursor";
import DemoPageComponent from "@/components/demopage/DemoPageComponent";

const page = () => {
  return (
    <div>
      <div className="relative flex flex-col min-h-screen max-w-screen overflow-x-hidden">
        <header className="fixed top-0 z-40 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
          <Navbar />
          <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
        </header>
        <main>
          <DemoPageComponent />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default page;
