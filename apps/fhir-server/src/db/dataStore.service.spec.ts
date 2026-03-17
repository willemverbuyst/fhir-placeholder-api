import { DataStoreService } from "./dataStore.service";

describe("DataStoreService", () => {
  let dataStoreService: DataStoreService;

  beforeEach(() => {
    dataStoreService = new DataStoreService();
  });

  it("should initialize organizations with the correct number of items", () => {
    expect(dataStoreService.organizations.length).toBe(3);
  });

  it("should initialize practitioner roles with the correct number of items", () => {
    expect(dataStoreService.practitioners.length).toBe(6);
  });

  it("should initialize practitioners with the correct number of items", () => {
    expect(dataStoreService.practitioners.length).toBe(6);
  });

  it("should have the same number of practitioners as practitioner roles", () => {
    expect(dataStoreService.practitioners.length).toBe(
      dataStoreService.practitionerRoles.length,
    );
  });

  it("should initialize patients with the correct number of items", () => {
    expect(dataStoreService.patients.length).toBe(24);
  });

  it("should initialize conditions for each patient", () => {
    expect(dataStoreService.conditions.length).toBe(96);
  });

  it("should initialize episodes for each patient", () => {
    expect(dataStoreService.episodes.length).toBe(96);
  });

  it("should initialize encounters for each patient", () => {
    expect(dataStoreService.encounters.length).toBe(480);
  });

  it("should initialize observations for each patient", () => {
    expect(dataStoreService.observations.length).toBe(960);
  });
});
