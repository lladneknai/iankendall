import {
  CHAR_WIDTH,
  CHARS_PER_LINE,
  CHARS_PER_LINE_MOBILE,
  HEIGHT_OFFSET,
  LINE_HEIGHT,
} from "@/config/typing";
import { wait } from "@/util/promises";

//
// PAPER CONFIG
//

export function handleAnimations(elements: Element[]) {
  elements.forEach((el) => el.classList.add("active"));
  setTimeout(() => {
    elements.forEach((el) => el.classList.remove("active"));
  }, 100);
}

// Handle animations for a list of class names (includes DOM query)
export function handleAnimationByClass(className: string, clear = true) {
  const el = document.querySelector(className);
  if (el) {
    el.classList.add("active");
    if (clear) {
      setTimeout(() => {
        el.classList.remove("active");
      }, 100);
    }
  }
}

// TODO: these are a bit sloppy, but we have bigger fish to fry rn.
export async function handleCapsOn() {
  await wait(10);
  const el = document.querySelector(".key-caps");
  if (el) {
    el.classList.add("active");
  }
}
export async function handleCapsOff() {
  await wait(10);
  const el = document.querySelector(".key-caps");
  if (el) {
    el.classList.remove("active");
  }
}

// Build inline styles passed to the paper
export function buildPaperStyles(rows: string[], mobile: boolean = false) {
  const CHARZ = mobile ? CHARS_PER_LINE_MOBILE : CHARS_PER_LINE;
  const currLine = rows[rows.length - 1];
  const right = (currLine.length % CHARZ) * CHAR_WIDTH - 91;
  const height = rows.length * LINE_HEIGHT + HEIGHT_OFFSET;
  const top = -height - LINE_HEIGHT;
  return {
    height,
    right,
    top,
  };
}

// Build rows rendered to the paper
export function buildTypewriterRows(text: string, mobile = false) {
  const result = [];
  const lines = text.split("\n");

  // TODO: there is still something a *hair* off on the newline logic
  // const endsWithNewline = text.slice(-1) === "\n";
  // if (endsWithNewline) {
  // lines.push('');
  // }
  const CHARZ = mobile ? CHARS_PER_LINE_MOBILE : CHARS_PER_LINE;

  for (const line of lines) {
    if (line.length < CHARZ) {
      result.push(line);
    } else {
      for (let i = 0; i < line.length; i += CHARZ) {
        result.push(line.slice(i, i + CHARZ));
      }
    }
  }
  if (result[result.length - 1].length === CHARZ) {
    result.push(""); // Add a blank line to the end at paper limit
  }
  return result;
}

export function isIgnoredKeystroke(event: KeyboardEvent) {
  const isMeta = event.getModifierState("Meta");
  if (isMeta) {
    // console.log("--> IGNORING KEY! (meta)");
    return true; // Return true to ignore
  }
  return false; // Return false to let it pass through
}
