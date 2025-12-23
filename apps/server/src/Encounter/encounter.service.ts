import { Injectable } from "@nestjs/common";
import type { Bundle, Encounter } from "fhir/r5";
import { DataStoreService } from "../db/dataStore.service";
import { wrapInBundle } from "../utils/bundle";

@Injectable()
export class EncounterService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(query?: {
    patient?: string;
    "episode-of-care"?: string;
  }): Promise<Bundle<Encounter>> {
    let resources = this.repo.encounters;

    if (!query) {
      return wrapInBundle(resources);
    }

    const { patient, "episode-of-care": episodeOfCare } = query;

    if (patient) {
      resources = resources.filter((e) =>
        e.subject?.reference?.endsWith(patient),
      );
    }

    if (episodeOfCare) {
      resources = resources.filter((e) =>
        e.episodeOfCare?.some((eoc) => eoc.reference?.endsWith(episodeOfCare)),
      );
    }

    return wrapInBundle(resources);
  }
}
