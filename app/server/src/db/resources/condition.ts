import { faker } from "@faker-js/faker";
import type { Condition } from "fhir/r5";
import type { Id } from "../../types";
import { getRandomElement } from "../helpers/getRandomElement";

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
