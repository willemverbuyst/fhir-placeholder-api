import { NotFoundException } from "@nestjs/common";
import type { Condition } from "fhir/r5";
import { ConditionController } from "./condition.controller";
import type { ConditionService } from "./condition.service";

describe("ConditionsController", () => {
  let controller: ConditionController;
  let service: ConditionService;
  let serviceMock: jest.Mocked<Pick<ConditionService, "findAll" | "findOne">>;

  beforeEach(() => {
    serviceMock = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    service = serviceMock as unknown as ConditionService;

    controller = new ConditionController(service);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of ConditionService", () => {
      controller.findAll();

      expect(serviceMock.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should call findOne method of ConditionService", async () => {
      const mockCondition: Condition = {
        id: "1",
        resourceType: "Condition",
        clinicalStatus: {},
        subject: {},
      };

      serviceMock.findOne.mockResolvedValue(mockCondition);

      const result = await controller.findOne("1");

      expect(result).toEqual(mockCondition);
      expect(serviceMock.findOne).toHaveBeenCalledWith("1");
    });

    it("should throw an error if condition with id is not found", async () => {
      serviceMock.findOne.mockResolvedValue(undefined);

      await expect(controller.findOne("unknown")).rejects.toThrow(
        NotFoundException,
      );
      expect(serviceMock.findOne).toHaveBeenCalledWith("unknown");
    });
  });
});
