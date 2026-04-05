import { Repository } from "typeorm";
import { wrapInBundle } from "../utils/bundle";
import { EpisodeOfCare } from "./episode-of-care.entity";
import { EpisodeOfCareService } from "./episode-of-care.service";

jest.mock("../utils/bundle", () => ({
  wrapInBundle: jest.fn(),
}));

describe("EpisodeOfCareService", () => {
  let service: EpisodeOfCareService;
  const repo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    query: jest.fn(),
  };

  beforeEach(async () => {
    service = new EpisodeOfCareService(
      repo as unknown as Repository<EpisodeOfCare>,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    beforeEach(() => {
      repo.find.mockReset();
      repo.query.mockReset();
    });

    it("should query by patient and wrap results", async () => {
      const entities = [{ resource: { id: "1" } }, { resource: { id: "2" } }];
      const wrapped = { bundle: true };

      repo.query.mockResolvedValue(entities);
      (wrapInBundle as jest.Mock).mockReturnValue(wrapped);

      const result = await service.findAll({ patient: "123" });

      expect(repo.query).toHaveBeenCalledWith(
        expect.stringContaining("resource->'patient'->>'reference'"),
        ["Patient/123"],
      );
      expect(wrapInBundle).toHaveBeenCalledWith([{ id: "1" }, { id: "2" }]);
      expect(result).toBe(wrapped);
    });

    it("should query by diagnosis and wrap results", async () => {
      const entities = [{ resource: { id: "1" } }, { resource: { id: "2" } }];
      const wrapped = { bundle: true };

      repo.query.mockResolvedValue(entities);
      (wrapInBundle as jest.Mock).mockReturnValue(wrapped);

      const result = await service.findAll({ "diagnosis-reference": "456" });

      expect(repo.query).toHaveBeenCalledWith(
        expect.stringContaining("resource->'diagnosis' @>"),
        ['[{"condition": [{"reference": "Condition/456"}]}]'],
      );
      expect(wrapInBundle).toHaveBeenCalledWith([{ id: "1" }, { id: "2" }]);
      expect(result).toBe(wrapped);
    });

    it("should query by diagnosis and patient and wrap results", async () => {
      const entities = [{ resource: { id: "1" } }, { resource: { id: "2" } }];
      const wrapped = { bundle: true };

      repo.query.mockResolvedValue(entities);
      (wrapInBundle as jest.Mock).mockReturnValue(wrapped);

      const result = await service.findAll({
        patient: "123",
        "diagnosis-reference": "456",
      });
      const [queryString, params] = repo.query.mock.calls[0];

      expect(queryString).toEqual(
        expect.stringContaining("resource->'patient'->>'reference' LIKE $1"),
      );
      expect(queryString).toEqual(
        expect.stringContaining("resource->'diagnosis' @> $2"),
      );
      expect(params).toEqual([
        "Patient/123",
        '[{"condition": [{"reference": "Condition/456"}]}]',
      ]);
      expect(wrapInBundle).toHaveBeenCalledWith([{ id: "1" }, { id: "2" }]);
      expect(result).toBe(wrapped);
    });

    it("should call find and wrap all resources when no patient or diagnosis is provided", async () => {
      const entities = [{ resource: { id: "1" } }, { resource: { id: "2" } }];
      const wrapped = { bundle: true };

      repo.find.mockResolvedValue(entities);
      (wrapInBundle as jest.Mock).mockReturnValue(wrapped);

      const result = await service.findAll();

      expect(repo.find).toHaveBeenCalled();
      expect(repo.query).not.toHaveBeenCalled();
      expect(wrapInBundle).toHaveBeenCalledWith([{ id: "1" }, { id: "2" }]);
      expect(result).toBe(wrapped);
    });

    it("should not use query when patient and diagnosis are undefined", async () => {
      repo.find.mockResolvedValue([]);
      (wrapInBundle as jest.Mock).mockReturnValue({});

      await service.findAll({});

      expect(repo.query).not.toHaveBeenCalled();
      expect(repo.find).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    beforeEach(() => {
      repo.findOneBy.mockReset();
    });

    it("should return the resource when entity is found", async () => {
      const entity = {
        id: "123",
        resource: { resourceType: "EpisodeOfCare", id: "123" },
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
