import { Effect } from "effect";
import type { Encounter } from "fhir/r5.js";
import { type TimelineEntry, type TimelineResponse } from "../domain/models.js";
import {
  sortTimelineEntries,
  toTimelineEntryFromEncounter,
} from "../domain/transformers.js";
import { FetchError, InvalidFhirStructureError } from "../errors/errors.js";
import { extractResources } from "../utils/bundles.js";

const toEncounterArray = (resources: unknown[]): Encounter[] => {
  const encounters: Encounter[] = [];

  for (const resource of resources) {
    if (resource !== null && typeof resource === "object") {
      encounters.push(resource as Encounter);
    }
  }

  return encounters;
};

const ensureValidEncounters = (encounters: Encounter[]): Encounter[] => {
  return encounters.filter((encounter) => encounter.id !== undefined);
};

export const getPatientTimeline = (
  fetchEncounterBundle: (
    patientId: string,
  ) => Effect.Effect<unknown, FetchError, never>,
  patientId: string,
): Effect.Effect<
  TimelineResponse,
  FetchError | InvalidFhirStructureError,
  never
> =>
  Effect.gen(function* (_) {
    const bundle = yield* _(fetchEncounterBundle(patientId));

    const resources = extractResources<unknown>(bundle);
    const encounters = toEncounterArray(resources);
    const validEncounters = ensureValidEncounters(encounters);

    if (validEncounters.length === 0 && encounters.length > 0) {
      return yield* _(
        Effect.fail(
          new InvalidFhirStructureError(
            "Encounter resources are missing identifiers",
          ),
        ),
      );
    }

    const timelineEntries: TimelineEntry[] = sortTimelineEntries(
      validEncounters.map(toTimelineEntryFromEncounter),
    );

    const response: TimelineResponse = {
      timeline: timelineEntries,
      warnings: [],
    };

    return response;
  });
