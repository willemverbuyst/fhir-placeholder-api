import { NotFoundException } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import type { Condition } from "fhir/r5";
import type { Id } from "src/types";
import { DataStoreService } from "../db/dataStore.service";
import { ConditionController } from "./condition.controller";
import { ConditionService } from "./condition.service";

describe("ConditionsController", () => {
  let controller: ConditionController;
  let service: ConditionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConditionController],
      providers: [
        {
          provide: ConditionService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
        DataStoreService,
      ],
    }).compile();

    controller = module.get<ConditionController>(ConditionController);
    service = module.get<ConditionService>(ConditionService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of ConditionService", () => {
      controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should call findOne method of ConditionService", async () => {
      const mockCondition: Condition & Id = {
        id: "1",
        resourceType: "Condition",
        clinicalStatus: {},
        subject: {},
      };
      jest.spyOn(service, "findOne").mockResolvedValue(mockCondition);
      const result = await controller.findOne("1");
      expect(result).toEqual(mockCondition);
      expect(service.findOne).toHaveBeenCalledWith("1");
    });

    it("should throw an error if condition with id is not found", async () => {
      jest.spyOn(service, "findOne").mockResolvedValue(undefined);

      await expect(controller.findOne("unknown")).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith("unknown");
    });
  });
});
