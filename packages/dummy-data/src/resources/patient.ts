import { faker } from "@faker-js/faker";
import { GENDER } from "@repo/fhir-terminology";
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

  const createSimpleName = (): Patient["name"] => [
    {
      family: lastName,
      given: [firstName],
    },
  ];

  const createComplexName = (): Patient["name"] => {
    const primaryGiven = [firstName];

    if (faker.datatype.boolean() && primaryGiven.length < 2) {
      primaryGiven.push(faker.person.firstName());
    }

    const primaryName = {
      family: lastName,
      given: primaryGiven,
    };

    const names: Patient["name"] = [primaryName];

    if (faker.datatype.boolean() && names.length < 2) {
      const secondaryFirstName = faker.person.firstName();
      const secondaryLastName = faker.person.lastName();

      const secondaryGiven = [secondaryFirstName];

      if (faker.datatype.boolean() && secondaryGiven.length < 2) {
        secondaryGiven.push(faker.person.firstName());
      }

      names.push({
        family: secondaryLastName,
        given: secondaryGiven,
      });
    }

    return names;
  };

  const name: Patient["name"] = faker.datatype.boolean()
    ? createSimpleName()
    : createComplexName();

  return {
    id,
    name,
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
