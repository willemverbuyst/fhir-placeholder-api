import { ContactPoint } from "fhir/r5";

export const CONTACT_SYSTEM = [
  "phone",
  "fax",
  "email",
  "pager",
  "url",
  "sms",
  "other",
] as const satisfies ContactPoint["system"][];
