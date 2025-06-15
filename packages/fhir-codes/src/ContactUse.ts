import { ContactPoint } from "fhir/r5";

export const ContactUse: Array<NonNullable<ContactPoint["use"]>> = [
  "home",
  "work",
  "temp",
  "old",
  "mobile",
] as const;
