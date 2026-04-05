import { Test, type TestingModule } from "@nestjs/testing";
import { CommunicationController } from "./communication.controller";
import { CommunicationService } from "./communication.service";

describe("CommunicationController", () => {
  let controller: CommunicationController;
  let service: CommunicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunicationController],
      providers: [
        {
          provide: CommunicationService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CommunicationController>(CommunicationController);
    service = module.get<CommunicationService>(CommunicationService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of CommunicationService", async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
