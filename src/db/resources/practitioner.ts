import { faker } from '@faker-js/faker';
import { Practitioner } from 'fhir/r5';
import { START_DATE } from '../dataStore.config';
import { createAddress } from '../helpers/address';
import { createEmail, createPhone } from '../helpers/contactPoint';
import { getRandomElement } from '../helpers/getRandomElement';

export function createPractitioner(practitionerId: number) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const practitioner: Practitioner = {
    id: practitionerId.toString(),
    resourceType: 'Practitioner',
    name: [{ family: lastName, given: [firstName] }],
    active: true,
    birthDate: faker.date
      .between({ from: START_DATE, to: Date.now() })
      .toISOString()
      .split('T')[0],
    gender: getRandomElement(['male', 'female', 'other', 'unknown']),
    telecom: [createEmail(firstName, lastName), createPhone()],
    address: [createAddress()],
  };

  return practitioner;
}
