import { CHARS_PER_LINE, MAX_LINES } from "@/config/typing";
import { useAppStore } from "@/store/appStore";
import { HiddenTextAreaProps } from "@shared";

/**
 * TYPEWRITER | Hidden Textarea
 * - Holds the value of the typewriter's text
 * - Value is set by the typewriter and rendered to the paper
 * - This input MUST have focus for text to be added (by user OR auto-type)
 */
export default function HiddenTextArea({
  handleUserKeystroke,
  text,
}: HiddenTextAreaProps) {
  // Typewriter sctive state (global)
  const isActive = useAppStore((s) => s.isActive);
  const setIsActive = useAppStore((s) => s.setIsActive);

  return (
    <textarea
      cols={CHARS_PER_LINE}
      disabled={!isActive}
      id="HiddenTextArea"
      onBlur={() => setIsActive(false)}
      onChange={(e) => handleUserKeystroke(e.target.value)}
      onFocus={() => {
        // We activate the Typewriter through global state, NOT the other way around
      }}
      placeholder="Type here to see animations..."
      rows={MAX_LINES}
      value={text}
    />
  );
}
