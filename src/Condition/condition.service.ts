import { Injectable } from '@nestjs/common';
import { Bundle, Condition } from 'fhir/r5';
import { DataStoreService } from '../db/dataStore.service';

@Injectable()
export class ConditionService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(): Promise<Bundle<Condition>> {
    return {
      resourceType: 'Bundle',
      type: 'searchset',
      total: this.repo.conditions.length,
      entry: this.repo.conditions.map((resource) => ({
        fullUrl: `http://localhost:8080/api/v2/r5/${resource.resourceType}/${resource.id}`,
        resource,
      })),
    };
  }

  async findOne(id: string) {
    return this.repo.conditions.find((condition) => condition.id === id);
  }
}
