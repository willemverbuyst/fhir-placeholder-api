import {
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.151.0/testing/bdd.ts";
import { assertEquals } from "jsr:@std/assert";
import { PractitionerService } from "../practitioner-service.ts";
import { testDataStore } from "./testDataStore.ts";

describe("PractitionerService", () => {
  let practitionerService: PractitionerService;

  beforeEach(() => {
    practitionerService = new PractitionerService(testDataStore);
  });

  it("should return all practitioners", () => {
    const practitioners = practitionerService.getAll();
    assertEquals(practitioners, testDataStore.practitioners);
  });

  it("should return a practitioner by ID", () => {
    const practitionerId = testDataStore.practitioners[0].id;
    const practitioner = practitionerService.getById(practitionerId);
    assertEquals(practitioner, testDataStore.practitioners[0]);
  });

  it("should return undefined if practitioner ID does not exist", () => {
    const practitioner = practitionerService.getById("nonexistent-id");
    assertEquals(practitioner, undefined);
  });
});
