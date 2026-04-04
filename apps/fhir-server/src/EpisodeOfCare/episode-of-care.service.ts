import { Injectable } from "@nestjs/common";
import type { Bundle, EpisodeOfCare as TEpisodeOfCare } from "fhir/r5";
import { DataStoreService } from "../db/dataStore.service";
import { wrapInBundle } from "../utils/bundle";
import { EpisodeOfCare } from "./episode-of-care.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

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
    // let resources = this.repo.episodes;

    // if (!query) {
    //   return wrapInBundle(resources);
    // }

    // const { patient, "diagnosis-reference": diagnosisReference } = query;

    // if (patient) {
    //   resources = this.repo.episodes.filter((e) =>
    //     e.patient.reference?.endsWith(patient),
    //   );
    // }

    // if (diagnosisReference) {
    //   resources = this.repo.episodes.filter((e) =>
    //     e.diagnosis?.some((d) =>
    //       d.condition?.some((c) =>
    //         c.reference?.reference?.endsWith(diagnosisReference),
    //       ),
    //     ),
    //   );
    // }

    if (query?.patient && query?.["diagnosis-reference"]) {
      const resources: { resource: TEpisodeOfCare }[] = await this.repo.query(
        `SELECT resource FROM episode_of_care WHERE resource->'patient'->>'reference' LIKE $1 AND resource->'diagnosis' @> $2`,
        [
          `Patient/${query.patient}`,
          `[{"condition": [{"reference": "Condition/${query["diagnosis-reference"]}"}]}]`,
        ],
      );
      return wrapInBundle(resources.map((r) => r.resource));
    }

    if (query?.patient) {
      const resources: { resource: TEpisodeOfCare }[] = await this.repo.query(
        `SELECT resource FROM episode_of_care WHERE resource->'patient'->>'reference' LIKE $1`,
        [`Patient/${query.patient}`],
      );
      return wrapInBundle(resources.map((r) => r.resource));
    }

    if (query?.["diagnosis-reference"]) {
      const resources: { resource: TEpisodeOfCare }[] = await this.repo.query(
        `SELECT resource FROM episode_of_care WHERE resource->'diagnosis' @> $1`,
        [
          `[{"condition": [{"reference": "Condition/${query["diagnosis-reference"]}"}]}]`,
        ],
      );
      return wrapInBundle(resources.map((r) => r.resource));
    }

    const resources = await this.repo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<TEpisodeOfCare | undefined> {
    return await this.repo.findOneBy({ id }).then((entity) => entity?.resource);
  }
}
