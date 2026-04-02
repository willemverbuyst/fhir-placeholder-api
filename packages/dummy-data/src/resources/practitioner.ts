import { faker } from "@faker-js/faker";
import { GENDER } from "@repo/fhir-terminology";
import type { Practitioner } from "fhir/r5";
import { IdGenerator } from "../idGenerator";
import { createAddress } from "./address";
import { createEmail, createPhone } from "./contactPoint";
import { createHumanNames } from "./helpers";

export function createPractitioner({
  id,
  startDate,
}: {
  id: string | undefined;
  startDate: `${number}-${number}-${number}`;
}): Practitioner {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id,
    resourceType: "Practitioner",
    name: createHumanNames({ firstName, lastName }),
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
  idGen,
}: {
  numberOfPractitioners: number;
  startDate: `${number}-${number}-${number}`;
  idGen: IdGenerator;
}): Practitioner[] {
  return Array.from({ length: numberOfPractitioners }, (_, i) => {
    return createPractitioner({
      id: idGen.refs.get("practitioner")?.[i],
      startDate,
    });
  });
}
