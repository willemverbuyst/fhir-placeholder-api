import { Injectable } from "@nestjs/common";
import type { Bundle, Observation } from "fhir/r5";
import { DataStoreService } from "../db/dataStore.service";
import { wrapInBundle } from "../utils/bundle";

@Injectable()
export class ObservationService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(query?: {
    patient?: string;
    encounter?: string;
  }): Promise<Bundle<Observation>> {
    let resources = this.repo.observations;

    if (!query) {
      return wrapInBundle(resources);
    }

    const { patient, encounter } = query;

    if (patient && encounter) {
      resources = this.repo.observations.filter(
        (o) =>
          o.subject?.reference?.endsWith(patient) &&
          o.encounter?.reference?.endsWith(encounter),
      );
    } else if (patient) {
      resources = this.repo.observations.filter((o) =>
        o.subject?.reference?.endsWith(patient),
      );
    } else if (encounter) {
      resources = this.repo.observations.filter((o) =>
        o.encounter?.reference?.endsWith(encounter),
      );
    }

    return wrapInBundle(resources);
  }
}
