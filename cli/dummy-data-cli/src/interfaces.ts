export interface UserDummyDataConfig {
  preset?: "small" | "medium" | "large" | "custom";
  organizations: number;
  practitionerRolesPerOrganization: number;
  practitionersPerOrganization: number;
  patientsPerPractitioner: number;
  appointmentsPerPatient: number;
  allergiesPerPatient: number;
  episodesPerPatient: number;
  conditionsPerPatient: number;
  encountersPerPatient: number;
  observationsPerEncounter: number;
  flagsPerEncounter: number;
  communicationsPerEncounter: number;
  idStrategy: "sequential" | "uuid";
  startDate: `${number}-${number}-${number}`;
  createdAt: string; // ISO timestamp for expiry
}

export interface ConfigPreset {
  name: string;
  description: string;
  config: Omit<UserDummyDataConfig, "createdAt" | "preset">;
}
