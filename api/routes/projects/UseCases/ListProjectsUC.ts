import type { Request, Response, NextFunction } from "express";
import { data } from "@ampt/data";
import type { Project } from "@shared";
import { PROJECT_KEY_PREFIX, isDevelopment } from "api/config";

export default async function ListProjectsUC(
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

    // Filter by active status - only return active projects in production
    let filteredProjects = projects;
    if (!isDevelopment()) {
      filteredProjects = filteredProjects.filter((p) => p.active);
    }

    // Filter by company if query param provided (supports comma-separated values)
    const { company, tech } = req.query;
    if (company && typeof company === "string") {
      const companies = company.split(",").map((c) => c.trim());
      filteredProjects = filteredProjects.filter((p) =>
        companies.includes(p.company)
      );
    }

    // Filter by tech if query param provided (supports comma-separated values)
    // Uses OR logic: project must have at least ONE of the selected tech
    // Case-insensitive matching to handle variations in stored data
    if (tech && typeof tech === "string") {
      const techList = tech.split(",").map((t) => t.trim().toLowerCase());
      filteredProjects = filteredProjects.filter((p) =>
        techList.some((t) =>
          p.tech.some((projectTech) => projectTech.toLowerCase() === t)
        )
      );
    }

    // Return limited fields for list view
    const projectList = filteredProjects.map((p) => ({
      company: p.company,
      description: p.description,
      key: p.key,
      links: p.links,
      name: p.name,
      tech: p.tech,
    }));

    res.json({
      projects: projectList,
      count: projectList.length,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      error: "Failed to fetch projects",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
