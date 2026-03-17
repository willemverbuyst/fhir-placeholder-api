import { AppointmentController } from "./appointment.controller";
import type { AppointmentService } from "./appointment.service";

describe("AppointmentController", () => {
  let controller: AppointmentController;
  let service: AppointmentService;
  let serviceMock: jest.Mocked<Pick<AppointmentService, "findAll">>;

  beforeEach(() => {
    serviceMock = {
      findAll: jest.fn(),
    };

    service = serviceMock as unknown as AppointmentService;
    controller = new AppointmentController(service);
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
