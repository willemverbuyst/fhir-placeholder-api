import { faker } from "@faker-js/faker";
import { CONDITION_CLINICAL_STATUS } from "@repo/fhir-codes";
import type { Condition } from "fhir/r5";
import { IdGenerator } from "../idGenerator";

export function createCondition({
  patientId,
  id,
}: { patientId: string | undefined; id: string }): Condition {
  return {
    id,
    note: [{ text: faker.lorem.sentence({ min: 3, max: 5 }) }],
    resourceType: "Condition",
    subject: { reference: patientId ? `Patient/${patientId}` : undefined },
    clinicalStatus: {
      coding: [
        {
          code: faker.helpers.arrayElement(CONDITION_CLINICAL_STATUS),
          system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
        },
      ],
    },
  };
}

export function createConditions({
  numberOfConditions,
  numberOfPatients,
  idGen,
}: {
  numberOfConditions: number;
  numberOfPatients: number;
  idGen: IdGenerator;
}): Condition[] {
  return Array.from({ length: numberOfConditions }, (_, i) => {
    const patientIndex = Math.floor(
      i / (numberOfConditions / numberOfPatients),
    );
    return createCondition({
      patientId: idGen.refs.get("patient")?.[patientIndex],
      id: idGen.generateId("condition"),
    });
  });
}
