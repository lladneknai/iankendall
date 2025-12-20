import { describe, it, expect } from "vitest";
import {
  MAX_LINES,
  DING_LENGTH,
  CHARS_PER_LINE,
  CHARS_PER_LINE_MOBILE,
  MAX_CHARS,
  MIN_SEND_LENGTH,
  CHAR_WIDTH,
  HEIGHT_OFFSET,
  LINE_HEIGHT,
  CONTACT_INIT_DELAY,
  AWAIT_PROMPT_DELAY,
  AUTO_COMPLETE_DELAY,
  BASE_TYPEWRITER_SPEED,
  AUTO_COMPLETE_BLOCKS,
  AUTO_COMPLETE_BLOCKS_MOBILE,
  AUTO_COMPLETE_PROMPTS,
  MOBILE_INIT_TEXT,
} from "@/config/typing";

describe("Typing Config", () => {
  describe("base typewriter config", () => {
    it("MAX_LINES is 16", () => {
      expect(MAX_LINES).toBe(16);
    });

    it("DING_LENGTH is 44", () => {
      expect(DING_LENGTH).toBe(44);
    });

    it("CHARS_PER_LINE is 49", () => {
      expect(CHARS_PER_LINE).toBe(49);
    });

    it("CHARS_PER_LINE_MOBILE is 34", () => {
      expect(CHARS_PER_LINE_MOBILE).toBe(34);
    });

    it("MAX_CHARS equals MAX_LINES * CHARS_PER_LINE", () => {
      expect(MAX_CHARS).toBe(MAX_LINES * CHARS_PER_LINE);
    });

    it("MIN_SEND_LENGTH is 50", () => {
      expect(MIN_SEND_LENGTH).toBe(50);
    });
  });

  describe("paper style config", () => {
    it("CHAR_WIDTH is 8", () => {
      expect(CHAR_WIDTH).toBe(8);
    });

    it("HEIGHT_OFFSET is 32", () => {
      expect(HEIGHT_OFFSET).toBe(32);
    });

    it("LINE_HEIGHT is 20", () => {
      expect(LINE_HEIGHT).toBe(20);
    });
  });

  describe("timing config", () => {
    it("CONTACT_INIT_DELAY is 500ms", () => {
      expect(CONTACT_INIT_DELAY).toBe(500);
    });

    it("AWAIT_PROMPT_DELAY is 750ms", () => {
      expect(AWAIT_PROMPT_DELAY).toBe(750);
    });

    it("AUTO_COMPLETE_DELAY is 2000ms", () => {
      expect(AUTO_COMPLETE_DELAY).toBe(2000);
    });

    it("BASE_TYPEWRITER_SPEED is 80ms", () => {
      expect(BASE_TYPEWRITER_SPEED).toBe(80);
    });
  });

  describe("autocomplete blocks", () => {
    it("AUTO_COMPLETE_BLOCKS is an array", () => {
      expect(Array.isArray(AUTO_COMPLETE_BLOCKS)).toBe(true);
    });

    it("AUTO_COMPLETE_BLOCKS has entries", () => {
      expect(AUTO_COMPLETE_BLOCKS.length).toBeGreaterThan(0);
    });

    it("first block starts with 'Dear Ian'", () => {
      expect(AUTO_COMPLETE_BLOCKS[0]).toMatch(/^Dear Ian/);
    });

    it("AUTO_COMPLETE_BLOCKS_MOBILE is an array", () => {
      expect(Array.isArray(AUTO_COMPLETE_BLOCKS_MOBILE)).toBe(true);
    });

    it("AUTO_COMPLETE_BLOCKS_MOBILE has entries", () => {
      expect(AUTO_COMPLETE_BLOCKS_MOBILE.length).toBeGreaterThan(0);
    });
  });

  describe("prompts", () => {
    it("AUTO_COMPLETE_PROMPTS is an array", () => {
      expect(Array.isArray(AUTO_COMPLETE_PROMPTS)).toBe(true);
    });

    it("all prompts are wrapped in brackets", () => {
      AUTO_COMPLETE_PROMPTS.forEach((prompt) => {
        expect(prompt).toMatch(/^\[.*\]$/);
      });
    });
  });

  describe("mobile init text", () => {
    it("MOBILE_INIT_TEXT is a string", () => {
      expect(typeof MOBILE_INIT_TEXT).toBe("string");
    });

    it("MOBILE_INIT_TEXT contains newlines", () => {
      expect(MOBILE_INIT_TEXT).toContain("\n");
    });
  });
});


