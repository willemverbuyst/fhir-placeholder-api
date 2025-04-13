import { Injectable } from '@nestjs/common';
import { Bundle, Encounter } from 'fhir/r5';
import { Id } from 'src/types';
import { DataStoreService } from '../db/dataStore.service';

@Injectable()
export class EncounterService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(): Promise<Bundle<Encounter & Id>> {
    const resources = this.repo.encounters;
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
