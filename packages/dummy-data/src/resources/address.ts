import { faker } from "@faker-js/faker";
import { ADDRESS_TYPE, ADDRESS_USE } from "@repo/fhir-codes";
import type { Address } from "fhir/r5";
import { getRandomElement } from "../helpers/getRandomElement";

export function createAddress() {
  const address: Address = {
    use: getRandomElement(ADDRESS_USE),
    type: getRandomElement(ADDRESS_TYPE),
    line: [faker.location.streetAddress()],
    city: faker.location.city(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  };

  return address;
}
