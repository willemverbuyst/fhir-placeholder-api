import { Injectable } from "@nestjs/common";
import type { Bundle, EpisodeOfCare } from "fhir/r5";
import { DataStoreService } from "../db/dataStore.service";
import { wrapInBundle } from "../utils/bundle";

@Injectable()
export class EpisodeOfCareService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(query?: {
    patient?: string;
    "diagnosis-reference"?: string;
  }): Promise<Bundle<EpisodeOfCare>> {
    let resources = this.repo.episodes;

    if (!query) {
      return wrapInBundle(resources);
    }

    const { patient, "diagnosis-reference": diagnosisReference } = query;

    if (patient) {
      resources = this.repo.episodes.filter((e) =>
        e.patient.reference?.endsWith(patient),
      );
    }

    if (diagnosisReference) {
      resources = this.repo.episodes.filter((e) =>
        e.diagnosis?.some((d) =>
          d.condition?.some((c) =>
            c.reference?.reference?.endsWith(diagnosisReference),
          ),
        ),
      );
    }

    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<EpisodeOfCare | undefined> {
    return this.repo.episodes.find((episode) => episode.id === id);
  }
}
