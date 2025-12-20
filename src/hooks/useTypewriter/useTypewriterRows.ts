import { useEffect, useMemo, useRef } from "react";
import { DING_LENGTH } from "@/config/typing";
import {
  buildPaperStyles,
  buildTypewriterRows,
} from "@components/Typewriter/lib/util";
import { UseTypewriterRowsProps } from "@shared";
import { useAppStore } from "@/store/appStore";

/**
 * USE TYPEWRITER ROWS
 * -------------------
 * - Splits text block into rows for rendering
 * - Declares styles for moving elements (Paper and TypingTips)
 */
export default function useTypewriterRows({
  playSound,
  text,
}: UseTypewriterRowsProps) {
  // Split full text string into rows and characters
  const isMobile = useAppStore((s) => s.isMobile);
  const rows = useMemo(() => buildTypewriterRows(text, isMobile), [text]);

  // Get styles for paper placement
  const paperStyles = useMemo(() => buildPaperStyles(rows, isMobile), [rows]);

  // Play "ding" sound when the user reaches the ragged edge
  // Stores text from the previous render to avoid backspace dings
  const previousTextRef = useRef<string>("");
  useEffect(() => {
    if (!playSound) {
      return;
    }
    if (
      rows[rows.length - 1].length === DING_LENGTH &&
      text.length > previousTextRef.current.length
    ) {
      console.log("[useTypewriterRows]--> ding!");
      playSound("ding");
    }
  }, [text]);
  useEffect(() => {
    previousTextRef.current = text;
  });

  return {
    paperStyles,
    rows,
  };
}
