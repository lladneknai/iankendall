import { data } from "@ampt/data";
import { storage } from "@ampt/sdk";
import type { About, Project } from "@shared";
import { isImageFiletype } from "api/utils/util";
import { ABOUT_KEY, IMAGE_STORAGE_PATH, PROJECT_KEY_PREFIX } from "api/config";

/**
 * Clean up unused images from storage
 * Checks both project and about records and deletes any images not referenced
 * Note: All images are stored in the projects/ folder for simplicity
 */
export default async function cleanupUnusedImages(): Promise<void> {
  try {
    // Get all stored images - list() returns an async generator
    const storedImagePaths = new Set<string>();
    const fileGenerator = storage().list(`${IMAGE_STORAGE_PATH}/`);

    for await (const page of fileGenerator) {
      for (const filename of page) {
        if (isImageFiletype(filename)) {
          storedImagePaths.add(`${IMAGE_STORAGE_PATH}/${filename}`);
        }
      }
    }

    if (storedImagePaths.size === 0) {
      console.log("No images in storage to clean up");
      return;
    }

    // Extract all image URLs used in content
    const usedImagePaths = new Set<string>();

    // Fetch records that would use images
    const [about, allProjects] = await Promise.all([
      data.get(ABOUT_KEY) as Promise<About | null>,
      data.get(`${PROJECT_KEY_PREFIX}:*`),
    ]);

    // Check about record for image references
    const imagePathRegex = new RegExp(
      `/api/storage/(${IMAGE_STORAGE_PATH}/[^"'\\s]+)`,
      "g"
    );
    if (about?.content && typeof about.content === "string") {
      const imageMatches = about.content.match(imagePathRegex);

      if (imageMatches) {
        imageMatches.forEach((match) => {
          const path = match.replace("/api/storage/", "");
          usedImagePaths.add(path);
        });
      }
    }

    // Check all project records for image references
    for (const item of allProjects.items) {
      const project = item.value as Project;
      if (project.content && typeof project.content === "string") {
        const imageMatches = project.content.match(imagePathRegex);

        if (imageMatches) {
          imageMatches.forEach((match) => {
            const path = match.replace("/api/storage/", "");
            usedImagePaths.add(path);
          });
        }
      }
    }

    // Find unused images
    const unusedImages: string[] = [];
    for (const imagePath of Array.from(storedImagePaths)) {
      if (!usedImagePaths.has(imagePath)) {
        unusedImages.push(imagePath);
      }
    }

    // Delete unused images
    if (unusedImages.length > 0) {
      console.log(`Found ${unusedImages.length} unused images, deleting...`);

      for (const imagePath of unusedImages) {
        await storage().remove(imagePath);
        console.log(`Deleted unused image: ${imagePath}`);
      }

      console.log(
        `Cleanup complete: deleted ${unusedImages.length} unused images`
      );
    } else {
      console.log("No unused images found");
    }
  } catch (error) {
    console.error("Error during image cleanup:", error);
    // Don't throw - we don't want cleanup errors to fail the save operation
  }
}
