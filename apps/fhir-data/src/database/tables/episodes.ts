import { EpisodeOfCare } from "fhir/r5";
import { getDb } from "./db";
import { createJsonResourceTable } from "./jsonResourceTable";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

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

const episodeOfCareTable = createJsonResourceTable<EpisodeOfCare>({
  tableName: "EpisodeOfCare",
  createTableSql: `
    CREATE TABLE IF NOT EXISTS EpisodeOfCare (
      id TEXT PRIMARY KEY,
      resource JSON
    )
  `,
  getDb,
  parse: parseEpisodeOfCareJson,
  getId: (episodeOfCare) => episodeOfCare.id,
});

export function findEpisodeOfCare(id: string): EpisodeOfCare | undefined {
  return episodeOfCareTable.find(id);
}

export function getEpisodeOfCare(id: string): EpisodeOfCare {
  return episodeOfCareTable.get(id);
}

export function getAllEpisodeOfCares(): EpisodeOfCare[] {
  return episodeOfCareTable.getAll();
}

export function cleanupEpisodes(): number {
  return episodeOfCareTable.cleanup();
}

export function seedEpisodes(episodes: EpisodeOfCare[]): number {
  return episodeOfCareTable.seed(episodes);
}
