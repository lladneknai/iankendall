import { describe, it, expect } from "vitest";
import {
  MIN_SAFE_WIDTH,
  MIN_SAFE_HEIGHT,
  MAX_SAFE_WIDTH,
  MAX_SAFE_HEIGHT,
} from "@/config/desk";

describe("Desk Config", () => {
  describe("minimum safe area", () => {
    it("MIN_SAFE_WIDTH is 850", () => {
      expect(MIN_SAFE_WIDTH).toBe(850);
    });

    it("MIN_SAFE_HEIGHT is 850", () => {
      expect(MIN_SAFE_HEIGHT).toBe(850);
    });

    it("minimum dimensions are equal (square safe area)", () => {
      expect(MIN_SAFE_WIDTH).toBe(MIN_SAFE_HEIGHT);
    });
  });

  describe("maximum safe area", () => {
    it("MAX_SAFE_WIDTH is 1350", () => {
      expect(MAX_SAFE_WIDTH).toBe(1350);
    });

    it("MAX_SAFE_HEIGHT is 600", () => {
      expect(MAX_SAFE_HEIGHT).toBe(600);
    });

    it("max width is larger than height (landscape orientation)", () => {
      expect(MAX_SAFE_WIDTH).toBeGreaterThan(MAX_SAFE_HEIGHT);
    });
  });

  describe("logical constraints", () => {
    it("MAX_SAFE_WIDTH > MIN_SAFE_WIDTH", () => {
      expect(MAX_SAFE_WIDTH).toBeGreaterThan(MIN_SAFE_WIDTH);
    });

    it("MIN_SAFE_HEIGHT > MAX_SAFE_HEIGHT (because min is square)", () => {
      expect(MIN_SAFE_HEIGHT).toBeGreaterThan(MAX_SAFE_HEIGHT);
    });
  });
});
