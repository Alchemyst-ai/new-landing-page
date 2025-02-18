'use client'
import { useEffect } from "react";
import ChatInterface from "./ChatInterface";

const AppWidget = () => {

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling
    return () => {
      document.body.style.overflow = ""; // Restore scrolling on unmount
    };
  }, []);

  const stopPropagation = (event: React.UIEvent | React.TouchEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };
  
  return (
        <div className="fixed bottom-28 right-5 h-[50rem] w-[30rem] rounded-lg"       
          onWheel={stopPropagation}
          onTouchMove={stopPropagation}
        >
          <ChatInterface />
        </div>
  );
};
export default AppWidget;
