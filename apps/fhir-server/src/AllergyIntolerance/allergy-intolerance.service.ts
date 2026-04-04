import { Injectable } from "@nestjs/common";
import { AllergyIntolerance as TAllergyIntolerance, Bundle } from "fhir/r5";
import { DataStoreService } from "../db/dataStore.service";
import { wrapInBundle } from "../utils/bundle";
import { InjectRepository } from "@nestjs/typeorm";
import { AllergyIntolerance } from "./allergy-intolerance.entity";
import { Repository } from "typeorm";

@Injectable()
export class AllergyIntoleranceService {
  constructor(
    @InjectRepository(AllergyIntolerance)
    private repo: Repository<AllergyIntolerance>,
  ) {}

  async findAll(): Promise<Bundle<TAllergyIntolerance>> {
    const resources = await this.repo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    return wrapInBundle(resources);
  }
}
