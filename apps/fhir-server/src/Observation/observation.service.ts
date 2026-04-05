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
    if (query?.patient && query?.encounter) {
      const entities: { resource: TObservation }[] = await this.repo.query(
        `SELECT resource FROM observation WHERE resource->'subject'->>'reference' LIKE $1 AND resource->'encounter'->>'reference' LIKE $2`,
        [`Patient/${query.patient}`, `Encounter/${query.encounter}`],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    if (query?.patient) {
      const entities: { resource: TObservation }[] = await this.repo.query(
        `SELECT resource FROM observation WHERE resource->'subject'->>'reference' LIKE $1`,
        [`Patient/${query.patient}`],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    if (query?.encounter) {
      const entities: { resource: TObservation }[] = await this.repo.query(
        `SELECT resource FROM observation WHERE resource->'encounter'->>'reference' LIKE $1`,
        [`Encounter/${query.encounter}`],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    const entities = await this.repo.find();
    const resources = entities.map((entity) => entity.resource);
    return wrapInBundle(resources);
  }
}
