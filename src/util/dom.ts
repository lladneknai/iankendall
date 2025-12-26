/**
 * Smoothly scroll to an element by ID.
 */
export const handleSmoothScroll = (elementId: string) => {
  document.getElementById(elementId)?.scrollIntoView({ behavior: "smooth" });
};
