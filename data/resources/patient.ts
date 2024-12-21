import { faker } from "npm:@faker-js/faker";
import { PatientWithId } from "../../models/data.ts";
import { START_DATE } from "../constants.ts";
import { createAddress } from "../helpers/address.ts";
import { createEmail, createPhone } from "../helpers/contactPoint.ts";

export function createPatient(patientId: number, organizationId: number) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const newPatient: PatientWithId = {
    id: patientId.toString(),
    name: [{ family: lastName, given: [firstName] }],
    resourceType: "Patient",
    birthDate: faker.date
      .between({ from: START_DATE, to: Date.now() })
      .toISOString()
      .split("T")[0],
    gender: faker.helpers.arrayElement(["male", "female", "other", "unknown"]),
    telecom: [createEmail(firstName, lastName), createPhone()],
    address: [createAddress()],
    managingOrganization: { reference: `Organization/${organizationId}` },
  };

  return newPatient;
}
