export const appointmentExample = {
  resourceType: "Appointment",
  status: "booked",
  subject: {
    reference: "Patient/patient-1",
  },
  participant: [
    {
      actor: {
        reference: "Patient/patient-1",
      },
    },
  ],
};
