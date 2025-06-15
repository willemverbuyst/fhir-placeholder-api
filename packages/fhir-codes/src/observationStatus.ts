import { Observation } from "fhir/r5";

export const observationStatus: Array<Observation["status"]> = [
  "registered",
  "preliminary",
  "final",
  "amended",
  "corrected",
  "cancelled",
  "entered-in-error",
  "unknown",
];
