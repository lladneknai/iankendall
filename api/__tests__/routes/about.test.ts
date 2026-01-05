import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response, NextFunction } from "express";
import GetAboutUC from "api/routes/about/UseCases/GetAboutUC";
import SaveAboutUC from "api/routes/about/UseCases/SaveAboutUC";

/**
 * About API Route Tests
 * 
 * Tests the /api/about endpoints:
 * - GET /api/about - Retrieves about page content
 * - POST /api/about - Saves/updates about page content
 * 
 * The about data is stored as a singleton with key "about:main"
 * and contains: headline, description, and content fields.
 */

// Mock @ampt/data
vi.mock("@ampt/data", () => ({
  data: {
    get: vi.fn(),
    set: vi.fn(),
  },
}));

// Mock cleanupUnusedImages
vi.mock("api/utils/cleanupUnusedImages", () => ({
  default: vi.fn().mockResolvedValue(undefined),
}));

import { data } from "@ampt/data";
import CleanupUnusedImages from "api/utils/cleanupUnusedImages";

describe("About API Routes", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      body: {},
    };
    mockRes = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    };
    mockNext = vi.fn();
    vi.clearAllMocks();
  });

  describe("GetAboutUC", () => {
    it("returns about data when it exists", async () => {
      const mockAbout = {
        headline: "Test Headline",
        description: "Test Description",
        content: "Test Content",
      };

      vi.mocked(data.get).mockResolvedValue(mockAbout);

      await GetAboutUC(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(data.get).toHaveBeenCalledWith("about:main");
      expect(mockRes.json).toHaveBeenCalledWith(mockAbout);
    });

    it("returns default empty record when no about data exists", async () => {
      vi.mocked(data.get).mockResolvedValue(null);

      await GetAboutUC(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(data.get).toHaveBeenCalledWith("about:main");
      expect(mockRes.json).toHaveBeenCalledWith({
        headline: "",
        description: "",
        content: "",
      });
    });

    it("handles errors gracefully", async () => {
      const error = new Error("Database error");
      vi.mocked(data.get).mockRejectedValue(error);

      await GetAboutUC(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed to fetch about",
        details: "Database error",
      });
    });
  });

  describe("SaveAboutUC", () => {
    it("saves valid about data successfully", async () => {
      const aboutData = {
        headline: "New Headline",
        description: "New Description",
        content: "New Content",
      };

      mockReq.body = aboutData;
      vi.mocked(data.set).mockResolvedValue(undefined);

      await SaveAboutUC(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(data.set).toHaveBeenCalledWith("about:main", aboutData);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "ok",
        message: "About content updated successfully",
        about: aboutData,
      });
    });

    it("triggers background image cleanup after save", async () => {
      const aboutData = {
        headline: "New Headline",
        description: "New Description",
        content: "New Content",
      };

      mockReq.body = aboutData;
      vi.mocked(data.set).mockResolvedValue(undefined);

      await SaveAboutUC(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(CleanupUnusedImages).toHaveBeenCalled();
    });

    it("returns 400 when headline is missing", async () => {
      mockReq.body = {
        description: "Test Description",
        content: "Test Content",
      };

      await SaveAboutUC(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error:
          "Missing required fields: headline, description, and content are required",
      });
      expect(data.set).not.toHaveBeenCalled();
    });

    it("returns 400 when description is missing", async () => {
      mockReq.body = {
        headline: "Test Headline",
        content: "Test Content",
      };

      await SaveAboutUC(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(data.set).not.toHaveBeenCalled();
    });

    it("returns 400 when content is missing", async () => {
      mockReq.body = {
        headline: "Test Headline",
        description: "Test Description",
      };

      await SaveAboutUC(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(data.set).not.toHaveBeenCalled();
    });

    it("allows empty strings for all fields", async () => {
      const aboutData = {
        headline: "",
        description: "",
        content: "",
      };

      mockReq.body = aboutData;
      vi.mocked(data.set).mockResolvedValue(undefined);

      await SaveAboutUC(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(data.set).toHaveBeenCalledWith("about:main", aboutData);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "ok",
        message: "About content updated successfully",
        about: aboutData,
      });
    });

    it("handles database errors gracefully", async () => {
      mockReq.body = {
        headline: "Test",
        description: "Test",
        content: "Test",
      };

      const error = new Error("Database write error");
      vi.mocked(data.set).mockRejectedValue(error);

      await SaveAboutUC(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed to update about",
        details: "Database write error",
      });
    });

    it("continues even if cleanup fails", async () => {
      mockReq.body = {
        headline: "Test",
        description: "Test",
        content: "Test",
      };

      vi.mocked(data.set).mockResolvedValue(undefined);
      vi.mocked(CleanupUnusedImages).mockRejectedValue(
        new Error("Cleanup failed")
      );

      await SaveAboutUC(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      // Should still respond successfully even if cleanup fails
      expect(mockRes.json).toHaveBeenCalledWith({
        status: "ok",
        message: "About content updated successfully",
        about: mockReq.body,
      });
    });
  });
});
