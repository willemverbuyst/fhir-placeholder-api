import { observationCodes } from "../valueSets/observation-code-value-set";
import { ObservationStatus, createObservation } from "./observation";

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
    expect(Object.values(ObservationStatus)).toContain(observation.status);
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
