import type { DummyDataConfig } from "@repo/dummy-data";
import type { UserDummyDataConfig } from "./configPresets";

export function isConfigExpired(input: {
  createdAt: string;
  now: Date;
  expiryMs: number;
}): boolean {
  const createdAtDate = new Date(input.createdAt);
  const age = input.now.getTime() - createdAtDate.getTime();
  return age > input.expiryMs;
}

export function toDummyDataConfig(input: {
  userConfig: UserDummyDataConfig;
  nodeEnv?: string;
}): DummyDataConfig {
  const { userConfig, nodeEnv } = input;

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
  const numberOfConditions = numberOfPatients * userConfig.conditionsPerPatient;
  const numberOfEncounters = numberOfPatients * userConfig.encountersPerPatient;
  const numberOfObservations =
    numberOfEncounters * userConfig.observationsPerEncounter;
  const numberOfAllergies = numberOfPatients * userConfig.allergiesPerPatient;
  const numberOfFlags = numberOfEncounters * userConfig.flagsPerEncounter;
  const numberOfCommunications =
    numberOfEncounters * userConfig.communicationsPerEncounter;

  return {
    numberOfAllergies,
    numberOfAppointments,
    numberOfConditions,
    numberOfEncounters,
    numberOfEpisodes,
    numberOfObservations,
    numberOfFlags,
    numberOfCommunications,
    numberOfOrganizations,
    numberOfPatients,
    numberOfPractitioners,
    numberOfPractitionerRoles,
    startDate: userConfig.startDate,
    idStrategy: nodeEnv === "test" ? "sequential" : userConfig.idStrategy,
  };
}
