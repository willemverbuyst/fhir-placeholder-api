import { DummyDataConfig } from "@repo/dummy-data";
import { CONFIG_PRESETS } from "../../config/configPresets";

const {
  organizations,
  practitionerRolesPerOrganization,
  practitionersPerOrganization,
  patientsPerPractitioner,
  allergiesPerPatient,
  appointmentsPerPatient,
  episodesPerPatient,
  conditionsPerPatient,
  encountersPerPatient,
  observationsPerEncounter,
  flagsPerEncounter,
  communicationsPerEncounter,
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
const numberOfAllergies = numberOfPatients * allergiesPerPatient;
const numberOfFlags = numberOfEncounters * flagsPerEncounter;
const numberOfCommunications = numberOfEncounters * communicationsPerEncounter;

export const defaultSeedConfig: DummyDataConfig = {
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
  startDate,
  idStrategy: process.env.NODE_ENV === "test" ? "sequential" : "uuid",
};
