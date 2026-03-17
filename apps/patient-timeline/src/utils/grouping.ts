import type { Encounter, Observation } from "fhir/r5.js";

type ObservationGroupingResult = {
  byEncounterId: Map<string, Observation[]>;
  orphanedCount: number;
};

const extractEncounterIdFromReference = (reference: string): string | null => {
  const [resourceType, id] = reference.split("/");

  if (resourceType !== "Encounter" || id === undefined || id === "") {
    return null;
  }

  return id;
};

export const groupObservationsByEncounter = (
  encounters: Encounter[],
  observations: Observation[],
): ObservationGroupingResult => {
  const encounterIds = new Set(
    encounters.map((encounter) => encounter.id).filter((id): id is string => id !== undefined && id !== ""),
  );

  const byEncounterId = new Map<string, Observation[]>();
  let orphanedCount = 0;

  for (const observation of observations) {
    const reference = observation.encounter?.reference;

    if (reference === undefined) {
      orphanedCount += 1;
      continue;
    }

    const encounterId = extractEncounterIdFromReference(reference);

    if (encounterId === null || !encounterIds.has(encounterId)) {
      orphanedCount += 1;
      continue;
    }

    const existing = byEncounterId.get(encounterId);

    if (existing === undefined) {
      byEncounterId.set(encounterId, [observation]);
    } else {
      existing.push(observation);
    }
  }

  return {
    byEncounterId,
    orphanedCount,
  };
};

