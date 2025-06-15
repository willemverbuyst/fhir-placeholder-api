import { Address } from "fhir/r5";

export const addressUse: Array<NonNullable<Address["use"]>> = [
  "home",
  "work",
  "temp",
  "old",
  "billing",
];
