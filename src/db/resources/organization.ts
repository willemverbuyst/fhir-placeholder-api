import { faker } from '@faker-js/faker';
import { Organization } from 'fhir/r5';
import { Id } from 'src/types';
import { v4 as uuidV4 } from 'uuid';

export function createOrganization(): Organization & Id {
  return {
    id: uuidV4(),
    resourceType: 'Organization',
    name: faker.company.name(),
    active: true,
  };
}
