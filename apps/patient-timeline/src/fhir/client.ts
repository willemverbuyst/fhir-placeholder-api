import { Effect } from "effect";
import type { Bundle, Encounter, Observation } from "fhir/r5.js";
import { FetchError, PatientNotFoundError } from "../errors/errors.js";

const BASE_URL = "http://localhost:8080/api/v2/r5";

export const fetchEncounterBundle = (
  patientId: string,
): Effect.Effect<Bundle<Encounter>, FetchError, never> =>
  Effect.tryPromise({
    try: async () => {
      const response = await fetch(
        `${BASE_URL}/Encounter?patient=${encodeURIComponent(patientId)}`,
      );

      if (!response.ok) {
        throw new FetchError(
          `Failed to fetch encounters (status ${response.status})`,
        );
      }

      const json: Bundle<Encounter> = await response.json();

      return json;
    },
    catch: (cause: unknown) => new FetchError("Encounter fetch failed", cause),
  });

export const fetchObservationBundle = (
  patientId: string,
): Effect.Effect<Bundle<Observation>, FetchError, never> =>
  Effect.tryPromise({
    try: async () => {
      const response = await fetch(
        `${BASE_URL}/Observation?patient=${encodeURIComponent(patientId)}`,
      );

      if (!response.ok) {
        throw new FetchError(
          `Failed to fetch observations (status ${response.status})`,
        );
      }

      const json: Bundle<Observation> = await response.json();

      return json;
    },
    catch: (cause: unknown) => new FetchError("Observation fetch failed", cause),
  });

export const fetchPatient = (
  patientId: string,
): Effect.Effect<void, FetchError | PatientNotFoundError, never> =>
  Effect.tryPromise({
    try: async () => {
      const response = await fetch(
        `${BASE_URL}/Patient/${encodeURIComponent(patientId)}`,
      );

      if (response.status === 404) {
        throw new PatientNotFoundError(`Patient not found: ${patientId}`);
      }

      if (!response.ok) {
        throw new FetchError(
          `Failed to fetch patient (status ${response.status})`,
        );
      }

      return undefined;
    },
    catch: (cause: unknown) => {
      if (cause instanceof PatientNotFoundError) {
        return cause;
      }

      return new FetchError("Patient fetch failed", cause);
    },
  });
