import { faker } from "@faker-js/faker";
import { observationStatus } from "@repo/fhir-codes";
import type { Observation } from "fhir/r5";
import { getRandomElement } from "../helpers/getRandomElement";
import type { Id } from "../types";
import { observationCodes } from "../valueSets/observation-code-value-set";

export function createObservation({
  patientId,
  encounterId,
  id,
}: {
  patientId: string;
  encounterId: string;
  id: string;
}): Observation & Id {
  return {
    id,
    resourceType: "Observation",
    status: getRandomElement(observationStatus),
    code: { coding: [getRandomElement(observationCodes)] },
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
}): (Observation & Id)[] {
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
