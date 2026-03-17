import { PractitionerRoleController } from "./practitioner-role.controller";
import type { PractitionerRoleService } from "./practitioner-role.service";

describe("PractitionerRoleController", () => {
  let controller: PractitionerRoleController;
  let service: PractitionerRoleService;
  let serviceMock: jest.Mocked<Pick<PractitionerRoleService, "findAll">>;

  beforeEach(() => {
    serviceMock = {
      findAll: jest.fn(),
    };

    service = serviceMock as unknown as PractitionerRoleService;
    controller = new PractitionerRoleController(service);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of PractitionerRoleService", () => {
      controller.findAll();

      expect(serviceMock.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
