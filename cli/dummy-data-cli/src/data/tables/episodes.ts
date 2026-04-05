import { EpisodeOfCare } from "fhir/r5";
import { DB } from "../utils";
import { isRecord } from "../utils/isRecord";
import { createJsonResourceTable } from "../utils/jsonResourceTable";

function parseEpisodeOfCareJson(json: string): EpisodeOfCare {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch (error) {
    throw new Error(
      `Failed to parse EpisodeOfCare JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!isRecord(parsed)) {
    throw new Error("Invalid EpisodeOfCare JSON: expected object");
  }

  const resourceType = parsed.resourceType;
  if (resourceType !== "EpisodeOfCare") {
    throw new Error(
      `Invalid EpisodeOfCare JSON: expected resourceType "EpisodeOfCare" but got ${String(resourceType)}`,
    );
  }

  const id = parsed.id;
  if (id !== undefined && typeof id !== "string") {
    throw new Error(
      "Invalid EpisodeOfCare JSON: `id` must be a string when present",
    );
  }

  return parsed as unknown as EpisodeOfCare;
}

const episodeOfCareTable = (db: DB) =>
  createJsonResourceTable<EpisodeOfCare>({
    tableName: "episode_of_care",
    createTableSql: `
    CREATE TABLE IF NOT EXISTS episode_of_care (
      id TEXT PRIMARY KEY,
      resource JSONB
    )
  `,
    getDb: () => db.getDb(),
    parse: parseEpisodeOfCareJson,
    getId: (episodeOfCare) => episodeOfCare.id,
  });

export function cleanupEpisodes(db: DB): Promise<number> {
  return episodeOfCareTable(db).cleanup();
}

export function seedEpisodes(
  db: DB,
  episodes: EpisodeOfCare[],
): Promise<number> {
  return episodeOfCareTable(db).seed(episodes);
}
