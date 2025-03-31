import { faker } from '@faker-js/faker';
import { Organization } from 'fhir/r5';
import { v4 as uuidV4 } from 'uuid';

export function createOrganization() {
  const organization: Organization = {
    id: uuidV4(),
    resourceType: 'Organization',
    name: faker.company.name(),
    active: true,
  };

  return organization;
}
