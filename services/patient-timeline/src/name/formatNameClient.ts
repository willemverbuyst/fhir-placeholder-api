import { Effect } from "effect";
import type { HumanName } from "fhir/r5.js";
import { FetchError } from "../errors/errors.js";

type FormatNameResponse = {
  result: string;
};

const NAME_SERVICE_URL = "http://localhost:4000/format-name";

const isFormatNameResponse = (value: unknown): value is FormatNameResponse => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "result" in value &&
    typeof (value as { result?: unknown }).result === "string"
  );
};

export const formatName = (
  names: readonly HumanName[],
): Effect.Effect<string, FetchError, never> =>
  Effect.tryPromise({
    try: async () => {
      const response = await fetch(NAME_SERVICE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(names),
      });

      if (!response.ok) {
        throw new FetchError(
          `Failed to format name (status ${response.status})`,
        );
      }

      const json: unknown = await response.json();
      if (!isFormatNameResponse(json)) {
        throw new FetchError("Invalid name formatter response");
      }

      return json.result;
    },
    catch: (cause: unknown) =>
      new FetchError("Name formatting request failed", cause),
  });
