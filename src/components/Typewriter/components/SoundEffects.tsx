import { useRef, useMemo, useCallback, useEffect } from "react";
import { useAudioStore } from "@store/audioStore";
import { SoundEffectName } from "@shared";
import typewriterDing from "/mp3/ding.mp3";
import typewriterClunk from "/mp3/clunk-quieter.mp3";

// TODO: play with the sounds. See which one you like best.
import typewriterKeystroke from "/mp3/key2-5db.mp3";
// import typewriterKeystroke from "/mp3/keystroke.mp3";

/**
 * TYPEWRITER | Sound Effects
 * - Manages audio pools for typewriter sound effects (local for performance)
 * - Checks soundEnabled from store when playing (no subscription overhead)
 */
export default function SoundEffects({
  soundRef,
}: {
  soundRef: React.MutableRefObject<
    ((soundType: SoundEffectName) => void) | null
  >;
}) {
  const audioPools = useMemo(() => {
    const createAudioPool = (src: string, poolSize: number) => {
      const pool: HTMLAudioElement[] = [];
      for (let i = 0; i < poolSize; i++) {
        const audio = new Audio(src);
        audio.preload = "auto";
        audio.volume = 0.6;
        pool.push(audio);
      }
      return pool;
    };

    return {
      ding: createAudioPool(typewriterDing, 2),
      clunk: createAudioPool(typewriterClunk, 4),
      keystroke: createAudioPool(typewriterKeystroke, 16),
    };
  }, []);

  const currentIndex = useRef({
    ding: 0,
    clunk: 0,
    keystroke: 0,
  });

  const playSound = useCallback(
    (soundType: SoundEffectName) => {
      // Check if sound is enabled (direct store read, no subscription)
      const soundEnabled = useAudioStore.getState().soundEnabled;
      if (!soundEnabled) {
        return;
      }

      const pool = audioPools[soundType];
      if (!pool) {
        console.warn(`No audio pool found for sound type: ${soundType}`);
        return;
      }

      const index = currentIndex.current[soundType];
      const audio = pool[index];

      audio.currentTime = 0;
      audio
        .play()
        .catch((err) =>
          console.warn(`Failed to play ${soundType} sound:`, err)
        );
      currentIndex.current[soundType] = (index + 1) % pool.length;
    },
    [audioPools]
  );

  // Set the ref to our playSound function
  useEffect(() => {
    soundRef.current = playSound;
  }, [playSound]);

  return <div id="TypewriterSounds" />;
}
