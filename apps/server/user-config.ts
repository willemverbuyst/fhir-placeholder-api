export interface UserDummyDataConfig {
  preset?: "small" | "medium" | "large" | "custom";
  organizations: number;
  practitionerRolesPerOrganization: number;
  practitionersPerOrganization: number;
  patientsPerPractitioner: number;
  appointmentsPerPatient: number;
  episodesPerPatient: number;
  conditionsPerPatient: number;
  encountersPerPatient: number;
  observationsPerEncounter: number;
  idStrategy: "sequential" | "uuid";
  startDate: `${number}-${number}-${number}`;
  createdAt: string; // ISO timestamp for expiry
}

export interface ConfigPreset {
  name: string;
  description: string;
  config: Omit<UserDummyDataConfig, "createdAt" | "preset">;
}

export const CONFIG_PRESETS: Record<string, ConfigPreset> = {
  small: {
    name: "Small",
    description: "3 organizations, 24 patients - Good for development",
    config: {
      organizations: 3,
      practitionerRolesPerOrganization: 2,
      practitionersPerOrganization: 2,
      patientsPerPractitioner: 4,
      appointmentsPerPatient: 2,
      episodesPerPatient: 4,
      conditionsPerPatient: 4,
      encountersPerPatient: 20,
      observationsPerEncounter: 2,
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
      appointmentsPerPatient: 3,
      episodesPerPatient: 5,
      conditionsPerPatient: 6,
      encountersPerPatient: 25,
      observationsPerEncounter: 3,
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
      appointmentsPerPatient: 4,
      episodesPerPatient: 6,
      conditionsPerPatient: 8,
      encountersPerPatient: 30,
      observationsPerEncounter: 3,
      idStrategy: "uuid",
      startDate: "1950-01-01",
    },
  },
};

// Config file path (relative to server root)
export const CONFIG_FILE_PATH = "./dummy-data-config.json";

// Config expiry (2 days in milliseconds)
export const CONFIG_EXPIRY_MS = 2 * 24 * 60 * 60 * 1000;
