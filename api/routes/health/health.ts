import express, { Router } from "express";
import asyncHandler from "express-async-handler";
import type { Request, Response, NextFunction } from "express";

const healthRouter = Router();

healthRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.json({ status: "ok" });
  })
);

export default healthRouter;
