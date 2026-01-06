import type { Request, Response, NextFunction } from "express";
import { data } from "@ampt/data";
import type { Project } from "@shared";
import { PROJECT_KEY_PREFIX, isDevelopment } from "api/config";

export default async function GetProjectUC(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const key = req.params.key;

    if (!key) {
      res.status(400).json({
        error: "Project key is required",
      });
      return;
    }

    // Fetch single project from Ampt data store
    const fullKey = `${PROJECT_KEY_PREFIX}:${key}`;
    const project = (await data.get(fullKey)) as Project | undefined;

    // Check if project exists
    if (!project) {
      res.status(404).json({ error: "Project not found", key });
      return;
    }

    // Check if project is active (skip in development)
    if (!isDevelopment() && !project.active) {
      res.status(404).json({ error: "Project not found", key });
      return;
    }

    res.json({
      project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({
      error: "Failed to fetch project",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
