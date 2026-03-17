import type { Organization } from "fhir/r5";
import type { DataStoreService } from "../db/dataStore.service";
import { OrganizationService } from "./organization.service";

describe("OrganizationService", () => {
  let service: OrganizationService;
  let repoMock: Pick<DataStoreService, "organizations">;

  beforeEach(() => {
    repoMock = {
      organizations: [
        {
          id: "1",
          resourceType: "Organization",
          name: "test organization",
        } as Organization,
        {
          id: "2",
          resourceType: "Organization",
          name: "another test organization",
        } as Organization,
        {
          id: "3",
          resourceType: "Organization",
          name: "test organization",
        } as Organization,
      ],
    };

    service = new OrganizationService(repoMock as DataStoreService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all organizations", async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(3);
    });
  });

  describe("findOne", () => {
    it("should return an organization by id", async () => {
      const organization = await service.findOne("1");
      expect(organization).toBeDefined();

      if (!organization) {
        throw new Error("Expected organization to be defined in test");
      }

      expect(organization.id).toBe("1");
      expect(organization.resourceType).toBe("Organization");
    });

    it("should return undefined for an organization that doesn't exist", async () => {
      const organization = await service.findOne("unknown");
      expect(organization).toBeUndefined();
    });
  });

  describe("create", () => {
    it("should create a new active organization", async () => {
      const newOrganization = await service.create({
        name: "New Organization",
        active: true,
      });
      expect(newOrganization).toBeDefined();
      expect(newOrganization.id).toBeDefined();
      expect(newOrganization.resourceType).toBe("Organization");
      expect(newOrganization.name).toBe("New Organization");
      expect(newOrganization.active).toBe(true);

      const allOrganizations = await service.findAll();
      expect(allOrganizations?.entry?.length).toBe(4);
    });

    it("should create a new in active organization", async () => {
      const newOrganization = await service.create({
        name: "New Organization",
        active: false,
      });
      expect(newOrganization).toBeDefined();
      expect(newOrganization.id).toBeDefined();
      expect(newOrganization.resourceType).toBe("Organization");
      expect(newOrganization.name).toBe("New Organization");
      expect(newOrganization.active).toBe(false);

      const allOrganizations = await service.findAll();
      expect(allOrganizations?.entry?.length).toBe(4);
    });
  });

  describe("update", () => {
    it("should update an existing organization", async () => {
      const updatedOrganization = await service.update("1", {
        name: "Updated Organization",
      });
      expect(updatedOrganization).toBeDefined();

      if (!updatedOrganization) {
        throw new Error("Expected updated organization to be defined in test");
      }

      expect(updatedOrganization.id).toBe("1");
      expect(updatedOrganization.resourceType).toBe("Organization");
      expect(updatedOrganization.name).toBe("Updated Organization");
    });

    it("should return undefined for an organization that doesn't exist", async () => {
      const updatedOrganization = await service.update("unknown", {
        name: "Updated Organization",
      });
      expect(updatedOrganization).toBeUndefined();
    });
  });
});
