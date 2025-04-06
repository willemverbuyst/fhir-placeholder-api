import { faker } from '@faker-js/faker';
import { ContactPoint } from 'fhir/r5';
import { getRandomElement } from './getRandomElement';

export enum ContactUse {
  HOME = 'home',
  WORK = 'work',
  TEMP = 'temp',
  OLD = 'old',
  MOBILE = 'mobile',
}

export enum ContactSystem {
  PHONE = 'phone',
  FAX = 'fax',
  EMAIL = 'email',
  PAGER = 'pager',
  URL = 'url',
  SMS = 'sms',
  OTHER = 'other',
}

export function createEmail(firstName: string, lastName: string) {
  const email: ContactPoint = {
    use: getRandomElement([
      ContactUse.HOME,
      ContactUse.MOBILE,
      ContactUse.OLD,
      ContactUse.TEMP,
      ContactUse.WORK,
    ]),
    system: ContactSystem.EMAIL,
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
    use: getRandomElement([
      ContactUse.HOME,
      ContactUse.MOBILE,
      ContactUse.OLD,
      ContactUse.TEMP,
      ContactUse.WORK,
    ]),
    system: ContactSystem.PHONE,
    value: faker.phone.number({ style: 'national' }),
  };

  return phone;
}
