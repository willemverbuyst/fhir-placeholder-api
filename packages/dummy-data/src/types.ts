export type IdStrategy = "sequential" | "uuid";
export interface DummyDataConfig {
  numberOfAllergies: number;
  numberOfAppointments: number;
  numberOfConditions: number;
  numberOfEncounters: number;
  numberOfEpisodes: number;
  numberOfObservations: number;
  numberOfFlags: number;
  numberOfCommunications: number;
  numberOfOrganizations: number;
  numberOfPatients: number;
  numberOfPractitioners: number;
  numberOfPractitionerRoles: number;
  startDate: `${number}-${number}-${number}`;
  idStrategy: IdStrategy;
}
