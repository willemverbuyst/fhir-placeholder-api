import { Test, type TestingModule } from "@nestjs/testing";
import { DataStoreService } from "../db/dataStore.service";
import { CommunicationService } from "./communication.service";

describe("CommunicationService", () => {
  let service: CommunicationService;

  const mockDataStore: Pick<DataStoreService, "communications"> = {
    communications: [
      {
        id: "1",
        resourceType: "Communication",
        encounter: { reference: "Encounter/1" },
        subject: { reference: "Patient/1" },
      },
      {
        id: "2",
        resourceType: "Communication",
        encounter: { reference: "Encounter/1" },
        subject: { reference: "Patient/1" },
      },
      {
        id: "3",
        resourceType: "Communication",
        encounter: { reference: "Encounter/2" },
        subject: { reference: "Patient/2" },
      },
      {
        id: "4",
        resourceType: "Communication",
        encounter: { reference: "Encounter/2" },
        subject: { reference: "Patient/2" },
      },
      {
        id: "5",
        resourceType: "Communication",
        encounter: { reference: "Encounter/3" },
        subject: { reference: "Patient/2" },
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunicationService,
        { provide: DataStoreService, useValue: mockDataStore },
      ],
    }).compile();

    service = module.get<CommunicationService>(CommunicationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all communications", async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(5);
    });

    it("should return all communications filtered by patient", async () => {
      const bundle = await service.findAll({ patient: "2" });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(3);
    });

    it("should return all communications filtered by encounter", async () => {
      const bundle = await service.findAll({ encounter: "2" });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(2);
    });

    it("should return all communications filtered by patient and encounter", async () => {
      const bundle = await service.findAll({
        patient: "2",
        encounter: "2",
      });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(2);
    });
  });
});
