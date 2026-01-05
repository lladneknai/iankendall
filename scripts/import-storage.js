import { storage } from "@ampt/sdk";
import { readFileSync, readdirSync } from "fs";

/**
 * Import all images from local filesystem to Ampt Storage
 * Usage: ampt run import-storage --env <environment>
 */
async function importStorage() {
  const exportDir = "./data/img";
  
  try {
    console.log("Reading manifest...");
    
    // Read manifest
    const manifestData = readFileSync(`${exportDir}/manifest.json`, "utf-8");
    const manifest = JSON.parse(manifestData);
    
    console.log(`Found ${manifest.length} files to import\n`);
    
    let imported = 0;
    let skipped = 0;
    let failed = 0;
    
    for (const file of manifest) {
      try {
        console.log(`Uploading: ${file.key}`);
        
        // Check if file already exists
        const exists = await storage().stat(file.key);
        
        if (exists) {
          console.log(`  ⊘ Skipped: Already exists (${exists.size} bytes)`);
          skipped++;
          continue;
        }
        
        // Read local file
        const buffer = readFileSync(file.localPath);
        
        // Upload to storage
        await storage().write(file.key, buffer, {
          type: file.contentType
        });
        
        console.log(`  ✓ Imported: ${buffer.length} bytes`);
        imported++;
        
      } catch (error) {
        console.error(`  ✗ Failed: ${error.message}`);
        failed++;
      }
    }
    
    console.log(`\n\n=== Import Complete ===`);
    console.log(`Imported: ${imported} files`);
    console.log(`Skipped: ${skipped} files (already exist)`);
    console.log(`Failed: ${failed} files`);
    
  } catch (error) {
    console.error("Fatal error during import:", error);
    process.exit(1);
  }
}

importStorage();
