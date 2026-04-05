import { Injectable } from "@nestjs/common";
import type { Bundle, Condition as TCondition } from "fhir/r5";
import { wrapInBundle } from "../utils/bundle";
import { Condition } from "./condition.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ConditionService {
  constructor(
    @InjectRepository(Condition)
    private repo: Repository<Condition>,
  ) {}

  async findAll(query?: { patient?: string }): Promise<Bundle<TCondition>> {
    if (query?.patient) {
      const entities: { resource: TCondition }[] = await this.repo.query(
        `SELECT resource FROM condition WHERE resource->'subject'->>'reference' = $1`,
        [`Patient/${query.patient}`],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    const entities = await this.repo.find();
    const resources = entities.map((entity) => entity.resource);
    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<TCondition | undefined> {
    const entity = await this.repo.findOneBy({ id });
    const resource = entity?.resource;
    return resource;
  }
}
