import { wait } from "./promises";

/**
 * Given @param route, return whether the typewriter should be activated
 */
export function isTypewriterRoute(route: string) {
  const TYPEWRITER_ROUTES = new Set(["", "home", "contact"]);
  if (!TYPEWRITER_ROUTES.has(route)) {
    return false;
  } else {
    return true;
  }
}

export const focusTextArea = async () => {
  await wait(50);
  const el = document.querySelector("#HiddenTextArea") as any;
  if (el) {
    el.focus();
  }
};
