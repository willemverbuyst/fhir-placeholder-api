import { faker } from "@faker-js/faker";
import { OBSERVATION_STATUS } from "@repo/fhir-codes";
import type { Observation } from "fhir/r5";
import { observationCodes } from "../valueSets/observation-code-value-set";

export function createObservation({
  patientId,
  encounterId,
  id,
}: {
  patientId: string;
  encounterId: string;
  id: string;
}): Observation {
  return {
    id,
    resourceType: "Observation",
    status: faker.helpers.arrayElement(OBSERVATION_STATUS),
    code: { coding: [faker.helpers.arrayElement(observationCodes)] },
    encounter: { reference: `Encounter/${encounterId}` },
    subject: { reference: `Patient/${patientId}` },
    note: [{ text: faker.lorem.sentence({ min: 5, max: 7 }) }],
  };
}

export function createObservations({
  numberOfObservations,
  numberOfPatients,
  numberOfEncounters,
}: {
  numberOfObservations: number;
  numberOfPatients: number;
  numberOfEncounters: number;
}): Observation[] {
  return Array.from({ length: numberOfObservations }, (_, i) => {
    return createObservation({
      patientId: `patient-${
        Math.floor(i / (numberOfObservations / numberOfPatients)) + 1
      }`,
      encounterId: `encounter-${
        Math.floor(i / (numberOfObservations / numberOfEncounters)) + 1
      }`,
      id: `observation-${i + 1}`,
    });
  });
}
