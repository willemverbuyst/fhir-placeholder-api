import { DataStore } from "../../models/data.ts";

export const testDataStore: DataStore = {
  patients: [
    {
      id: "1",
      resourceType: "Patient",
      managingOrganization: {
        reference: "Organization/1",
      },
      generalPractitioner: [
        {
          reference: "Practitioner/1",
        },
      ],
    },
    {
      id: "2",
      resourceType: "Patient",
    },
  ],
  episodes: [
    {
      id: "1",
      resourceType: "EpisodeOfCare",
      status: "active",
      patient: { reference: "Patient/1" },
      diagnosis: [
        {
          condition: [
            {
              reference: { reference: "Condition/1" },
            },
          ],
        },
      ],
      type: [{ coding: [{ code: "test" }] }],
    },
    {
      id: "2",
      resourceType: "EpisodeOfCare",
      status: "active",
      patient: { reference: "Patient/2" },
      diagnosis: [
        {
          condition: [
            {
              reference: { reference: "Condition/2" },
            },
          ],
        },
      ],
      type: [{ coding: [{ code: "test" }] }],
    },
  ],
  organizations: [
    {
      id: "1",
      resourceType: "Organization",
      name: "test organization",
    },
    {
      id: "2",
      resourceType: "Organization",
      name: "another test organization",
    },
  ],
  practitioners: [
    {
      id: "1",
      resourceType: "Practitioner",
      active: true,
      name: [
        {
          family: "Smith",
          given: ["John"],
        },
      ],
    },
    {
      id: "2",
      resourceType: "Practitioner",
      active: true,
      name: [
        {
          family: "Doe",
          given: ["Jane"],
        },
      ],
    },
  ],
  conditions: [
    {
      id: "1",
      note: [{ text: "test note" }],
      resourceType: "Condition",
      subject: {
        reference: "Patient/1",
      },
      clinicalStatus: {
        coding: [
          {
            code: "active",
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
          },
        ],
      },
    },
    {
      id: "2",
      note: [{ text: "test note" }],
      resourceType: "Condition",
      subject: {
        reference: "Patient/2",
      },
      clinicalStatus: {
        coding: [
          {
            code: "active",
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
          },
        ],
      },
    },
  ],
};
