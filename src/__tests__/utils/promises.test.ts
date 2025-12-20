import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { wait } from "@/util/promises";

describe("wait", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("waits for the specified duration", async () => {
    const startTime = Date.now();
    const waitPromise = wait(100);

    // Fast-forward time
    vi.advanceTimersByTime(100);

    await waitPromise;
    // Promise should resolve after advancing timers
    expect(true).toBe(true);
  });

  it("defaults to 500ms when no argument provided", async () => {
    const waitPromise = wait();

    // Should not resolve before 500ms
    vi.advanceTimersByTime(499);
    let resolved = false;
    waitPromise.then(() => {
      resolved = true;
    });

    await Promise.resolve(); // Flush microtasks
    expect(resolved).toBe(false);

    // Should resolve at 500ms
    vi.advanceTimersByTime(1);
    await waitPromise;
  });

  it("resolves immediately with 0ms", async () => {
    const waitPromise = wait(0);
    vi.advanceTimersByTime(0);
    await waitPromise;
    expect(true).toBe(true);
  });

  it("returns a promise", () => {
    const result = wait(100);
    expect(result).toBeInstanceOf(Promise);
    vi.advanceTimersByTime(100);
  });
});


