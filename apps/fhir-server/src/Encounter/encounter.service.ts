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
    // let resources = this.repo.encounters;

    // if (!query) {
    //   return wrapInBundle(resources);
    // }

    // const { patient, "episode-of-care": episodeOfCare } = query;

    // if (patient) {
    //   resources = resources.filter((e) =>
    //     e.subject?.reference?.endsWith(patient),
    //   );
    // }

    // if (episodeOfCare) {
    //   resources = resources.filter((e) =>
    //     e.episodeOfCare?.some((eoc) => eoc.reference?.endsWith(episodeOfCare)),
    //   );
    // }

    if (query?.patient && query?.["episode-of-care"]) {
      const resources: { resource: TEncounter }[] = await this.repo.query(
        `SELECT resource FROM encounter WHERE resource->'subject'->>'reference' LIKE $1 AND resource->'episodeOfCare' @> $2`,
        [
          `Patient/${query.patient}`,
          `[{"reference": "EpisodeOfCare/${query["episode-of-care"]}"}]`,
        ],
      );
      return wrapInBundle(resources.map((r) => r.resource));
    }

    if (query?.patient) {
      const resources: { resource: TEncounter }[] = await this.repo.query(
        `SELECT resource FROM encounter WHERE resource->'subject'->>'reference' LIKE $1`,
        [`Patient/${query.patient}`],
      );
      return wrapInBundle(resources.map((r) => r.resource));
    }

    if (query?.["episode-of-care"]) {
      const resources: { resource: TEncounter }[] = await this.repo.query(
        `SELECT resource FROM encounter WHERE resource->'episodeOfCare' @> $1`,
        [`[{"reference": "EpisodeOfCare/${query["episode-of-care"]}"}]`],
      );
      return wrapInBundle(resources.map((r) => r.resource));
    }

    const resources = await this.repo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    return wrapInBundle(resources);
  }
}
