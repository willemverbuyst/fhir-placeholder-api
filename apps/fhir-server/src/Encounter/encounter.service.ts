import { Injectable } from "@nestjs/common";
import type { Bundle, Encounter as TEncounter } from "fhir/r5";
import { wrapInBundle } from "../utils/bundle";
import { Encounter } from "./encounter.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class EncounterService {
  constructor(
    @InjectRepository(Encounter)
    private repo: Repository<Encounter>,
  ) {}

  async findAll(query?: {
    patient?: string;
    "episode-of-care"?: string;
  }): Promise<Bundle<TEncounter>> {
    if (query?.patient && query?.["episode-of-care"]) {
      const entities: { resource: TEncounter }[] = await this.repo.query(
        `SELECT resource FROM encounter WHERE resource->'subject'->>'reference' LIKE $1 AND resource->'episodeOfCare' @> $2`,
        [
          `Patient/${query.patient}`,
          `[{"reference": "EpisodeOfCare/${query["episode-of-care"]}"}]`,
        ],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    if (query?.patient) {
      const entities: { resource: TEncounter }[] = await this.repo.query(
        `SELECT resource FROM encounter WHERE resource->'subject'->>'reference' LIKE $1`,
        [`Patient/${query.patient}`],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    if (query?.["episode-of-care"]) {
      const entities: { resource: TEncounter }[] = await this.repo.query(
        `SELECT resource FROM encounter WHERE resource->'episodeOfCare' @> $1`,
        [`[{"reference": "EpisodeOfCare/${query["episode-of-care"]}"}]`],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    const entities = await this.repo.find();
    const resources = entities.map((entity) => entity.resource);
    return wrapInBundle(resources);
  }
}
