/**
 * API | Utils | Generic utility functions
 * - Reusable functions that are not big enough to warrant dedicated full file
 */

/**
 * Check if an object is empty.
 * Could I use lodash for this? Absolutely. Do I want or need to? Nope.
 */
export function isEmpty(obj) {
  if (obj === null || typeof obj !== "object") {
    return false;
  }

  return Object.keys(obj).length === 0;
}

/**
 * Check if a filename has an image extension
 */
export function isImageFiletype(filename: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(filename);
}
