import { Injectable } from '@nestjs/common';
import { Bundle, Practitioner } from 'fhir/r5';
import { DataStoreService } from '../db/dataStore.service';

@Injectable()
export class PractitionerService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(): Promise<Bundle<Practitioner>> {
    const resources = this.repo.practitioners;
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

  async findOne(id: string): Promise<Practitioner | undefined> {
    return this.repo.practitioners.find(
      (practitioner) => practitioner.id === id,
    );
  }
}
