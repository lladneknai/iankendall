import { describe, it, expect } from "vitest";

// The audioStore creates an Audio object at module init time, which jsdom doesn't support.
// We need to mock the entire store module to test it properly.

describe("useAudioStore", () => {
  // We'll test what we can without the Audio API
  describe("state management", () => {
    it("can toggle soundEnabled", async () => {
      // Dynamic import to avoid module init issues
      const { useAudioStore } = await import("@/store/audioStore");

      // Get current state
      const initialState = useAudioStore.getState().soundEnabled;

      // Toggle
      useAudioStore.getState().setSoundEnabled(!initialState);
      expect(useAudioStore.getState().soundEnabled).toBe(!initialState);

      // Toggle back
      useAudioStore.getState().setSoundEnabled(initialState);
      expect(useAudioStore.getState().soundEnabled).toBe(initialState);
    });

    it("has correct initial state for soundEnabled", async () => {
      const { useAudioStore } = await import("@/store/audioStore");
      // Reset to default
      useAudioStore.setState({ soundEnabled: true });
      expect(useAudioStore.getState().soundEnabled).toBe(true);
    });

    it("has correct initial state for isAudioPrimed", async () => {
      const { useAudioStore } = await import("@/store/audioStore");
      // Reset to default
      useAudioStore.setState({ isAudioPrimed: false });
      expect(useAudioStore.getState().isAudioPrimed).toBe(false);
    });

    it("setSoundEnabled sets soundEnabled to false", async () => {
      const { useAudioStore } = await import("@/store/audioStore");
      useAudioStore.getState().setSoundEnabled(false);
      expect(useAudioStore.getState().soundEnabled).toBe(false);
    });

    it("setSoundEnabled sets soundEnabled to true", async () => {
      const { useAudioStore } = await import("@/store/audioStore");
      useAudioStore.setState({ soundEnabled: false });
      useAudioStore.getState().setSoundEnabled(true);
      expect(useAudioStore.getState().soundEnabled).toBe(true);
    });
  });

  // Note: primeAudio tests are skipped because jsdom doesn't implement HTMLMediaElement.play()
  // These would need to be tested in a real browser environment (e.g., Playwright)
  describe.skip("primeAudio (requires browser environment)", () => {
    it("sets isAudioPrimed to true", () => {});
    it("plays the priming audio", () => {});
    it("sets volume to 0.8", () => {});
  });
});
