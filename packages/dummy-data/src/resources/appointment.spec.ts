import { APPOINTMENT_STATUS } from "@repo/fhir-codes";
import { describe, expect, it } from "vitest";
import { IdGenerator } from "../idGenerator";
import { createAppointment, createAppointments } from "./appointment";

describe("createAppointment", () => {
  it("should create an appointment with a valid structure", () => {
    const patientId = "patient-1";
    const practitionerId = "practitioner-1";
    const appointmentId = "appointment-1";
    const appointment = createAppointment({
      patientId,
      practitionerId,
      id: appointmentId,
    });

    expect(appointment).toHaveProperty("id", appointmentId);
    expect(appointment).toHaveProperty("resourceType", "Appointment");
    expect(APPOINTMENT_STATUS).toContain(appointment.status);
    expect(appointment.subject).toEqual({
      reference: `Patient/${patientId}`,
    });
    expect(appointment.participant).toHaveLength(2);

    if (!appointment.participant) {
      throw new Error("Appointment participant array is empty");
    }

    expect(appointment.participant[0].actor?.reference?.split("/")[1]).toBe(
      patientId,
    );
    expect(appointment.participant[1].actor?.reference?.split("/")[1]).toBe(
      practitionerId,
    );
  });
});

describe("createAppointments", () => {
  const idGen = new IdGenerator();
  idGen.refs.set("patient", [
    "patient-1",
    "patient-2",
    "patient-3",
    "patient-4",
    "patient-5",
    "patient-6",
    "patient-7",
    "patient-8",
  ]);
  idGen.refs.set("practitioner", ["practitioner-1", "practitioner-2"]);
  const appointments = createAppointments({
    numberOfAppointments: 16,
    numberOfPatients: 8,
    numberOfPractitioners: 2,
    idGen,
  });

  it.each`
    patientId      | practitionerId      | appointmentId
    ${"patient-1"} | ${"practitioner-1"} | ${"appointment-1"}
    ${"patient-1"} | ${"practitioner-1"} | ${"appointment-2"}
    ${"patient-2"} | ${"practitioner-1"} | ${"appointment-3"}
    ${"patient-2"} | ${"practitioner-1"} | ${"appointment-4"}
    ${"patient-3"} | ${"practitioner-1"} | ${"appointment-5"}
    ${"patient-3"} | ${"practitioner-1"} | ${"appointment-6"}
    ${"patient-4"} | ${"practitioner-1"} | ${"appointment-7"}
    ${"patient-4"} | ${"practitioner-1"} | ${"appointment-8"}
    ${"patient-5"} | ${"practitioner-2"} | ${"appointment-9"}
    ${"patient-5"} | ${"practitioner-2"} | ${"appointment-10"}
    ${"patient-6"} | ${"practitioner-2"} | ${"appointment-11"}
    ${"patient-6"} | ${"practitioner-2"} | ${"appointment-12"}
    ${"patient-7"} | ${"practitioner-2"} | ${"appointment-13"}
    ${"patient-7"} | ${"practitioner-2"} | ${"appointment-14"}
    ${"patient-8"} | ${"practitioner-2"} | ${"appointment-15"}
    ${"patient-8"} | ${"practitioner-2"} | ${"appointment-16"}
  `(
    "should assign correct participants and subject to appointment $appointmentId",
    ({ patientId, practitionerId, appointmentId }) => {
      const appointment =
        appointments[
          Number.parseInt(appointmentId.replace("appointment-", ""), 10) - 1
        ];

      expect(appointment).toHaveProperty("id", appointmentId);
      expect(appointment.resourceType).toBe("Appointment");
      expect(appointment.subject?.reference).toBe(`Patient/${patientId}`);
      expect(appointment.participant?.[0].actor?.reference).toBe(
        `Patient/${patientId}`,
      );
      expect(appointment.participant?.[1].actor?.reference).toBe(
        `Practitioner/${practitionerId}`,
      );
    },
  );

  it("should create the specified number of appointments", () => {
    const appointments = createAppointments({
      numberOfAppointments: 8,
      numberOfPatients: 4,
      numberOfPractitioners: 2,
      idGen: new IdGenerator(),
    });

    expect(appointments).toHaveLength(8);
  });

  it("should return an empty array if appointments is 0", () => {
    const appointments = createAppointments({
      numberOfAppointments: 0,
      numberOfPatients: 4,
      numberOfPractitioners: 2,
      idGen: new IdGenerator(),
    });

    expect(appointments).toHaveLength(0);
  });
});
