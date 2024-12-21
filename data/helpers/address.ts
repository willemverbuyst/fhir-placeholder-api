import { faker } from "npm:@faker-js/faker";
import { Address } from "npm:@types/fhir/r5";

export function createAddress() {
  const address: Address = {
    use: faker.helpers.arrayElement(["home", "work", "temp", "old", "billing"]),
    type: faker.helpers.arrayElement(["both", "physical", "postal"]),
    line: [faker.location.streetAddress()],
    city: faker.location.city(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  };

  return address;
}
