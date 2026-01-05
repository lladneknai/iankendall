import { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

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

  return { ref, isRevealed };
}

