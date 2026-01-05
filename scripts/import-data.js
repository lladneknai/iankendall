import { data } from "@ampt/data";
import { readFileSync } from "fs";

async function importData() {
  try {
    console.log("Reading data/down.json...");
    const fileContents = readFileSync("./data/down.json", "utf-8");
    const dataToImport = JSON.parse(fileContents);
    
    console.log(`Found ${dataToImport.length} items to import`);
    
    let imported = 0;
    let failed = 0;
    
    for (const item of dataToImport) {
      try {
        await data.set(item.key, item.value);
        console.log(`✓ Imported: ${item.key}`);
        imported++;
      } catch (error) {
        console.error(`✗ Failed to import ${item.key}:`, error.message);
        failed++;
      }
    }
    
    console.log(`\n\nImport complete:`);
    console.log(`  Successful: ${imported}`);
    console.log(`  Failed: ${failed}`);
    
  } catch (error) {
    console.error("Fatal error during import:", error);
    process.exit(1);
  }
}

importData();
