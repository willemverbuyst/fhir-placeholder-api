import { faker } from "@faker-js/faker";
import { GENDER } from "@repo/fhir-codes";
import type { Practitioner } from "fhir/r5";
import { createAddress } from "./address";
import { createEmail, createPhone } from "./contactPoint";

export function createPractitioner({
  id,
  startDate,
}: { id: string; startDate: `${number}-${number}-${number}` }): Practitioner {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id,
    resourceType: "Practitioner",
    name: [{ family: lastName, given: [firstName] }],
    active: true,
    birthDate: faker.date
      .between({ from: startDate, to: Date.now() })
      .toISOString()
      .split("T")[0],
    gender: faker.helpers.arrayElement(GENDER),
    telecom: [createEmail(firstName, lastName), createPhone()],
    address: [createAddress()],
  };
}

export function createPractitioners({
  numberOfPractitioners,
  startDate,
}: {
  numberOfPractitioners: number;
  startDate: `${number}-${number}-${number}`;
}): Practitioner[] {
  return Array.from({ length: numberOfPractitioners }, (_, i) => {
    return createPractitioner({ id: `practitioner-${i + 1}`, startDate });
  });
}
