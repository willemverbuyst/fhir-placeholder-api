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

interface DummyDataConfig {
  numberOfAppointments: number;
  numberOfConditions: number;
  numberOfEncounters: number;
  numberOfEpisodes: number;
  numberOfObservations: number;
  numberOfOrganizations: number;
  numberOfPatients: number;
  numberOfPractitioners: number;
  numberOfPractitionerRoles: number;
  startDate: `${number}-${number}-${number}`;
}

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
  } = config;

  const organizations = createOrganizations({
    numberOfOrganizations,
  });
  const practitionerRoles = createPractitionerRoles({
    numberOfPractitionerRoles,
    numberOfOrganizations,
  });
  const practitioners = createPractitioners({
    numberOfPractitioners,
    startDate,
  });
  const patients = createPatients({
    numberOfPatients,
    numberOfOrganizations,
    numberOfPractitioners,
    startDate,
  });
  const conditions = createConditions({
    numberOfConditions,
    numberOfPatients,
  });
  const episodes = createEpisodes({
    numberOfEpisodes,
    numberOfPatients,
  });
  const encounters = createEncounters({
    numberOfEncounters,
    numberOfPatients,
    numberOfEpisodes,
  });
  const observations = createObservations({
    numberOfObservations,
    numberOfPatients,
    numberOfEncounters,
  });
  const appointments = createAppointments({
    numberOfAppointments,
    numberOfPractitioners,
    numberOfPatients,
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
