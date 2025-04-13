import { Injectable } from '@nestjs/common';
import { Bundle, EpisodeOfCare } from 'fhir/r5';
import { DataStoreService } from '../db/dataStore.service';
import { Id } from '../types';
import { wrapInBundle } from '../utils/bundle';

@Injectable()
export class EpisodeOfCareService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(): Promise<Bundle<EpisodeOfCare & Id>> {
    const resources = this.repo.episodes;

    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<(EpisodeOfCare & Id) | undefined> {
    return this.repo.episodes.find((episode) => episode.id === id);
  }

  async findByPatientId(id: string): Promise<Bundle<EpisodeOfCare & Id>> {
    const resources = this.repo.episodes.filter(
      (e) => e.patient.reference?.split('/')[1] === id,
    );

    return wrapInBundle(resources);
  }
}
