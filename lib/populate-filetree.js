import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * POPULATE FILETREE
 *
 * Creates the sourcecode reference for the file browser.
 *
 * This script uses `writePath` to create a directory manifest in the form of
 * a text file. This is read by the FileTree on mount, which builds out the tree.
 *
 * Currently working to add this into a pre-deploy script that rolls into Ampt's
 * build process so that it's alllll automated.
 */

// Get the directory where this script is located
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Where the 'fake' sourcecode lives,
const readPath = path.resolve(__dirname, "../");
const writePath = path.resolve(__dirname, "../public/sourcecode-ref.txt");
const copyToPath = path.resolve(__dirname, "../public/sourcecode");

// Filled with folders and file names.
const filePaths = [];

// INCLUDE these files and directories
const includeList = [
  "api",
  "lib",
  "src",
  "types",
  "index.html",
  "package.json",
];

// EXCLUDE these files at all paths
const excludeList = [
  ".DS_Store",
  ".amptignore",
  ".devcontainer.json",
  ".env",
  ".gitignore",
  ".gitpod.yml",
  ".prettierrc.json",
  "eslintrc.cjs",
  "package-lock.json",
  "tsconfig.json",
  "tsconfig.app.json",
  "tsconfig.node.json",
  "tsconfig.test.json",
  "vite.config.ts",
  "vitest.config.ts",
  "vitest.setup.ts",
];

// Ensure the copy directory exists
if (!fs.existsSync(copyToPath)) {
  fs.mkdirSync(copyToPath, { recursive: true });
}

// Declare a Generator that traverses the filetree and returns all paths.
function* readAllFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  const localDir = dir.replace(readPath, "");

  for (const file of files) {
    // Skip .DS_Store files
    if (excludeList.includes(file.name)) {
      continue;
    }

    const filePath = path.join(localDir, file.name);

    // If we're at the root level, only include items from the includeList
    if (localDir === "" && !includeList.includes(file.name)) {
      continue;
    }

    // If we're inside an included directory, include everything
    const isInsideIncludedDir = includeList.some((included) => {
      // Remove leading slash for comparison
      const cleanLocalDir = localDir.startsWith("/")
        ? localDir.slice(1)
        : localDir;
      return (
        cleanLocalDir.startsWith(included + path.sep) ||
        cleanLocalDir === included
      );
    });

    // If we're not at root and not inside an included directory, skip
    if (localDir !== "" && !isInsideIncludedDir) {
      continue;
    }

    if (file.isDirectory()) {
      // Head back in...
      yield* readAllFiles(path.join(dir, file.name));
    } else {
      yield filePath;
    }
  }
}

/**
 * Iterare through the Generator and build the filetree accordingly.
 */
for (const fp of readAllFiles(readPath)) {
  if (!filePaths.includes(fp)) {
    filePaths.push(fp);
  }
}

try {
  console.log("FILE DATA ==>", filePaths);
  console.log("WRITTEN TO ==>", writePath);
  fs.writeFileSync(writePath, JSON.stringify(filePaths));

  // Copy all included directories and files to public/sourcecode
  console.log("COPYING FILES TO ==>", copyToPath);

  // Copy each included item
  for (const item of includeList) {
    const sourceItem = path.join(readPath, item);
    const destItem = path.join(copyToPath, item);

    if (fs.existsSync(sourceItem)) {
      if (fs.statSync(sourceItem).isDirectory()) {
        // Copy entire directory recursively
        copyDirectoryRecursive(sourceItem, destItem);
        console.log(`Copied directory: ${item}`);
      } else {
        // Copy single file
        fs.copyFileSync(sourceItem, destItem);
        console.log(`Copied file: ${item}`);
      }
    }
  }

  console.log("All files copied successfully!");
} catch (err) {
  console.error(err);
}

// Helper function to copy directory recursively
function copyDirectoryRecursive(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectoryRecursive(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}
