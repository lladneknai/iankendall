import { useLayoutEffect, useRef, useState } from "react";

/**
 * USE REVEAL ON SCROLL
 * --------------------
 * - Returns a ref to attach to your element
 * - Returns 'isRevealed' which becomes true when element enters viewport
 * - Once revealed, stays revealed (no fade out)
 * - @param threshold - 0 to 1, how much of element must be visible (default 0.2)
 */
export default function useRevealOnScroll(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Helper function to check if element is in viewport
    const isInViewport = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Calculate how much of the element is visible
      const visibleHeight =
        Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const elementHeight = rect.height;
      const visibleRatio = visibleHeight / elementHeight;

      return visibleRatio >= threshold;
    };

    // Check immediately if already in viewport
    if (isInViewport()) {
      setSkipAnimation(true);
      setIsRevealed(true);
      return; // No need to observe
    }

    // Not in viewport yet, so observe for scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isRevealed, skipAnimation };
}
