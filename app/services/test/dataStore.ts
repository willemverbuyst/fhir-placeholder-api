import { DataStore } from "../../models/data.ts";

export const testDataStore: DataStore = {
  patients: [],
  episodes: [],
  organizations: [],
  practitioners: [],
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
