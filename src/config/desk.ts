//
// DESK SIZING CONFIG
// - These constraints power the JS scaling logic in `useDeskSize`
// - Use this file to easily tweak the "safe area" occupied by the Typewriter
//

//
// MINIMUM SAFE AREA CONSTRAINTS
// -----------------------------
// - Desk will SHRINK to respect these dimensions
// - The typewriter will be scaled DOWN when the width or height ENCROACHESE these dimensions
//
export const MIN_SAFE_WIDTH = 750;
export const MIN_SAFE_HEIGHT = 850;

//
// MAXIMUM SAFE AREA CONSTRAINTS
// -----------------------------
// - Desk will EXPAND according to these dimensions
// - The typewriter will be scaled UP when the width or height EXCEEDS these dimensions
export const MAX_SAFE_WIDTH = 1350;
export const MAX_SAFE_HEIGHT = 600;
