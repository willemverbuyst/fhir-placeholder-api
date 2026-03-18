import { Effect } from "effect";
import type { Bundle, Encounter, EpisodeOfCare, Observation } from "fhir/r5.js";
import { type TimelineEntry, type TimelineResponse } from "../domain/models.js";
import {
  sortTimelineEntries,
  toEpisodeSummary,
  toObservationSummary,
  toTimelineEntryFromEncounter,
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
  fetchEpisodeOfCareBundle: (
    patientId: string,
  ) => Effect.Effect<Bundle<EpisodeOfCare>, FetchError, never>,
  patientId: string,
): Effect.Effect<
  TimelineResponse,
  FetchError | InvalidFhirStructureError,
  never
> =>
  Effect.gen(function* (_) {
    const [encounterBundle, episodeBundle, observationBundle] = yield* _(
      Effect.all([
        fetchEncounterBundle(patientId),
        fetchEpisodeOfCareBundle(patientId),
        fetchObservationBundle(patientId),
      ]),
    );

    const encounters = extractResources<Encounter>(encounterBundle);
    const episodes = extractResources<EpisodeOfCare>(episodeBundle);
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
        const encounterEpisodes = episodes.filter((episode) =>
          encounter.episodeOfCare?.some(
            (eoc) => episode.id && eoc.reference?.endsWith(episode.id),
          ),
        );

        return {
          ...entry,
          observations: encounterObservations.map(toObservationSummary),
          episodes: encounterEpisodes.map(toEpisodeSummary),
        };
      }),
    );

    const response: TimelineResponse = {
      patient: null,
      timeline: timelineEntries,
      warnings:
        orphanedCount > 0
          ? ["Some observations could not be attached to an encounter"]
          : [],
    };

    return response;
  });
