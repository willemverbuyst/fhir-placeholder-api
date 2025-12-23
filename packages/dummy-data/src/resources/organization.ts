import { faker } from "@faker-js/faker";
import type { Organization } from "fhir/r5";
import { IdGenerator } from "../idGenerator";

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
  idGen,
}: {
  numberOfOrganizations: number;
  idGen: IdGenerator;
}): Organization[] {
  return Array.from({ length: numberOfOrganizations }, () => {
    return createOrganization({ id: idGen.generateId("organization") });
  });
}
