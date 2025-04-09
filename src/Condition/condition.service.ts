import { Injectable } from '@nestjs/common';
import { Bundle, Condition } from 'fhir/r5';
import { DataStoreService } from '../db/dataStore.service';

@Injectable()
export class ConditionService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(): Promise<Bundle<Condition>> {
    const resources = this.repo.conditions;
    return {
      resourceType: 'Bundle',
      type: 'searchset',
      total: resources.length,
      entry: resources.map((resource) => ({
        fullUrl: `http://localhost:8080/api/v2/r5/${resource.resourceType}/${resource.id}`,
        resource,
      })),
    };
  }

  async findOne(id: string) {
    return this.repo.conditions.find((condition) => condition.id === id);
  }
}
