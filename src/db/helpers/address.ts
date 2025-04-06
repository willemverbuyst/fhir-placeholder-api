import { faker } from '@faker-js/faker';
import { Address } from 'fhir/r5';
import { getRandomElement } from './getRandomElement';

export enum AddressUse {
  HOME = 'home',
  WORK = 'work',
  TEMP = 'temp',
  OLD = 'old',
  BILLING = 'billing',
}

export enum AddressType {
  BOTH = 'both',
  PHYSICAL = 'physical',
  POSTAL = 'postal',
}

export function createAddress() {
  const address: Address = {
    use: getRandomElement([
      AddressUse.BILLING,
      AddressUse.HOME,
      AddressUse.OLD,
      AddressUse.TEMP,
      AddressUse.WORK,
    ]),
    type: getRandomElement([
      AddressType.BOTH,
      AddressType.PHYSICAL,
      AddressType.POSTAL,
    ]),
    line: [faker.location.streetAddress()],
    city: faker.location.city(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  };

  return address;
}
