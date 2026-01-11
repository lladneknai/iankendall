import { useEffect } from "react";
import { TypewriterProps } from "@shared";
import useTypewriter from "@hooks/useTypewriter";
import useTypingTips from "@hooks/useTypingTips";
import { useAppStore } from "@store/appStore";
import { useAudioStore } from "@store/audioStore";
import { useSendMessageStore } from "@store/sendMessageStore";
import Base from "./components/Base";
import Paper from "./components/Paper";
import Keyboard from "./components/Keyboard";
import Linkages from "./components/Linkages";
import NamePlate from "./components/NamePlate";
import TypingTips from "./components/TypingTips";
import SoundEffects from "./components/SoundEffects";
import ActionButtons from "./components/ActionButtons";
import HiddenTextArea from "./components/HiddenTextArea";
import MobileContactDialog from "../MobileContactDialog";

/**
 * TYPEWRITER
 * ----------
 * - Interactive Typewriter featured on the homepage
 * - Uses localized hooks to maximize eventing efficiency
 * - The caveat of this is that there's a lot of prop-drilling ¯\(°_o)/¯
 * - Supports both basic typewriter AND autocomplete/auto-typing behavior
 */
export default function Typewriter({
  isAutoType = false,
  isDesktopHome = false,
  isMobileContact = false,
}: TypewriterProps) {
  const {
    methods: {
      handleKeyboardEffects,
      handleUserKeystroke,
      onKeyboardRender,
      resetAutoTypingState,
      setProgress,
      setText,
      typeBlock,
    },
    refs: { hammerRef, keyboardRef, linkageRefs, soundRef },
    state: {
      height,
      isActive,
      isAutoTyping,
      isAutoTypeConcluded,
      layoutName,
      progress,
      paperStyles,
      rows,
      suggestionText,
      suggestionTextAc,
      text,
    },
  } = useTypewriter({ isAutoType, isDesktopHome, isMobileContact });

  // Handle tips
  const { handleDismissTip, tipText } = useTypingTips({
    isAutoTyping,
    isAutoTypeConcluded,
    isPromptRendered: !!suggestionText,
    isSuggestionRendered: !!suggestionTextAc,
    progress,
    rows,
  });

  // Global state from stores
  const isMobile = useAppStore((s) => s.isMobile);
  const soundEnabled = useAudioStore((s) => s.soundEnabled);
  const handleReset = useSendMessageStore((s) => s.handleReset);
  const resetRequested = useAppStore((s) => s.typewriterResetRequested);

  useEffect(() => {
    if (resetRequested) {
      // Reset the typewriter and clear autocomplete state
      resetAutoTypingState();
      handleReset(setText);

      // Clear the reset flag
      useAppStore.setState({ typewriterResetRequested: false });
    }
  }, [resetRequested, resetAutoTypingState, setText, handleReset]);

  return (
    <div
      id="Typewriter"
      className={isMobileContact ? "mobile-contact" : ""}
      style={
        {
          "--typewriter-height": isMobileContact ? 420 : height,
        } as React.CSSProperties
      }
    >
      {/* MOVING ELEMENTS */}
      {!isMobile && (
        <TypingTips
          handleDismissTip={handleDismissTip}
          paperStyles={paperStyles}
          tipText={tipText}
        />
      )}
      <Paper
        rows={rows}
        paperStyles={paperStyles}
        suggestionText={suggestionText}
        suggestionTextAc={suggestionTextAc}
      />

      {/* STATIC ELEMENTS */}
      <Base />
      <NamePlate hammerRef={hammerRef} />
      <Linkages linkageRefs={linkageRefs} />
      <Keyboard
        isActive={isActive}
        keyboardRef={keyboardRef}
        layoutName={layoutName}
        onKeyPress={handleKeyboardEffects}
        onKeyboardRender={onKeyboardRender}
      />
      <ActionButtons
        handleDismissTip={handleDismissTip}
        isAutoTyping={isAutoTyping}
        text={text}
      />

      {/* HIDDEN ELEMENTS */}
      {!isMobile && soundEnabled && <SoundEffects soundRef={soundRef} />}
      {!isMobileContact && (
        <HiddenTextArea handleUserKeystroke={handleUserKeystroke} text={text} />
      )}
      <div id="InteractivityBlocker" />

      {/* MOBILE CONTACT FORM FLOW */}
      {isMobileContact && (
        <MobileContactDialog
          setText={setText}
          text={text}
          isAutoTyping={isAutoTyping}
          progress={progress}
          setProgress={setProgress}
          suggestionText={suggestionText}
          typeBlock={typeBlock}
        />
      )}
    </div>
  );
}
