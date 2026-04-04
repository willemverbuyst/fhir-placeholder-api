import { Repository } from "typeorm";
import { wrapInBundle } from "../utils/bundle";
import { Condition } from "./condition.entity";
import { ConditionService } from "./condition.service";

jest.mock("../utils/bundle", () => ({
  wrapInBundle: jest.fn(),
}));

describe("ConditionService", () => {
  let service: ConditionService;
  const repo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    query: jest.fn(),
  };

  beforeEach(async () => {
    service = new ConditionService(repo as unknown as Repository<Condition>);
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
        expect.stringContaining("resource->'subject'->>'reference'"),
        ["Patient/123"],
      );
      expect(wrapInBundle).toHaveBeenCalledWith([{ id: "1" }, { id: "2" }]);
      expect(result).toBe(wrapped);
    });

    it("should call find and wrap all resources when no patient is provided", async () => {
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

    it("should not use query when patient is undefined", async () => {
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
        resource: { resourceType: "Condition", id: "123" },
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
