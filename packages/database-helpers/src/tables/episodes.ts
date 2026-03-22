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
    tableName: "EpisodeOfCare",
    createTableSql: `
    CREATE TABLE IF NOT EXISTS EpisodeOfCare (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
    getDb: () => db.getDb(),
    parse: parseEpisodeOfCareJson,
    getId: (episodeOfCare) => episodeOfCare.id,
  });

export function findEpisodeOfCare(
  db: DB,
  id: string,
): EpisodeOfCare | undefined {
  return episodeOfCareTable(db).find(id);
}

export function getEpisodeOfCare(db: DB, id: string): EpisodeOfCare {
  return episodeOfCareTable(db).get(id);
}

export function getAllEpisodeOfCares(db: DB): EpisodeOfCare[] {
  return episodeOfCareTable(db).getAll();
}

export function cleanupEpisodes(db: DB): number {
  return episodeOfCareTable(db).cleanup();
}

export function seedEpisodes(db: DB, episodes: EpisodeOfCare[]): number {
  return episodeOfCareTable(db).seed(episodes);
}
