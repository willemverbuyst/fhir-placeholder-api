import { faker } from '@faker-js/faker';
import { Organization } from 'fhir/r5';

export function createOrganization(organizationId: number) {
  const organization: Organization = {
    id: organizationId.toString(),
    resourceType: 'Organization',
    name: faker.company.name(),
    active: true,
  };

  return organization;
}
