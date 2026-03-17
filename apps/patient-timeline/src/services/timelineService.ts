import { Effect } from "effect";
import type { Bundle, Encounter } from "fhir/r5.js";
import { type TimelineEntry, type TimelineResponse } from "../domain/models.js";
import {
  sortTimelineEntries,
  toTimelineEntryFromEncounter,
} from "../domain/transformers.js";
import { FetchError, InvalidFhirStructureError } from "../errors/errors.js";
import { extractResources } from "../utils/bundles.js";

export const getPatientTimeline = (
  fetchEncounterBundle: (
    patientId: string,
  ) => Effect.Effect<Bundle<Encounter>, FetchError, never>,
  patientId: string,
): Effect.Effect<
  TimelineResponse,
  FetchError | InvalidFhirStructureError,
  never
> =>
  Effect.gen(function* (_) {
    const bundle = yield* _(fetchEncounterBundle(patientId));

    const encounters = extractResources<Encounter>(bundle);

    const timelineEntries: TimelineEntry[] = sortTimelineEntries(
      encounters.map(toTimelineEntryFromEncounter),
    );

    const response: TimelineResponse = {
      timeline: timelineEntries,
      warnings: [],
    };

    return response;
  });
