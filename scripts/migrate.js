import { spawn } from "child_process";

/**
 * Unified migration script - exports from sandbox and imports to target environment
 * Usage: ampt run migrate <target-environment>
 */

// Get target environment from command line args (positional argument)
const targetEnv = process.argv[2];

if (!targetEnv) {
  console.error("\n❌ Error: Missing required environment argument");
  console.log("\nUsage: ampt run migrate <target-environment>");
  console.log("\nExample: ampt run migrate test1");
  process.exit(1);
}

console.log(`\n🚀 Starting migration to environment: ${targetEnv}\n`);
console.log("=" .repeat(60));

/**
 * Run a command and wait for it to complete
 */
function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    console.log(`\n▶️  Running: ${command} ${args.join(" ")}\n`);
    
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: true
    });
    
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}`));
      } else {
        resolve();
      }
    });
    
    child.on("error", (error) => {
      reject(error);
    });
  });
}

/**
 * Main migration flow
 */
async function migrate() {
  try {
    // Step 1: Export data from sandbox
    console.log("\n📦 STEP 1/3: Exporting data from sandbox...");
    console.log("-".repeat(60));
    await runCommand("ampt", ["export", "./data/down.json", "--overwrite"]);
    console.log("✅ Data exported to ./data/down.json");
    
    // Step 2: Export storage from sandbox
    console.log("\n📦 STEP 2/3: Exporting storage from sandbox...");
    console.log("-".repeat(60));
    await runCommand("ampt", ["run", "export-storage"]);
    console.log("✅ Storage exported to ./data/img/");
    
    // Step 3: Import both data and storage to target environment
    console.log(`\n📥 STEP 3/3: Importing data and storage to ${targetEnv}...`);
    console.log("-".repeat(60));
    await runCommand("ampt", ["run", "import-all", "--env", targetEnv]);
    
    // Success summary
    console.log("\n" + "=".repeat(60));
    console.log("🎉 Migration Complete!");
    console.log("=".repeat(60));
    console.log(`\n✅ Sandbox → ${targetEnv}`);
    console.log("✅ Data migrated");
    console.log("✅ Storage migrated");
    console.log("\nYou can now deploy code changes with:");
    console.log(`   ampt deploy ${targetEnv}\n`);
    
  } catch (error) {
    console.error("\n" + "=".repeat(60));
    console.error("❌ Migration Failed");
    console.error("=".repeat(60));
    console.error(`\nError: ${error.message}\n`);
    process.exit(1);
  }
}

migrate();

