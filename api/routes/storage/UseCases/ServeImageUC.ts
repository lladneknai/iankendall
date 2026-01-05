import type { Request, Response, NextFunction } from "express";
import { storage } from "@ampt/sdk";
import { IMAGE_CACHE_MAX_AGE } from "api/config";

export default async function ServeImageUC(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { folder, filename } = req.params;
    const path = `${folder}/${filename}`;

    // Get file metadata first to check if it exists and get content type
    const metadata = await storage().stat(path);

    if (!metadata) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    // Read file as buffer using readBuffer()
    const buffer = await storage().readBuffer(path);

    if (!buffer) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    // Set cache headers for better performance
    res.set({
      "Cache-Control": `public, max-age=${IMAGE_CACHE_MAX_AGE}`,
      "Content-Type": metadata.type || "image/png",
    });

    // Send the buffer
    res.end(buffer);
  } catch (error) {
    console.error("Error serving image:", error);
    res.status(500).json({
      error: "Failed to serve image",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
