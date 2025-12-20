import { useEffect, useRef, useState } from "react";
import {
  AUTO_COMPLETE_BLOCKS,
  AUTO_COMPLETE_DELAY,
  AUTO_COMPLETE_PROMPTS,
  BASE_TYPEWRITER_SPEED,
  CONTACT_INIT_DELAY,
  MOBILE_INIT_TEXT,
} from "@/config/typing";
import { wait } from "@/util/promises";
import { focusTextArea } from "@/util/typewriter";
import { UseTypewriterAutoTypingProps } from "@shared";
import { useAppStore } from "@/store/appStore";

/**
 * USE TYPEWRITER AUTO-TYPING
 * --------------------------
 * - Manage all automatic typing behavior
 * - Includes suggestions, prompts, and automatic typing fns.
 */
export default function useTypewriterAutoTyping({
  isAutoType,
  isMobileContact,
  handleKeystrokeEffects,
  keyboardInstanceRef,
  setText,
  text,
  resetKey = 0,
}: UseTypewriterAutoTypingProps) {
  // GET GLOBAL STATE
  const isMobile = useAppStore((s) => s.isMobile);
  const setIsActive = useAppStore((s) => s.setIsActive);
  const isWelcomeComplete = useAppStore((s) => s.isWelcomeComplete);

  // AUTO-TYPING STATE
  const [progress, setProgress] = useState(0);
  const [isAutoTyping, setIsAutoTyping] = useState(false);
  const [suggestionText, setSuggestionText] = useState("");
  const [suggestionTextAc, setSuggestionTextAc] = useState("");
  const [ignoredSuggestions, setIgnoredSuggestions] = useState(0);
  const [isAutoTypeConcluded, setIsAutoTypeConcluded] = useState(false);

  // Track previous text length to detect user typing
  const previousTextLengthRef = useRef(0);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  //
  // AUTO-TYPE A SINGLE CHARACTER
  // -----------------------------
  // - Triggered after a brief random delay (see `typeBlock`)
  // - Certain keys must be decoded so that animations properly fire
  //
  function autoTypeCharacter(char: string) {
    // Map character to keyboard key format
    let keyCode = char;
    if (char === " ") {
      keyCode = "{space}";
    } else if (char === "\n") {
      keyCode = "{enter}";
    } else if (char === "\t") {
      keyCode = "{tab}";
    } else if (/[A-Z]/.test(char)) {
      keyCode = char.toLowerCase();
    }

    // Send in the key for animations, and update the text (avoiding stale closure)
    handleKeystrokeEffects(keyCode);
    setText((prevText: string) => {
      const newText = prevText + char;
      if (keyboardInstanceRef.current) {
        keyboardInstanceRef.current.setInput(newText);
      }
      return newText;
    });
  }

  //
  // AUTO-TYPE TEXT BLOCK
  // --------------------
  // - Auto-type @param textBlock character-by-character
  // - Use a randomized delay between keys to simulate real typing
  // - On page init, the first block is typed automatically, starting the flow
  //

  // const typeBlock = useCallback(
  async function typeBlock(textBlock: string) {
    setIsAutoTyping(true);
    for (let i = 0; i < textBlock.length; i++) {
      const char = textBlock[i];
      await wait(
        Math.ceil(Math.random() * BASE_TYPEWRITER_SPEED) +
          Math.ceil(BASE_TYPEWRITER_SPEED / 2)
      );
      autoTypeCharacter(char);
    }
    setIsAutoTyping(false);

    if (isMobile && !isMobileContact) {
      setIsAutoTypeConcluded(true);
      return;
    }

    // Focus into the hidden text area so user can type (after a brief delay)
    await focusTextArea();

    // Set the suggestion text, e.g. [your name], [your company]
    if (AUTO_COMPLETE_PROMPTS[progress]) {
      await wait(125);
      setSuggestionText(AUTO_COMPLETE_PROMPTS[progress]);
    }
  }
  // }, progress]);

  //
  // HANDLE USER TYPING BEHAVIOR
  // ---------------------------
  // - On each user keystroke, initialize a timeout ref
  // - If the user has stopped typing long enough, run the AC behavior
  // - When the timer expires, the user is presented the next autocomplete suggestion
  // - If a user IGNORES an autocomplete suggestion, dismiss it and skip to the next one
  //
  function handleUserKeystrokes() {
    // Handle ignored suggestion
    if (suggestionTextAc) {
      setSuggestionTextAc("");
      setIgnoredSuggestions(ignoredSuggestions + 1);
      setProgress(progress + 1);
    }
    // Reset the timer on each keypress
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    // Present the suggestion after the timer runs out.
    typingTimeoutRef.current = setTimeout(() => {
      const autoCompleteSuggestion = AUTO_COMPLETE_BLOCKS[progress];
      // If ANY prompts were disregarded, DO NOT show the final salutation prompt.
      if (
        progress + 1 === AUTO_COMPLETE_BLOCKS.length &&
        ignoredSuggestions > 0
      ) {
        console.log("[useTypewriterAutoTyping] User ignored prompts, exiting.");
        setIsAutoTypeConcluded(true);
        return;
      }
      // Early-return from the flow if additional conditions are met.
      if (
        !autoCompleteSuggestion ||
        isAutoTypeConcluded ||
        ignoredSuggestions >= 3
      ) {
        console.log("[useTypewriterAutoTyping] Exiting Auto-typing behavior", {
          autoCompleteSuggestion,
          isAutoTypeConcluded,
          ignoredSuggestions,
          progress,
          suggestionText,
          suggestionTextAc,
        });
        setIsAutoTypeConcluded(true);
        return;
      }
      // Set the suggestion.
      setSuggestionTextAc(autoCompleteSuggestion);
    }, AUTO_COMPLETE_DELAY);

    previousTextLengthRef.current = text.length;
  }

  // Detect changes in text length (indicates user is typing)
  useEffect(() => {
    if (!isAutoType || (isMobile && !isMobileContact)) {
      return;
    }
    // This is the machine typing, ignore it
    if (isAutoTyping) {
      previousTextLengthRef.current = text.length;
      return;
    }
    // This is the user typing, handle it
    if (text.length !== previousTextLengthRef.current) {
      handleUserKeystrokes();
    }
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [text, isAutoTyping, progress]);

  //
  // HANDLE AUTOCOMPLETE BEHAVIOR
  // ----------------------------
  // - If an autocomplete suggestion is present, add an event listener for CMD+SHIFT
  // - Pressing this shortcut while an autocomplete prompt is present types the block
  //
  function handleAutocomplete() {
    setSuggestionText("");
    setSuggestionTextAc("");
    if (progress > 0 && progress < AUTO_COMPLETE_BLOCKS.length) {
      const nextBlock = `\n${AUTO_COMPLETE_BLOCKS[progress]}`;
      if (nextBlock) {
        typeBlock(nextBlock).then(() => {
          if (AUTO_COMPLETE_PROMPTS[progress]) {
            setProgress(progress + 1);
            setSuggestionText(AUTO_COMPLETE_PROMPTS[progress]);
          } else {
            setIsAutoTypeConcluded(true);
          }
        });
      }
    }
  }

  // Mount/unmount the event listener for the shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShift = event.shiftKey;
      const isCmdOrCtrl = event.metaKey || event.ctrlKey;
      if (isCmdOrCtrl && isShift) {
        handleAutocomplete();
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [suggestionTextAc]);

  //
  // HANDLE INIT BEHAVIOR
  // --------------------
  // - SKIP 100% OF THIS IF NOT AUTO-TYPING
  // - Start auto-typing immediately after CONTACT_INIT_DELAY
  // - If we land on the page with existing text, bail out early
  //
  async function initializeAutoType() {
    setIsActive(true);
    if (!isAutoType) {
      ("[useTypewriterAutoTyping]-{NOT TYPING}-> not typing 1st block.");
      return;
    }
    await wait(CONTACT_INIT_DELAY);
    if (AUTO_COMPLETE_BLOCKS[0]) {
      await typeBlock(AUTO_COMPLETE_BLOCKS[0]);
      setProgress(1);
    }
  }

  async function initializeAutoTypeMobile() {
    setIsActive(true);
    await wait(CONTACT_INIT_DELAY);
    typeBlock(MOBILE_INIT_TEXT);
  }

  // Trigger the auto-typing flow
  useEffect(() => {
    console.log("[useTypewriterAutoTyping] Init effect triggered", {
      isAutoType,
      isMobile,
      resetKey,
      textLength: text.length,
    });

    // Reset all state when resetKey changes (but not on first mount)
    if (resetKey > 0) {
      console.log(
        "[useTypewriterAutoTyping] Resetting state due to resetKey change"
      );
      setProgress(0);
      setIgnoredSuggestions(0);
      setIsAutoTypeConcluded(false);
      setIsAutoTyping(false);
      setSuggestionText("");
      setSuggestionTextAc("");
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    }

    if (!isAutoType) {
      console.log("[useTypewriterAutoTyping]-{NOT TYPING}-> conditions:", {
        isAutoType,
      });
      return;
    }

    // Only skip if we have text AND we're not resetting
    if (text.length > 0 && resetKey === 0) {
      console.log(
        "[useTypewriterAutoTyping]-{NOT TYPING}-> we have text already."
      );
      return;
    }

    if (isWelcomeComplete && resetKey === 0) {
      setText(MOBILE_INIT_TEXT);
      return;
    } else if (isMobile && !isMobileContact) {
      initializeAutoTypeMobile();
    } else {
      initializeAutoType();
    }
  }, [resetKey]);

  //
  // RESET ALL AUTOCOMPLETE STATE
  // -----------------------------
  // Called when user clicks "Reset Typewriter" to return to clean slate
  //
  const resetAutoTypingState = () => {
    // Clear all autocomplete/prompt text
    setSuggestionText("");
    setSuggestionTextAc("");

    // Reset progress tracking
    setProgress(0);
    setIgnoredSuggestions(0);
    setIsAutoTypeConcluded(true); // Set to TRUE to prevent auto-typing from restarting
    setIsAutoTyping(false);

    // Clear any pending typing timeouts
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    // Clear the keyboard instance visual state
    if (keyboardInstanceRef.current) {
      keyboardInstanceRef.current.setInput("");
    }
  };

  //
  // RETURN: how to set the text (just so we can clear it probs)
  // STATE FOR if we are autoTyping, if there is a prompt OR autocomplete, or if done.
  //
  return {
    methods: {
      initializeAutoTypeMobile,
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
  };
}
