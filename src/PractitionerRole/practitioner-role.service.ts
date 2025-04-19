import { Injectable } from '@nestjs/common';
import { Bundle, PractitionerRole } from 'fhir/r5';
import { DataStoreService } from '../db/dataStore.service';
import { wrapInBundle } from '../utils/bundle';

@Injectable()
export class PractitionerRoleService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(query?: {
    organization?: string;
    practitioner?: string;
  }): Promise<Bundle<PractitionerRole>> {
    let resources = this.repo.practitionerRoles;

    if (!query) {
      return wrapInBundle(resources);
    }

    const { organization, practitioner } = query;

    if (organization) {
      resources = resources.filter((p) =>
        p.organization?.reference?.endsWith(organization),
      );
    }

    if (practitioner) {
      resources = resources.filter((p) =>
        p.practitioner?.reference?.endsWith(practitioner),
      );
    }

    return wrapInBundle(resources);
  }
}
