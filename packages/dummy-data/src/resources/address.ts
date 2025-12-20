import { faker } from "@faker-js/faker";
import { ADDRESS_TYPE, ADDRESS_USE } from "@repo/fhir-codes";
import type { Address } from "fhir/r5";

export function createAddress() {
  const address: Address = {
    use: faker.helpers.arrayElement(ADDRESS_USE),
    type: faker.helpers.arrayElement(ADDRESS_TYPE),
    line: [faker.location.streetAddress()],
    city: faker.location.city(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  };

  return address;
}
