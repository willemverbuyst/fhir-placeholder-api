import { faker } from "@faker-js/faker";
import {
  APPOINTMENT_PARTICIPANT_STATUS,
  APPOINTMENT_STATUS,
} from "@repo/fhir-codes";
import type { Appointment } from "fhir/r5";
import { IdGenerator } from "../idGenerator";

export function createAppointment({
  patientId,
  practitionerId,
  id,
}: {
  patientId: string | undefined;
  practitionerId: string | undefined;
  id: string;
}): Appointment {
  const participantArray: Appointment["participant"] = [];
  if (patientId) {
    participantArray.push({
      actor: { reference: `Patient/${patientId}` },
      status: faker.helpers.arrayElement(APPOINTMENT_PARTICIPANT_STATUS),
    });
  }
  if (practitionerId) {
    participantArray.push({
      actor: { reference: `Practitioner/${practitionerId}` },
      status: faker.helpers.arrayElement(APPOINTMENT_PARTICIPANT_STATUS),
    });
  }
  return {
    id,
    resourceType: "Appointment",
    status: faker.helpers.arrayElement(APPOINTMENT_STATUS),
    subject: patientId ? { reference: `Patient/${patientId}` } : undefined,
    participant: participantArray,
  };
}

export function createAppointments({
  numberOfAppointments,
  numberOfPatients,
  numberOfPractitioners,
  idGen,
}: {
  numberOfAppointments: number;
  numberOfPatients: number;
  numberOfPractitioners: number;
  idGen: IdGenerator;
}): Appointment[] {
  return Array.from({ length: numberOfAppointments }, (_, i) => {
    const patientIndex = Math.floor(
      i / (numberOfAppointments / numberOfPatients),
    );
    const practitionerIndex = Math.floor(
      i / (numberOfAppointments / numberOfPractitioners),
    );
    return createAppointment({
      patientId: idGen.refs.get("patient")?.[patientIndex],
      practitionerId: idGen.refs.get("practitioner")?.[practitionerIndex],
      id: idGen.generateId("appointment"),
    });
  });
}
