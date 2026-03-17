import { Effect } from "effect";
import { FetchError } from "../errors/errors.js";

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
