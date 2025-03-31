import { faker } from '@faker-js/faker';
import { START_DATE } from '../config';
import { createAddress } from '../helpers/address';
import { createEmail, createPhone } from '../helpers/contactPoint';
import { PractitionerWithId } from '../models';
import { getRandomElement } from '../utils/getRandomElement';

export function createPractitioner(practitionerId: number) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const practitioner: PractitionerWithId = {
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
