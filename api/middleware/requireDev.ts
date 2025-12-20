import type { Request, Response, NextFunction } from "express";

/**
 * MIDDLEWARE | Require dev environment
 * - Blocks POST requests in non-dev environments
 * - Allows /send-message in all environments
 */
export function requireDev(req: Request, res: Response, next: NextFunction) {
  // Allow all non-POST requests
  if (req.method !== "POST") {
    return next();
  }

  // Allow /send-message in all environments
  if (req.path.includes("/send-message")) {
    return next();
  }

  // Check if we're in development
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev) {
    console.warn(`[AUTH] Blocked POST request to ${req.path} in non-dev environment`);
    return res.status(403).json({
      error: "Forbidden",
      message: "This endpoint is only available in development mode",
    });
  }

  next();
}





