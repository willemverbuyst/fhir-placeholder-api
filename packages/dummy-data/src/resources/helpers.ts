import { faker } from "@faker-js/faker";
import type { HumanName } from "fhir/r5";

type CreateHumanNamesInput = {
  firstName: string;
  lastName: string;
};

function createGivenNames(firstName: string): string[] {
  const given = [firstName];

  if (faker.datatype.boolean() && given.length < 2) {
    given.push(faker.person.firstName());
  }

  return given;
}

export function createHumanNames({
  firstName,
  lastName,
}: CreateHumanNamesInput): HumanName[] {
  if (faker.datatype.boolean()) {
    return [
      {
        family: lastName,
        given: [firstName],
      },
    ];
  }

  const names: HumanName[] = [
    {
      family: lastName,
      given: createGivenNames(firstName),
    },
  ];

  if (faker.datatype.boolean() && names.length < 2) {
    names.push({
      family: faker.person.lastName(),
      given: createGivenNames(faker.person.firstName()),
    });
  }

  return names;
}
