import { faker } from "@faker-js/faker";
import type { Observation } from "fhir/r5";
import { getRandomElement } from "../helpers/getRandomElement";
import type { Id } from "../types";
import { observationCodes } from "../valueSets/observation-code-value-set";

export enum ObservationStatus {
  REGISTERED = "registered",
  PRELIMINARY = "preliminary",
  FINAL = "final",
  AMENDED = "amended",
  CORRECTED = "corrected",
  CANCELLED = "cancelled",
  ENTERED_IN_ERROR = "entered-in-error",
  UNKNOWN = "unknown",
}

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
    status: getRandomElement(Object.values(ObservationStatus)),
    code: { coding: [getRandomElement(observationCodes)] },
    encounter: { reference: `Encounter/${encounterId}` },
    subject: { reference: `Patient/${patientId}` },
    note: [{ text: faker.lorem.sentence({ min: 5, max: 7 }) }],
  };
}
