export type IdStrategy = "sequential" | "uuid";
export interface DummyDataConfig {
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
  idStrategy: IdStrategy;
}
