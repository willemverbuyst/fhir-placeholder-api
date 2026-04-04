import { Repository } from "typeorm";
import { wrapInBundle } from "../utils/bundle";
import { Appointment } from "./appointment.entity";
import { AppointmentService } from "./appointment.service";

jest.mock("../utils/bundle", () => ({
  wrapInBundle: jest.fn(),
}));

describe("AppointmentService", () => {
  let service: AppointmentService;

  const repo = {
    find: jest.fn(),
    query: jest.fn(),
  };

  beforeEach(async () => {
    service = new AppointmentService(
      repo as unknown as Repository<Appointment>,
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
});
