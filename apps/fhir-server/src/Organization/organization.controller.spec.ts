import { NotFoundException } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import type { Organization } from "fhir/r5";
import { DataStoreService } from "../db/dataStore.service";
import { OrganizationController } from "./organization.controller";
import { OrganizationService } from "./organization.service";

describe("OrganizationController", () => {
  let controller: OrganizationController;
  let service: OrganizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationController],
      providers: [
        {
          provide: OrganizationService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
        DataStoreService,
      ],
    }).compile();

    controller = module.get<OrganizationController>(OrganizationController);
    service = module.get<OrganizationService>(OrganizationService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of OrganizationService", async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should call findOne method of OrganizationService", async () => {
      const mockOrganization: Organization = {
        id: "1",
        resourceType: "Organization",
      };
      jest.spyOn(service, "findOne").mockResolvedValue(mockOrganization);
      const result = await controller.findOne("1");
      expect(result).toEqual(mockOrganization);
      expect(service.findOne).toHaveBeenCalledWith("1");
    });

    it("should throw an error if organization with id is not found", async () => {
      jest.spyOn(service, "findOne").mockResolvedValue(undefined);

      await expect(controller.findOne("unknown")).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith("unknown");
    });
  });
});
