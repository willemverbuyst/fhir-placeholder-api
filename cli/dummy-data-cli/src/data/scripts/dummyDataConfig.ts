import { existsSync, readFileSync } from "node:fs";
import type { DummyDataConfig } from "@repo/dummy-data";
import { CONFIG_EXPIRY_MS, CONFIG_FILE_PATH } from "../../config/configPresets";
import type { UserDummyDataConfig } from "../../interfaces";
import { defaultSeedConfig } from "./defaultSeedConfig";
import { isConfigExpired, toDummyDataConfig } from "./dummyDataConfig.core";

function loadUserConfig(): UserDummyDataConfig | null {
  console.log(
    `🔍 Checking for user dummy data configuration at: ${CONFIG_FILE_PATH}`,
  );
  if (!existsSync(CONFIG_FILE_PATH)) {
    console.log("   No user configuration file found.");
    return null;
  }

  try {
    const configData = readFileSync(CONFIG_FILE_PATH, "utf-8");
    const userConfig: UserDummyDataConfig = JSON.parse(configData);

    const now = new Date();
    const createdAt = new Date(userConfig.createdAt);
    const ageInDays = Math.floor(
      (now.getTime() - createdAt.getTime()) / (24 * 60 * 60 * 1000),
    );

    if (
      isConfigExpired({
        createdAt: userConfig.createdAt,
        now,
        expiryMs: CONFIG_EXPIRY_MS,
      })
    ) {
      console.warn("⚠️  FHIR Configuration Warning:");
      console.warn(
        `   Your dummy data configuration is ${ageInDays} days old.`,
      );
      console.warn('   Consider running "pnpm setup-config" to refresh it.');
      console.warn('   Or "pnpm cleanup" to use defaults.');
    }

    return userConfig;
  } catch (error) {
    console.error("❌ Error loading user configuration:", error);
    console.error("   Using default configuration instead.");
    return null;
  }
}

function buildDummyDataConfig(): DummyDataConfig {
  if (process.env.NODE_ENV === "test") {
    return defaultSeedConfig;
  }

  const userConfig = loadUserConfig();

  if (userConfig) {
    console.log(`📋 Using ${userConfig.preset} configuration for dummy data`);
    return toDummyDataConfig({
      userConfig,
      nodeEnv: process.env.NODE_ENV,
    });
  }

  // Fallback to hardcoded defaults
  console.log("📋 Using default hardcoded configuration for dummy data");
  return defaultSeedConfig;
}

export const dummyDataConfig: DummyDataConfig = buildDummyDataConfig();
