import { Test, type TestingModule } from "@nestjs/testing";
import { AppointmentController } from "./appointment.controller";
import { AppointmentService } from "./appointment.service";

describe("AppointmentController", () => {
  let controller: AppointmentController;
  let service: AppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [
        {
          provide: AppointmentService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AppointmentController>(AppointmentController);
    service = module.get<AppointmentService>(AppointmentService);
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
