import { faker } from "@faker-js/faker";
import type { Organization } from "fhir/r5";
import type { Id } from "../types";

export function createOrganization({ id }: { id: string }): Organization & Id {
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
}): (Organization & Id)[] {
  return Array.from({ length: numberOfOrganizations }, (_, i) => {
    return createOrganization({ id: `organization-${i + 1}` });
  });
}
