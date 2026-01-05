import { Encounter } from "fhir/r5";

export const ENCOUNTER_STATUS = [
  "planned",
  "in-progress",
  "on-hold",
  "discharged",
  "completed",
  "cancelled",
  "discontinued",
  "entered-in-error",
  "unknown",
] as const satisfies Encounter["status"][];
