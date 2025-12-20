import { AppointmentParticipant } from "fhir/r5";

export const APPOINTMENT_PARTICIPANT_STATUS = [
  "accepted",
  "declined",
  "tentative",
  "needs-action",
] as const satisfies AppointmentParticipant["status"][];
