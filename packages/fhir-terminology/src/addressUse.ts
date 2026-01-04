import { Address } from "fhir/r5";

export const ADDRESS_USE = [
  "home",
  "work",
  "temp",
  "old",
  "billing",
] as const satisfies Address["use"][];
