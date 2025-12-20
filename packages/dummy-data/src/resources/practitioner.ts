import { faker } from "@faker-js/faker";
import { GENDER } from "@repo/fhir-codes";
import type { Practitioner } from "fhir/r5";
import { START_DATE } from "../config";
import { getRandomElement } from "../helpers/getRandomElement";
import type { Id } from "../types";
import { createAddress } from "./address";
import { createEmail, createPhone } from "./contactPoint";

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
    gender: getRandomElement(GENDER),
    telecom: [createEmail(firstName, lastName), createPhone()],
    address: [createAddress()],
  };
}

export function createPractitioners({
  numberOfPractitioners,
}: {
  numberOfPractitioners: number;
}): (Practitioner & Id)[] {
  return Array.from({ length: numberOfPractitioners }, (_, i) => {
    return createPractitioner({ id: `practitioner-${i + 1}` });
  });
}
