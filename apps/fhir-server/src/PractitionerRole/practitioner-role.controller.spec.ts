import { Test, type TestingModule } from "@nestjs/testing";
import { PractitionerRoleController } from "./practitioner-role.controller";
import { PractitionerRoleService } from "./practitioner-role.service";

describe("PractitionerRoleController", () => {
  let controller: PractitionerRoleController;
  let service: PractitionerRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PractitionerRoleController],
      providers: [
        {
          provide: PractitionerRoleService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PractitionerRoleController>(
      PractitionerRoleController,
    );
    service = module.get<PractitionerRoleService>(PractitionerRoleService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of PractitionerRoleService", () => {
      controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
