import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "@store/appStore";
import { MAX_CHARS, MAX_LINES } from "@config/typing";
import useTypewriterRefs from "./useTypewriterRefs";
import useTypewriterRows from "./useTypewriterRows";
import useTypewriterAutoTyping from "./useTypewriterAutoTyping";
import useTypewriterKeyEffects from "./useTypewriterKeyEffects";

/**
 * USE TYPEWRITER | BASE HOOK
 * --------------------------
 * - Logic that runs the Typewriter component.
 * - Organized into a few sub-hooks to keep the top level clean.
 */
export default function useTypewriter({
  isAutoType = false,
  isDesktopHome = false,
  isMobileContact = false,
}: {
  isAutoType: boolean;
  isDesktopHome: boolean;
  isMobileContact: boolean;
}) {
  // GLOBAL STATE
  const isActive = useAppStore((s) => s.isActive);
  const isAtLimit = useAppStore((s) => s.isAtLimit);
  const setIsAtLimit = useAppStore((s) => s.setIsAtLimit);
  const isSendingMessage = useAppStore((s) => s.isSendingMessage);

  // LOCAL STATE
  const [text, setText] = useState(
    ""
    // `1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16`
  );

  // INITIALIZE REFS (abstracted to this hook so they don't clutter up this one)
  const { keyboardInstanceRef, onKeyboardRender, typewriterRefs } =
    useTypewriterRefs();

  // HANDLE ALL KEYPRESS AFTER-EFFECTS (pplies to both user typing and automatic typing)
  const { handleKeystrokeEffects, layoutName } = useTypewriterKeyEffects({
    refs: typewriterRefs,
    isActive,
  });

  // HANDLE AUTOMATIC TYPING
  // This is the most verbose sub-hook... but there's a lot going on.
  const {
    methods: {
      ignoreAutocompleteSuggestion,
      resetAutoTypingState,
      setProgress,
      setSuggestionText,
      typeBlock,
    },
    state: {
      isAutoTyping,
      isAutoTypeConcluded,
      progress,
      suggestionText,
      suggestionTextAc,
    },
  } = useTypewriterAutoTyping({
    isAutoType,
    isDesktopHome,
    isMobileContact,
    handleKeystrokeEffects,
    keyboardInstanceRef,
    setText,
    text,
  });

  // HANDLE DYNAMIC STYLES
  // - Calculate the positioning of the paper, and text as rows
  // - Pass the soundRef's current function for playing sounds
  const { paperStyles, rows } = useTypewriterRows({
    playSound: typewriterRefs.soundRef.current,
    text,
  });

  // HANDLE USER TYPING
  // - Invoked by the HiddenTextArea
  // - Handles state changes re: typing
  // - Prevents typing past limit or while auto-typing
  function handleUserKeystroke(inText: string) {
    if (isAutoTyping) {
      return;
    }
    // Prevent typing past the configured text limit
    const newTextHitsLimit =
      text.length >= MAX_CHARS || rows.length >= MAX_LINES;
    const isBackspacing = inText.length < text.length;
    if (newTextHitsLimit && !isBackspacing) {
      setIsAtLimit(true);
      return;
    }
    // Allow the user to backspace if at the limit. The next keystroke will re-check against the limit.
    if (isAtLimit && isBackspacing) {
      setIsAtLimit(false);
    }

    // IF we didn't early-return, update `text`.
    setText(inText);
  }

  // HANDLE KEYBOARD EFFECTS
  // - Invoked by the keyboard plugin
  // - Early-return to prevent FX firing when inactive
  // - Clears autocomplete suggestions if a user types while present
  function handleKeyboardEffects(key: string) {
    if (!isActive || isAtLimit) {
      return;
    }
    if (suggestionText) {
      setSuggestionText("");
    }
    handleKeystrokeEffects(key);
  }

  // When the dialog is open and the action buttons are hidden, shrink it.
  const height = useMemo(() => {
    return isSendingMessage ? "320px" : "380px";
  }, [isSendingMessage]);

  return {
    methods: {
      handleKeyboardEffects,
      handleUserKeystroke,
      ignoreAutocompleteSuggestion,
      onKeyboardRender,
      resetAutoTypingState,
      setSuggestionText,
      setProgress,
      setText,
      typeBlock,
    },
    refs: typewriterRefs,
    state: {
      height,
      isActive,
      isAutoTyping,
      isAutoTypeConcluded,
      layoutName,
      paperStyles,
      progress,
      rows,
      suggestionText,
      suggestionTextAc,
      text,
    },
  };
}
