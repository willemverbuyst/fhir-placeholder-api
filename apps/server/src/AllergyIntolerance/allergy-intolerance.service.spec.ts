import { Test, TestingModule } from "@nestjs/testing";
import { DataStoreService } from "../db/dataStore.service";
import { AllergyIntoleranceService } from "./allergy-intolerance.service";

describe("AllergyIntoleranceService", () => {
  let service: AllergyIntoleranceService;
  const mockDataStore = {
    allergies: [
      {
        id: "1",
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AllergyIntoleranceService,
        { provide: DataStoreService, useValue: mockDataStore },
      ],
    }).compile();

    service = module.get<AllergyIntoleranceService>(AllergyIntoleranceService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
