import { useRef } from "react";
import { SoundEffectName } from "@shared";
import { KeyboardReactInterface } from "react-simple-keyboard";

/**
 * USE TYPEWRITER REFS | hidey-hole for a lot of boilerplate typewriter code.
 */
export default function useTypewriterRefs() {
  const keyRefs = useRef<Element[]>([]);
  const hammerRef = useRef<HTMLDivElement>(null);
  const linkageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const spaceLinkagesRef = useRef<HTMLDivElement[]>([]);
  const keyboardInstanceRef = useRef<KeyboardReactInterface | null>(null);
  const keyboardRef = (instance: KeyboardReactInterface | null) => {
    keyboardInstanceRef.current = instance;
  };

  // Store sound FX fns in a ref to avoid re-renders
  const soundRef = useRef<((soundType: SoundEffectName) => void) | null>(null);

  // When the plugin renders, collect elements into refs for a sizeable performance gain.
  function onKeyboardRender() {
    keyRefs.current = Array.from(document.querySelectorAll(".hg-button"));
    spaceLinkagesRef.current = Array.from(
      document.querySelectorAll(".linkage-mechanism-space")
    ) as HTMLDivElement[];
  }

  return {
    // YES, this is a ref, but we don't need if anywhere else.
    keyboardInstanceRef,
    // Plugin fn that only is used in that one place
    onKeyboardRender,

    // These refs are all used in the base Typewriter component.
    typewriterRefs: {
      hammerRef,
      keyboardRef,
      keyRefs,
      linkageRefs,
      soundRef,
      spaceLinkagesRef,
    },
  };
}
