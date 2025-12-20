import { useEffect, useState } from "react";
import { useAppStore } from "@/store/appStore";
import useTypewriterRefs from "./useTypewriterRefs";
import useTypewriterRows from "./useTypewriterRows";
import useTypewriterAutoTyping from "./useTypewriterAutoTyping";
import useTypewriterKeyEffects from "./useTypewriterKeyEffects";

/**
 * READ-ONLY TYPEWRITER
 * --------------------
 * - Logic that runs the TypewriterReadOnly component.
 */
export default function useTypewriterReadOnly() {
  const {
    isActive,
    setIsWelcomeComplete,
    typewriterResetRequested,
    clearTypewriterResetRequested,
  } = useAppStore();

  const [text, setText] = useState("");
  const [resetKey, setResetKey] = useState(0);

  // INITIALIZE REFS
  // Abstract ref boilerplate to this hook so they don't clutter up this one.
  const { typewriterRefs, keyboardInstanceRef, onKeyboardRender } =
    useTypewriterRefs();

  // HANDLE ALL KEYPRESS BEHAVIOR
  // Applies to both user typing and automatic typing.
  const { handleKeystrokeEffects, layoutName } = useTypewriterKeyEffects({
    refs: typewriterRefs,
    isActive,
  });

  // HANDLE AUTOMATIC TYPING
  // This is the most verbose sub-hook... but there's a lot going on.
  const {
    state: { isAutoTypeConcluded },
  } = useTypewriterAutoTyping({
    isAutoType: true,
    isMobileContact: false,
    handleKeystrokeEffects,
    keyboardInstanceRef,
    setText,
    text,
    resetKey,
  });

  // HANDLE DYNAMIC STYLES
  // Calculate the positioning of the paper, and text as rows
  // Pass the soundRef's current function for playing sounds
  const { paperStyles, rows } = useTypewriterRows({
    playSound: typewriterRefs.soundRef.current,
    text,
  });

  useEffect(() => {
    if (isAutoTypeConcluded) {
      setIsWelcomeComplete(true);
    }
  }, [isAutoTypeConcluded]);

  // HANDLE RESET TYPEWRITER
  // When user clicks "Reset Typewriter" button, clear everything and restart
  useEffect(() => {
    if (typewriterResetRequested) {
      // Clear the text
      setText("");
      setIsWelcomeComplete(false);
      // Clear the keyboard instance
      if (keyboardInstanceRef.current) {
        keyboardInstanceRef.current.setInput("");
      }
      clearTypewriterResetRequested();
      setResetKey((prev) => prev + 1);
    }
  }, [typewriterResetRequested]);

  return {
    methods: {
      onKeyboardRender,
    },
    refs: typewriterRefs,
    state: {
      layoutName,
      paperStyles,
      rows,
      text,
    },
  };
}
