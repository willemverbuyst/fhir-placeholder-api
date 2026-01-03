import { AllergyIntolerance } from "fhir/r5";

export const ALLERGY_INTOLERANCE_CATEGORY = [
  "food",
  "medication",
  "environment",
  "biologic",
] as const satisfies AllergyIntolerance["category"];
