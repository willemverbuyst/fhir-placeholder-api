import { Appointment } from "fhir/r5";

export const APPOINTMENT_STATUS = [
  "proposed",
  "pending",
  "booked",
  "arrived",
  "fulfilled",
  "cancelled",
  "noshow",
  "entered-in-error",
  "checked-in",
  "waitlist",
] as const satisfies Appointment["status"][];
