import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Bundle, Flag as TFlag } from "fhir/r5";
import { Repository } from "typeorm";
import { wrapInBundle } from "../utils/bundle";
import { Flag } from "./flag.entity";

type FindAllFlagQuery = {
  patient?: string;
  encounter?: string;
};

@Injectable()
export class FlagService {
  constructor(
    @InjectRepository(Flag)
    private repo: Repository<Flag>,
  ) {}

  async findAll(query?: FindAllFlagQuery): Promise<Bundle<TFlag>> {
    if (query?.patient && query?.encounter) {
      const entities: { resource: TFlag }[] = await this.repo.query(
        `SELECT resource FROM flag WHERE resource->'subject'->>'reference' LIKE $1 AND resource->'encounter'->>'reference' LIKE $2`,
        [`Patient/${query.patient}`, `Encounter/${query.encounter}`],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    if (query?.patient) {
      const entities: { resource: TFlag }[] = await this.repo.query(
        `SELECT resource FROM flag WHERE resource->'subject'->>'reference' LIKE $1`,
        [`Patient/${query.patient}`],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    if (query?.encounter) {
      const entities: { resource: TFlag }[] = await this.repo.query(
        `SELECT resource FROM flag WHERE resource->'encounter'->>'reference' LIKE $1`,
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
