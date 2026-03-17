import { ObservationController } from "./observation.controller";
import type { ObservationService } from "./observation.service";

describe("ObservationController", () => {
  let controller: ObservationController;
  let service: ObservationService;
  let serviceMock: jest.Mocked<Pick<ObservationService, "findAll">>;

  beforeEach(() => {
    serviceMock = {
      findAll: jest.fn(),
    };

    service = serviceMock as unknown as ObservationService;
    controller = new ObservationController(service);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of ObservationService", async () => {
      await controller.findAll();
      expect(serviceMock.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
