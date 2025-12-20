import { ContactPoint } from "fhir/r5";

export const CONTACT_USE = [
  "home",
  "work",
  "temp",
  "old",
  "mobile",
] as const satisfies ContactPoint["use"][];
