import { Injectable } from '@nestjs/common';
import { Bundle, Encounter } from 'fhir/r5';
import { DataStoreService } from '../db/dataStore.service';
import { Id } from '../types';
import { wrapInBundle } from '../utils/bundle';

@Injectable()
export class EncounterService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(): Promise<Bundle<Encounter & Id>> {
    const resources = this.repo.encounters;

    return wrapInBundle(resources);
  }
}
