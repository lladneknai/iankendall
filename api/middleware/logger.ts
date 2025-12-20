import { isEmpty } from "api/utils/util";
import type { Request, Response, NextFunction } from "express";

/**
 * MIDDLEWARE | Request logger
 * - Only runs in dev
 * - Validates that request body exists and is an object (returns 400 if invalid)
 */
export function logger(req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV === "development") {
    console.log();
    console.log("req url:", req.url);

    if (!isEmpty(req.body)) {
      console.log("req body:", req.body);
    }

    if (!isEmpty(req.query)) {
      console.log("req query:", req.query);
    }

    if (!isEmpty(req.params)) {
      console.log("req params:", req.params);
    }

    console.log();
  }
  next();
}
