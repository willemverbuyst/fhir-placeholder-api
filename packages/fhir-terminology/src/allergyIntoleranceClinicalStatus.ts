import { AllergyIntolerance } from "fhir/r5";

export const ALLERGY_INTOLERANCE_CLINICAL_STATUS = [
  {
    code: "active",
    system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
  },
  {
    code: "inactive",
    system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
  },
  {
    code: "resolved",
    system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
  },
] as const satisfies NonNullable<
  AllergyIntolerance["clinicalStatus"]
>["coding"];
