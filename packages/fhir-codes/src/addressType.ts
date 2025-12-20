import { Address } from "fhir/r5";

export const ADDRESS_TYPE = [
  "postal",
  "physical",
  "both",
] as const satisfies Address["type"][];
