import { describe, expect, it } from "vitest";
import { createPractitionerRole } from "./practitioner-role";

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
