import { Condition } from "fhir/r5";

export const CONDITION_CLINICAL_STATUS = [
  {
    code: "active",
    system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
  },
  {
    code: "recurrence",
    system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
  },
  {
    code: "relapse",
    system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
  },
  {
    code: "inactive",
    system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
  },
  {
    code: "remission",
    system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
  },
  {
    code: "resolved",
    system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
  },
  {
    code: "unknown",
    system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
  },
] as const satisfies NonNullable<Condition["clinicalStatus"]["coding"]>;
