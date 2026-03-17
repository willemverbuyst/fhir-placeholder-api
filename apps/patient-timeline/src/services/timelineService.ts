import { Effect } from "effect";
import type { Bundle, Encounter, Observation } from "fhir/r5.js";
import { type TimelineEntry, type TimelineResponse } from "../domain/models.js";
import {
  sortTimelineEntries,
  toTimelineEntryFromEncounter,
  toObservationSummary,
} from "../domain/transformers.js";
import { FetchError, InvalidFhirStructureError } from "../errors/errors.js";
import { extractResources } from "../utils/bundles.js";
import { groupObservationsByEncounter } from "../utils/grouping.js";

export const getPatientTimeline = (
  fetchEncounterBundle: (
    patientId: string,
  ) => Effect.Effect<Bundle<Encounter>, FetchError, never>,
  fetchObservationBundle: (
    patientId: string,
  ) => Effect.Effect<Bundle<Observation>, FetchError, never>,
  patientId: string,
): Effect.Effect<
  TimelineResponse,
  FetchError | InvalidFhirStructureError,
  never
> =>
  Effect.gen(function* (_) {
    const [encounterBundle, observationBundle] = yield* _(
      Effect.all([
        fetchEncounterBundle(patientId),
        fetchObservationBundle(patientId),
      ]),
    );

    const encounters = extractResources<Encounter>(encounterBundle);
    const observations = extractResources<Observation>(observationBundle);

    const { byEncounterId, orphanedCount } = groupObservationsByEncounter(
      encounters,
      observations,
    );

    const timelineEntries: TimelineEntry[] = sortTimelineEntries(
      encounters.map((encounter) => {
        const entry = toTimelineEntryFromEncounter(encounter);
        const encounterObservations =
          byEncounterId.get(entry.encounterId) ?? [];

        return {
          ...entry,
          observations: encounterObservations.map(toObservationSummary),
        };
      }),
    );

    const response: TimelineResponse = {
      timeline: timelineEntries,
      warnings:
        orphanedCount > 0
          ? ["Some observations could not be attached to an encounter"]
          : [],
    };

    return response;
  });
