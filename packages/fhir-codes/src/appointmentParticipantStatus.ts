import { AppointmentParticipant } from "fhir/r5";

export const appointmentParticipantStatus: Array<
  AppointmentParticipant["status"]
> = ["accepted", "declined", "tentative", "needs-action"];
