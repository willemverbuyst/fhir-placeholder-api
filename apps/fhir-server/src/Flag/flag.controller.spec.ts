import { Test, type TestingModule } from "@nestjs/testing";
import { DataStoreService } from "../db/dataStore.service";
import { FlagController } from "./flag.controller";
import { FlagService } from "./flag.service";

describe("FlagController", () => {
  let controller: FlagController;
  let service: FlagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlagController],
      providers: [
        {
          provide: FlagService,
          useValue: {
            findAll: jest.fn(),
          },
        },
        DataStoreService,
      ],
    }).compile();

    controller = module.get<FlagController>(FlagController);
    service = module.get<FlagService>(FlagService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of FlagService", async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
