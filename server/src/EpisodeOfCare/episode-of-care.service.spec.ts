import { Test, TestingModule } from "@nestjs/testing";
import { DataStoreService } from "../db/dataStore.service";
import { EpisodeOfCareService } from "./episode-of-care.service";

describe("EpisodeOfCareService", () => {
  let service: EpisodeOfCareService;
  const mockDataStore = {
    episodes: [
      {
        id: "1",
        resourceType: "EpisodeOfCare",
        status: "active",
        patient: { reference: "Patient/1" },
        diagnosis: [
          { condition: [{ reference: { reference: "condition/2" } }] },
        ],
      },
      {
        id: "2",
        resourceType: "EpisodeOfCare",
        status: "active",
        patient: { reference: "Patient/2" },
        diagnosis: [
          { condition: [{ reference: { reference: "condition/2" } }] },
          { condition: [{ reference: { reference: "condition/3" } }] },
        ],
      },
      {
        id: "3",
        resourceType: "EpisodeOfCare",
        status: "active",
        patient: { reference: "Patient/1" },
        diagnosis: [
          { condition: [{ reference: { reference: "condition/4" } }] },
        ],
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EpisodeOfCareService,
        { provide: DataStoreService, useValue: mockDataStore },
      ],
    }).compile();

    service = module.get<EpisodeOfCareService>(EpisodeOfCareService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all episodes in a Bundle", async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(3);
    });

    it("should return all episodes filtered by patient", async () => {
      const bundle = await service.findAll({ patient: "1" });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(2);
    });

    it("should return all episodes filtered by condition", async () => {
      const bundle = await service.findAll({ "diagnosis-reference": "2" });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(2);
    });
  });

  describe("findOne", () => {
    it("should return an episode by id", async () => {
      const episode = await service.findOne("1");
      expect(episode).toBeDefined();

      if (!episode) {
        throw new Error("Expected episode to be defined in test");
      }
      expect(episode.id).toBe("1");
      expect(episode.resourceType).toBe("EpisodeOfCare");
    });

    it("should return undefined for an episode that doesn't exist", async () => {
      const episode = await service.findOne("unknown");
      expect(episode).toBeUndefined();
    });
  });
});
