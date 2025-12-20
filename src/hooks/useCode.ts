import { useState } from "react";

/**
 * USE CODE | Logic for FULL-PAGE code viewer
 */
export default function useCode() {
  // SET FONT SIZE
  // Number translates to [fontSize]px.
  // I tried doing this with rem, but it sucked.
  const MIN_FONT = 5;
  const MAX_FONT = 20;
  const DEFAULT_FONT = 16;
  const [fontSize, setFontSize] = useState(DEFAULT_FONT);

  // Store collapsed / expanded
  const [isCollapsed, setIsCollapsed] = useState(true);

  const incrementFontSize = () => {
    if (fontSize < MAX_FONT) {
      setFontSize(fontSize + 1);
    }
  };
  const decrementFontSize = () => {
    if (fontSize > MIN_FONT) {
      setFontSize(fontSize - 1);
    }
  };

  return {
    fontSize,
    decrementFontSize,
    incrementFontSize,
    isCollapsed,
    setIsCollapsed,
  };
}
