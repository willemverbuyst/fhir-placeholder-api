import { Effect } from "effect";
import { FetchError, PatientNotFoundError } from "../errors/errors.js";

const BASE_URL = "http://localhost:8080/api/v2/r5";

export const fetchEncounterBundle = (
  patientId: string,
): Effect.Effect<unknown, FetchError, never> =>
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

      const json = (await response.json()) as unknown;

      return json;
    },
    catch: (cause: unknown) => new FetchError("Encounter fetch failed", cause),
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
