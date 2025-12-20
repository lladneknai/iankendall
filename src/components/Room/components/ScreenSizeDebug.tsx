import { useEffect, useMemo, useState } from "react";

/**
 * SCREEN SIZE DEBUG
 * -----------------
 * - DEV-ONLY window that offers a quick reference for the page size & orientation
 * - SURE, we can use the ruler - but it's not always present. This is much easier to reference.
 */
export default function ScreenSizeDebug() {
  const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {
      const handleResize = () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
    return screenSize;
  };

  const ss = useScreenSize();

  const { aspect, orientation } = useMemo(() => {
    // Figure out if it's taller than 4/3
    const mobileTarget = 4 / 3;
    const heightParam = ss.height / ss.width;

    // Express the aspect as 4
    const aspect = `1:${heightParam.toFixed(1)}`;

    if (ss.width >= ss.height) {
      return {
        aspect,
        orientation: "Landscape",
      };
    }
    return {
      aspect,
      orientation: heightParam >= mobileTarget ? "Mobile" : "Portrait",
    };
  }, [ss]);

  return (
    <div id="RoomSize">
      <div className="row gap-05">
        <h3>Height:</h3>
        <h1>{ss.height.toLocaleString()}</h1>
      </div>
      <div className="row gap-05">
        <h3>Width:</h3>
        <h1>{ss.width.toLocaleString()}</h1>
      </div>
      <div className="row gap-05">
        <h3>Aspect:</h3>
        <h1>{aspect}</h1>
      </div>
      <div className="row gap-05">
        <h3>Orient:</h3>
        <h1>{orientation}</h1>
      </div>
    </div>
  );
}
/**
 * exp. as real ratio
 *   function getAspectRatio(width: number, height: number) {
    // const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    // const ratioWidth = width / gcd(width, height);
    // const ratioHeight = height / gcd(width, height);
    // return `${ratioWidth}:${ratioHeight}`;
  }
 */
