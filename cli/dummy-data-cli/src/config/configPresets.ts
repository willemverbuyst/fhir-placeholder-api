import type { ConfigPreset } from "../interfaces";

export const CONFIG_PRESETS: Record<string, ConfigPreset> = {
  small: {
    name: "Small",
    description: "3 organizations, 24 patients - Good for development",
    config: {
      organizations: 3,
      practitionerRolesPerOrganization: 2,
      practitionersPerOrganization: 2,
      patientsPerPractitioner: 4,
      allergiesPerPatient: 1,
      appointmentsPerPatient: 2,
      episodesPerPatient: 4,
      conditionsPerPatient: 4,
      encountersPerPatient: 20,
      observationsPerEncounter: 2,
      flagsPerEncounter: 1,
      communicationsPerEncounter: 1,
      idStrategy: "uuid",
      startDate: "1950-01-01",
    },
  },
  medium: {
    name: "Medium",
    description: "10 organizations, 200 patients - Good for testing",
    config: {
      organizations: 10,
      practitionerRolesPerOrganization: 2,
      practitionersPerOrganization: 2,
      patientsPerPractitioner: 10,
      allergiesPerPatient: 2,
      appointmentsPerPatient: 3,
      episodesPerPatient: 5,
      conditionsPerPatient: 6,
      encountersPerPatient: 25,
      observationsPerEncounter: 3,
      flagsPerEncounter: 1,
      communicationsPerEncounter: 1,
      idStrategy: "uuid",
      startDate: "1950-01-01",
    },
  },
  large: {
    name: "Large",
    description: "25 organizations, 1000 patients - Performance testing",
    config: {
      organizations: 25,
      practitionerRolesPerOrganization: 2,
      practitionersPerOrganization: 2,
      patientsPerPractitioner: 20,
      allergiesPerPatient: 2,
      appointmentsPerPatient: 4,
      episodesPerPatient: 6,
      conditionsPerPatient: 8,
      encountersPerPatient: 30,
      observationsPerEncounter: 3,
      flagsPerEncounter: 1,
      communicationsPerEncounter: 1,
      idStrategy: "uuid",
      startDate: "1950-01-01",
    },
  },
};

export const CONFIG_FILE_PATH = "./dummy-data-config.json";
// Config expiry (2 days in milliseconds)
export const CONFIG_EXPIRY_MS = 2 * 24 * 60 * 60 * 1000;
