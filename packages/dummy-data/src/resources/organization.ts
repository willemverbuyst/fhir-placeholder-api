import { faker } from "@faker-js/faker";
import type { Organization } from "fhir/r5";

export function createOrganization({ id }: { id: string }): Organization {
  return {
    id,
    resourceType: "Organization",
    name: faker.company.name(),
    active: true,
  };
}

export function createOrganizations({
  numberOfOrganizations,
}: {
  numberOfOrganizations: number;
}): Organization[] {
  return Array.from({ length: numberOfOrganizations }, (_, i) => {
    return createOrganization({ id: `organization-${i + 1}` });
  });
}
