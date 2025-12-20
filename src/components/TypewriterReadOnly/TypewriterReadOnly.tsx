import Base from "@components/Typewriter/components/Base";
import Paper from "@components/Typewriter/components/Paper";
import Keyboard from "@components/Typewriter/components/Keyboard";
import Linkages from "@components/Typewriter/components/Linkages";
import NamePlate from "@components/Typewriter/components/NamePlate";
import useTypewriterReadOnly from "@/hooks/useTypewriter/useTypewriterReadOnly";

/**
 * TYPEWRITER (READ-ONLY)
 * ----------------------
 * - Read-only Typewriter for the homepage
 * - Omits user interactivity to lighten the load
 * - Auto-types the pre-configured phrase ONCE and stops
 * - Includes harcoded div to block user activity.
 */
export default function TypewriterReadOnly() {
  const {
    methods: { onKeyboardRender },
    refs: { hammerRef, keyboardRef, linkageRefs },
    state: { layoutName, paperStyles, rows },
  } = useTypewriterReadOnly();

  return (
    <div id="Typewriter">
      <Paper rows={rows} paperStyles={paperStyles} />
      <Base />
      <NamePlate hammerRef={hammerRef} />
      <Linkages linkageRefs={linkageRefs} />
      <Keyboard
        isActive={false}
        onKeyPress={() => null}
        keyboardRef={keyboardRef}
        layoutName={layoutName}
        onKeyboardRender={onKeyboardRender}
      />
      <div id="InteractivityBlocker" />
    </div>
  );
}
