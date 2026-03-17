#!/usr/bin/env node
import { existsSync, unlinkSync } from "node:fs";
import { CONFIG_FILE_PATH } from "./configPresets";

function main() {
  console.log("🧹 FHIR Dummy Data Configuration Cleanup");

  if (!existsSync(CONFIG_FILE_PATH)) {
    console.log("ℹ️  No configuration file found to clean up.");
    return;
  }

  try {
    unlinkSync(CONFIG_FILE_PATH);
    console.log(`✅ Successfully removed ${CONFIG_FILE_PATH}`);
    console.log("📝 The server will now use default hardcoded configuration.");
  } catch (error) {
    console.error("❌ Error removing configuration file:", error);
    process.exit(1);
  }
}

main();
