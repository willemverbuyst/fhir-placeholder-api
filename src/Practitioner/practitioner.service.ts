import { Injectable } from '@nestjs/common';
import { Bundle, Practitioner } from 'fhir/r5';
import { DataStoreService } from '../db/dataStore.service';
import { Id } from '../types';
import { wrapInBundle } from '../utils/bundle';

@Injectable()
export class PractitionerService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(): Promise<Bundle<Practitioner & Id>> {
    const resources = this.repo.practitioners;

    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<(Practitioner & Id) | undefined> {
    return this.repo.practitioners.find(
      (practitioner) => practitioner.id === id,
    );
  }
}
