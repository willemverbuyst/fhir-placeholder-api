import { faker } from "npm:@faker-js/faker";
import { OrganizationWithId } from "../../models/data.ts";

export function createOrganization(organizationId: number) {
  const organization: OrganizationWithId = {
    id: organizationId.toString(),
    resourceType: "Organization",
    name: faker.company.name(),
    active: true,
  };

  return organization;
}
