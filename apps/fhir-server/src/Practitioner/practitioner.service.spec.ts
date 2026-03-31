import { Test, type TestingModule } from "@nestjs/testing";
import { DataStoreService } from "../db/dataStore.service";
import { PractitionerService } from "./practitioner.service";

describe("PractitionerService", () => {
  let service: PractitionerService;
  const mockDataStore = {
    practitioners: [
      {
        id: "1",
        resourceType: "Practitioner",
      },
      {
        id: "2",
        resourceType: "Practitioner",
      },
    ],
    practitionerRoles: [
      {
        id: "role-1",
        resourceType: "PractitionerRole",
        practitioner: {
          reference: "Practitioner/1",
        },
        organization: {
          reference: "Organization/org-1",
        },
      },
      {
        id: "role-2",
        resourceType: "PractitionerRole",
        practitioner: {
          reference: "Practitioner/2",
        },
        organization: {
          reference: "Organization/org-1",
        },
      },
    ],
    organizations: [
      {
        id: "org-1",
        resourceType: "Organization",
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PractitionerService,
        { provide: DataStoreService, useValue: mockDataStore },
      ],
    }).compile();

    service = module.get<PractitionerService>(PractitionerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all practitioners", async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(2);
    });

    it("should include practitioner roles when include query is provided", async () => {
      const bundle = await service.findAll({
        _include: "PractitionerRole:practitioner",
      });
      const resourceTypes =
        bundle.entry?.map((entry) => entry.resource?.resourceType) ?? [];

      expect(resourceTypes).toEqual([
        "Practitioner",
        "Practitioner",
        "PractitionerRole",
        "PractitionerRole",
      ]);
    });

    it("should include organizations and deduplicate when iterate query is provided", async () => {
      const bundle = await service.findAll({
        _include: "PractitionerRole:practitioner",
        "_include:iterate": "PractitionerRole:organization",
      });
      const resourceKeys =
        bundle.entry?.map(
          (entry) => `${entry.resource?.resourceType}/${entry.resource?.id}`,
        ) ?? [];

      expect(resourceKeys).toEqual([
        "Practitioner/1",
        "Practitioner/2",
        "PractitionerRole/role-1",
        "PractitionerRole/role-2",
        "Organization/org-1",
      ]);
    });
  });

  describe("findOne", () => {
    it("should return an practitioner by id", async () => {
      const practitioner = await service.findOne("1");
      expect(practitioner).toBeDefined();

      if (!practitioner) {
        throw new Error("Expected practitioner to be defined in test");
      }

      expect(practitioner.id).toBe("1");
      expect(practitioner.resourceType).toBe("Practitioner");
    });

    it("should return undefined for an practitioner that doesn't exist", async () => {
      const practitioner = await service.findOne("999");
      expect(practitioner).toBeUndefined();
    });
  });
});
