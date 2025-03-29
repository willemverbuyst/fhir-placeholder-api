import {
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.151.0/testing/bdd.ts";
import { assertEquals } from "jsr:@std/assert";
import { OrganizationService } from "../organization-service.ts";
import { testDataStore } from "./testDataStore.ts";

describe("OrganizationService", () => {
  let organizationService: OrganizationService;

  beforeEach(() => {
    organizationService = new OrganizationService(testDataStore);
  });

  it("should return all organizations", () => {
    const organizations = organizationService.getAll();
    assertEquals(organizations, testDataStore.organizations);
  });

  it("should return a organization by ID", () => {
    const practitionerId = testDataStore.conditions[0].id;
    const organization = organizationService.getById(practitionerId);
    assertEquals(organization, testDataStore.organizations[0]);
  });

  it("should return undefined if organization ID does not exist", () => {
    const organization = organizationService.getById("nonexistent-id");
    assertEquals(organization, undefined);
  });
});
