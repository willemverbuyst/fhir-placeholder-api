import { Observation } from "fhir/r5";

export const ObservationStatus: Array<Observation["status"]> = [
  "registered",
  "preliminary",
  "final",
  "amended",
  "corrected",
  "cancelled",
  "entered-in-error",
  "unknown",
] as const;
