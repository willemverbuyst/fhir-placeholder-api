import { describe, expect, it } from "vitest";
import type { UserDummyDataConfig } from "../interfaces";
import {
  buildSummary,
  resolveSetupConfigFlow,
  validateDate,
  validateNumber,
} from "./setupConfig.core";

const fixedNow = new Date("2026-03-19T10:00:00.000Z");

const baseConfig: UserDummyDataConfig = {
  preset: "small",
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
  createdAt: fixedNow.toISOString(),
};

function createPromptSequence(answers: string[]) {
  let index = 0;
  return async (_question: string): Promise<string> => {
    const answer = answers[index];
    index += 1;
    return answer ?? "";
  };
}

describe("validateNumber", () => {
  it("returns parsed number for valid input", () => {
    expect(validateNumber("3", 1)).toBe(3);
  });

  it("returns null for invalid input", () => {
    expect(validateNumber("abc", 1)).toBeNull();
  });

  it("returns null when below minimum", () => {
    expect(validateNumber("0", 1)).toBeNull();
  });
});

describe("validateDate", () => {
  it("accepts valid date format", () => {
    expect(validateDate("1950-01-01")).toBe(true);
  });

  it("rejects malformed date", () => {
    expect(validateDate("01-01-1950")).toBe(false);
  });
});

describe("buildSummary", () => {
  it("computes derived totals", () => {
    const summary = buildSummary(baseConfig);

    expect(summary.totalPractitioners).toBe(6);
    expect(summary.totalPatients).toBe(24);
    expect(summary.totalAppointments).toBe(48);
    expect(summary.totalEncounters).toBe(168);
    expect(summary.totalObservations).toBe(336);
    expect(summary.totalFlags).toBe(168);
    expect(summary.totalCommunications).toBe(168);
  });
});

describe("resolveSetupConfigFlow", () => {
  it("returns cancelled when overwrite is denied", async () => {
    const decision = await resolveSetupConfigFlow({
      prompt: createPromptSequence(["n"]),
      log: () => {},
      now: () => fixedNow,
      existingConfig: baseConfig,
    });

    expect(decision).toEqual({
      kind: "cancelled",
      reason: "overwrite-denied",
    });
  });

  it("returns save decision for preset flow", async () => {
    const decision = await resolveSetupConfigFlow({
      prompt: createPromptSequence(["1", "", ""]),
      log: () => {},
      now: () => fixedNow,
      existingConfig: null,
    });

    expect(decision.kind).toBe("save");
    if (decision.kind === "save") {
      expect(decision.config.preset).toBe("small");
      expect(decision.config.createdAt).toBe(fixedNow.toISOString());
      expect(decision.config.idStrategy).toBe("uuid");
    }
  });
});
