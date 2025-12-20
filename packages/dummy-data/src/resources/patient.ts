import { faker } from "@faker-js/faker";
import { GENDER } from "@repo/fhir-codes";
import type { Patient } from "fhir/r5";
import { START_DATE } from "../config";
import type { Id } from "../types";
import { languages } from "../valueSets/languages-value-set";
import { createAddress } from "./address";
import { createEmail, createPhone } from "./contactPoint";

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
    gender: faker.helpers.arrayElement(GENDER),
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
        language: { coding: [faker.helpers.arrayElement(languages)] },
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
