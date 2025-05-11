export const appointmentBundleExample = {
  resourceType: "Bundle",
  type: "searchset",
  total: 1,
  entry: [
    {
      fullUrl: "http://localhost:8080/api/v2/r5/Appointment/appointment-1",
      resource: {
        id: "appointment-1",
        resourceType: "Appointment",
        status: "checked-in",
        subject: {
          reference: "Patient/patient-1",
        },
        participant: [
          {
            actor: {
              reference: "Patient/patient-1",
            },
            status: "accepted",
          },
        ],
      },
    },
  ],
};
