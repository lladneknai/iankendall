import { TreeViewBaseItem } from "@mui/x-tree-view";
import { UserAgent } from "@shared";

export interface AppState {
  //
  // GENERAL STATE
  //
  isAppInitialized: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  setTheme: (theme: string) => void;
  theme: string;

  //
  // TYPERWRITER INTERACTION STATE
  //
  isActive: boolean;
  isAtLimit: boolean;
  clearTypewriterResetRequested: () => void;
  requestTypewriterReset: () => void;
  setIsActive: (isActive: boolean) => void;
  setIsAtLimit: (setIsAtLimit: boolean) => void;
  shouldShowReEnable: () => boolean;
  typewriterResetRequested: boolean;

  //
  // MESSAGE/CONTACT STATE
  //
  hasSentMessage: boolean;
  isSendingMessage: boolean;
  savedMessage: string;
  setHasSentMessage: (hasSent: boolean) => void;
  setIsSendingMessage: (isSendingMessage: boolean) => void;
  setSavedMessage: (savedMessage: string) => void;

  //
  // MOBILE / USER AGENT STATE
  //
  isMobile: boolean;
  isWelcomeComplete: boolean;
  setIsMobile: (isMobile: boolean) => void;
  setIsWelcomeComplete: (isComplete: boolean) => void;
  setUserAgent: (agent: UserAgent) => void;
  userAgent: UserAgent;
}

export interface AudioStore {
  isAudioPrimed: boolean;
  primeAudio: () => void;
  primingAudio: HTMLAudioElement;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

// TODO: this will change considerably once the code store is clean't up.
export interface CodeState {
  // VARAIBLES
  expandedItems: string[];
  filename: string;
  filetype: string;
  fileTreeItems: TreeViewBaseItem[];
  fileTreeShown: boolean;
  fullscreen: boolean;
  loading: boolean;
  minimized: boolean;
  open: boolean;
  text: string;
  theme: string;

  // METHODS
  setExpandedItems: (expandedItems: string[]) => void;
  setFilename: (filename: string) => void;
  setFiletype: (filetype: string) => void;
  setFileTreeItems: (fileTreeItems: TreeViewBaseItem[]) => void;
  setFileTreeShown: (fileTreeShown: boolean) => void;
  setFullscreen: (fullscreen: boolean) => void;
  setLoading: (loading: boolean) => void;
  setMinimized: (minimized: boolean) => void;
  setOpen: (open: boolean) => void;
  setText: (text: string) => void;
  setTheme: (text: string) => void;
}

type SendProgress =
  | ""
  | "create"
  | "preSend"
  | "isSending"
  | "hasSent"
  | "error";

export interface SendMessageState {
  handleCancelSend: () => void;
  handleRequestSendMessage: (text: string) => void;
  handleReset: (setText: (text: string) => void) => Promise<void>;
  handleViewCode: () => void;
  reset: () => void;
  sendProgress: SendProgress;
  setSendProgress: (progress: SendProgress) => void;
}
