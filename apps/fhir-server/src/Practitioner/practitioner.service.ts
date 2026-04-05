import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Bundle, Practitioner as TPractitioner } from "fhir/r5";
import { Repository } from "typeorm";
import { wrapInBundle } from "../utils/bundle";
import { Practitioner } from "./practitioner.entity";

@Injectable()
export class PractitionerService {
  constructor(
    @InjectRepository(Practitioner)
    private repo: Repository<Practitioner>,
  ) {}

  async findAll(): Promise<Bundle<TPractitioner>> {
    const entities = await this.repo.find();
    const resources = entities.map((entity) => entity.resource);
    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<TPractitioner | undefined> {
    const entity = await this.repo.findOneBy({ id });
    const resource = entity?.resource;
    return resource;
  }
}
