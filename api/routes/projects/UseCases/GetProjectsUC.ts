import type { Request, Response, NextFunction } from "express";
import { data } from "@ampt/data";
import type { Project } from "@shared";
import { PROJECT_KEY_PREFIX } from "api/config";

export default async function GetProjectsUC(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Fetch all items from Ampt data store with 'project:' prefix
    const result = await data.get(`${PROJECT_KEY_PREFIX}:*`);

    // Extract the project values from the items and set default active=true if missing
    const projects: Project[] = result.items.map((item: any) => ({
      ...item.value,
      active: item.value.active !== undefined ? item.value.active : true,
    }));

    res.json({
      projects,
      count: projects.length,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      error: "Failed to fetch projects",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
