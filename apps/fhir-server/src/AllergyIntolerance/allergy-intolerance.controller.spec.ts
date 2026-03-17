import { AllergyIntoleranceController } from "./allergy-intolerance.controller";
import type { AllergyIntoleranceService } from "./allergy-intolerance.service";

describe("AllergyIntoleranceController", () => {
  let controller: AllergyIntoleranceController;
  let service: AllergyIntoleranceService;
  let serviceMock: jest.Mocked<Pick<AllergyIntoleranceService, "findAll">>;

  beforeEach(() => {
    serviceMock = {
      findAll: jest.fn(),
    };

    service = serviceMock as unknown as AllergyIntoleranceService;
    controller = new AllergyIntoleranceController(service);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of AppointmentService", () => {
      controller.findAll();

      expect(serviceMock.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
