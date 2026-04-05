import { describe, expect, it } from "vitest";
import type { UserDummyDataConfig } from "../../interfaces";
import { isConfigExpired, toDummyDataConfig } from "./dummyDataConfig.core";

describe("toDummyDataConfig", () => {
  const testUserConfig: UserDummyDataConfig = {
    preset: "custom",
    organizations: 2,
    practitionerRolesPerOrganization: 3,
    practitionersPerOrganization: 3,
    patientsPerPractitioner: 4,
    appointmentsPerPatient: 2,
    allergiesPerPatient: 1,
    episodesPerPatient: 5,
    conditionsPerPatient: 6,
    encountersPerPatient: 7,
    observationsPerEncounter: 2,
    flagsPerEncounter: 1,
    communicationsPerEncounter: 1,
    idStrategy: "uuid",
    startDate: "1950-01-01",
    createdAt: "2026-03-16T10:00:00.000Z",
  };
  it("maps user config into derived totals", () => {
    const config = toDummyDataConfig({
      userConfig: testUserConfig,
      nodeEnv: "development",
    });

    expect(config.numberOfOrganizations).toBe(2);
    expect(config.numberOfPractitionerRoles).toBe(6);
    expect(config.numberOfPractitioners).toBe(6);
    expect(config.numberOfPatients).toBe(24);
    expect(config.numberOfAppointments).toBe(48);
    expect(config.numberOfAllergies).toBe(24);
    expect(config.numberOfEpisodes).toBe(120);
    expect(config.numberOfConditions).toBe(144);
    expect(config.numberOfEncounters).toBe(168);
    expect(config.numberOfObservations).toBe(336);
    expect(config.numberOfFlags).toBe(168);
    expect(config.numberOfCommunications).toBe(168);
    expect(config.idStrategy).toBe("uuid");
  });

  it("forces sequential id strategy in test env", () => {
    const config = toDummyDataConfig({
      userConfig: testUserConfig,
      nodeEnv: "test",
    });
    expect(config.idStrategy).toBe("sequential");
  });
});

describe("isConfigExpired", () => {
  it("returns false under threshold", () => {
    const expired = isConfigExpired({
      createdAt: "2026-03-18T10:00:00.000Z",
      now: new Date("2026-03-19T10:00:00.000Z"),
      expiryMs: 2 * 24 * 60 * 60 * 1000,
    });
    expect(expired).toBe(false);
  });

  it("returns true over threshold", () => {
    const expired = isConfigExpired({
      createdAt: "2026-03-15T10:00:00.000Z",
      now: new Date("2026-03-19T10:00:00.000Z"),
      expiryMs: 2 * 24 * 60 * 60 * 1000,
    });
    expect(expired).toBe(true);
  });
});
