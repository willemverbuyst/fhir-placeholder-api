import { describe, expect, it } from "vitest";
import { IdGenerator } from "../idGenerator";
import {
  createPractitionerRole,
  createPractitionerRoles,
} from "./practitionerRole";

describe("createOrganization", () => {
  it("should create an practitionerRole with a valid structure", () => {
    const practitionerRoleId = "practitioner-role-1";
    const practitionerId = "practitioner-1";
    const organizationId = "organization-1";
    const practitionerRole = createPractitionerRole({
      practitionerRoleId,
      organizationId,
      practitionerId,
    });

    expect(practitionerRole).toHaveProperty("id", practitionerRoleId);
    expect(practitionerRole).toHaveProperty("resourceType", "PractitionerRole");
    expect(practitionerRole).toHaveProperty("active", true);
    expect(practitionerRole.organization).toEqual({
      reference: `Organization/${organizationId}`,
    });
    expect(practitionerRole.practitioner).toEqual({
      reference: `Practitioner/${practitionerId}`,
    });
  });
});

describe("createPractitionerRoles", () => {
  const idGen = new IdGenerator();
  idGen.refs.set("organization", ["organization-1", "organization-2"]);
  idGen.refs.set("practitioner", [
    "practitioner-1",
    "practitioner-2",
    "practitioner-3",
    "practitioner-4",
    "practitioner-5",
    "practitioner-6",
    "practitioner-7",
    "practitioner-8",
  ]);
  const practitionerRoles = createPractitionerRoles({
    numberOfPractitionerRoles: 8,
    numberOfOrganizations: 2,
    idGen,
  });

  it.each`
    practitionerRoleId       | organizationId      | practitionerId
    ${"practitioner-role-1"} | ${"organization-1"} | ${"practitioner-1"}
    ${"practitioner-role-2"} | ${"organization-1"} | ${"practitioner-2"}
    ${"practitioner-role-3"} | ${"organization-1"} | ${"practitioner-3"}
    ${"practitioner-role-4"} | ${"organization-1"} | ${"practitioner-4"}
    ${"practitioner-role-5"} | ${"organization-2"} | ${"practitioner-5"}
    ${"practitioner-role-6"} | ${"organization-2"} | ${"practitioner-6"}
    ${"practitioner-role-7"} | ${"organization-2"} | ${"practitioner-7"}
    ${"practitioner-role-8"} | ${"organization-2"} | ${"practitioner-8"}
  `(
    "should assign correct organization and practitioner to practitionerRole $practitionerRoleId",
    ({ practitionerRoleId, organizationId, practitionerId }) => {
      const practitionerRole =
        practitionerRoles[practitionerRoleId.slice(-1) - 1];

      expect(practitionerRole).toHaveProperty("id", practitionerRoleId);
      expect(practitionerRole.resourceType).toBe("PractitionerRole");
      expect(practitionerRole.organization?.reference).toBe(
        `Organization/${organizationId}`,
      );
      expect(practitionerRole.practitioner?.reference).toBe(
        `Practitioner/${practitionerId}`,
      );
    },
  );

  it("should create the specified number of practitionerRoles", () => {
    const practitionerRoles = createPractitionerRoles({
      numberOfPractitionerRoles: 3,
      numberOfOrganizations: 2,
      idGen: new IdGenerator(),
    });

    expect(practitionerRoles).toHaveLength(3);
  });

  it("should return an empty array if numberOfPractitioners is 0", () => {
    const practitionerRoles = createPractitionerRoles({
      numberOfPractitionerRoles: 0,
      numberOfOrganizations: 2,
      idGen: new IdGenerator(),
    });

    expect(practitionerRoles).toHaveLength(0);
  });
});
