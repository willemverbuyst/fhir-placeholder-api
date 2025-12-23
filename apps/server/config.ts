import type { DummyDataConfig } from "@repo/dummy-data";
import { existsSync, readFileSync } from "node:fs";
import {
  CONFIG_EXPIRY_MS,
  CONFIG_FILE_PATH,
  type UserDummyDataConfig,
} from "./user-config.js";

export const START_DATE = "1950-01-01" as const;

// Default hardcoded values (fallback)
export const ORGANIZATIONS = 3;
export const PRACTITIONER_ROLES_PER_ORGANIZATION = 2;
export const PRACTITIONERS_PER_ORGANIZATION = 2;
export const PATIENTS_PER_PRACTITIONER = 4;
export const APPOINTMENTS_PER_PATIENT = 2;
export const EPISODES_PER_PATIENT = 4;
export const CONDITIONS_PER_PATIENT = 4;
export const ENCOUNTERS_PER_PATIENT = 20;
export const OBSERVATIONS_PER_ENCOUNTER = 2;

function loadUserConfig(): UserDummyDataConfig | null {
  if (!existsSync(CONFIG_FILE_PATH)) {
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
  const userConfig = loadUserConfig();

  if (userConfig) {
    console.log(`📋 Using ${userConfig.preset} configuration for dummy data`);

    // Calculate derived values from user config
    const numberOfOrganizations = userConfig.organizations;
    const numberOfPractitionerRoles =
      userConfig.practitionerRolesPerOrganization * numberOfOrganizations;
    const numberOfPractitioners = numberOfPractitionerRoles; // Always equal
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

  const NUMBER_OF_ORGANIZATIONS = ORGANIZATIONS;
  const NUMBER_OF_PRACTITIONER_ROLES =
    PRACTITIONER_ROLES_PER_ORGANIZATION * ORGANIZATIONS;
  const NUMBER_OF_PRACTITIONERS = NUMBER_OF_PRACTITIONER_ROLES;
  const NUMBER_OF_PATIENTS =
    PATIENTS_PER_PRACTITIONER * NUMBER_OF_PRACTITIONERS;
  const NUMBER_OF_CONDITIONS = NUMBER_OF_PATIENTS * CONDITIONS_PER_PATIENT;
  const NUMBER_OF_EPISODES = NUMBER_OF_PATIENTS * EPISODES_PER_PATIENT;
  const NUMBER_OF_ENCOUNTERS = NUMBER_OF_PATIENTS * ENCOUNTERS_PER_PATIENT;
  const NUMBER_OF_OBSERVATIONS =
    NUMBER_OF_ENCOUNTERS * OBSERVATIONS_PER_ENCOUNTER;
  const NUMBER_OF_APPOINTMENTS = NUMBER_OF_PATIENTS * APPOINTMENTS_PER_PATIENT;

  return {
    numberOfAppointments: NUMBER_OF_APPOINTMENTS,
    numberOfConditions: NUMBER_OF_CONDITIONS,
    numberOfEncounters: NUMBER_OF_ENCOUNTERS,
    numberOfEpisodes: NUMBER_OF_EPISODES,
    numberOfObservations: NUMBER_OF_OBSERVATIONS,
    numberOfOrganizations: NUMBER_OF_ORGANIZATIONS,
    numberOfPatients: NUMBER_OF_PATIENTS,
    numberOfPractitioners: NUMBER_OF_PRACTITIONERS,
    numberOfPractitionerRoles: NUMBER_OF_PRACTITIONER_ROLES,
    startDate: START_DATE,
    idStrategy: process.env.NODE_ENV === "test" ? "sequential" : "uuid",
  };
}

export const dummyDataConfig: DummyDataConfig = buildDummyDataConfig();
