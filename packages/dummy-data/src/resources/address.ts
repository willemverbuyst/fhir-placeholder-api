import { faker } from "@faker-js/faker";
import { addressType, addressUse } from "@repo/fhir-codes";
import type { Address } from "fhir/r5";
import { getRandomElement } from "../helpers/getRandomElement";

export function createAddress() {
  const address: Address = {
    use: getRandomElement(addressUse),
    type: getRandomElement(addressType),
    line: [faker.location.streetAddress()],
    city: faker.location.city(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  };

  return address;
}
