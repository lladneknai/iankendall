import { describe, it, expect, vi } from "vitest";
import { validateBody } from "api/middleware/validateBody";

describe("validateBody middleware", () => {
  const mockRes = () => ({
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  });

  it("calls next() when body is a valid object", () => {
    const req = { body: { message: "hello" } } as any;
    const res = mockRes() as any;
    const next = vi.fn();

    validateBody(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("calls next() when body is an empty object", () => {
    const req = { body: {} } as any;
    const res = mockRes() as any;
    const next = vi.fn();

    validateBody(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("returns 400 when body is null", () => {
    const req = { body: null } as any;
    const res = mockRes() as any;
    const next = vi.fn();

    validateBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid request body" });
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 400 when body is undefined", () => {
    const req = { body: undefined } as any;
    const res = mockRes() as any;
    const next = vi.fn();

    validateBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 400 when body is a string", () => {
    const req = { body: "not an object" } as any;
    const res = mockRes() as any;
    const next = vi.fn();

    validateBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 400 when body is a number", () => {
    const req = { body: 123 } as any;
    const res = mockRes() as any;
    const next = vi.fn();

    validateBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });
});
