import { Injectable } from "@nestjs/common";
import { AllergyIntolerance as TAllergyIntolerance, Bundle } from "fhir/r5";
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
    const entities = await this.repo.find();
    const resources = entities.map((e) => e.resource);
    return wrapInBundle(resources);
  }
}
