import { describe, it, expect, beforeEach, vi } from "vitest";
import { useSendMessageStore } from "@/store/sendMessageStore";
import { useAppStore } from "@/store/appStore";

// Mock dependencies
vi.mock("@/util/promises", () => ({
  wait: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/store/codeStore", () => ({
  useCodeStore: Object.assign(
    () => ({ open: false, setOpen: vi.fn() }),
    {
      getState: () => ({ open: false, setOpen: vi.fn() }),
    }
  ),
}));

vi.mock("@/util/typewriter", () => ({
  focusTextArea: vi.fn(),
}));

describe("useSendMessageStore", () => {
  beforeEach(() => {
    // Reset stores
    useSendMessageStore.setState({ sendProgress: "" });
    useAppStore.setState({
      savedMessage: "",
      isSendingMessage: false,
      isActive: true,
    });
  });

  describe("initial state", () => {
    it("has empty sendProgress initially", () => {
      const state = useSendMessageStore.getState();
      expect(state.sendProgress).toBe("");
    });
  });

  describe("setSendProgress", () => {
    it("updates sendProgress", () => {
      const { setSendProgress } = useSendMessageStore.getState();

      setSendProgress("preSend");
      expect(useSendMessageStore.getState().sendProgress).toBe("preSend");

      setSendProgress("sending");
      expect(useSendMessageStore.getState().sendProgress).toBe("sending");

      setSendProgress("sent");
      expect(useSendMessageStore.getState().sendProgress).toBe("sent");
    });
  });

  describe("handleRequestSendMessage", () => {
    it("saves message and opens dialog", () => {
      const { handleRequestSendMessage } = useSendMessageStore.getState();

      handleRequestSendMessage("Hello, world!");

      expect(useAppStore.getState().savedMessage).toBe("Hello, world!");
      expect(useAppStore.getState().isSendingMessage).toBe(true);
      expect(useSendMessageStore.getState().sendProgress).toBe("preSend");
    });
  });

  describe("handleCancelSend", () => {
    it("clears message and closes dialog", async () => {
      // Setup initial state
      useAppStore.setState({
        savedMessage: "Some message",
        isSendingMessage: true,
        isActive: false,
      });
      useSendMessageStore.setState({ sendProgress: "preSend" });

      const { handleCancelSend } = useSendMessageStore.getState();
      await handleCancelSend();

      expect(useAppStore.getState().savedMessage).toBe("");
      expect(useAppStore.getState().isSendingMessage).toBe(false);
      expect(useAppStore.getState().isActive).toBe(true);
      expect(useSendMessageStore.getState().sendProgress).toBe("");
    });
  });

  describe("handleReset", () => {
    it("clears text and resets all state", async () => {
      // Setup initial state
      useAppStore.setState({
        savedMessage: "Some message",
        isSendingMessage: true,
        isActive: false,
      });
      useSendMessageStore.setState({ sendProgress: "preSend" });

      const setText = vi.fn();
      const { handleReset } = useSendMessageStore.getState();
      await handleReset(setText);

      expect(setText).toHaveBeenCalledWith("");
      expect(useAppStore.getState().savedMessage).toBe("");
      expect(useAppStore.getState().isSendingMessage).toBe(false);
      expect(useAppStore.getState().isActive).toBe(true);
      expect(useSendMessageStore.getState().sendProgress).toBe("");
    });
  });

  describe("reset", () => {
    it("resets sendProgress to empty string", () => {
      useSendMessageStore.setState({ sendProgress: "sent" });

      const { reset } = useSendMessageStore.getState();
      reset();

      expect(useSendMessageStore.getState().sendProgress).toBe("");
    });
  });
});


