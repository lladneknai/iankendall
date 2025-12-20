import type { Request, Response, NextFunction } from "express";
import { data } from "@ampt/data";
import type { About } from "@shared";
import { ABOUT_KEY } from "api/config";
import CleanupUnusedImages from "api/utils/cleanupUnusedImages";

export default async function SaveAboutUC(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { headline, description, content } = req.body;

    // Validate required fields
    if (
      headline === undefined ||
      description === undefined ||
      content === undefined
    ) {
      res.status(400).json({
        error:
          "Missing required fields: headline, description, and content are required",
      });
      return;
    }

    // Create the updated about record
    const updatedAbout: About = {
      headline,
      description,
      content,
    };

    // Save to data store with the singleton key
    await data.set(ABOUT_KEY, updatedAbout);

    // Clean up unused images in the background (don't await)
    CleanupUnusedImages().catch((err) => {
      console.error("Background image cleanup failed:", err);
    });

    res.json({
      status: "ok",
      message: "About content updated successfully",
      about: updatedAbout,
    });
  } catch (error) {
    console.error("Error updating about:", error);
    res.status(500).json({
      error: "Failed to update about",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

