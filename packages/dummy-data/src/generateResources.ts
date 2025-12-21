import { IdGenerator } from "./idGenerator";
import {
  createAppointments,
  createConditions,
  createEncounters,
  createEpisodes,
  createObservations,
  createOrganizations,
  createPatients,
  createPractitionerRoles,
  createPractitioners,
} from "./resources";
import { DummyDataConfig } from "./types";

export const generateResources = (config: DummyDataConfig) => {
  const {
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
    idStrategy,
  } = config;

  const idGen = new IdGenerator(idStrategy);

  const organizations = createOrganizations({
    numberOfOrganizations,
    idGen,
  });
  const practitionerRoles = createPractitionerRoles({
    numberOfPractitionerRoles,
    numberOfOrganizations,
    idGen,
  });
  const practitioners = createPractitioners({
    numberOfPractitioners,
    startDate,
    idGen,
  });
  const patients = createPatients({
    numberOfPatients,
    numberOfOrganizations,
    numberOfPractitioners,
    startDate,
    idGen,
  });
  const conditions = createConditions({
    numberOfConditions,
    numberOfPatients,
    idGen,
  });
  const episodes = createEpisodes({
    numberOfEpisodes,
    numberOfPatients,
    idGen,
  });
  const encounters = createEncounters({
    numberOfEncounters,
    numberOfPatients,
    numberOfEpisodes,
    idGen,
  });
  const observations = createObservations({
    numberOfObservations,
    numberOfPatients,
    numberOfEncounters,
    idGen,
  });
  const appointments = createAppointments({
    numberOfAppointments,
    numberOfPractitioners,
    numberOfPatients,
    idGen,
  });

  return {
    organizations,
    practitionerRoles,
    practitioners,
    patients,
    conditions,
    episodes,
    encounters,
    observations,
    appointments,
  };
};
