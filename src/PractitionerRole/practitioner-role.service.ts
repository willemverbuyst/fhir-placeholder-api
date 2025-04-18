import { Injectable } from '@nestjs/common';
import { Bundle, PractitionerRole } from 'fhir/r5';
import { DataStoreService } from '../db/dataStore.service';
import { wrapInBundle } from '../utils/bundle';

@Injectable()
export class PractitionerRoleService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(): Promise<Bundle<PractitionerRole>> {
    return wrapInBundle(this.repo.practitionerRoles);
  }
}
