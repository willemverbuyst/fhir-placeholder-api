import { Injectable } from "@nestjs/common";
import type { Bundle, Communication } from "fhir/r5";
import { DataStoreService } from "../db/dataStore.service";
import { wrapInBundle } from "../utils/bundle";

type FindAllQuery = {
  patient?: string;
  encounter?: string;
};

@Injectable()
export class CommunicationService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(query?: FindAllQuery): Promise<Bundle<Communication>> {
    let resources = this.repo.communications;

    if (!query) {
      return wrapInBundle(resources);
    }

    const { patient, encounter } = query;

    if (patient) {
      resources = resources.filter((communication) =>
        communication.subject?.reference?.endsWith(patient),
      );
    }

    if (encounter) {
      resources = resources.filter((communication) =>
        communication.encounter?.reference?.endsWith(encounter),
      );
    }

    return wrapInBundle(resources);
  }
}
