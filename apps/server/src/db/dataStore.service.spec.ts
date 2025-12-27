import {
  NUMBER_OF_CONDITIONS,
  NUMBER_OF_ENCOUNTERS,
  NUMBER_OF_EPISODES,
  NUMBER_OF_OBSERVATIONS,
  NUMBER_OF_PATIENTS,
  NUMBER_OF_PRACTITIONERS,
  NUMBER_OF_PRACTITIONER_ROLES,
  ORGANIZATIONS,
} from "../config/dummyDataConfig";
import { DataStoreService } from "./dataStore.service";

describe("DataStoreService", () => {
  let dataStoreService: DataStoreService;

  beforeEach(() => {
    dataStoreService = new DataStoreService();
  });

  it("should initialize organizations with the correct number of items", () => {
    expect(dataStoreService.organizations.length).toBe(ORGANIZATIONS);
  });

  it("should initialize practitioner roles with the correct number of items", () => {
    expect(dataStoreService.practitioners.length).toBe(
      NUMBER_OF_PRACTITIONER_ROLES,
    );
  });

  it("should initialize practitioners with the correct number of items", () => {
    expect(dataStoreService.practitioners.length).toBe(NUMBER_OF_PRACTITIONERS);
  });

  it("should have the same number of practitioners as practitioner roles", () => {
    expect(dataStoreService.practitioners.length).toBe(
      dataStoreService.practitionerRoles.length,
    );
  });

  it("should initialize patients with the correct number of items", () => {
    expect(dataStoreService.patients.length).toBe(NUMBER_OF_PATIENTS);
  });

  it("should initialize conditions for each patient", () => {
    expect(dataStoreService.conditions.length).toBe(NUMBER_OF_CONDITIONS);
  });

  it("should initialize episodes for each patient", () => {
    expect(dataStoreService.episodes.length).toBe(NUMBER_OF_EPISODES);
  });

  it("should initialize encounters for each patient", () => {
    expect(dataStoreService.encounters.length).toBe(NUMBER_OF_ENCOUNTERS);
  });

  it("should initialize observations for each patient", () => {
    expect(dataStoreService.observations.length).toBe(NUMBER_OF_OBSERVATIONS);
  });

  it("should console.log the initialized data in development mode", () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const logSpy = jest.spyOn(console, "dir").mockImplementation(() => {});
    process.env.NODE_ENV = "development";
    dataStoreService = new DataStoreService();
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});
