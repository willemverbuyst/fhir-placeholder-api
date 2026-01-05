import { AllergyIntolerance } from "fhir/r5";

export const ALLERGY_INTOLERANCE_TYPE = [
  {
    code: "allergy",
    system: "http://hl7.org/fhir/allergy-intolerance-type",
    display: "Allergy",
  },
  {
    code: "intolerance",
    system: "http://hl7.org/fhir/allergy-intolerance-type",
    display: "Intolerance",
  },
] as const satisfies NonNullable<AllergyIntolerance["type"]>["coding"];
