import { faker } from "@faker-js/faker";
import type { Address } from "fhir/r5";
import { getRandomElement } from "../helpers/getRandomElement";

enum AddressUse {
  HOME = "home",
  WORK = "work",
  TEMP = "temp",
  OLD = "old",
  BILLING = "billing",
}

enum AddressType {
  BOTH = "both",
  PHYSICAL = "physical",
  POSTAL = "postal",
}

export function createAddress() {
  const address: Address = {
    use: getRandomElement(Object.values(AddressUse)),
    type: getRandomElement(Object.values(AddressType)),
    line: [faker.location.streetAddress()],
    city: faker.location.city(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  };

  return address;
}
