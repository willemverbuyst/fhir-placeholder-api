import { AppointmentParticipant } from "fhir/r5";

export const AppointmentParticipantStatus: Array<
  AppointmentParticipant["status"]
> = ["accepted", "declined", "tentative", "needs-action"] as const;
