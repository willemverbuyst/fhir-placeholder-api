import type { Observation } from "fhir/r5";
import type { DataStoreService } from "../db/dataStore.service";
import { ObservationService } from "./observation.service";

describe("ObservationService", () => {
  let service: ObservationService;
  let repoMock: Pick<DataStoreService, "observations">;

  beforeEach(() => {
    repoMock = {
      observations: [
        {
          id: "1",
          resourceType: "Observation",
          encounter: { reference: "Encounter/1" },
          subject: { reference: "Patient/1" },
        } as Observation,
        {
          id: "2",
          resourceType: "Observation",
          encounter: { reference: "Encounter/1" },
          subject: { reference: "Patient/1" },
        } as Observation,
        {
          id: "3",
          resourceType: "Observation",
          encounter: { reference: "Encounter/2" },
          subject: { reference: "Patient/2" },
        } as Observation,
        {
          id: "4",
          resourceType: "Observation",
          encounter: { reference: "Encounter/2" },
          subject: { reference: "Patient/2" },
        } as Observation,
        {
          id: "5",
          resourceType: "Observation",
          encounter: { reference: "Encounter/3" },
          subject: { reference: "Patient/2" },
        } as Observation,
      ],
    };

    service = new ObservationService(repoMock as DataStoreService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all observations", async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(5);
    });

    it("should return all observations filtered by patient", async () => {
      const bundle = await service.findAll({ patient: "2" });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(3);
    });

    it("should return all observations filtered by encounter", async () => {
      const bundle = await service.findAll({ encounter: "2" });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(2);
    });

    it("should return all observations filtered by patient and encounter", async () => {
      const bundle = await service.findAll({
        patient: "2",
        encounter: "2",
      });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(2);
    });
  });
});
