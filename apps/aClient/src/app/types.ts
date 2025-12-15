import {
  Appointment,
  Condition,
  Encounter,
  EpisodeOfCare,
  Observation,
  Organization,
  Patient,
  Practitioner,
  PractitionerRole,
} from 'fhir/r5';

export type AppFhirResource =
  | Appointment
  | Condition
  | Encounter
  | EpisodeOfCare
  | Observation
  | Organization
  | Patient
  | Practitioner
  | PractitionerRole;
