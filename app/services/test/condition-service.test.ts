import {
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.151.0/testing/bdd.ts";
import { assertEquals } from "jsr:@std/assert";
import { ConditionService } from "../condition-service.ts";
import { testDataStore } from "./testDataStore.ts";

describe("ConditionService", () => {
  let conditionService: ConditionService;

  beforeEach(() => {
    conditionService = new ConditionService(testDataStore);
  });

  it("should return all conditions", () => {
    const conditions = conditionService.getAll();
    assertEquals(conditions, testDataStore.conditions);
  });

  it("should return a condition by ID", () => {
    const conditionId = testDataStore.conditions[0].id;
    const condition = conditionService.getById(conditionId);
    assertEquals(condition, testDataStore.conditions[0]);
  });

  it("should return undefined if condition ID does not exist", () => {
    const condition = conditionService.getById("nonexistent-id");
    assertEquals(condition, undefined);
  });

  it("should return conditions by patient ID", () => {
    const patientId = "1";
    const conditions = conditionService.getByPatientId(patientId);
    const expectedConditions = [testDataStore.conditions[0]];
    assertEquals(conditions, expectedConditions);
  });

  it("should return an empty array if no conditions match the patient ID", () => {
    const conditions = conditionService.getByPatientId(
      "nonexistent-patient-id"
    );
    assertEquals(conditions, []);
  });
});
