import { Test, type TestingModule } from "@nestjs/testing";
import { DataStoreService } from "../db/dataStore.service";
import { EncounterController } from "./encounter.controller";
import { EncounterService } from "./encounter.service";

describe("EncounterController", () => {
  let controller: EncounterController;
  let service: EncounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncounterController],
      providers: [
        { provide: EncounterService, useValue: { findAll: jest.fn() } },
        DataStoreService,
      ],
    }).compile();

    controller = module.get<EncounterController>(EncounterController);
    service = module.get<EncounterService>(EncounterService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of EncounterService", async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
