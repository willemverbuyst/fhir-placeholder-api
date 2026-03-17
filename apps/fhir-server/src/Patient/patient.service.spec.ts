import type { Patient } from "fhir/r5";
import type { DataStoreService } from "../db/dataStore.service";
import { PatientService } from "./patient.service";

describe("PatientService", () => {
  let service: PatientService;
  let repoMock: Pick<DataStoreService, "patients">;

  beforeEach(() => {
    repoMock = {
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
        } as Patient,
        {
          id: "2",
          resourceType: "Patient",
          managingOrganization: {
            reference: "Organization/1",
          },
          generalPractitioner: [
            {
              reference: "Practitioner/2",
            },
          ],
        } as Patient,
        {
          id: "3",
          resourceType: "Patient",
          managingOrganization: {
            reference: "Organization/2",
          },
          generalPractitioner: [
            {
              reference: "Practitioner/2",
            },
          ],
        } as Patient,
      ],
    };

    service = new PatientService(repoMock as DataStoreService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all patients", async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(3);
    });

    it("should return all patients filtered by organization", async () => {
      const bundle = await service.findAll({ organization: "Organization/1" });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(2);
    });

    it("should return all patients filtered by general practitioner", async () => {
      const bundle = await service.findAll({ "general-practitioner": "1" });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(1);
    });

    it("should return all patients filtered by general practitioner & organization", async () => {
      const bundle = await service.findAll({
        "general-practitioner": "2",
        organization: "2",
      });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(1);
    });
  });

  describe("findOne", () => {
    it("should return an patient by id", async () => {
      const patient = await service.findOne("1");
      expect(patient).toBeDefined();

      if (!patient) {
        throw new Error("Expected patient to be defined in test");
      }

      expect(patient.id).toBe("1");
      expect(patient.resourceType).toBe("Patient");
    });

    it("should return undefined for an patient that doesn't exist", async () => {
      const patient = await service.findOne("unknown");
      expect(patient).toBeUndefined();
    });
  });
});
