import { faker } from "@faker-js/faker";
import type { Practitioner } from "fhir/r5";
import { START_DATE } from "../config";
import { createAddress } from "../helpers/address";
import { createEmail, createPhone } from "../helpers/contactPoint";
import { getRandomElement } from "../helpers/getRandomElement";
import type { Id } from "../types";

export function createPractitioner({ id }: { id: string }): Practitioner & Id {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id,
    resourceType: "Practitioner",
    name: [{ family: lastName, given: [firstName] }],
    active: true,
    birthDate: faker.date
      .between({ from: START_DATE, to: Date.now() })
      .toISOString()
      .split("T")[0],
    gender: getRandomElement(["male", "female", "other", "unknown"]),
    telecom: [createEmail(firstName, lastName), createPhone()],
    address: [createAddress()],
  };
}
