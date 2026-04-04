import { AllergyIntoleranceService } from "./allergy-intolerance.service";
import { Repository } from "typeorm";
import { AllergyIntolerance } from "./allergy-intolerance.entity";
import { wrapInBundle } from "../utils/bundle";

jest.mock("../utils/bundle", () => ({
  wrapInBundle: jest.fn(),
}));

describe("AllergyIntoleranceService", () => {
  let service: AllergyIntoleranceService;

  const repo = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    service = new AllergyIntoleranceService(
      repo as unknown as Repository<AllergyIntolerance>,
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
});
