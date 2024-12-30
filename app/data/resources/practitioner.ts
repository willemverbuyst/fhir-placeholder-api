import { faker } from "npm:@faker-js/faker";
import { PractitionerWithId } from "../../models/data.ts";
import { START_DATE } from "../constants.ts";
import { createAddress } from "../helpers/address.ts";
import { createEmail, createPhone } from "../helpers/contactPoint.ts";

export function createPractitioner(practitionerId: number) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const practitioner: PractitionerWithId = {
    id: practitionerId.toString(),
    resourceType: "Practitioner",
    name: [{ family: lastName, given: [firstName] }],
    active: true,
    birthDate: faker.date
      .between({ from: START_DATE, to: Date.now() })
      .toISOString()
      .split("T")[0],
    gender: faker.helpers.arrayElement(["male", "female", "other", "unknown"]),
    telecom: [createEmail(firstName, lastName), createPhone()],
    address: [createAddress()],
  };

  return practitioner;
}
