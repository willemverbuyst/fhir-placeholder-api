export const practitionerBundleExample = {
  resourceType: "Bundle",
  type: "searchset",
  total: 3,
  entry: [
    {
      fullUrl:
        "http://localhost:8080/api/v2/r5/Practitioner/9e5267de-6535-40b6-af5f-250318261bcb",
      resource: {
        id: "9e5267de-6535-40b6-af5f-250318261bcb",
        resourceType: "Practitioner",
        name: [
          {
            family: "Marks",
            given: ["Cordelia"],
          },
        ],
        active: true,
        birthDate: "1997-06-22",
        gender: "other",
        telecom: [
          {
            use: "old",
            system: "email",
            value: "Cordelia_Marks@fhir-placeholder.api",
          },
          {
            use: "temp",
            system: "phone",
            value: "(751) 631-4812",
          },
        ],
        address: [
          {
            use: "old",
            type: "both",
            line: ["554 Javonte Cliff"],
            city: "South Verdie",
            state: "Maine",
            postalCode: "22848",
            country: "Democratic Republic of the Congo",
          },
        ],
      },
    },
    {
      fullUrl:
        "http://localhost:8080/api/v2/r5/PractitionerRole/2d6c10de-819c-4f2d-a9a6-c026d4d28a23",
      resource: {
        id: "2d6c10de-819c-4f2d-a9a6-c026d4d28a23",
        resourceType: "PractitionerRole",
        active: true,
        practitioner: {
          reference: "Practitioner/9e5267de-6535-40b6-af5f-250318261bcb",
        },
        organization: {
          reference: "Organization/f2bbf25f-4f16-4f3e-93c5-c93f111fe4a4",
        },
      },
    },
    {
      fullUrl:
        "http://localhost:8080/api/v2/r5/Organization/f2bbf25f-4f16-4f3e-93c5-c93f111fe4a4",
      resource: {
        id: "f2bbf25f-4f16-4f3e-93c5-c93f111fe4a4",
        resourceType: "Organization",
        active: true,
        name: "Maine General Hospital",
      },
    },
  ],
};
