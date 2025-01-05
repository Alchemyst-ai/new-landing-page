import React from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import MidmarketComponent from "@/components/solutions/midmarket/MidmarketComponent";

const page = () => {
  return (
    <div>
      <header className="fixed top-0 z-40 bg-[#0E0E0C] w-full flex justify-center items-center flex-col">
        <Navbar />
        <div className="h-0.5 w-full bg-gradient-to-r from-black via-[#ffffff42] to-black" />
      </header>
      <MidmarketComponent />
      <Footer />
    </div>
  );
};

export default page;
