import { Address } from "fhir/r5";

export const addressType: Array<NonNullable<Address["type"]>> = [
  "postal",
  "physical",
  "both",
];
