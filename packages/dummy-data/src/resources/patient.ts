import { faker } from "@faker-js/faker";
import type { Patient } from "fhir/r5";
import { START_DATE } from "../config";
import { createAddress } from "../helpers/address";
import { createEmail, createPhone } from "../helpers/contactPoint";
import { getRandomElement } from "../helpers/getRandomElement";
import type { Id } from "../types";
import { languages } from "../valueSets/languages-value-set";
import { Gender } from "./gender";

export function createPatient({
  organizationId,
  practitionerId,
  id,
}: {
  organizationId: string;
  practitionerId: string;
  id: string;
}): Patient & Id {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id,
    name: [{ family: lastName, given: [firstName] }],
    resourceType: "Patient",
    birthDate: faker.date
      .between({ from: START_DATE, to: Date.now() })
      .toISOString()
      .split("T")[0],
    gender: getRandomElement(Object.values(Gender)),
    active: faker.datatype.boolean(),
    telecom: [createEmail(firstName, lastName), createPhone()],
    address: [createAddress()],
    managingOrganization: { reference: `Organization/${organizationId}` },
    generalPractitioner: [
      {
        reference: `Practitioner/${practitionerId}`,
      },
    ],
    communication: [
      {
        language: { coding: [getRandomElement(languages)] },
        preferred: true,
      },
    ],
  };
}

export function createPatients({
  numberOfPatients,
  numberOfOrganizations,
  numberOfPractitioners,
}: {
  numberOfPatients: number;
  numberOfOrganizations: number;
  numberOfPractitioners: number;
}): (Patient & Id)[] {
  return Array.from(
    {
      length: numberOfPatients,
    },
    (_, i) => {
      return createPatient({
        organizationId: `organization-${
          Math.floor(i / (numberOfPatients / numberOfOrganizations)) + 1
        }`,
        practitionerId: `practitioner-${
          Math.floor(i / (numberOfPatients / numberOfPractitioners)) + 1
        }`,
        id: `patient-${i + 1}`,
      });
    },
  );
}
