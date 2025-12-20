import { describe, it, expect } from "vitest";
import {
  MAX_FILE_SIZE,
  IMAGE_STORAGE_PATH,
  IMAGE_CACHE_MAX_AGE,
  ABOUT_KEY,
  PROJECT_KEY_PREFIX,
  EMAIL_SERVICE,
  EMAIL_SUBJECT,
  DEV_MOCK_DELAY_MS,
} from "api/config";

describe("API Config", () => {
  describe("storage config", () => {
    it("MAX_FILE_SIZE is 5MB", () => {
      expect(MAX_FILE_SIZE).toBe(5 * 1024 * 1024);
    });

    it("IMAGE_STORAGE_PATH is 'projects'", () => {
      expect(IMAGE_STORAGE_PATH).toBe("projects");
    });

    it("IMAGE_CACHE_MAX_AGE is 1 year in seconds", () => {
      expect(IMAGE_CACHE_MAX_AGE).toBe(31536000);
    });
  });

  describe("data store keys", () => {
    it("ABOUT_KEY is 'about:main'", () => {
      expect(ABOUT_KEY).toBe("about:main");
    });

    it("PROJECT_KEY_PREFIX is 'project'", () => {
      expect(PROJECT_KEY_PREFIX).toBe("project");
    });
  });

  describe("email config", () => {
    it("EMAIL_SERVICE is 'gmail'", () => {
      expect(EMAIL_SERVICE).toBe("gmail");
    });

    it("EMAIL_SUBJECT is set", () => {
      expect(EMAIL_SUBJECT).toBe("New message from iankendall.me");
    });
  });

  describe("dev config", () => {
    it("DEV_MOCK_DELAY_MS is 2000ms", () => {
      expect(DEV_MOCK_DELAY_MS).toBe(2000);
    });
  });
});


