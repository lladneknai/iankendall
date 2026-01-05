import { data } from "@ampt/data";
import { storage } from "@ampt/sdk";
import { readFileSync } from "fs";

/**
 * Import both data and storage to the current environment
 * Usage: ampt run import-all --env <environment>
 */
async function importAll() {
  console.log("\n" + "=".repeat(60));
  console.log("📥 IMPORTING DATA AND STORAGE");
  console.log("=".repeat(60));

  try {
    // ==================== IMPORT DATA ====================
    console.log("\n📦 STEP 1/2: Importing data...");
    console.log("-".repeat(60));
    
    const fileContents = readFileSync("./data/down.json", "utf-8");
    const dataToImport = JSON.parse(fileContents);
    
    console.log(`Found ${dataToImport.length} items to import\n`);
    
    let dataImported = 0;
    let dataFailed = 0;
    
    for (const item of dataToImport) {
      try {
        await data.set(item.key, item.value);
        console.log(`✓ Imported: ${item.key}`);
        dataImported++;
      } catch (error) {
        console.error(`✗ Failed: ${item.key} - ${error.message}`);
        dataFailed++;
      }
    }
    
    console.log(`\n✅ Data import complete: ${dataImported} successful, ${dataFailed} failed`);
    
    // ==================== IMPORT STORAGE ====================
    console.log("\n📦 STEP 2/2: Importing storage...");
    console.log("-".repeat(60));
    
    const manifestData = readFileSync("./data/img/manifest.json", "utf-8");
    const manifest = JSON.parse(manifestData);
    
    console.log(`Found ${manifest.length} files to import\n`);
    
    let storageImported = 0;
    let storageSkipped = 0;
    let storageFailed = 0;
    
    for (const file of manifest) {
      try {
        console.log(`Uploading: ${file.key}`);
        
        // Check if file already exists
        const exists = await storage().stat(file.key);
        
        if (exists) {
          console.log(`  ⊘ Skipped: Already exists`);
          storageSkipped++;
          continue;
        }
        
        // Read local file
        const buffer = readFileSync(file.localPath);
        
        // Upload to storage
        await storage().write(file.key, buffer, {
          type: file.contentType
        });
        
        console.log(`  ✓ Imported: ${buffer.length} bytes`);
        storageImported++;
        
      } catch (error) {
        console.error(`  ✗ Failed: ${error.message}`);
        storageFailed++;
      }
    }
    
    console.log(`\n✅ Storage import complete: ${storageImported} imported, ${storageSkipped} skipped, ${storageFailed} failed`);
    
    // ==================== SUMMARY ====================
    console.log("\n" + "=".repeat(60));
    console.log("🎉 IMPORT COMPLETE");
    console.log("=".repeat(60));
    console.log(`\n📊 Data: ${dataImported} items imported`);
    console.log(`📊 Storage: ${storageImported} files imported, ${storageSkipped} skipped\n`);
    
  } catch (error) {
    console.error("\n❌ Fatal error during import:", error);
    process.exit(1);
  }
}

importAll();
