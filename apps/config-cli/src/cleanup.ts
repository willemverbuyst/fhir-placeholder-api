#!/usr/bin/env node
import { existsSync, unlinkSync } from "node:fs";
import { CONFIG_FILE_PATH } from "@repo/config-scripts";

type RunCleanupCliInput = {
  configFilePath?: string;
  log?: (message: string) => void;
  error?: (message: string, err: unknown) => void;
};

export function runCleanupCli(input: RunCleanupCliInput = {}) {
  const configFilePath = input.configFilePath ?? CONFIG_FILE_PATH;
  const log = input.log ?? console.log;
  const error = input.error ?? console.error;

  log("🧹 FHIR Dummy Data Configuration Cleanup");

  if (!existsSync(configFilePath)) {
    log("ℹ️  No configuration file found to clean up.");
    return;
  }

  try {
    unlinkSync(configFilePath);
    log(`✅ Successfully removed ${configFilePath}`);
    log("📝 The server will now use default hardcoded configuration.");
  } catch (runtimeError) {
    error("❌ Error removing configuration file:", runtimeError);
    process.exitCode = 1;
  }
}

runCleanupCli();
