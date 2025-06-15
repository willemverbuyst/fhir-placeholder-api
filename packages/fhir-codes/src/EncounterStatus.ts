import { Encounter } from "fhir/r5";

export const EncounterStatus: Array<Encounter["status"]> = [
  "planned",
  "in-progress",
  "on-hold",
  "discharged",
  "completed",
  "cancelled",
  "discontinued",
  "entered-in-error",
  "unknown",
] as const;
