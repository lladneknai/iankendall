import { RevealOnScrollProps } from "@shared";
import useRevealOnScroll from "@hooks/useRevealOnScroll";

/**
 * REVEAL ON SCROLL
 * ----------------
 * - Wrapper component that fades in when scrolled into view
 */
export default function RevealOnScroll({
  children,
  className = "",
  distance = "50px",
  duration = "500ms",
  threshold = 0.2,
}: RevealOnScrollProps) {
  //
  // Using an IntersectionObserver and a ref, determine if this element should be revealed
  // If so, reveal it using the `revealOnScroll` SCSS mixin and the `shown` class (see @_mixins.scss)
  //
  const { ref, isRevealed, skipAnimation } = useRevealOnScroll(threshold);

  //
  // Render the wrapper element and all children
  // Use duration and distances props as CSS vars
  // If skipAnimation is true, set duration to 0 to prevent slide-up animation
  //
  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${className} ${isRevealed ? "shown" : ""}`}
      style={
        {
          "--reveal-distance": distance,
          "--reveal-duration": skipAnimation ? "0ms" : duration,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
