import { Test, TestingModule } from "@nestjs/testing";
import { AllergyIntoleranceController } from "./allergy-intolerance.controller";
import { AllergyIntoleranceService } from "./allergy-intolerance.service";

describe("AllergyIntoleranceController", () => {
  let controller: AllergyIntoleranceController;
  let service: AllergyIntoleranceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllergyIntoleranceController],
      providers: [
        {
          provide: AllergyIntoleranceService,
          useValue: { findAll: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<AllergyIntoleranceController>(
      AllergyIntoleranceController,
    );
    service = module.get<AllergyIntoleranceService>(AllergyIntoleranceService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of AppointmentService", () => {
      controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
