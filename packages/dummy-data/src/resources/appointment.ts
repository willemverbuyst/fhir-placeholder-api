import {
  APPOINTMENT_PARTICIPANT_STATUS,
  APPOINTMENT_STATUS,
} from "@repo/fhir-codes";
import type { Appointment } from "fhir/r5";
import { getRandomElement } from "../helpers/getRandomElement";
import type { Id } from "../types";

export function createAppointment({
  patientId,
  practitionerId,
  id,
}: { patientId: string; practitionerId: string; id: string }): Appointment &
  Id {
  return {
    id,
    resourceType: "Appointment",
    status: getRandomElement(APPOINTMENT_STATUS),
    subject: { reference: `Patient/${patientId}` },
    participant: [
      {
        actor: {
          reference: `Patient/${patientId}`,
        },
        status: getRandomElement(APPOINTMENT_PARTICIPANT_STATUS),
      },
      {
        actor: {
          reference: `Practitioner/${practitionerId}`,
        },
        status: getRandomElement(APPOINTMENT_PARTICIPANT_STATUS),
      },
    ],
  };
}

export function createAppointments({
  numberOfAppointments,
  numberOfPatients,
  numberOfPractitioners,
}: {
  numberOfAppointments: number;
  numberOfPatients: number;
  numberOfPractitioners: number;
}): (Appointment & Id)[] {
  return Array.from({ length: numberOfAppointments }, (_, i) => {
    return createAppointment({
      patientId: `patient-${Math.floor(i / (numberOfAppointments / numberOfPatients)) + 1}`,
      practitionerId: `practitioner-${
        Math.floor(i / (numberOfAppointments / numberOfPractitioners)) + 1
      }`,
      id: `appointment-${i + 1}`,
    });
  });
}
