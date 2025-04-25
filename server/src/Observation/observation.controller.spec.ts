import { Test, TestingModule } from "@nestjs/testing";
import { DataStoreService } from "../db/dataStore.service";
import { ObservationController } from "./observation.controller";
import { ObservationService } from "./observation.service";

describe("ObservationController", () => {
  let controller: ObservationController;
  let service: ObservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObservationController],
      providers: [
        {
          provide: ObservationService,
          useValue: {
            findAll: jest.fn(),
          },
        },
        DataStoreService,
      ],
    }).compile();

    controller = module.get<ObservationController>(ObservationController);
    service = module.get<ObservationService>(ObservationService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of ObservationService", async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
