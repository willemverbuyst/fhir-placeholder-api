import { faker } from "npm:@faker-js/faker";
import { ConditionWithId } from "../../models/data.ts";

export function createCondition(patientId: string, episodeId: number) {
  const newCondition: ConditionWithId = {
    id: episodeId.toString(),
    note: [{ text: faker.lorem.sentence({ min: 3, max: 5 }) }],
    resourceType: "Condition",
    subject: { reference: `Patient/${patientId}` },
    clinicalStatus: {
      coding: [
        {
          code: faker.helpers.arrayElement([
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

  return newCondition;
}
