import { Injectable } from "@nestjs/common";
import type { Bundle, Observation as TObservation } from "fhir/r5";
import { wrapInBundle } from "../utils/bundle";
import { Observation } from "./observation.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ObservationService {
  constructor(
    @InjectRepository(Observation)
    private repo: Repository<Observation>,
  ) {}

  async findAll(query?: {
    patient?: string;
    encounter?: string;
  }): Promise<Bundle<TObservation>> {
    // let resources = this.repo.observations;

    // if (!query) {
    //   return wrapInBundle(resources);
    // }

    // const { patient, encounter } = query;

    // if (patient && encounter) {
    //   resources = this.repo.observations.filter(
    //     (o) =>
    //       o.subject?.reference?.endsWith(patient) &&
    //       o.encounter?.reference?.endsWith(encounter),
    //   );
    // } else if (patient) {
    //   resources = this.repo.observations.filter((o) =>
    //     o.subject?.reference?.endsWith(patient),
    //   );
    // } else if (encounter) {
    //   resources = this.repo.observations.filter((o) =>
    //     o.encounter?.reference?.endsWith(encounter),
    //   );
    // }

    if (query?.patient && query?.encounter) {
      const resources: { resource: TObservation }[] = await this.repo.query(
        `SELECT resource FROM observation WHERE resource->'subject'->>'reference' LIKE $1 AND resource->'encounter'->>'reference' LIKE $2`,
        [`Patient/${query.patient}`, `Encounter/${query.encounter}`],
      );
      return wrapInBundle(resources.map((r) => r.resource));
    }

    if (query?.patient) {
      const resources: { resource: TObservation }[] = await this.repo.query(
        `SELECT resource FROM observation WHERE resource->'subject'->>'reference' LIKE $1`,
        [`Patient/${query.patient}`],
      );
      return wrapInBundle(resources.map((r) => r.resource));
    }

    if (query?.encounter) {
      const resources: { resource: TObservation }[] = await this.repo.query(
        `SELECT resource FROM observation WHERE resource->'encounter'->>'reference' LIKE $1`,
        [`Encounter/${query.encounter}`],
      );
      return wrapInBundle(resources.map((r) => r.resource));
    }

    const resources = await this.repo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    return wrapInBundle(resources);
  }
}
