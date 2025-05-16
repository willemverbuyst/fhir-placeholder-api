import { AppointmentStatus, createAppointment } from "./appointment";

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
    expect(Object.values(AppointmentStatus)).toContain(appointment.status);
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
