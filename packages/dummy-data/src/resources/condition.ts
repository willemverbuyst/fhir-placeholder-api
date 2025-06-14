import { faker } from "@faker-js/faker";
import type { Condition } from "fhir/r5";
import { getRandomElement } from "../helpers/getRandomElement";
import type { Id } from "../types";

export function createCondition({
  patientId,
  id,
}: { patientId: string; id: string }): Condition & Id {
  return {
    id,
    note: [{ text: faker.lorem.sentence({ min: 3, max: 5 }) }],
    resourceType: "Condition",
    subject: { reference: `Patient/${patientId}` },
    clinicalStatus: {
      coding: [
        {
          code: getRandomElement([
            "active",
            "recurrence",
            "relapse",
            "inactive",
            "remission",
            "resolved",
            "unknown",
          ]),
          system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
        },
      ],
    },
  };
}
