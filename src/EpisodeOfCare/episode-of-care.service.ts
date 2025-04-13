import { Injectable } from '@nestjs/common';
import { Bundle, EpisodeOfCare } from 'fhir/r5';
import { Id } from 'src/types';
import { DataStoreService } from '../db/dataStore.service';

@Injectable()
export class EpisodeOfCareService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(): Promise<Bundle<EpisodeOfCare & Id>> {
    const resources = this.repo.episodes;
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

  async findOne(id: string): Promise<(EpisodeOfCare & Id) | undefined> {
    return this.repo.episodes.find((episode) => episode.id === id);
  }

  async findByPatientId(id: string): Promise<Bundle<EpisodeOfCare & Id>> {
    const resources = this.repo.episodes.filter(
      (e) => e.patient.reference?.split('/')[1] === id,
    );
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
