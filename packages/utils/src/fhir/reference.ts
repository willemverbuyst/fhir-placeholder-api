import { Reference } from "fhir/r5";

export function getIdFromReference(reference: Reference) {
  return reference.reference?.split("/")[1];
}
