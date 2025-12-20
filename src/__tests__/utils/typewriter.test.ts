import { describe, it, expect } from "vitest";
import { isTypewriterRoute } from "@/util/typewriter";

describe("isTypewriterRoute", () => {
  describe("typewriter-enabled routes", () => {
    it("returns true for empty string (home)", () => {
      expect(isTypewriterRoute("")).toBe(true);
    });

    it("returns true for 'home'", () => {
      expect(isTypewriterRoute("home")).toBe(true);
    });

    it("returns true for 'contact'", () => {
      expect(isTypewriterRoute("contact")).toBe(true);
    });
  });

  describe("non-typewriter routes", () => {
    it("returns false for 'about'", () => {
      expect(isTypewriterRoute("about")).toBe(false);
    });

    it("returns false for 'projects'", () => {
      expect(isTypewriterRoute("projects")).toBe(false);
    });

    it("returns false for 'code'", () => {
      expect(isTypewriterRoute("code")).toBe(false);
    });

    it("returns false for 'sandbox'", () => {
      expect(isTypewriterRoute("sandbox")).toBe(false);
    });

    it("returns false for arbitrary routes", () => {
      expect(isTypewriterRoute("some-random-route")).toBe(false);
    });
  });
});


