import { faker } from "@faker-js/faker";
import { CONTACT_USE } from "@repo/fhir-codes";
import type { ContactPoint } from "fhir/r5";

export function createEmail(firstName: string, lastName: string) {
  const email: ContactPoint = {
    use: faker.helpers.arrayElement(CONTACT_USE),
    system: "email",
    value: faker.internet.email({
      firstName,
      lastName,
      provider: "fhir-placeholder.api",
    }),
  };

  return email;
}

export function createPhone() {
  const phone: ContactPoint = {
    use: faker.helpers.arrayElement(CONTACT_USE),
    system: "phone",
    value: faker.phone.number({ style: "national" }),
  };

  return phone;
}
