import { Injectable } from "@nestjs/common";
import type { Bundle, Flag } from "fhir/r5";
import { DataStoreService } from "../db/dataStore.service";
import { wrapInBundle } from "../utils/bundle";

type FindAllFlagQuery = {
  patient?: string;
  encounter?: string;
};

@Injectable()
export class FlagService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(query?: FindAllFlagQuery): Promise<Bundle<Flag>> {
    let resources = this.repo.flags;

    if (!query) {
      return wrapInBundle(resources);
    }

    const { patient, encounter } = query;

    if (patient) {
      resources = this.repo.flags.filter((flag) =>
        flag.subject?.reference?.endsWith(patient),
      );
    }

    if (encounter) {
      resources = this.repo.flags.filter((flag) =>
        flag.encounter?.reference?.endsWith(encounter),
      );
    }

    return wrapInBundle(resources);
  }
}
