import { Repository } from "typeorm";
import { wrapInBundle } from "../utils/bundle";
import { PractitionerRole } from "./practitioner-role.entity";
import { PractitionerRoleService } from "./practitioner-role.service";

jest.mock("../utils/bundle", () => ({
  wrapInBundle: jest.fn(),
}));

describe("PractitionerRoleService", () => {
  let service: PractitionerRoleService;

  const repo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    query: jest.fn(),
  };

  beforeEach(async () => {
    service = new PractitionerRoleService(
      repo as unknown as Repository<PractitionerRole>,
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

    it("should query by organization and wrap results", async () => {
      const entities = [{ resource: { id: "1" } }, { resource: { id: "2" } }];
      const wrapped = { bundle: true };

      repo.query.mockResolvedValue(entities);
      (wrapInBundle as jest.Mock).mockReturnValue(wrapped);

      const result = await service.findAll({ organization: "123" });

      expect(repo.query).toHaveBeenCalledWith(
        expect.stringContaining("resource->'organization'->>'reference'"),
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

      const result = await service.findAll({ practitioner: "123" });

      expect(repo.query).toHaveBeenCalledWith(
        expect.stringContaining("resource->'practitioner'->>'reference'"),
        ["Practitioner/123"],
      );
      expect(wrapInBundle).toHaveBeenCalledWith([{ id: "1" }, { id: "2" }]);
      expect(result).toBe(wrapped);
    });

    it("should map all resources when there is no organization and practitioner and wrap them", async () => {
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
});
