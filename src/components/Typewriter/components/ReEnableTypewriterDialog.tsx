import { useAppStore } from "@/store/appStore";

/**
 * RE-ENABLE TYPEWRITER DIALOG
 * ---------------------------
 * - Shown when the Typewriter's HiddenTextArea loses focus
 * - Users must click the button in order to continue typing
 */
export default function ReEnableTypewriterDialog() {
  const setIsActive = useAppStore((s) => s.setIsActive);
  const shouldShowReEnable = useAppStore((s) => s.shouldShowReEnable());

  // return null;

  return (
    <div
      id="ReEnableTypewriterDialog"
      className={!shouldShowReEnable ? "hidden" : ""}
    >
      <button
        id="ReEnableButton"
        onClick={() => setIsActive(true)}
        type="button"
      >
        Re-Enable Typewriter
      </button>
      <p>Typewriter must be enabled to type.</p>
    </div>
  );
}
