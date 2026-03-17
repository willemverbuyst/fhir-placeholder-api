import { NotFoundException } from "@nestjs/common";
import type { Organization } from "fhir/r5";
import { OrganizationController } from "./organization.controller";
import type { OrganizationService } from "./organization.service";

describe("OrganizationController", () => {
  let controller: OrganizationController;
  let service: OrganizationService;
  let serviceMock: jest.Mocked<
    Pick<OrganizationService, "findAll" | "findOne" | "create" | "update">
  >;

  beforeEach(() => {
    serviceMock = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    service = serviceMock as unknown as OrganizationService;
    controller = new OrganizationController(service);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of OrganizationService", async () => {
      await controller.findAll();
      expect(serviceMock.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should call findOne method of OrganizationService", async () => {
      const mockOrganization: Organization = {
        id: "1",
        resourceType: "Organization",
      };

      serviceMock.findOne.mockResolvedValue(mockOrganization);

      const result = await controller.findOne("1");
      expect(result).toEqual(mockOrganization);
      expect(serviceMock.findOne).toHaveBeenCalledWith("1");
    });

    it("should throw an error if organization with id is not found", async () => {
      serviceMock.findOne.mockResolvedValue(undefined);

      await expect(controller.findOne("unknown")).rejects.toThrow(
        NotFoundException,
      );
      expect(serviceMock.findOne).toHaveBeenCalledWith("unknown");
    });
  });

  describe("create", () => {
    it("should call create with organization dto", async () => {
      const dto = { name: "test organization", active: true };
      await controller.create(dto);
      expect(serviceMock.create).toHaveBeenCalledWith(dto);
    });
  });

  describe("update", () => {
    it("should call update method of OrganizationService", async () => {
      const mockOrganization: Organization = {
        id: "1",
        resourceType: "Organization",
      };
      const dto = { name: "Updated organization" };

      serviceMock.update.mockResolvedValue(mockOrganization);

      const result = await controller.update("1", dto);
      expect(result).toEqual(mockOrganization);
      expect(serviceMock.update).toHaveBeenCalledWith("1", dto);
    });

    it("should throw an error if organization with id is not found", async () => {
      const dto = { name: "updated organization" };

      serviceMock.update.mockResolvedValue(undefined);

      await expect(controller.update("unknown", dto)).rejects.toThrow(
        NotFoundException,
      );
      expect(serviceMock.update).toHaveBeenCalledWith("unknown", dto);
    });
  });
});
