import type { DummyDataConfig } from "@repo/dummy-data";
import { existsSync, readFileSync } from "node:fs";
import {
  CONFIG_EXPIRY_MS,
  CONFIG_FILE_PATH,
  UserDummyDataConfig,
} from "./configPresets";
import { defaultConfig } from "./defaultConfig";

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

    // Check if config is expired (2 days old)
    const createdAt = new Date(userConfig.createdAt);
    const now = new Date();
    const age = now.getTime() - createdAt.getTime();

    if (age > CONFIG_EXPIRY_MS) {
      console.warn("⚠️  FHIR Configuration Warning:");
      console.warn(
        `   Your dummy data configuration is ${Math.floor(age / (24 * 60 * 60 * 1000))} days old.`,
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
    return defaultConfig;
  }

  const userConfig = loadUserConfig();

  if (userConfig) {
    console.log(`📋 Using ${userConfig.preset} configuration for dummy data`);

    // Calculate derived values from user config
    const numberOfOrganizations = userConfig.organizations;
    const numberOfPractitionerRoles =
      userConfig.practitionerRolesPerOrganization * numberOfOrganizations;
    const numberOfPractitioners =
      userConfig.practitionersPerOrganization * numberOfOrganizations;
    const numberOfPatients =
      numberOfPractitioners * userConfig.patientsPerPractitioner;
    const numberOfAppointments =
      numberOfPatients * userConfig.appointmentsPerPatient;
    const numberOfEpisodes = numberOfPatients * userConfig.episodesPerPatient;
    const numberOfConditions =
      numberOfPatients * userConfig.conditionsPerPatient;
    const numberOfEncounters =
      numberOfPatients * userConfig.encountersPerPatient;
    const numberOfObservations =
      numberOfEncounters * userConfig.observationsPerEncounter;

    return {
      numberOfAppointments,
      numberOfConditions,
      numberOfEncounters,
      numberOfEpisodes,
      numberOfObservations,
      numberOfOrganizations,
      numberOfPatients,
      numberOfPractitioners,
      numberOfPractitionerRoles,
      startDate: userConfig.startDate,
      idStrategy:
        process.env.NODE_ENV === "test" ? "sequential" : userConfig.idStrategy,
    };
  }

  // Fallback to hardcoded defaults
  console.log("📋 Using default hardcoded configuration for dummy data");
  return defaultConfig;
}

export const dummyDataConfig: DummyDataConfig = buildDummyDataConfig();
