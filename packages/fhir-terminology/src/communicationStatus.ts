import { Communication } from "fhir/r5";

export const COMMUNICATION_STATUS = [
  "preparation",
  "in-progress",
  "on-hold",
  "stopped",
  "completed",
  "entered-in-error",
  "unknown",
] as const satisfies Communication["status"][];

