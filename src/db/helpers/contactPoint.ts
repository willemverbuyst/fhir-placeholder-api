import { faker } from '@faker-js/faker';
import { ContactPoint } from 'fhir/r5';
import { getRandomElement } from './getRandomElement';

export function createEmail(firstName: string, lastName: string) {
  const email: ContactPoint = {
    use: getRandomElement(['home', 'work', 'temp', 'old', 'mobile']),
    system: 'email',
    value: faker.internet.email({
      firstName,
      lastName,
      provider: 'fhir-placeholder.api',
    }),
  };

  return email;
}

export function createPhone() {
  const phone: ContactPoint = {
    use: getRandomElement(['home', 'work', 'temp', 'old', 'mobile']),
    system: 'phone',
    value: faker.phone.number({ style: 'national' }),
  };

  return phone;
}
