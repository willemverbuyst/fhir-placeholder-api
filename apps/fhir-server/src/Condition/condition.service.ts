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
    // let resources = this.repo.conditions;

    // if (!query) {
    //   return wrapInBundle(resources);
    // }

    // const { patient } = query;

    // if (patient) {
    //   resources = this.repo.conditions.filter((c) =>
    //     c.subject.reference?.endsWith(patient),
    //   );
    // }

    const resources = await this.repo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<TCondition | undefined> {
    return this.repo.findOneBy({ id }).then((entity) => entity?.resource);
  }
}
