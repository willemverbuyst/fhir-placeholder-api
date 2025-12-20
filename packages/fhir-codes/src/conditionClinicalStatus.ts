import { Condition } from "fhir/r5";

export const CONDITION_CLINICAL_STATUS = [
  "active",
  "recurrence",
  "relapse",
  "inactive",
  "remission",
  "resolved",
  "unknown",
] as const satisfies NonNullable<
  Condition["clinicalStatus"]["coding"]
>[0]["code"][];
