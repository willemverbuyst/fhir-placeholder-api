import { Test, type TestingModule } from "@nestjs/testing";
import { DataStoreService } from "../db/dataStore.service";
import { FlagService } from "./flag.service";

describe("FlagService", () => {
  let service: FlagService;
  const mockDataStore: Pick<DataStoreService, "flags"> = {
    flags: [
      {
        id: "1",
        resourceType: "Flag",
        encounter: { reference: "Encounter/1" },
        subject: { reference: "Patient/1" },
      },
      {
        id: "2",
        resourceType: "Flag",
        encounter: { reference: "Encounter/1" },
        subject: { reference: "Patient/1" },
      },
      {
        id: "3",
        resourceType: "Flag",
        encounter: { reference: "Encounter/2" },
        subject: { reference: "Patient/2" },
      },
      {
        id: "4",
        resourceType: "Flag",
        encounter: { reference: "Encounter/2" },
        subject: { reference: "Patient/2" },
      },
      {
        id: "5",
        resourceType: "Flag",
        encounter: { reference: "Encounter/3" },
        subject: { reference: "Patient/2" },
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlagService,
        { provide: DataStoreService, useValue: mockDataStore },
      ],
    }).compile();

    service = module.get<FlagService>(FlagService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all flags", async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(5);
    });

    it("should return all flags filtered by patient", async () => {
      const bundle = await service.findAll({ patient: "2" });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(3);
    });

    it("should return all flags filtered by encounter", async () => {
      const bundle = await service.findAll({ encounter: "2" });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(2);
    });

    it("should return all flags filtered by patient and encounter", async () => {
      const bundle = await service.findAll({
        patient: "2",
        encounter: "2",
      });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(2);
    });
  });
});
