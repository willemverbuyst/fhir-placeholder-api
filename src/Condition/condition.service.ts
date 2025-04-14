import { Injectable } from '@nestjs/common';
import { Bundle, Condition } from 'fhir/r5';
import { DataStoreService } from '../db/dataStore.service';
import { Id } from '../types';
import { wrapInBundle } from '../utils/bundle';

@Injectable()
export class ConditionService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(): Promise<Bundle<Condition & Id>> {
    const resources = this.repo.conditions;

    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<(Condition & Id) | undefined> {
    return this.repo.conditions.find((condition) => condition.id === id);
  }
}
