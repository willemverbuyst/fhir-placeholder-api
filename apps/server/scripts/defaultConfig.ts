import type { DummyDataConfig } from "@repo/dummy-data";
import { CONFIG_PRESETS } from "./configPresets";

const {
  organizations,
  practitionerRolesPerOrganization,
  practitionersPerOrganization,
  patientsPerPractitioner,
  appointmentsPerPatient,
  episodesPerPatient,
  conditionsPerPatient,
  encountersPerPatient,
  observationsPerEncounter,
  startDate,
} = CONFIG_PRESETS.small.config;

const numberOfOrganizations = organizations;
const numberOfPractitionerRoles =
  practitionerRolesPerOrganization * numberOfOrganizations;
const numberOfPractitioners =
  practitionersPerOrganization * numberOfOrganizations;
const numberOfPatients = patientsPerPractitioner * numberOfPractitioners;
const numberOfConditions = numberOfPatients * conditionsPerPatient;
const numberOfEpisodes = numberOfPatients * episodesPerPatient;
const numberOfEncounters = numberOfPatients * encountersPerPatient;
const numberOfObservations = numberOfEncounters * observationsPerEncounter;
const numberOfAppointments = numberOfPatients * appointmentsPerPatient;

export const defaultConfig: DummyDataConfig = {
  numberOfAppointments,
  numberOfConditions,
  numberOfEncounters,
  numberOfEpisodes,
  numberOfObservations,
  numberOfOrganizations,
  numberOfPatients,
  numberOfPractitioners,
  numberOfPractitionerRoles,
  startDate,
  idStrategy: process.env.NODE_ENV === "test" ? "sequential" : "uuid",
};
