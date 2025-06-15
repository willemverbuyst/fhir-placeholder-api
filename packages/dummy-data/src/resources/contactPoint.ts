import { faker } from "@faker-js/faker";
import { ContactUse } from "@repo/fhir-codes";
import type { ContactPoint } from "fhir/r5";
import { getRandomElement } from "../helpers/getRandomElement";

export function createEmail(firstName: string, lastName: string) {
  const email: ContactPoint = {
    use: getRandomElement(ContactUse),
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
    use: getRandomElement(ContactUse),
    system: "phone",
    value: faker.phone.number({ style: "national" }),
  };

  return phone;
}
