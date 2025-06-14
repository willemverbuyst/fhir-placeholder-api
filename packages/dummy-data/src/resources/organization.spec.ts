import { describe, expect, it } from "vitest";
import { createOrganization } from "./organization";

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
