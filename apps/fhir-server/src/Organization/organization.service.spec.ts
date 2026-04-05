import { Repository } from "typeorm";
import { wrapInBundle } from "../utils/bundle";
import { Organization } from "./organization.entity";
import { OrganizationService } from "./organization.service";

jest.mock("../utils/bundle", () => ({
  wrapInBundle: jest.fn(),
}));

describe("OrganizationService", () => {
  let service: OrganizationService;

  const repo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    service = new OrganizationService(
      repo as unknown as Repository<Organization>,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should map resources and wrap them", async () => {
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
      repo.find.mockReset();
      repo.findOneBy.mockReset();
    });

    it("should return the resource when entity is found", async () => {
      const entity = {
        id: "123",
        resource: { name: "Org A" },
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
