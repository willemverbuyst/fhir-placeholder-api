import { Test, TestingModule } from "@nestjs/testing";
import { DataStoreService } from "../db/dataStore.service";
import { PractitionerRoleService } from "./practitioner-role.service";

describe("PractitionerRoleService", () => {
  let service: PractitionerRoleService;
  const mockDataStore = {
    practitionerRoles: [
      {
        id: "1",
        resourceType: "PractitionerRole",
        organization: {
          reference: "Organization/1",
        },
        practitioner: {
          reference: "Practitioner/1",
        },
      },
      {
        id: "2",
        resourceType: "PractitionerRole",
        organization: {
          reference: "Organization/1",
        },
        practitioner: {
          reference: "Practitioner/2",
        },
      },
      {
        id: "3",
        resourceType: "PractitionerRole",
        organization: {
          reference: "Organization/2",
        },
        practitioner: {
          reference: "Practitioner/3",
        },
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PractitionerRoleService,
        { provide: DataStoreService, useValue: mockDataStore },
      ],
    }).compile();

    service = module.get<PractitionerRoleService>(PractitionerRoleService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all practitioner roles", async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(3);
    });

    it("should return all practitioner roles filtered by organization", async () => {
      const bundle = await service.findAll({ organization: "Organization/1" });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(2);
    });

    it("should return all practitioner roles filtered by practitioner", async () => {
      const bundle = await service.findAll({ practitioner: "1" });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(1);
    });

    it("should return all practitioner roles filtered by practitioner & organization", async () => {
      const bundle = await service.findAll({
        practitioner: "3",
        organization: "2",
      });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(1);
    });
  });
});
