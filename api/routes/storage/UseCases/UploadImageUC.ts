import type { Request, Response, NextFunction } from "express";
import { storage } from "@ampt/sdk";
import { IMAGE_STORAGE_PATH } from "api/config";

export default async function UploadImageUC(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const { originalname, mimetype, buffer } = req.file;
    const timestamp = Date.now();
    const filename = `${timestamp}-${originalname.replace(
      /[^a-zA-Z0-9.-]/g,
      "_"
    )}`;
    const path = `${IMAGE_STORAGE_PATH}/${filename}`;

    // Upload to Ampt Storage
    await storage().write(path, buffer, {
      type: mimetype,
    });

    // Return the URL that can be used in HTML
    const url = `/api/storage/${IMAGE_STORAGE_PATH}/${filename}`;

    res.json({
      success: true,
      filename,
      url,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      error: "Failed to upload image",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
