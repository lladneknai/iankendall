import { ReactNode } from "react";

/**
 * SHARED TYPES
 * - Interfaces and types used in various places throughout the app
 * - Declared here to avoid dependency ordering issues and increase legibility
 */

export interface ChildrenProps {
  children: ReactNode;
}

export interface CollapsibleProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export interface FormFieldProps<T extends Record<string, any>> {
  data: T;
  name: keyof T;
  updateField: (key: keyof T, value: any) => void;
}

export interface MouseHoverHandlers {
  handleMouseIn: (key: string) => void;
  handleMouseOut: () => void;
}

export interface PaperStyles {
  height: number;
  right: number;
  top: number;
}

export type SetEditorFn = (editor: "description" | "content") => void;

export type SoundEffectName = "clunk" | "ding" | "keystroke";

export interface TypewriterFlowProps {
  isAutoTyping: boolean;
  progress: number;
  setProgress: (progress: number) => void;
  setText: (text: string) => void;
  suggestionText?: string;
  text: string;
  typeBlock: (block: string) => void;
}

export type UpdateFieldFn = (key: string, value: any) => void;

export interface UserAgent {
  browser: string;
  os: string;
}
