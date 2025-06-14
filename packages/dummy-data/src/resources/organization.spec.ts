import { describe, expect, it } from "vitest";
import { createOrganization, createOrganizations } from "./organization";

describe("createOrganization", () => {
  it("should create an organization with a valid structure", () => {
    const organizationId = "organization-1";
    const organization = createOrganization({ id: organizationId });

    expect(organization).toHaveProperty("id");
    expect(organization).toHaveProperty("resourceType", "Organization");
    expect(organization).toHaveProperty("name");
    expect(organization).toHaveProperty("active", true);
  });
});

describe("createOrganizations", () => {
  it("should create the specified number of organizations", () => {
    const organizations = createOrganizations({ numberOfOrganizations: 5 });

    expect(organizations).toHaveLength(5);
    for (const organization of organizations) {
      expect(organization).toHaveProperty("id");
      expect(organization.resourceType).toBe("Organization");
    }
  });

  it("should return an empty array if numberOfOrganizations is 0", () => {
    const organizations = createOrganizations({ numberOfOrganizations: 0 });

    expect(organizations).toHaveLength(0);
  });
});
