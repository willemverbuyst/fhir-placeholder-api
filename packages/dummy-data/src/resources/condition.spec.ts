import { describe, expect, it } from "vitest";
import { createCondition, createConditions } from "./condition";

describe("createCondition", () => {
  it("should create a Condition resource with the correct structure", () => {
    const patientId = "patient-1";
    const conditionId = "condition-1";
    const condition = createCondition({ patientId, id: conditionId });

    expect(condition).toHaveProperty("id");
    expect(condition).toHaveProperty("resourceType", "Condition");
    expect(condition).toHaveProperty(
      "subject.reference",
      `Patient/${patientId}`,
    );
    expect(condition).toHaveProperty("clinicalStatus.coding");

    if (!condition.clinicalStatus.coding) {
      throw new Error("Condition clinicalStatus coding array is empty");
    }

    expect(condition.clinicalStatus.coding[0]).toHaveProperty("code");
    expect(condition.clinicalStatus.coding[0]).toHaveProperty(
      "system",
      "http://terminology.hl7.org/CodeSystem/condition-clinical",
    );
    expect(condition).toHaveProperty("note");

    if (!condition.note) {
      throw new Error("Condition note array is empty");
    }

    expect(condition.note).toBeInstanceOf(Array);
    expect(condition.note[0]).toHaveProperty("text");
  });

  it("should generate a random clinicalStatus code from the predefined list", () => {
    const patientId = "patient-1";
    const conditionId = "condition-1";
    const condition = createCondition({ patientId, id: conditionId });

    const validCodes = [
      "active",
      "recurrence",
      "relapse",
      "inactive",
      "remission",
      "resolved",
      "unknown",
    ];

    if (!condition.clinicalStatus.coding) {
      throw new Error("Condition clinicalStatus coding array is empty");
    }
    expect(validCodes).toContain(condition.clinicalStatus.coding[0].code);
  });

  it("should associate the condition with the correct patient ID", () => {
    const patientId = "patient-1";
    const conditionId = "condition-1";
    const condition = createCondition({ patientId, id: conditionId });

    expect(condition.subject.reference).toBe(`Patient/${patientId}`);
  });
});

describe("createConditions", () => {
  const conditions = createConditions({
    numberOfConditions: 4,
    numberOfPatients: 2,
  });

  it.each`
    conditionId      | patientId
    ${"condition-1"} | ${"patient-1"}
    ${"condition-2"} | ${"patient-1"}
    ${"condition-3"} | ${"patient-2"}
    ${"condition-4"} | ${"patient-2"}
  `(
    "should assign correct patient to condition $conditionId",
    ({ conditionId, patientId }) => {
      const condition =
        conditions[
          Number.parseInt(conditionId.replace("condition-", ""), 10) - 1
        ];

      expect(condition).toHaveProperty("id", conditionId);
      expect(condition.resourceType).toBe("Condition");
      expect(condition.subject?.reference).toBe(`Patient/${patientId}`);
    },
  );

  it("should create the specified number of conditions", () => {
    const conditions = createConditions({
      numberOfConditions: 4,
      numberOfPatients: 2,
    });

    expect(conditions).toHaveLength(4);
  });

  it("should return an empty array if numberOfConditions is 0", () => {
    const conditions = createConditions({
      numberOfConditions: 0,
      numberOfPatients: 2,
    });

    expect(conditions).toHaveLength(0);
  });
});
