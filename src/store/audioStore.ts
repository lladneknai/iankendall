import { create } from "zustand";
import wooshSound from "/mp3/woosh.mp3";
import { AudioStore } from "./types";

/**
 * GLOBAL AUDIO STORE
 * ------------------
 * - Provide sound FX for the app
 * - Invoked in component-level @hooks
 * - Can be toggled via Menu -> Enable/Disable sound FX
 */

export const useAudioStore = create<AudioStore>((set, get) => ({
  isAudioPrimed: false,
  primingAudio: new Audio(wooshSound), // Single audio element for priming (unlocking browser audio context)

  /**
   * Prime audio context by playing a single ding sound.
   * Called when user clicks Contact button (user gesture unlocks audio).
   */
  primeAudio: () => {
    const { primingAudio } = get();
    primingAudio.volume = 0.8;
    primingAudio
      .play()
      .then(() => {
        console.log("[audioStore] Audio context unlocked!");
      })
      .catch((err) => {
        console.warn("[audioStore] Failed to prime audio:", err);
      });

    set({ isAudioPrimed: true });
  },

  // Global sound toggle
  soundEnabled: true,
  setSoundEnabled: (soundEnabled: boolean) => {
    set({ soundEnabled });
  },
}));
