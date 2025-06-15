import { Address } from "fhir/r5";

export const AddressType: Array<NonNullable<Address["type"]>> = [
  "postal",
  "physical",
  "both",
] as const;
