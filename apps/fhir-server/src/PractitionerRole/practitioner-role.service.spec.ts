import type { PractitionerRole } from "fhir/r5";
import type { DataStoreService } from "../db/dataStore.service";
import { PractitionerRoleService } from "./practitioner-role.service";

describe("PractitionerRoleService", () => {
  let service: PractitionerRoleService;
  let repoMock: Pick<DataStoreService, "practitionerRoles">;

  beforeEach(() => {
    repoMock = {
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
        } as PractitionerRole,
        {
          id: "2",
          resourceType: "PractitionerRole",
          organization: {
            reference: "Organization/1",
          },
          practitioner: {
            reference: "Practitioner/2",
          },
        } as PractitionerRole,
        {
          id: "3",
          resourceType: "PractitionerRole",
          organization: {
            reference: "Organization/2",
          },
          practitioner: {
            reference: "Practitioner/3",
          },
        } as PractitionerRole,
      ],
    };

    service = new PractitionerRoleService(
      repoMock as DataStoreService,
    );
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
