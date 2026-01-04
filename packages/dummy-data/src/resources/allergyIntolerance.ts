import { faker } from "@faker-js/faker";
import {
  ALLERGY_INTOLERANCE_CATEGORY,
  ALLERGY_INTOLERANCE_CLINICAL_STATUS,
  ALLERGY_INTOLERANCE_CRITICALITY,
  ALLERGY_INTOLERANCE_TYPE,
} from "@repo/fhir-terminology";
import type { AllergyIntolerance } from "fhir/r5";
import { IdGenerator } from "../idGenerator";

export function createAllergy({
  patientId,
  encounterId,
  id,
}: {
  patientId: string | undefined;
  encounterId: string | undefined;
  id: string;
}): AllergyIntolerance {
  return {
    id,
    resourceType: "AllergyIntolerance",
    clinicalStatus: {
      coding: [faker.helpers.arrayElement(ALLERGY_INTOLERANCE_CLINICAL_STATUS)],
    },
    patient: { reference: `Patient/${patientId}` },
    encounter: { reference: `Encounter/${encounterId}` },
    note: [{ text: faker.lorem.sentence({ min: 5, max: 7 }) }],
    type: faker.helpers.arrayElement(ALLERGY_INTOLERANCE_TYPE),
    category: [faker.helpers.arrayElement(ALLERGY_INTOLERANCE_CATEGORY)],
    criticality: faker.helpers.arrayElement(ALLERGY_INTOLERANCE_CRITICALITY),
  };
}

export function createAllergies({
  numberOfAllergies,
  numberOfPatients,
  numberOfEncounters,
  idGen,
}: {
  numberOfAllergies: number;
  numberOfPatients: number;
  numberOfEncounters: number;
  idGen: IdGenerator;
}): AllergyIntolerance[] {
  return Array.from({ length: numberOfAllergies }, (_, i) => {
    const patientIndex = Math.floor(i / (numberOfAllergies / numberOfPatients));
    const encounterIndex = Math.floor(
      i / (numberOfAllergies / numberOfEncounters),
    );
    return createAllergy({
      patientId: idGen.refs.get("patient")?.[patientIndex],
      encounterId: idGen.refs.get("encounter")?.[encounterIndex],
      id: idGen.generateId("appointment"),
    });
  });
}
