import { Test, type TestingModule } from "@nestjs/testing";
import { DataStoreService } from "../db/dataStore.service";
import { PractitionerService } from "./practitioner.service";

describe("PractitionerService", () => {
  let service: PractitionerService;
  const mockDataStore = {
    practitioners: [
      {
        id: "1",
        resourceType: "Practitioner",
      },
      {
        id: "2",
        resourceType: "Practitioner",
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PractitionerService,
        { provide: DataStoreService, useValue: mockDataStore },
      ],
    }).compile();

    service = module.get<PractitionerService>(PractitionerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all practitioners", async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(2);
    });
  });

  describe("findOne", () => {
    it("should return an practitioner by id", async () => {
      const practitioner = await service.findOne("1");
      expect(practitioner).toBeDefined();

      if (!practitioner) {
        throw new Error("Expected practitioner to be defined in test");
      }

      expect(practitioner.id).toBe("1");
      expect(practitioner.resourceType).toBe("Practitioner");
    });

    it("should return undefined for an practitioner that doesn't exist", async () => {
      const practitioner = await service.findOne("999");
      expect(practitioner).toBeUndefined();
    });
  });
});
