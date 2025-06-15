import { Injectable } from "@nestjs/common";
import type { Bundle, Condition } from "fhir/r5";
import { DataStoreService } from "../db/dataStore.service";
import type { Id } from "../types";
import { wrapInBundle } from "../utils/bundle";

@Injectable()
export class ConditionService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(query?: { patient?: string }): Promise<Bundle<Condition & Id>> {
    let resources = this.repo.conditions;

    if (!query) {
      return wrapInBundle(resources);
    }

    const { patient } = query;

    if (patient) {
      resources = this.repo.conditions.filter((c) =>
        c.subject.reference?.endsWith(patient),
      );
    }

    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<(Condition & Id) | undefined> {
    return this.repo.conditions.find((condition) => condition.id === id);
  }
}
