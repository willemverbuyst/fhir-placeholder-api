import { faker } from "npm:@faker-js/faker";
import { ContactPoint } from "npm:@types/fhir/r5";

export function createEmail(firstName: string, lastName: string) {
  const email: ContactPoint = {
    use: faker.helpers.arrayElement(["home", "work", "temp", "old", "mobile"]),
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
    use: faker.helpers.arrayElement(["home", "work", "temp", "old", "mobile"]),
    system: "phone",
    value: faker.phone.number({ style: "national" }),
  };

  return phone;
}
