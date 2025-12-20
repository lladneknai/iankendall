import type { Request, Response, NextFunction } from "express";

/**
 * MIDDLEWARE | Validate request body
 * - Validates that request body exists and is an object (eturns 400 if invalid)
 */
export function validateBody(req: Request, res: Response, next: NextFunction) {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Invalid request body" });
  }
  next();
}




