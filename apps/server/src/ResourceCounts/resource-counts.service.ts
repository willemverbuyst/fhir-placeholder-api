import { Injectable } from "@nestjs/common";
import { DataStoreService } from "../db/dataStore.service";

@Injectable()
export class ResourceCountsService {
  constructor(private readonly repo: DataStoreService) {}

  async getResourceCounts(): Promise<Record<string, number>> {
    return {
      patients: this.repo.patients.length,
      episodes: this.repo.episodes.length,
      conditions: this.repo.conditions.length,
      organizations: this.repo.organizations.length,
      practitioners: this.repo.practitioners.length,
      practitionerRoles: this.repo.practitionerRoles.length,
      encounters: this.repo.encounters.length,
      observations: this.repo.observations.length,
      appointments: this.repo.appointments.length,
      allergies: this.repo.allergies.length,
    };
  }
}
