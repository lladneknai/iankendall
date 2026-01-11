import { MutableRefObject, ReactNode, RefObject } from "react";
import { KeyboardReactInterface } from "react-simple-keyboard";
import { EmblaOptionsType } from "embla-carousel";
import type {
  About,
  Project,
  KeyboardLayout,
  ProjectListItem,
  ProjectsOrganized,
} from "./entities";
import type {
  CollapsibleProps,
  FormFieldProps,
  MouseHoverHandlers,
  PaperStyles,
  SoundEffectName,
  TypewriterFlowProps,
  UpdateFieldFn,
} from "./shared";

/**
 * PROP TYPES
 * - Interfaces and types used as component props (alphabetized for legibility)
 * - Some props use shared types directly (ex: ChildrenProps) to avoid over-cluttering
 */

export interface ActionsProps {
  handleSave: () => void;
  isSaving: boolean;
  isUploading: boolean;
  setIsEditing: (value: boolean) => void;
}

export interface CandleProps {
  bottom?: string;
  height?: string;
  width?: string;
}

export interface CarouselProps {
  arrows?: boolean;
  autoplay?: boolean;
  autoplayActive?: boolean;
  caption?: ReactNode | string;
  children: ReactNode[];
  hideControls?: boolean;
  onSelectChange?: (index: number) => void;
  options?: EmblaOptionsType;
  reverse?: boolean;
  selectedIndex?: number;
  slideHeight?: string;
  slideWidth?: string;
  spacing?: string;
}

export interface CarouselControlsProps {
  arrows?: boolean;
  isPlaying?: boolean;
  onDotClick: (index: number) => void;
  onNext: () => void;
  onPlayToggle?: () => void;
  onPrev: () => void;
  selectedIndex: number;
  totalSlides: number;
}

export type CheckboxProps<T extends Record<string, any>> = FormFieldProps<T>;

export interface ContactButtonProps {
  handleContactClick: (e: React.MouseEvent) => void;
}

export interface ContentEditorProps {
  inData: Record<string, any>;
  onSave: (data: Record<string, any>) => void;
  setIsEditing: (isEditing: boolean) => void;
}

export interface FileBrowserProps extends CollapsibleProps {
  isWindow?: boolean;
}

export interface FileInputProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FileViewerProps {
  decrementFontSize: () => void;
  fontSize: number;
  incrementFontSize: () => void;
  isWindow?: boolean;
}

export interface FileViewerActionsProps {
  decrementFontSize: () => void;
  incrementFontSize: () => void;
  isWindow?: boolean;
}

export interface HiddenTextAreaProps {
  handleUserKeystroke: (text: string) => void;
  text: string;
}

export interface IanKendallProps {
  handleIanKendall: () => void;
}

export interface KeyboardProps {
  isActive: boolean;
  keyboardRef: (instance: KeyboardReactInterface | null) => void;
  layoutName: KeyboardLayout;
  onKeyPress: (keyPressed: string) => void;
  onKeyboardRender: () => void;
}

export interface MenuButtonProps {
  handleMenuToggle: () => void;
  isOpen: boolean;
}

export interface MenuItemsProps extends MouseHoverHandlers {
  handleContactClick: (e: React.MouseEvent) => void;
  handleMenuToggle: () => void;
  subtext: string;
}

export interface MenuSubItemsProps {
  handleNewPage: () => void;
  handleToggleSound: () => void;
  subtextShown: boolean;
}

export interface MenuSubtextProps {
  subtext: string;
  subtextShown: boolean;
}

export interface MessageCreationFormProps extends TypewriterFlowProps {
  onFinish: () => void;
}

export interface NamePlateProps {
  hammerRef: RefObject<HTMLDivElement>;
}

export interface NavbarProps {
  handleContactClick: (e: React.MouseEvent) => void;
  handleIanKendall: () => void;
  handleMenuToggle: () => void;
  isOpen: boolean;
  isScrolled: boolean;
}

export interface PaperProps {
  paperStyles: PaperStyles;
  rows: string[];
  suggestionText?: string;
  suggestionTextAc?: string;
}

export interface ProjectProps {
  project: Project;
}

export interface ProjectContentProps {
  isEditing: boolean;
  onSave: () => void;
  project: Project;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProjectDataProps {
  data: Project;
  updateField: UpdateFieldFn;
}

export interface ProjectEditorProps {
  onSave: () => void;
  project: Project;
  setIsEditing: (value: boolean) => void;
}

export interface ProjectHeaderProps {
  isEditing: boolean;
  name: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProjectFiltersProps {
  isSidebar?: boolean;
}

export interface ProjectListProps {
  projectsOrganized: ProjectsOrganized;
  selectProject: (key: string) => void;
}

export interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  distance?: string;
  duration?: string;
  threshold?: number;
}

export interface ProjectPanelProps {
  isFiltering: boolean;
  isTreeShown: boolean;
  projectsOrganized: ProjectsOrganized;
  selectedKey?: string;
  selectProject: (key: string) => void;
  setIsFiltering: (value: boolean) => void;
  setIsTreeVisible: (value: boolean) => void;
}

export interface SoundEffectsToggleProps {
  handleToggleSound: () => void;
}

export type TextFieldProps<T extends Record<string, any>> = FormFieldProps<T>;

export interface TypewriterProps {
  isAutoType?: boolean;
  isDesktopHome?: boolean;
  isMobileContact?: boolean;
}

export interface TypewriterRefs {
  hammerRef: RefObject<HTMLDivElement>;
  keyboardRef: (instance: KeyboardReactInterface | null) => void;
  keyRefs: RefObject<Element[]>;
  linkageRefs: RefObject<Record<string, HTMLDivElement | null>>;
  soundRef: MutableRefObject<((soundType: SoundEffectName) => void) | null>;
  spaceLinkagesRef: RefObject<HTMLDivElement[]>;
}

export interface TypingTipsProps {
  handleDismissTip: () => void;
  paperStyles: PaperStyles;
  tipText: string;
}

export interface UseContentEditorProps {
  inData: About;
  onSave: () => void;
}

export interface UseTypewriterAutoTypingProps {
  handleKeystrokeEffects: (key: string) => void;
  isAutoType: boolean;
  isDesktopHome?: boolean;
  isMobileContact: boolean;
  keyboardInstanceRef: MutableRefObject<KeyboardReactInterface | null>;
  resetKey?: number;
  setText: (text: string | ((prev: string) => string)) => void;
  text: string;
}

export interface UseTypewriterKeyEffectsProps {
  isActive: boolean;
  refs: TypewriterRefs;
}

export interface UseTypewriterRowsProps {
  playSound: ((soundType: SoundEffectName) => void) | null;
  text: string;
}

export interface UseTypingTipsProps {
  ignoreAutocompleteSuggestion: () => void;
  isAutoTypeConcluded: boolean;
  isAutoTyping: boolean;
  isPromptRendered: boolean;
  isSuggestionRendered: boolean;
  progress: number;
  rows: string[];
  suggestionTextAc: string;
}

export interface WysiWygProps {
  editorRef: React.RefObject<any>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  label: string;
  name: string;
  updateField: UpdateFieldFn;
  value: string;
}
