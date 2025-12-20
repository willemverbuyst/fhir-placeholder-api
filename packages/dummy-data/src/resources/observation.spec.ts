import { OBSERVATION_STATUS } from "@repo/fhir-codes";
import { describe, expect, it } from "vitest";
import { observationCodes } from "../valueSets/observation-code-value-set";
import { createObservation, createObservations } from "./observation";

describe("createObservation", () => {
  it("should create an observation with a valid structure", () => {
    const patientId = "patient-1";
    const encounterId = "encounter-1";
    const observationId = "observation-1";
    const observation = createObservation({
      patientId,
      encounterId,
      id: observationId,
    });

    expect(observation).toHaveProperty("id");
    expect(observation).toHaveProperty("resourceType", "Observation");
    expect(Object.values(OBSERVATION_STATUS)).toContain(observation.status);
    expect(observation.subject).toEqual({ reference: `Patient/${patientId}` });
    expect(observation.encounter).toEqual({
      reference: `Encounter/${encounterId}`,
    });
    expect(observation.code.coding).toHaveLength(1);
    expect(observation).toHaveProperty("note");

    if (!observation.note) {
      throw new Error("Condition note array is empty");
    }
    expect(observation.note).toBeInstanceOf(Array);
    expect(observation.note[0]).toHaveProperty("text");
  });

  it("should select a random code from the observationCodes value set", () => {
    const patientId = "patient-1";
    const encounterId = "encounter-1";
    const observationId = "observation-1";
    const observation = createObservation({
      patientId,
      encounterId,
      id: observationId,
    });

    expect(observation.code.coding).toHaveLength(1);

    if (!observation.code.coding) {
      throw new Error("Observation.code.coding is empty");
    }

    expect(observationCodes).toContainEqual(observation.code.coding[0]);
  });
});

describe("createObservations", () => {
  const encounters = createObservations({
    numberOfObservations: 12,
    numberOfEncounters: 6,
    numberOfPatients: 3,
  });

  it.each`
    observationId       | patientId      | encounterId
    ${"observation-1"}  | ${"patient-1"} | ${"encounter-1"}
    ${"observation-2"}  | ${"patient-1"} | ${"encounter-1"}
    ${"observation-3"}  | ${"patient-1"} | ${"encounter-2"}
    ${"observation-4"}  | ${"patient-1"} | ${"encounter-2"}
    ${"observation-5"}  | ${"patient-2"} | ${"encounter-3"}
    ${"observation-6"}  | ${"patient-2"} | ${"encounter-3"}
    ${"observation-7"}  | ${"patient-2"} | ${"encounter-4"}
    ${"observation-8"}  | ${"patient-2"} | ${"encounter-4"}
    ${"observation-9"}  | ${"patient-3"} | ${"encounter-5"}
    ${"observation-10"} | ${"patient-3"} | ${"encounter-5"}
    ${"observation-11"} | ${"patient-3"} | ${"encounter-6"}
    ${"observation-12"} | ${"patient-3"} | ${"encounter-6"}
  `(
    "should assign correct patient and encounter to observation $observationId",
    ({ observationId, patientId, encounterId }) => {
      const observation =
        encounters[
          Number.parseInt(observationId.replace("observation-", ""), 10) - 1
        ];
      expect(observation).toHaveProperty("id", observationId);
      expect(observation.resourceType).toBe("Observation");
      expect(observation.subject?.reference).toBe(`Patient/${patientId}`);
      expect(observation.encounter?.reference).toBe(`Encounter/${encounterId}`);
    },
  );

  it("should create the specified number of observations", () => {
    const observations = createObservations({
      numberOfObservations: 12,
      numberOfEncounters: 6,
      numberOfPatients: 3,
    });

    expect(observations).toHaveLength(12);
  });

  it("should return an empty array if numberOfObservations is 0", () => {
    const observations = createObservations({
      numberOfObservations: 0,
      numberOfEncounters: 6,
      numberOfPatients: 3,
    });

    expect(observations).toHaveLength(0);
  });
});
