import { AllergyIntolerance } from "fhir/r5";

export const ALLERGY_INTOLERANCE_CRITICALITY = [
  "low",
  "high",
  "unable-to-assess",
] as const satisfies AllergyIntolerance["criticality"][];
