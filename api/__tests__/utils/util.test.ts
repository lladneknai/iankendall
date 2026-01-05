import { describe, it, expect } from "vitest";
import { isEmpty, isImageFiletype } from "api/utils/util";

describe("isEmpty", () => {
  it("returns true for empty object", () => {
    expect(isEmpty({})).toBe(true);
  });

  it("returns false for object with properties", () => {
    expect(isEmpty({ foo: "bar" })).toBe(false);
  });

  it("returns false for null", () => {
    expect(isEmpty(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isEmpty(undefined)).toBe(false);
  });

  it("returns false for string", () => {
    expect(isEmpty("hello")).toBe(false);
  });

  it("returns false for number", () => {
    expect(isEmpty(123)).toBe(false);
  });

  it("returns false for array (arrays are objects)", () => {
    // Note: arrays have length property but Object.keys returns indices
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([1, 2, 3])).toBe(false);
  });
});

describe("isImageFiletype", () => {
  describe("valid image extensions", () => {
    it("returns true for .jpg", () => {
      expect(isImageFiletype("photo.jpg")).toBe(true);
    });

    it("returns true for .jpeg", () => {
      expect(isImageFiletype("photo.jpeg")).toBe(true);
    });

    it("returns true for .png", () => {
      expect(isImageFiletype("image.png")).toBe(true);
    });

    it("returns true for .gif", () => {
      expect(isImageFiletype("animation.gif")).toBe(true);
    });

    it("returns true for .webp", () => {
      expect(isImageFiletype("modern.webp")).toBe(true);
    });

    it("returns true for .svg", () => {
      expect(isImageFiletype("icon.svg")).toBe(true);
    });

    it("is case-insensitive", () => {
      expect(isImageFiletype("photo.JPG")).toBe(true);
      expect(isImageFiletype("photo.PNG")).toBe(true);
      expect(isImageFiletype("photo.Jpeg")).toBe(true);
    });
  });

  describe("invalid extensions", () => {
    it("returns false for .txt", () => {
      expect(isImageFiletype("document.txt")).toBe(false);
    });

    it("returns false for .pdf", () => {
      expect(isImageFiletype("document.pdf")).toBe(false);
    });

    it("returns false for .js", () => {
      expect(isImageFiletype("script.js")).toBe(false);
    });

    it("returns false for no extension", () => {
      expect(isImageFiletype("filename")).toBe(false);
    });

    it("returns false for directory-like paths", () => {
      expect(isImageFiletype("projects/")).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("handles files with multiple dots", () => {
      expect(isImageFiletype("my.photo.jpg")).toBe(true);
      expect(isImageFiletype("my.file.txt")).toBe(false);
    });

    it("handles full paths", () => {
      expect(isImageFiletype("projects/images/photo.png")).toBe(true);
    });
  });
});
