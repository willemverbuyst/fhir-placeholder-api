import { faker } from '@faker-js/faker';
import { Address } from 'fhir/r5';
import { getRandomElement } from './getRandomElement';

export function createAddress() {
  const address: Address = {
    use: getRandomElement(['home', 'work', 'temp', 'old', 'billing']),
    type: getRandomElement(['both', 'physical', 'postal']),
    line: [faker.location.streetAddress()],
    city: faker.location.city(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  };

  return address;
}
