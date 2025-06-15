import { ContactPoint } from "fhir/r5";

export const ContactSystem: Array<NonNullable<ContactPoint["system"]>> = [
  "phone",
  "fax",
  "email",
  "pager",
  "url",
  "sms",
  "other",
] as const;
