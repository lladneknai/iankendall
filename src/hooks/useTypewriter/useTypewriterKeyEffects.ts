import { useEffect, useState } from "react";
import {
  KeyboardLayout,
  SoundEffectName,
  UseTypewriterKeyEffectsProps,
} from "@shared";
import {
  getSelectedKey,
  shouldAnimateHammer,
} from "@components/Typewriter/lib/keyboard-utils";
import {
  handleAnimationByClass,
  handleAnimations,
  handleCapsOff,
  handleCapsOn,
  isIgnoredKeystroke,
} from "@components/Typewriter/lib/util";

/**
 * USE TYPEWRITER KEY EFFECTS
 * --------------------------
 * - Manage sound effects, animations, and layout changes for the Typewriter
 * - Mounts & unmounts custom event listeners special keydowns/keyups outside of configured typewriter keys
 */
export default function useTypewriterKeyEffects({
  isActive,
  refs,
}: UseTypewriterKeyEffectsProps) {
  const [isCapsLock, setIsCapsLock] = useState(false);
  const layoutName = KeyboardLayout[isCapsLock ? "CAPS" : "DEFAULT"];
  const { hammerRef, keyRefs, linkageRefs, soundRef, spaceLinkagesRef } = refs;

  /**
   * Play a sound effect by key ('clunk' | 'ding' | 'keystroke')
   */
  const playSound = (soundType: SoundEffectName) => {
    soundRef.current?.(soundType);
  };

  /**
   * Find the DOM elements representing the pressed key and its linkage.
   * Add active classes for the key, linkage, and hammer DOM elements (clear after 100ms).
   * Use the `playSound` callback to play the corresponding sound effect for the key pressed.
   */
  function handleKeystrokeEffects(key: string) {
    const { keyElement, linkageElement } = getSelectedKey({
      key,
      keyRefs,
      linkageRefs,
    });

    // Separate handling for the spacebar (it has 4x linkages)
    if (key === "{space}") {
      const linkages = spaceLinkagesRef.current;
      if (!linkages || linkages.length === 0) return;
      handleAnimations([...linkages, keyElement]);
      if (playSound) {
        playSound("keystroke");
        // playSound("clunk");
      }
      return;
    }

    if (!hammerRef.current || !keyElement?.classList || !linkageElement) {
      console.log("[useTypewriterKeyEffects] key UNHANDLED:", {
        key,
        linkageElement,
      });
      return;
    }

    // Handle animations and sound fx
    if (playSound) {
      if (key === "{enter}") {
        playSound("clunk");
      } else {
        playSound("keystroke");
      }
    }
    let elements = [keyElement, linkageElement];
    if (shouldAnimateHammer(key)) {
      elements.push(hammerRef.current);
    }
    handleAnimations(elements);
  }

  /**
   * Handle custom keydown fns by watching all keystrokes.
   * We first check if it's one of these, and apply special handling if so.
   */
  function handleKeydowns(event: globalThis.KeyboardEvent) {
    // Ignore events w/ modifier key, or un-tergeted keys.
    const keydownKeys = ["Backspace", "CapsLock", "Shift"];
    if (isIgnoredKeystroke(event) || !keydownKeys.includes(event.key)) {
      return;
    }

    const { key } = event;
    const userCapsLockEnabled = event.getModifierState("CapsLock");

    if (key === "Backspace") {
      handleAnimationByClass(".key-bksp");
      handleAnimationByClass("#hammer");
      if (playSound) {
        playSound("clunk");
      }
      return;
    }
    if (key === "CapsLock") {
      setIsCapsLock(userCapsLockEnabled);
      if (userCapsLockEnabled) {
        handleCapsOn();
      } else {
        handleCapsOff();
      }
      if (playSound) {
        playSound("clunk");
      }
      return;
    }
    if (key === "Shift" && !userCapsLockEnabled) {
      setIsCapsLock(true); // No need to animate Shift (we rely on layout CSS)
      if (playSound) {
        playSound("clunk");
      }
    }
  }

  /**
   * Handle custom keyup functions. Same as above, but for key release.
   */
  function handleKeyups(event: globalThis.KeyboardEvent) {
    // Ignore events w/ modifier key, or un-tergeted keys.
    const keyupKeys = ["Shift"];
    if (isIgnoredKeystroke(event) || !keyupKeys.includes(event.key)) {
      return;
    }
    const isCapsLockOn = event.getModifierState("CapsLock");
    if (event.key === "Shift" && !isCapsLockOn) {
      setIsCapsLock(false); // No need to animate Shift (we rely on layout CSS)
      if (playSound) {
        playSound("clunk");
      }
    }
  }

  /**
   * When the typewriter is actgive, add key listeners for ALL keydowns and keyups.
   * We mostly early-return from these, but we need special handling for select keys.
   */
  useEffect(() => {
    if (isActive) {
      document.addEventListener("keyup", handleKeyups);
      document.addEventListener("keydown", handleKeydowns);
    }
    return () => {
      document.removeEventListener("keyup", handleKeyups);
      document.removeEventListener("keydown", handleKeydowns);
    };
  }, [isActive]);

  return {
    handleKeystrokeEffects,
    layoutName,
  };
}
