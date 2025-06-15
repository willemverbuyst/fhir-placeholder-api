import { ContactPoint } from "fhir/r5";

export const contactSystem: Array<NonNullable<ContactPoint["system"]>> = [
  "phone",
  "fax",
  "email",
  "pager",
  "url",
  "sms",
  "other",
];
