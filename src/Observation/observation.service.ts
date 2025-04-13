import { Injectable } from '@nestjs/common';
import { Bundle, Observation } from 'fhir/r5';
import { DataStoreService } from '../db/dataStore.service';
import { Id } from '../types';
import { wrapInBundle } from '../utils/bundle';

@Injectable()
export class ObservationService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(): Promise<Bundle<Observation & Id>> {
    const resources = this.repo.observations;

    return wrapInBundle(resources);
  }
}
