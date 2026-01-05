import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { requireDev } from "api/middleware/requireDev";

describe("requireDev middleware", () => {
  const mockRes = () => ({
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  });

  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  describe("non-POST requests", () => {
    it("allows GET requests in any environment", () => {
      process.env.NODE_ENV = "production";
      const req = { method: "GET", path: "/about" } as any;
      const res = mockRes() as any;
      const next = vi.fn();

      requireDev(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it("allows PUT requests in any environment", () => {
      process.env.NODE_ENV = "production";
      const req = { method: "PUT", path: "/projects" } as any;
      const res = mockRes() as any;
      const next = vi.fn();

      requireDev(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("/send-message exception", () => {
    it("allows POST to /send-message in production", () => {
      process.env.NODE_ENV = "production";
      const req = { method: "POST", path: "/messages/send-message" } as any;
      const res = mockRes() as any;
      const next = vi.fn();

      requireDev(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it("allows POST to /send-message in development", () => {
      process.env.NODE_ENV = "development";
      const req = { method: "POST", path: "/send-message" } as any;
      const res = mockRes() as any;
      const next = vi.fn();

      requireDev(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("POST requests in development", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "development";
    });

    it("allows POST to /about in development", () => {
      const req = { method: "POST", path: "/about" } as any;
      const res = mockRes() as any;
      const next = vi.fn();

      requireDev(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("allows POST to /projects in development", () => {
      const req = { method: "POST", path: "/projects" } as any;
      const res = mockRes() as any;
      const next = vi.fn();

      requireDev(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("POST requests in production", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "production";
    });

    it("blocks POST to /about in production", () => {
      const req = { method: "POST", path: "/about" } as any;
      const res = mockRes() as any;
      const next = vi.fn();

      requireDev(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        error: "Forbidden",
        message: "This endpoint is only available in development mode",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("blocks POST to /projects in production", () => {
      const req = { method: "POST", path: "/projects" } as any;
      const res = mockRes() as any;
      const next = vi.fn();

      requireDev(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it("blocks POST to /storage/upload in production", () => {
      const req = { method: "POST", path: "/storage/upload" } as any;
      const res = mockRes() as any;
      const next = vi.fn();

      requireDev(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });
  });
});
