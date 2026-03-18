import { Flag } from "fhir/r5";

export const FLAG_STATUS = [
  "active",
  "inactive",
  "entered-in-error",
] as const satisfies Flag["status"][];
