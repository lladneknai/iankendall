import { RefObject } from "react";
import { keyOverrides, linkageOverrides } from "./keyboard-constants";

//
// Get the `data-skbtn` attr of a key. This is used to set the active state of the key.
// This is a simple post-rendor accessor for attributes assigned BY the `react-simple-keyboard` plugin.
//
export function getKeyId(key: string) {
  if (keyOverrides[key]) {
    return keyOverrides[key];
  }
  return key;
}

//
// Get the CSS ID of a linkage element.
// This is used in both generating the markup and setting the active state of the key linkage.
//
export function getLinkageId(key: string) {
  let keyName = key;
  // Linkages are only lowercase; so we LC any UC keys.
  if (key === key.toUpperCase() && key !== key.toLowerCase()) {
    keyName = key.toLowerCase();
  }
  // Transform special-char keys into CSS-readable strings.
  const uniqueId = linkageOverrides[keyName];
  return uniqueId ? `linkage-${uniqueId}` : `linkage-${CSS.escape(keyName)}`;
}

//
// Determine which key a user pressed, and return info on that key and its linkage.
//
export function getSelectedKey({
  key,
  keyRefs,
  linkageRefs,
}: {
  key: string;
  keyRefs?: RefObject<Element[]>;
  linkageRefs?: RefObject<Record<string, HTMLDivElement | null>>;
}) {
  try {
    if (linkageRefs?.current && keyRefs?.current) {
      const keyId = getKeyId(key);
      const linkageId = getLinkageId(key);
      const linkageElement = linkageRefs.current[linkageId];
      const keyElement = keyRefs.current.find(
        (el) => (el as HTMLElement).dataset.skbtn === keyId,
      );
      return {
        keyElement,
        linkageElement,
      };
    }
  } catch {
    console.log("[GetSelectedKey] COULD NOT RETREIVE SELECTED KEY!", key);
  }
  console.log("[GetSelectedKey] COULD NOT RETREIVE SELECTED KEY!", key);
  return {
    keyElement: undefined,
    linkageElement: undefined,
  };
}

//
// Determine if a plugin-handled key should cause the hammer to
//
export function shouldAnimateHammer(key: string) {
  const nonHammeredKeys = ["\n", "Enter", " "];
  return !nonHammeredKeys.includes(key);
}
