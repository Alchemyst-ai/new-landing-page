import { useEffect, useState } from "react";

const useScreenDimensions = () => {
  const [screenSize, setScreenSize] = useState({
    width: 2000,
    height: 1000,
    scrollHeight:0,
    scrollY:0
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        scrollHeight:document.documentElement.scrollHeight,
        scrollY:window.scrollY
      });
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenDimensions;
