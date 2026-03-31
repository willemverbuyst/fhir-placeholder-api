import { NotFoundException } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import type { Practitioner } from "fhir/r5";
import { DataStoreService } from "../db/dataStore.service";
import type { GetPractitionerDto } from "./dto/get-practitioner.dto";
import { PractitionerController } from "./practitioner.controller";
import { PractitionerService } from "./practitioner.service";

describe("PractitionerController", () => {
  let controller: PractitionerController;
  let service: PractitionerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PractitionerController],
      providers: [
        {
          provide: PractitionerService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
        DataStoreService,
      ],
    }).compile();

    controller = module.get<PractitionerController>(PractitionerController);
    service = module.get<PractitionerService>(PractitionerService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of PractitionerService", async () => {
      await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(service.findAll).toHaveBeenCalledWith(undefined);
    });

    it("should forward include query to PractitionerService", async () => {
      const query: GetPractitionerDto = {
        _include: "PractitionerRole:practitioner",
        "_include:iterate": "PractitionerRole:organization",
      };

      await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe("findOne", () => {
    it("should call findOne method of PractitionerService", async () => {
      const mockPractitioner: Practitioner = {
        id: "1",
        resourceType: "Practitioner",
      };
      jest.spyOn(service, "findOne").mockResolvedValue(mockPractitioner);

      const result = await controller.findOne("1");
      expect(result).toEqual(mockPractitioner);
      expect(service.findOne).toHaveBeenCalledWith("1");
    });

    it("should throw an error if practitioner with id is not found", async () => {
      jest.spyOn(service, "findOne").mockResolvedValue(undefined);

      await expect(controller.findOne("unknown")).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith("unknown");
    });
  });
});
