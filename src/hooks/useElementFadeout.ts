import { wait } from "@/util/promises";
import { useEffect, useState } from "react";

const FADE_OUT_DURATION = 300;

export default function useElementFadeout(dependency: boolean) {
  // Handle smooth slide-out behavior
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const handleVisibility = async () => {
      if (dependency) {
        // Start exit animation
        setIsExiting(true);
        // Wait for animation to complete before removing from DOM
        await wait(FADE_OUT_DURATION);
        setShouldRender(false);
      } else {
        // Reset state when dialog closes
        setIsExiting(false);
        setShouldRender(true);
      }
    };

    handleVisibility();
  }, [dependency]);

  return {
    isExiting,
    shouldRender,
    //
  };
}
