"use client";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import chatbot from "../public/chatbot.json";

export default function LottieAnimation() {
  const [left, setLeft] = useState<number>(0);
  const [top, setTop] = useState<number>(0);

  useEffect(() => {
    const updatePosition = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      // Randomly decide whether to move to a vertical or horizontal edge
      if (Math.random() > 0.5) {
        // Move to vertical edge
        setLeft(Math.random() > 0.5 ? 0 : screenWidth - 300);
        setTop(Math.floor(Math.random() * (screenHeight - 300)));
      } else {
        // Move to horizontal edge
        setLeft(Math.floor(Math.random() * (screenWidth - 300)));
        setTop(Math.random() > 0.5 ? 0 : screenHeight - 300);
      }
    };

    const intervalId = setInterval(updatePosition, 3000);

    // Initial position set
    updatePosition();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: `${top}px`,
        left: `${left}px`,
        transition: "top 2s ease, left 2s ease",
        zIndex: 999,
      }}
    >
      <Lottie
        loop
        animationData={chatbot}
        play
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
}
