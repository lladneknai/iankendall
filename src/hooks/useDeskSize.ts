import {
  MAX_SAFE_HEIGHT,
  MAX_SAFE_WIDTH,
  MIN_SAFE_HEIGHT,
  MIN_SAFE_WIDTH,
} from "@/config/desk";
import { useEffect, useRef } from "react";

/**
 * USE DESK SIZE | Dynamically scalee the #Desk element based on viewport dimensions.
 *
 * Scaling Logic:
 * - Highly optimized with requestAnimationFrame throttling
 * - Smooth transitions between portrait and landscape modes
 * - Aspect ratio aware: On portrait screens, maximizes horizontal space
 * - Min Safe Area (920×920): Must ALWAYS be fully visible - sets upper bound
 * - Max Safe Area (1350×600): Should fill screen when possible - sets target
 */
export function useDeskSize() {
  const rafIdRef = useRef<number | null>(null);
  const isScheduledRef = useRef(false);

  useEffect(() => {
    const calculateAndApplyScale = () => {
      const deskElement = document.getElementById("Desk");
      if (!deskElement) {
        return;
      }
      // Calculate scale based on viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const aspectRatio = viewportWidth / viewportHeight;

      // Calculate maximum scale
      const maxWidth = viewportWidth / MIN_SAFE_WIDTH;
      const maxHeight = viewportHeight / MIN_SAFE_HEIGHT;

      // Target scale (to fill MaxSafeArea when possible)
      const targetWidth = viewportWidth / MAX_SAFE_WIDTH;
      const targetScaleByHeight = viewportHeight / MAX_SAFE_HEIGHT;

      // Set boundaries of the transition zone
      const TRANSITION_MIN = 0.5;
      const TRANSITION_MAX = 1.5;

      let finalScaleByWidth, finalScaleByHeight;
      const landscapeScaleByWidth = Math.min(targetWidth, maxWidth);
      const landscapeScaleByHeight = Math.min(targetScaleByHeight, maxHeight);

      if (aspectRatio < TRANSITION_MIN) {
        // Full portrait mode: Maximize width, be lenient with height
        finalScaleByWidth = maxWidth;
        finalScaleByHeight = maxHeight;
      } else if (aspectRatio > TRANSITION_MAX) {
        // Full landscape mode: Respect MaxSafeArea for both dimensions
        finalScaleByWidth = landscapeScaleByWidth;
        finalScaleByHeight = landscapeScaleByHeight;
      } else {
        // Transition zone: Smoothly interpolate between modes for BOTH dimensions
        const t =
          (aspectRatio - TRANSITION_MIN) / (TRANSITION_MAX - TRANSITION_MIN);

        finalScaleByWidth = maxWidth * (1 - t) + landscapeScaleByWidth * t;
        finalScaleByHeight = maxHeight * (1 - t) + landscapeScaleByHeight * t;
      }

      // Use the SMALLER of the two to ensure BOTH width AND height constraints are met
      const scale = Math.max(
        0.4,
        Math.min(finalScaleByWidth, finalScaleByHeight)
      );
      // Apply the scale transform with hardware acceleration
      deskElement.style.transform = `scale(${scale})`;
      deskElement.style.willChange = "transform";
    };

    // Throttled resize handler using requestAnimationFrame
    const handleResize = () => {
      if (isScheduledRef.current) return;

      isScheduledRef.current = true;
      rafIdRef.current = requestAnimationFrame(() => {
        calculateAndApplyScale();
        isScheduledRef.current = false;
      });
    };

    // On mount, calculate and add an event listener for resize. Remove when done resizing.
    calculateAndApplyScale();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);
}
