import { describe, it, expect, beforeEach, vi } from "vitest";
import { useCodeStore } from "@/store/codeStore";

// Mock dependencies
vi.mock("@/util/promises", () => ({
  wait: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/util/typewriter", () => ({
  focusTextArea: vi.fn(),
}));

vi.mock("@/config/code", () => ({
  CODE_CONFIG: {
    DEFAULT_EXPANDED_ITEMS: ["src", "api"],
    DEFAULT_FILENAME: "index.ts",
    DEFAULT_FILETYPE: "typescript",
    DEFAULT_THEME: "dracula",
  },
}));

describe("useCodeStore", () => {
  beforeEach(() => {
    // Reset store to initial state
    useCodeStore.setState({
      expandedItems: ["src", "api"],
      filename: "index.ts",
      filetype: "typescript",
      fileTreeItems: [],
      fileTreeShown: false,
      fullscreen: false,
      loading: false,
      minimized: false,
      open: false,
      text: "",
      theme: "dracula",
    });
  });

  describe("initial state", () => {
    it("has correct initial values", () => {
      const state = useCodeStore.getState();

      expect(state.open).toBe(false);
      expect(state.fullscreen).toBe(false);
      expect(state.minimized).toBe(false);
      expect(state.loading).toBe(false);
      expect(state.text).toBe("");
    });
  });

  describe("setters", () => {
    it("setFilename updates filename", () => {
      const { setFilename } = useCodeStore.getState();

      setFilename("App.tsx");
      expect(useCodeStore.getState().filename).toBe("App.tsx");
    });

    it("setFiletype updates filetype", () => {
      const { setFiletype } = useCodeStore.getState();

      setFiletype("javascript");
      expect(useCodeStore.getState().filetype).toBe("javascript");
    });

    it("setText updates text", () => {
      const { setText } = useCodeStore.getState();

      setText("const foo = 'bar';");
      expect(useCodeStore.getState().text).toBe("const foo = 'bar';");
    });

    it("setTheme updates theme", () => {
      const { setTheme } = useCodeStore.getState();

      setTheme("monokai");
      expect(useCodeStore.getState().theme).toBe("monokai");
    });

    it("setLoading updates loading", () => {
      const { setLoading } = useCodeStore.getState();

      setLoading(true);
      expect(useCodeStore.getState().loading).toBe(true);

      setLoading(false);
      expect(useCodeStore.getState().loading).toBe(false);
    });

    it("setExpandedItems updates expandedItems", () => {
      const { setExpandedItems } = useCodeStore.getState();

      setExpandedItems(["src", "components", "hooks"]);
      expect(useCodeStore.getState().expandedItems).toEqual([
        "src",
        "components",
        "hooks",
      ]);
    });

    it("setFileTreeShown updates fileTreeShown", () => {
      const { setFileTreeShown } = useCodeStore.getState();

      setFileTreeShown(true);
      expect(useCodeStore.getState().fileTreeShown).toBe(true);
    });
  });

  describe("window state management", () => {
    it("setOpen opens the window and resets fullscreen/minimized", () => {
      useCodeStore.setState({ fullscreen: true, minimized: true });
      const { setOpen } = useCodeStore.getState();

      setOpen(true);

      const state = useCodeStore.getState();
      expect(state.open).toBe(true);
      expect(state.fullscreen).toBe(false);
      expect(state.minimized).toBe(false);
    });

    it("setFullscreen sets fullscreen and opens window", () => {
      useCodeStore.setState({ minimized: true, open: false });
      const { setFullscreen } = useCodeStore.getState();

      setFullscreen(true);

      const state = useCodeStore.getState();
      expect(state.fullscreen).toBe(true);
      expect(state.minimized).toBe(false);
      expect(state.open).toBe(true);
    });

    it("setMinimized minimizes and closes window", () => {
      useCodeStore.setState({ fullscreen: true, open: true });
      const { setMinimized } = useCodeStore.getState();

      setMinimized(true);

      const state = useCodeStore.getState();
      expect(state.minimized).toBe(true);
      expect(state.fullscreen).toBe(false);
      expect(state.open).toBe(false);
    });
  });
});
