import { create } from "zustand";
import { CODE_CONFIG } from "@/config/code";
import { TreeViewBaseItem } from "@mui/x-tree-view";
import { CodeState } from "./types";
import { useAppStore } from "./appStore";

/**
 * GLOBAL CODE STORE
 * -----------------
 * - Logic that runs the code window
 * - This was ported over from an old build, hence all the following...
 *
 * TODO: THIS IS A MESS.
 * - It's a "God Object" that knows way too much
 * - It's first on the docket for a refactor... when I get around to
 *   getting rid of the MUI styles on the CodeWindow, I'll get this too,
 */
export const useCodeStore = create<CodeState>((set) => ({
  expandedItems: CODE_CONFIG.DEFAULT_EXPANDED_ITEMS,
  filename: CODE_CONFIG.DEFAULT_FILENAME,
  filetype: CODE_CONFIG.DEFAULT_FILETYPE,
  fileTreeItems: [],
  fileTreeShown: false,
  fullscreen: false,
  loading: false,
  minimized: false,
  open: false,
  text: "",
  theme: CODE_CONFIG.DEFAULT_THEME,

  setExpandedItems: (expandedItems: string[]) => {
    set({ expandedItems });
  },
  setFilename: (filename: string) => {
    set({ filename });
  },
  setFiletype: (filetype: string) => {
    set({ filetype });
  },
  setFileTreeItems: (fileTreeItems: TreeViewBaseItem[]) => {
    set({ fileTreeItems });
  },
  setFileTreeShown: (fileTreeShown: boolean) => {
    set({ fileTreeShown });
  },
  setFullscreen: (fullscreen: boolean) => {
    set({
      fullscreen,
      minimized: false,
      open: true,
    });
  },
  setLoading: (loading: boolean) => {
    set({ loading });
  },
  // TODO: this used to park the window down below. Doesn't anymore. Fix!
  setMinimized: (minimized: boolean) => {
    useAppStore.getState().setIsActive(true);
    set({
      fullscreen: false,
      minimized: minimized,
      open: false,
    });
  },
  setOpen: (open: boolean) => {
    useAppStore.getState().setIsActive(true);
    set({
      fullscreen: false,
      minimized: false,
      open,
      // expandedItems: CODE_CONFIG.DEFAULT_EXPANDED_ITEMS,
      // filename: CODE_CONFIG.DEFAULT_FILENAME,
      // filetype: CODE_CONFIG.DEFAULT_FILETYPE,
    });
  },
  setText: (text: string) => set({ text }),
  setTheme: (theme: string) => set({ theme }),
}));
