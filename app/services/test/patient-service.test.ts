import {
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.151.0/testing/bdd.ts";
import { assertEquals } from "jsr:@std/assert";
import { ConditionService } from "../condition-service.ts";
import { EpisodeService } from "../episode-service.ts";
import { OrganizationService } from "../organization-service.ts";
import { PatientService } from "../patient-service.ts";
import { PractitionerService } from "../practitioner-service.ts";
import { testDataStore } from "./testDataStore.ts";

describe("PatientService", () => {
  let patientService: PatientService;

  beforeEach(() => {
    const conditionService = new ConditionService(testDataStore);
    const episodeService = new EpisodeService(testDataStore);
    const organizationService = new OrganizationService(testDataStore);
    const practitionerService = new PractitionerService(testDataStore);
    patientService = new PatientService(
      testDataStore,
      conditionService,
      episodeService,
      organizationService,
      practitionerService
    );
  });

  it("should return all patients", () => {
    const patients = patientService.getAll();
    assertEquals(patients, testDataStore.patients);
  });

  describe("getById", () => {
    it("should return a patient by ID", () => {
      const patientId = testDataStore.patients[0].id;
      const patient = patientService.getById(patientId);
      assertEquals(patient, testDataStore.patients[0]);
    });

    it("should return undefined if patient ID does not exist", () => {
      const patient = patientService.getById("nonexistent-id");
      assertEquals(patient, undefined);
    });
  });

  describe("getEverythingById", () => {
    it("should return an empty array if patient ID does not exist", () => {
      const patient = patientService.getEverythingById("nonexistent-id");
      assertEquals(patient, []);
    });

    it("should return all resource for the patient", () => {
      const everything = patientService.getEverythingById("1");
      assertEquals(everything, [
        testDataStore.patients[0],
        testDataStore.organizations[0],
        testDataStore.practitioners[0],
        testDataStore.episodes[0],
        testDataStore.conditions[0],
      ]);
    });
  });
});
