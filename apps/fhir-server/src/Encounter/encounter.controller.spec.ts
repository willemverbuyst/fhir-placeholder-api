import { EncounterController } from "./encounter.controller";
import type { EncounterService } from "./encounter.service";

describe("EncounterController", () => {
  let controller: EncounterController;
  let service: EncounterService;
  let serviceMock: jest.Mocked<Pick<EncounterService, "findAll">>;

  beforeEach(() => {
    serviceMock = {
      findAll: jest.fn(),
    };

    service = serviceMock as unknown as EncounterService;
    controller = new EncounterController(service);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of EncounterService", async () => {
      await controller.findAll();
      expect(serviceMock.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
