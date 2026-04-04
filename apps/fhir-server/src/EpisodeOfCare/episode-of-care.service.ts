import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Bundle, EpisodeOfCare as TEpisodeOfCare } from "fhir/r5";
import { Repository } from "typeorm";
import { wrapInBundle } from "../utils/bundle";
import { EpisodeOfCare } from "./episode-of-care.entity";

@Injectable()
export class EpisodeOfCareService {
  constructor(
    @InjectRepository(EpisodeOfCare)
    private repo: Repository<EpisodeOfCare>,
  ) {}

  async findAll(query?: {
    patient?: string;
    "diagnosis-reference"?: string;
  }): Promise<Bundle<TEpisodeOfCare>> {
    if (query?.patient && query?.["diagnosis-reference"]) {
      const entities: { resource: TEpisodeOfCare }[] = await this.repo.query(
        `SELECT resource FROM episode_of_care WHERE resource->'patient'->>'reference' LIKE $1 AND resource->'diagnosis' @> $2`,
        [
          `Patient/${query.patient}`,
          `[{"condition": [{"reference": "Condition/${query["diagnosis-reference"]}"}]}]`,
        ],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    if (query?.patient) {
      const entities: { resource: TEpisodeOfCare }[] = await this.repo.query(
        `SELECT resource FROM episode_of_care WHERE resource->'patient'->>'reference' LIKE $1`,
        [`Patient/${query.patient}`],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    if (query?.["diagnosis-reference"]) {
      const entities: { resource: TEpisodeOfCare }[] = await this.repo.query(
        `SELECT resource FROM episode_of_care WHERE resource->'diagnosis' @> $1`,
        [
          `[{"condition": [{"reference": "Condition/${query["diagnosis-reference"]}"}]}]`,
        ],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    const entities = await this.repo.find();
    const resources = entities.map((entity) => entity.resource);
    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<TEpisodeOfCare | undefined> {
    const entity = await this.repo.findOneBy({ id });
    const resource = entity?.resource;
    return resource;
  }
}
