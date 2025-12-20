//
// BASE TYPEWRITER CONFIG
//
export const MAX_LINES = 16;
export const DING_LENGTH = 44;
export const CHARS_PER_LINE = 49;
export const CHARS_PER_LINE_MOBILE = 34;
export const MAX_CHARS = MAX_LINES * CHARS_PER_LINE;
export const MIN_SEND_LENGTH = 50;

//
// PAPER STYLE CONFIG
//
export const CHAR_WIDTH = 8;
export const HEIGHT_OFFSET = 32;
export const LINE_HEIGHT = 20;

//
// AUTOCOMPLETE CONFIG
//
export const CONTACT_INIT_DELAY = 500; // Delay to start typing on page init
export const AWAIT_PROMPT_DELAY = 750; // Delay after which a [prompt] is shown
export const AUTO_COMPLETE_DELAY = 2000; // Delay after which an autocomplete prompt is suggested
export const BASE_TYPEWRITER_SPEED = 80; // Speed of auto-typing (randomized)

// Suggestions that, if accepted, are auto-typed
export const AUTO_COMPLETE_BLOCKS = [
  "Dear Ian,\n \nMy name is ",
  "I am contacting you on behalf of ",
  "I'd like to talk to you about ",
  "The best way to reach me is ",
  "Cheers!\n  - ",
  // "one",
  // "two",
  // "three",
  // "four",
  // "five",
];

export const AUTO_COMPLETE_BLOCKS_MOBILE = [
  "Dear Ian,\nMy name is ",
  "I work for ",
  "I'm reaching out about ",
  "You can reach me at ",
];

// Prompt config (what the user should type)
export const AUTO_COMPLETE_PROMPTS = [
  "[your name]",
  "[your company]",
  "[something cool]",
  "[phone or email]",
  "[salutation]",
];

export const MOBILE_INIT_TEXT =
  "Oh, hello.\nMy name is Ian.\nI like to make things\non the Internet.";
