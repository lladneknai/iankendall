import { storage } from "@ampt/sdk";
import { writeFileSync, mkdirSync, existsSync } from "fs";

/**
 * Export all images from Ampt Storage to local filesystem
 * Usage: ampt run export-storage --env <environment>
 */
async function exportStorage() {
  const exportDir = "./data/img";
  const IMAGE_STORAGE_PATH = "projects"; // from api/config.ts
  
  try {
    console.log(`Exporting images from path: ${IMAGE_STORAGE_PATH}/`);
    
    // Create export directory
    if (!existsSync(exportDir)) {
      mkdirSync(exportDir, { recursive: true });
    }
    
    // List all files in storage - returns an AsyncGenerator
    const fileGenerator = storage().list(`${IMAGE_STORAGE_PATH}/`);
    
    console.log("Collecting files from storage...\n");
    
    const manifest = [];
    let exported = 0;
    let failed = 0;
    
    // The generator yields a single array of filenames
    for await (const fileArray of fileGenerator) {
      // Filter out empty strings and iterate over actual filenames
      const filenames = fileArray.filter(name => name && name.trim() !== '');
      
      console.log(`Found ${filenames.length} files to export\n`);
      
      for (const filename of filenames) {
        try {
          // Construct full path
          const fileKey = `${IMAGE_STORAGE_PATH}/${filename}`;
          
          console.log(`Downloading: ${fileKey}`);
          
          // Read file as buffer
          const buffer = await storage().readBuffer(fileKey);
          
          if (!buffer) {
            console.error(`  ✗ Failed: Could not read file`);
            failed++;
            continue;
          }
          
          // Get metadata for content type
          const metadata = await storage().stat(fileKey);
          
          // Save to local filesystem
          const localPath = `${exportDir}/${fileKey.replace(/\//g, '_')}`;
          writeFileSync(localPath, buffer);
          
          // Add to manifest
          manifest.push({
            key: fileKey,
            localPath: localPath,
            size: buffer.length,
            lastModified: metadata?.lastModified || new Date().toISOString(),
            contentType: metadata?.type || 'image/png'
          });
          
          console.log(`  ✓ Exported: ${buffer.length} bytes`);
          exported++;
          
        } catch (error) {
          console.error(`  ✗ Failed: ${error.message}`);
          failed++;
        }
      }
    }
    
    // Save manifest
    writeFileSync(
      `${exportDir}/manifest.json`, 
      JSON.stringify(manifest, null, 2)
    );
    
    console.log(`\n\n=== Export Complete ===`);
    console.log(`Exported: ${exported} files`);
    console.log(`Failed: ${failed} files`);
    console.log(`Location: ${exportDir}/`);
    console.log(`Manifest: ${exportDir}/manifest.json`);
    
  } catch (error) {
    console.error("Fatal error during export:", error);
    process.exit(1);
  }
}

exportStorage();
