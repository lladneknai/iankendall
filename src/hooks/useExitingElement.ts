import { wait } from "@/util/promises";
import { useEffect, useMemo, useState } from "react";

const FADE_OUT_DURATION = 300;

/**
 * USE EXITING ELEMENT
 * -------------------
 * - Shared hook that uses the 'exiting' className to smoothly transition elements
 * - Drop in any element you'd like to hide/show for this will return its DOM presence and className
 * - Use @param truthCondition to determine whether or not the element is EXITING or NOT EXITING
 */
export default function useExitingElement(truthCondition: boolean) {
  // Handle smooth slide-out behavior
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  //
  // Handle DOM removal
  // ------------------
  // - Start exit animation when dep changes
  // - Wait for animation to complete before removing from DOM
  // - Reset state when truthCondition changes again
  useEffect(() => {
    const handleVisibility = async () => {
      if (truthCondition) {
        setIsExiting(true);
        await wait(FADE_OUT_DURATION);
        setShouldRender(false);
      } else {
        setIsExiting(false);
        setShouldRender(true);
      }
    };

    handleVisibility();
  }, [truthCondition]);

  // Apply this class to the exiting element and BAM
  const className = useMemo(() => (isExiting ? "exiting" : ""), [isExiting]);

  return {
    className,
    isExiting,
    shouldRender,
  };
}
