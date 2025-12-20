import type { Request, Response, NextFunction } from "express";
import { data } from "@ampt/data";
import type { About } from "@shared";
import { ABOUT_KEY } from "api/config";

export default async function GetAboutUC(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Fetch the single about record from Ampt data store
    const about: About | null = await data.get(ABOUT_KEY);

    // If no record exists yet, return a default empty record
    if (!about) {
      const defaultAbout: About = {
        headline: "",
        description: "",
        content: "",
      };
      res.json(defaultAbout);
      return;
    }

    res.json(about);
  } catch (error) {
    console.error("Error fetching about:", error);
    res.status(500).json({
      error: "Failed to fetch about",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

