import { Test, type TestingModule } from "@nestjs/testing";
import { DataStoreService } from "../db/dataStore.service";
import { EncounterService } from "./encounter.service";

describe("EncounterService", () => {
  let service: EncounterService;
  const mockDataStore = {
    encounters: [
      {
        id: "1",
        resourceType: "Encounter",
        subject: { reference: "Patient/1" },
        episodeOfCare: [{ reference: "EpisodeOfCare/1" }],
      },
      {
        id: "2",
        resourceType: "Encounter",
        subject: { reference: "Patient/2" },
        episodeOfCare: [{ reference: "EpisodeOfCare/2" }],
      },
      {
        id: "3",
        resourceType: "Encounter",
        subject: { reference: "Patient/2" },
      },
      {
        id: "4",
        resourceType: "Encounter",
        subject: { reference: "Patient/2" },
      },
      {
        id: "5",
        resourceType: "Encounter",
        subject: { reference: "Patient/2" },
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EncounterService,
        { provide: DataStoreService, useValue: mockDataStore },
      ],
    }).compile();

    service = module.get<EncounterService>(EncounterService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all encounters", async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(5);
    });

    it("should return all encounters filtered by patient", async () => {
      const bundle = await service.findAll({ patient: "2" });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(4);
    });

    it("should return all encounters filtered by episode of care", async () => {
      const bundle = await service.findAll({ "episode-of-care": "1" });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(1);
    });

    it("should return all encounters filtered by patient and episode of care", async () => {
      const bundle = await service.findAll({
        patient: "2",
        "episode-of-care": "2",
      });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(1);
    });
  });
});
