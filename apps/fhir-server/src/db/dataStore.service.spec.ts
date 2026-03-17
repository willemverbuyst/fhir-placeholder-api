import { generateResources } from "@repo/dummy-data";
import { dummyDataConfig } from "../../scripts/dummyDataConfig";
import { DataStoreService } from "./dataStore.service";

jest.mock("@repo/dummy-data", () => {
  const mockResources = {
    allergies: [],
    appointments: [],
    conditions: [],
    encounters: [],
    episodes: [],
    observations: [],
    organizations: [],
    patients: [],
    practitioners: [],
    practitionerRoles: [],
  } as const;

  return {
    generateResources: jest.fn(() => mockResources),
  };
});

describe("DataStoreService", () => {
  it("should call generateResources with dummyDataConfig on construction", () => {
    const generateResourcesMock = generateResources as jest.MockedFunction<
      typeof generateResources
    >;

    new DataStoreService();

    expect(generateResourcesMock).toHaveBeenCalledTimes(1);
    expect(generateResourcesMock).toHaveBeenCalledWith(dummyDataConfig);
  });
});
