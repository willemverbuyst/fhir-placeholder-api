import { Injectable } from '@nestjs/common';
import { Bundle, Observation } from 'fhir/r5';
import { Id } from 'src/types';
import { DataStoreService } from '../db/dataStore.service';

@Injectable()
export class ObservationService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(): Promise<Bundle<Observation & Id>> {
    const resources = this.repo.observations;
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
}
