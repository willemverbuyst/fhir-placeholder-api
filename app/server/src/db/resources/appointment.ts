import type { Appointment } from "fhir/r5";
import type { Id } from "../../types";
import { getRandomElement } from "../helpers/getRandomElement";

export enum AppointmentStatus {
  PROPOSED = "proposed",
  PENDING = "pending",
  BOOKED = "booked",
  ARRIVED = "arrived",
  FULFILLED = "fulfilled",
  CANCELLED = "cancelled",
  NOSHOW = "noshow",
  ENTERED_IN_ERROR = "entered-in-error",
  CHECKED_IN = "checked-in",
  WAITLIST = "waitlist",
}

export enum AppointmentParticipantStatus {
  ACCEPTED = "accepted",
  DECLINED = "declined",
  TENTATIVE = "tentative",
  NEEDS_ACTION = "needs-action",
}

export function createAppointment({
  patientId,
  practitionerId,
  id,
}: { patientId: string; practitionerId: string; id: string }): Appointment &
  Id {
  return {
    id,
    resourceType: "Appointment",
    status: getRandomElement(Object.values(AppointmentStatus)),
    subject: { reference: `Patient/${patientId}` },
    participant: [
      {
        actor: {
          reference: `Patient/${patientId}`,
        },
        status: getRandomElement(Object.values(AppointmentParticipantStatus)),
      },
      {
        actor: {
          reference: `Practitioner/${practitionerId}`,
        },
        status: getRandomElement(Object.values(AppointmentParticipantStatus)),
      },
    ],
  };
}
