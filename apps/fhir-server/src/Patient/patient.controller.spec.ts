import { NotFoundException } from "@nestjs/common";
import type { Patient } from "fhir/r5";
import { PatientController } from "./patient.controller";
import type { PatientService } from "./patient.service";

describe("PatientController", () => {
  let controller: PatientController;
  let service: PatientService;
  let serviceMock: jest.Mocked<Pick<PatientService, "findAll" | "findOne">>;

  beforeEach(() => {
    serviceMock = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    service = serviceMock as unknown as PatientService;
    controller = new PatientController(service);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of PatientService", () => {
      controller.findAll();

      expect(serviceMock.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should call findOne method of PatientService", async () => {
      const mockPatient: Patient = {
        id: "1",
        resourceType: "Patient",
      };

      serviceMock.findOne.mockResolvedValue(mockPatient);

      const result = await controller.findOne("1");

      expect(result).toEqual(mockPatient);
    });

    it("should throw an error if patient with id is not found", async () => {
      serviceMock.findOne.mockResolvedValue(undefined);

      await expect(controller.findOne("1")).rejects.toThrow(
        new NotFoundException("patient not found"),
      );
    });
  });
});
