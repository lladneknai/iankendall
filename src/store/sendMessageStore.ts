import { create } from "zustand";
import { useAppStore } from "./appStore";
import { useCodeStore } from "./codeStore";
import { wait } from "@/util/promises";
import { SendMessageState } from "./types";

/**
 * SEND MESSAGE STORE
 * ------------------
 * - Minimal store for cross-component coordination of send message flow
 * - Tracks ONLY the progress state that multiple components need to know about
 * - Implementation details (form logic, validation, etc.) live in @hooks/useSendMessageDialog
 */

export const useSendMessageStore = create<SendMessageState>((set) => ({
  // Called when user closes dialog without sending
  handleCancelSend: async () => {
    useAppStore.getState().setSavedMessage(""); // Clear saved message
    useAppStore.getState().setIsSendingMessage(false);
    useAppStore.getState().setIsActive(true);

    await wait(250); // Wait for the close animation to complete.
    set({ sendProgress: "" });
  },

  // Called by ActionButtons when user clicks "Send Message"
  handleRequestSendMessage: (text: string) => {
    useAppStore.getState().setSavedMessage(text); // Save message for dialog
    useAppStore.getState().setIsSendingMessage(true); // Open dialog
    set({ sendProgress: "preSend" }); // Show form
  },

  // Called by ActionButtons when user clicks "Reset" (temporary - will move to typewriter)
  // Resets typewriter AND cancels contact flow if in progress
  handleReset: async (setText: (text: string) => void) => {
    // Clear typewriter text
    setText("");

    // Cancel contact flow and reset all state
    useAppStore.getState().setSavedMessage(""); // Clear saved message
    useAppStore.getState().setIsSendingMessage(false); // Close dialog if open
    useAppStore.getState().setIsActive(true); // Reactivate typewriter

    await wait(250); // Wait for any animations to complete
    set({ sendProgress: "" }); // Reset send progress to starting point
  },

  // Called by ActionButtons when user clicks "Source Code"
  handleViewCode: () => {
    useCodeStore.getState().setOpen(true);
  },

  // Reset all state
  reset: () => {
    set({ sendProgress: "" });
  },

  // Send progress keeps track of where the user is at in the send flow
  sendProgress: "",
  setSendProgress: (sendProgress) => set({ sendProgress }),
}));
