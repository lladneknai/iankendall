import type { Request, Response, NextFunction } from "express";
import { data } from "@ampt/data";
import type { Project } from "@shared";
import { PROJECT_KEY_PREFIX } from "api/config";
import cleanupUnusedImages from "api/utils/cleanupUnusedImages";

export default async function SaveProjectUC(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { key } = req.body;

    if (!key) {
      res.status(400).json({ error: "Missing project key" });
      return;
    }

    // Get existing project data
    const existingProject: Project | null = await data.get(`${PROJECT_KEY_PREFIX}:${key}`);

    // Merge with new data, ensuring active defaults to true if not provided
    const updatedProject: Project = {
      ...existingProject,
      ...req.body,
      active:
        req.body.active !== undefined
          ? req.body.active
          : existingProject?.active !== undefined
          ? existingProject.active
          : true,
      updatedAt: new Date().toISOString(),
    };

    // Save to data store with key prefix
    await data.set(`${PROJECT_KEY_PREFIX}:${key}`, updatedProject);

    // Clean up unused images in the background (don't await)
    cleanupUnusedImages().catch((err) => {
      console.error("Background image cleanup failed:", err);
    });

    res.json({
      status: "ok",
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      error: "Failed to update project",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
