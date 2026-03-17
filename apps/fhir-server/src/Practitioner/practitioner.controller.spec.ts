import { NotFoundException } from "@nestjs/common";
import type { Practitioner } from "fhir/r5";
import { PractitionerController } from "./practitioner.controller";
import type { PractitionerService } from "./practitioner.service";

describe("PractitionerController", () => {
  let controller: PractitionerController;
  let service: PractitionerService;
  let serviceMock: jest.Mocked<
    Pick<PractitionerService, "findAll" | "findOne">
  >;

  beforeEach(() => {
    serviceMock = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    service = serviceMock as unknown as PractitionerService;
    controller = new PractitionerController(service);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of PractitionerService", () => {
      controller.findAll();

      expect(serviceMock.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should call findOne method of PractitionerService", async () => {
      const mockPractitioner: Practitioner = {
        id: "1",
        resourceType: "Practitioner",
      };

      serviceMock.findOne.mockResolvedValue(mockPractitioner);

      const result = await controller.findOne("1");
      expect(result).toEqual(mockPractitioner);
      expect(serviceMock.findOne).toHaveBeenCalledWith("1");
    });

    it("should throw an error if practitioner with id is not found", async () => {
      serviceMock.findOne.mockResolvedValue(undefined);

      await expect(controller.findOne("unknown")).rejects.toThrow(
        NotFoundException,
      );
      expect(serviceMock.findOne).toHaveBeenCalledWith("unknown");
    });
  });
});
