import { Appointment } from "fhir/r5";

export const AppointmentStatus: Array<Appointment["status"]> = [
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
] as const;
