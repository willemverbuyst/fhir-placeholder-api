import { faker } from "@faker-js/faker";
import { GENDER } from "@repo/fhir-codes";
import type { Patient } from "fhir/r5";
import { IdGenerator } from "../idGenerator";
import { languages } from "../valueSets/languages-value-set";
import { createAddress } from "./address";
import { createEmail, createPhone } from "./contactPoint";

export function createPatient({
  organizationId,
  practitionerId,
  id,
  startDate,
}: {
  organizationId: string | undefined;
  practitionerId: string | undefined;
  id: string;
  startDate: `${number}-${number}-${number}`;
}): Patient {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id,
    name: [{ family: lastName, given: [firstName] }],
    resourceType: "Patient",
    birthDate: faker.date
      .between({ from: startDate, to: Date.now() })
      .toISOString()
      .split("T")[0],
    gender: faker.helpers.arrayElement(GENDER),
    active: faker.datatype.boolean(),
    telecom: [createEmail(firstName, lastName), createPhone()],
    address: [createAddress()],
    managingOrganization: organizationId
      ? { reference: `Organization/${organizationId}` }
      : undefined,
    generalPractitioner: practitionerId
      ? [
          {
            reference: `Practitioner/${practitionerId}`,
          },
        ]
      : undefined,
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
  startDate,
  idGen,
}: {
  numberOfPatients: number;
  numberOfOrganizations: number;
  numberOfPractitioners: number;
  startDate: `${number}-${number}-${number}`;
  idGen: IdGenerator;
}): Patient[] {
  return Array.from(
    {
      length: numberOfPatients,
    },
    (_, i) => {
      const organizationIndex = Math.floor(
        i / (numberOfPatients / numberOfOrganizations),
      );
      const practitionerIndex = Math.floor(
        i / (numberOfPatients / numberOfPractitioners),
      );
      return createPatient({
        organizationId: idGen.refs.get("organization")?.[organizationIndex],
        practitionerId: idGen.refs.get("practitioner")?.[practitionerIndex],
        id: idGen.generateId("patient"),
        startDate,
      });
    },
  );
}
