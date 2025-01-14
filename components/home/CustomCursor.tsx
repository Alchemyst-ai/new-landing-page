"use client";
import { useEffect } from "react";

const CustomCursor: React.FC = () => {
  useEffect(() => {
    document.body.style.cursor = "none";
    const cursor = document.querySelector(".cursor");
    const cursorInner = document.querySelector(".cursor-inner");

    document.addEventListener("mousemove", (e) => {
      if (cursor) {
        cursor.setAttribute(
          "style",
          `top: ${e.clientY}px; left: ${e.clientX}px;`
        );
      }
      if (cursorInner) {
        cursorInner.setAttribute(
          "style",
          `top: ${e.clientY}px; left: ${e.clientX}px;`
        );
      }
    });

    document.addEventListener("mousedown", () => {
      if (cursorInner) cursorInner.classList.add("click");
    });

    document.addEventListener("mouseup", () => {
      if (cursorInner) cursorInner.classList.remove("click");
    });
  }, []);

  return (
    <>
      <div className="cursor"></div>
      <div className="cursor-inner"></div>
    </>
  );
};

export default CustomCursor;


