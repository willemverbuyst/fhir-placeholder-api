import { Repository } from "typeorm";
import { wrapInBundle } from "../utils/bundle";
import { Patient } from "./patient.entity";
import { PatientService } from "./patient.service";

jest.mock("../utils/bundle", () => ({
  wrapInBundle: jest.fn(),
}));

describe("PatientService", () => {
  let service: PatientService;

  const repo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    query: jest.fn(),
  };

  beforeEach(async () => {
    service = new PatientService(repo as unknown as Repository<Patient>);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    beforeEach(() => {
      repo.find.mockReset();
      repo.query.mockReset();
    });

    it("should query by organization and wrap results", async () => {
      const entities = [{ resource: { id: "1" } }, { resource: { id: "2" } }];
      const wrapped = { bundle: true };

      repo.query.mockResolvedValue(entities);
      (wrapInBundle as jest.Mock).mockReturnValue(wrapped);

      const result = await service.findAll({ organization: "123" });

      expect(repo.query).toHaveBeenCalledWith(
        expect.stringContaining(
          "resource->'managingOrganization'->>'reference'",
        ),
        ["Organization/123"],
      );
      expect(wrapInBundle).toHaveBeenCalledWith([{ id: "1" }, { id: "2" }]);
      expect(result).toBe(wrapped);
    });

    it("should query by practitioner and wrap results", async () => {
      const entities = [{ resource: { id: "1" } }, { resource: { id: "2" } }];
      const wrapped = { bundle: true };

      repo.query.mockResolvedValue(entities);
      (wrapInBundle as jest.Mock).mockReturnValue(wrapped);

      const result = await service.findAll({ "general-practitioner": "123" });

      expect(repo.query).toHaveBeenCalledWith(
        expect.stringContaining("resource->'generalPractitioner' @>"),
        [`[{"reference": "Practitioner/123"}]`],
      );
      expect(wrapInBundle).toHaveBeenCalledWith([{ id: "1" }, { id: "2" }]);
      expect(result).toBe(wrapped);
    });

    it("should map all resources when there is no organization and general-practitioner and wrap them", async () => {
      const entities = [{ resource: { id: "1" } }, { resource: { id: "2" } }];
      const wrapped = { bundle: true };

      repo.find.mockResolvedValue(entities);
      (wrapInBundle as jest.Mock).mockReturnValue(wrapped);

      const result = await service.findAll();

      expect(repo.find).toHaveBeenCalled();
      expect(wrapInBundle).toHaveBeenCalledWith([{ id: "1" }, { id: "2" }]);
      expect(result).toBe(wrapped);
    });
  });

  describe("findOne", () => {
    beforeEach(() => {
      repo.findOneBy.mockReset();
    });

    it("should return the resource when entity is found", async () => {
      const entity = {
        id: "123",
        resource: { name: "Patient A" },
      };

      repo.findOneBy.mockResolvedValue(entity);

      const result = await service.findOne("123");

      expect(repo.findOneBy).toHaveBeenCalledWith({ id: "123" });
      expect(result).toEqual(entity.resource);
    });

    it("should return undefined when entity is not found", async () => {
      repo.findOneBy.mockResolvedValue(undefined);

      const result = await service.findOne("123");

      expect(repo.findOneBy).toHaveBeenCalledWith({ id: "123" });
      expect(result).toBeUndefined();
    });
  });
});
