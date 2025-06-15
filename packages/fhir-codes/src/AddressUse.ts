import { Address } from "fhir/r5";

export const AddressUse: Array<NonNullable<Address["use"]>> = [
  "home",
  "work",
  "temp",
  "old",
  "billing",
] as const;
