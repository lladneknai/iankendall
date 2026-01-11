import { create } from "zustand";
import { wait } from "@/util/promises";
import { focusTextArea } from "@/util/typewriter";
import { UserAgent } from "@shared";
import { AppState } from "./types";
import { useCodeStore } from "./codeStore";

/**
 * GLOBAL APPLICATION STORE
 * ------------------------
 * - Shared store for appwide state
 * - See @hooks for component-specific logic
 */
export const useAppStore = create<AppState>((set, get) => ({
  //
  // GENERAL STATE
  //
  isMenuOpen: false,
  theme: "default",
  setIsMenuOpen: async (isMenuOpen: boolean) => {
    set({ isMenuOpen });
  },
  setTheme: (theme: string) => {
    set({ theme });
  },

  //
  // INIT / USER AGENT / MOBILE STATE
  // - Many mobile-specific styles / components are rendered
  // - On load, we pick up the user agent, and use that in decision-making
  //
  isAppInitialized: false,
  // isMobile: true,
  isMobile: false,
  isWelcomeComplete: false,
  userAgent: {
    browser: "",
    os: "",
  } as UserAgent,
  setIsMobile: (isMobile: boolean) => {
    // set({ isMobile: true });
    set({ isMobile });
  },
  setIsWelcomeComplete: (isWelcomeComplete: boolean) => {
    set({ isWelcomeComplete });
  },
  setUserAgent: (userAgent: UserAgent) => {
    set({
      userAgent,
      isAppInitialized: true, // todo: seems to be initializing too early to show <AppLoading />
    });
  },

  //
  // TYPERWRITER INTERACTION STATE
  // - The guts of the typewriter logic are NOT stored here
  // - Instead, we use hooks and props to improve efficiency and avoid "God Objects"
  // - However, there is a decent bit of SHARED functionality - all that stuff lives here.
  //
  isActive: true,
  isAtLimit: false,
  isSendingMessage: false,
  hasSentMessage: false,
  savedMessage: "",
  shouldShowReEnable: () => {
    const { open: codeWindowOpen } = useCodeStore();
    const { isActive, isMobile, isSendingMessage } = get();
    return !isActive && !isMobile && !isSendingMessage && !codeWindowOpen;
  },
  typewriterResetRequested: false,
  clearTypewriterResetRequested: () => {
    set({ typewriterResetRequested: false });
  },
  requestTypewriterReset: () => {
    set({ typewriterResetRequested: true });
  },
  setHasSentMessage: (hasSentMessage: boolean) => set({ hasSentMessage }),
  setIsActive: async (isActive: boolean) => {
    set({ isActive });
    if (isActive) {
      await wait(100);
      focusTextArea();
    }
  },
  setIsAtLimit: (isAtLimit: boolean) => {
    set({ isAtLimit });
  },
  setIsSendingMessage: async (isSendingMessage: boolean) =>
    set({ isSendingMessage }),
  setSavedMessage: (savedMessage: string) => set({ savedMessage }),
}));
