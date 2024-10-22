import { useState, useEffect } from 'react';

interface WindowDimensions {
  width: number;
  height: number;
}

function useWindowDimensions(): WindowDimensions {

  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: 2000,
    height: 1000,
  });

  useEffect(() => {
    function handleResize() {
    if(window)
      setWindowDimensions({
        width: window?.innerWidth,
        height: window?.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;
