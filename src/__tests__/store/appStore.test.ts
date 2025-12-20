import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAppStore } from "@/store/appStore";

// Mock the dependencies
vi.mock("@/util/promises", () => ({
  wait: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/util/typewriter", () => ({
  focusTextArea: vi.fn(),
}));

vi.mock("@/store/codeStore", () => ({
  useCodeStore: () => ({ open: false }),
}));

describe("useAppStore", () => {
  beforeEach(() => {
    // Reset the store to initial state before each test
    useAppStore.setState({
      isMenuOpen: false,
      theme: "default",
      isAppInitialized: false,
      isMobile: false,
      isWelcomeComplete: false,
      userAgent: { browser: "", os: "" },
      isActive: true,
      isAtLimit: false,
      isSendingMessage: false,
      hasSentMessage: false,
      savedMessage: "",
      typewriterResetRequested: false,
    });
  });

  describe("initial state", () => {
    it("has correct initial values", () => {
      const state = useAppStore.getState();

      expect(state.isMenuOpen).toBe(false);
      expect(state.theme).toBe("default");
      expect(state.isAppInitialized).toBe(false);
      expect(state.isMobile).toBe(false);
      expect(state.isActive).toBe(true);
    });
  });

  describe("menu state", () => {
    it("setIsMenuOpen updates isMenuOpen", async () => {
      const { setIsMenuOpen } = useAppStore.getState();

      await setIsMenuOpen(true);
      expect(useAppStore.getState().isMenuOpen).toBe(true);

      await setIsMenuOpen(false);
      expect(useAppStore.getState().isMenuOpen).toBe(false);
    });
  });

  describe("theme", () => {
    it("setTheme updates theme", () => {
      const { setTheme } = useAppStore.getState();

      setTheme("dark");
      expect(useAppStore.getState().theme).toBe("dark");

      setTheme("light");
      expect(useAppStore.getState().theme).toBe("light");
    });
  });

  describe("mobile state", () => {
    it("setIsMobile updates isMobile", () => {
      const { setIsMobile } = useAppStore.getState();

      setIsMobile(true);
      expect(useAppStore.getState().isMobile).toBe(true);

      setIsMobile(false);
      expect(useAppStore.getState().isMobile).toBe(false);
    });
  });

  describe("user agent", () => {
    it("setUserAgent updates userAgent and sets isAppInitialized", () => {
      const { setUserAgent } = useAppStore.getState();
      const userAgent = { browser: "Chrome", os: "macOS" };

      setUserAgent(userAgent);

      const state = useAppStore.getState();
      expect(state.userAgent).toEqual(userAgent);
      expect(state.isAppInitialized).toBe(true);
    });
  });

  describe("welcome state", () => {
    it("setIsWelcomeComplete updates isWelcomeComplete", () => {
      const { setIsWelcomeComplete } = useAppStore.getState();

      setIsWelcomeComplete(true);
      expect(useAppStore.getState().isWelcomeComplete).toBe(true);
    });
  });

  describe("typewriter state", () => {
    it("setIsActive updates isActive", async () => {
      const { setIsActive } = useAppStore.getState();

      await setIsActive(false);
      expect(useAppStore.getState().isActive).toBe(false);

      await setIsActive(true);
      expect(useAppStore.getState().isActive).toBe(true);
    });

    it("setIsAtLimit updates isAtLimit", () => {
      const { setIsAtLimit } = useAppStore.getState();

      setIsAtLimit(true);
      expect(useAppStore.getState().isAtLimit).toBe(true);

      setIsAtLimit(false);
      expect(useAppStore.getState().isAtLimit).toBe(false);
    });

    it("requestTypewriterReset sets typewriterResetRequested to true", () => {
      const { requestTypewriterReset } = useAppStore.getState();

      requestTypewriterReset();
      expect(useAppStore.getState().typewriterResetRequested).toBe(true);
    });

    it("clearTypewriterResetRequested sets typewriterResetRequested to false", () => {
      useAppStore.setState({ typewriterResetRequested: true });
      const { clearTypewriterResetRequested } = useAppStore.getState();

      clearTypewriterResetRequested();
      expect(useAppStore.getState().typewriterResetRequested).toBe(false);
    });
  });

  describe("message state", () => {
    it("setHasSentMessage updates hasSentMessage", () => {
      const { setHasSentMessage } = useAppStore.getState();

      setHasSentMessage(true);
      expect(useAppStore.getState().hasSentMessage).toBe(true);
    });

    it("setSavedMessage updates savedMessage", () => {
      const { setSavedMessage } = useAppStore.getState();

      setSavedMessage("Hello world");
      expect(useAppStore.getState().savedMessage).toBe("Hello world");
    });

    it("setIsSendingMessage updates isSendingMessage", async () => {
      const { setIsSendingMessage } = useAppStore.getState();

      await setIsSendingMessage(true);
      expect(useAppStore.getState().isSendingMessage).toBe(true);
    });
  });

  describe("shouldShowReEnable", () => {
    it("returns true when isActive is false and not mobile/sending", () => {
      useAppStore.setState({
        isActive: false,
        isMobile: false,
        isSendingMessage: false,
      });

      const { shouldShowReEnable } = useAppStore.getState();
      expect(shouldShowReEnable()).toBe(true);
    });

    it("returns false when isActive is true", () => {
      useAppStore.setState({
        isActive: true,
        isMobile: false,
        isSendingMessage: false,
      });

      const { shouldShowReEnable } = useAppStore.getState();
      expect(shouldShowReEnable()).toBe(false);
    });

    it("returns false when isMobile is true", () => {
      useAppStore.setState({
        isActive: false,
        isMobile: true,
        isSendingMessage: false,
      });

      const { shouldShowReEnable } = useAppStore.getState();
      expect(shouldShowReEnable()).toBe(false);
    });

    it("returns false when isSendingMessage is true", () => {
      useAppStore.setState({
        isActive: false,
        isMobile: false,
        isSendingMessage: true,
      });

      const { shouldShowReEnable } = useAppStore.getState();
      expect(shouldShowReEnable()).toBe(false);
    });
  });
});

