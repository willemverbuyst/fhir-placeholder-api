import { faker } from "@faker-js/faker";
import { OBSERVATION_STATUS } from "@repo/fhir-terminology";
import type { Observation } from "fhir/r5";
import { IdGenerator } from "../idGenerator";
import { observationCodes } from "../valueSets/observation-code-value-set";

export function createObservation({
  patientId,
  encounterId,
  id,
}: {
  patientId: string | undefined;
  encounterId: string | undefined;
  id: string;
}): Observation {
  return {
    id,
    resourceType: "Observation",
    status: faker.helpers.arrayElement(OBSERVATION_STATUS),
    code: { coding: [faker.helpers.arrayElement(observationCodes)] },
    encounter: {
      reference: encounterId ? `Encounter/${encounterId}` : undefined,
    },
    subject: { reference: patientId ? `Patient/${patientId}` : undefined },
    note: [{ text: faker.lorem.sentence({ min: 5, max: 7 }) }],
  };
}

export function createObservations({
  numberOfObservations,
  numberOfPatients,
  numberOfEncounters,
  idGen,
}: {
  numberOfObservations: number;
  numberOfPatients: number;
  numberOfEncounters: number;
  idGen: IdGenerator;
}): Observation[] {
  return Array.from({ length: numberOfObservations }, (_, i) => {
    const patientIndex = Math.floor(
      i / (numberOfObservations / numberOfPatients),
    );
    const encounterIndex = Math.floor(
      i / (numberOfObservations / numberOfEncounters),
    );
    return createObservation({
      patientId: idGen.refs.get("patient")?.[patientIndex],
      encounterId: idGen.refs.get("encounter")?.[encounterIndex],
      id: idGen.generateId("observation"),
    });
  });
}
