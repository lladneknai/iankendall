import { describe, it, expect } from "vitest";
import { ucFirst, lorem } from "@/util/text";

describe("ucFirst", () => {
  it("capitalizes the first letter of a string", () => {
    expect(ucFirst("hello")).toBe("Hello");
  });

  it("handles already capitalized strings", () => {
    expect(ucFirst("Hello")).toBe("Hello");
  });

  it("handles single character strings", () => {
    expect(ucFirst("a")).toBe("A");
  });

  it("handles empty string", () => {
    expect(ucFirst("")).toBe("");
  });

  it("handles undefined (defaults to empty string)", () => {
    expect(ucFirst(undefined)).toBe("");
  });

  it("preserves the rest of the string", () => {
    expect(ucFirst("hELLO wORLD")).toBe("HELLO wORLD");
  });

  it("handles strings starting with numbers", () => {
    expect(ucFirst("123abc")).toBe("123abc");
  });

  it("handles strings with spaces", () => {
    expect(ucFirst(" hello")).toBe(" hello");
  });
});

describe("lorem", () => {
  it("returns a string", () => {
    const result = lorem();
    expect(typeof result).toBe("string");
  });

  it("returns a non-empty string", () => {
    const result = lorem();
    expect(result.length).toBeGreaterThan(0);
  });

  it("returns a single line (no newlines)", () => {
    const result = lorem();
    expect(result).not.toContain("\n");
  });

  it("returns lorem ipsum text", () => {
    // Run multiple times to check randomness doesn't break it
    for (let i = 0; i < 10; i++) {
      const result = lorem();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    }
  });
});


