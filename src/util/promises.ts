/**
 * Delay execution by @param ms.
 * I just got sick of typing this everywhere.
 */
export async function wait(ms = 500) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
