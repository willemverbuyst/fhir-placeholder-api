import { Injectable } from "@nestjs/common";
import { AllergyIntolerance, Bundle } from "fhir/r5";
import { DataStoreService } from "../db/dataStore.service";
import { wrapInBundle } from "../utils/bundle";

@Injectable()
export class AllergyIntoleranceService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(): Promise<Bundle<AllergyIntolerance>> {
    const resources = this.repo.allergies;

    return wrapInBundle(resources);
  }
}
