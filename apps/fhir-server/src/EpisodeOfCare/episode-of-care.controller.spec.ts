import { NotFoundException } from "@nestjs/common";
import type { EpisodeOfCare } from "fhir/r5";
import { EpisodeOfCareController } from "./episode-of-care.controller";
import type { EpisodeOfCareService } from "./episode-of-care.service";

describe("EpisodeOfCareController", () => {
  let controller: EpisodeOfCareController;
  let service: EpisodeOfCareService;
  let serviceMock: jest.Mocked<
    Pick<EpisodeOfCareService, "findAll" | "findOne">
  >;

  beforeEach(() => {
    serviceMock = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    service = serviceMock as unknown as EpisodeOfCareService;
    controller = new EpisodeOfCareController(service);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should call findAll method of EpisodeOfCareService", () => {
      controller.findAll();

      expect(serviceMock.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("should call findAll method of EpisodeOfCareService", async () => {
      const mockEpisode: EpisodeOfCare = {
        id: "1",
        resourceType: "EpisodeOfCare",
        status: "active",
        patient: {
          reference: "Patient/1",
        },
      };

      serviceMock.findOne.mockResolvedValue(mockEpisode);

      const result = await controller.findOne("1");
      expect(result).toEqual(mockEpisode);
      expect(serviceMock.findOne).toHaveBeenCalledWith("1");
    });

    it("should throw an error if episode with id is not found", async () => {
      serviceMock.findOne.mockResolvedValue(undefined);

      await expect(controller.findOne("unknown")).rejects.toThrow(
        NotFoundException,
      );
      expect(serviceMock.findOne).toHaveBeenCalledWith("unknown");
    });
  });
});
